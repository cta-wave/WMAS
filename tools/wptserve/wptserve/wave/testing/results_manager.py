from __future__ import absolute_import
import os
import shutil
import re
import json
import hashlib
import zipfile
import time

from ..utils.user_agent_parser import parse_user_agent, abbreviate_browser_name
from ..utils.serializer import serialize_session
from ..utils.deserializer import deserialize_session
from ..data.exceptions.permission_denied_exception import PermissionDeniedException
from ..data.exceptions.invalid_data_exception import InvalidDataException
from ..data.exceptions.duplicate_exception import DuplicateException
from .wpt_report import generate_report, generate_multi_report
from ..data.session import COMPLETED

WAVE_SRC_DIR = "./tools/wptserve/wptserve/wave"

class ResultsManager(object):
    def initialize(
        self, 
        results_directory_path,
        sessions_manager,
        tests_manager,
        database,
        import_enabled,
        reports_enabled
    ):
        self._results_directory_path = results_directory_path
        self._sessions_manager = sessions_manager
        self._tests_manager = tests_manager
        self._database = database
        self._import_enabled = import_enabled
        self._reports_enabled = reports_enabled

    def create_result(self, token, data):
        result = self.prepare_result(data)
        test = result[u"test"]

        session = self._sessions_manager.read_session(token)

        if session is None: return
        if not self._sessions_manager.test_in_session(test, session): return
        if self._sessions_manager.is_test_complete(test, session): return
        self._tests_manager.complete_test(test, session)
        self._database.create_result(token, result)

        api = ""
        for part in test.split(u"/"):
            if part is not u"":
                api = part
                break
        if not self._sessions_manager.is_api_complete(api, session): return
        self.save_api_results(token, api)
        self.generate_report(token, api)

        test_files_count = session.test_files_count
        apis = list(test_files_count.keys())
        all_apis_complete = True
        for api in apis:
            if not self._sessions_manager.is_api_complete(api, session):
                all_apis_complete = False
        if not all_apis_complete: return
        self._sessions_manager.complete_session(token)
        self.create_info_file(session)

    def read_results(self, token, filter_path=None):
        filter_api = None
        if filter_path is not None:
            filter_api = next((p for p in filter_path.split(u"/") if p is not None), None)
        results = self._database.read_results(token)

        results_per_api = {}

        for result in results:
            api = next((p for p in result[u"test"].split(u"/") if p is not u""), None)
            if filter_api is not None and api.lower() != filter_api.lower(): continue
            if filter_path is not None:
                pattern = re.compile(u"^" + filter_path.replace(u".", u""))
                if pattern.match(result[u"test"].replace(u".", u"")) is None: continue
            if api not in results_per_api: results_per_api[api] = []
            results_per_api[api].append(result)

        return results_per_api

    def read_flattened_results(self, token):
        results = self.read_results(token)
        flattened_results = {}

        for api in results:
            if api not in flattened_results:
                flattened_results[api] = {
                    u"pass": 0,
                    u"fail": 0,
                    u"timeout": 0,
                    u"not_run": 0
                }

            for result in results[api]:
                if u"subtests" not in result:
                    if result[u"status"] == u"OK":
                        flattened_results[api][u"pass"] += 1
                        continue
                    if result[u"status"] == u"ERROR":
                        flattened_results[api][u"fail"] += 1
                        continue
                    if result[u"status"] == u"TIMEOUT":
                        flattened_results[api][u"timeout"] += 1
                        continue
                    if result[u"status"] == u"NOTRUN":
                        flattened_results[api][u"not_run"] += 1
                        continue
                for test in result[u"subtests"]:
                    if test[u"status"] == u"PASS":
                        flattened_results[api][u"pass"] += 1
                        continue
                    if test[u"status"] == u"FAIL":
                        flattened_results[api][u"fail"] += 1
                        continue
                    if test[u"status"] == u"TIMEOUT":
                        flattened_results[api][u"timeout"] += 1
                        continue
                    if test[u"status"] == u"NOTRUN":
                        flattened_results[api][u"not_run"] += 1
                        continue

        return flattened_results

    def read_common_passed_tests(self, tokens=[]):
        if tokens is None or len(tokens) == 0: return None

        session_results = []

        for token in tokens:
            session_result = self._results_manager.read_results(token)
            session_results.append(session_result)

        passed_tests = {}
        failed_tests = {}

        for result in session_results:
            for api in result:
                if api not in passed_tests: passed_tests[api] = []
                if api not in failed_tests: failed_tests[api] = []

                for api_result in result[api]:
                    passed = True
                    for subtest in api_result[u"subtests"]:
                        if subtest[u"status"] == u"PASS": continue
                        passed = False
                        break

                    test = api_result[u"test"]

                    if passed:
                        if test in failed_tests[api]: continue
                        if test in passed_tests[api]: continue
                        passed_tests[api].append(test)
                    else:
                        if test in passed_tests[api]:
                            passed_tests.remove(test)
                        if test in failed_tests[api]: continue
                        failed_tests[api].append(test)

    def read_results_wpt_report_uri(self, token, api):
        api_directory = os.path.join(self._results_directory_path, token, api)
        if not os.path.isdir(api_directory): return None
        return "/results/{}/{}/all.html".format(token, api)

    def read_results_wpt_multi_report_uri(self, tokens, api):
        comparison_directory_name = self.get_comparison_identifier(tokens)

        relative_api_directory_path = os.path.join(comparison_directory_name, api)

        api_directory_path = os.path.join(
                self._results_directory_path, 
                relative_api_directory_path
        )

        if not os.path.isdir(api_directory_path):
            self.generate_multi_report(tokens, api)

        return "/results/{}/all.html".format(relative_api_directory_path)

    def delete_results(self, token):
        results_directory = os.path.join(self._results_directory_path, token)
        if not os.path.isdir(results_directory): return
        shutil.rmtree(results_directory)

    def prepare_result(self, result):
        harness_status_map = {
            0: u"OK",
            1: u"ERROR",
            2: u"TIMEOUT",
            3: u"NOTRUN",
            u"OK": u"OK",
            u"ERROR": u"ERROR",
            u"TIMEOUT": u"TIMEOUT",
            u"NOTRUN": u"NOTRUN"
        }

        subtest_status_map = {
            0: u"PASS",
            1: u"FAIL",
            2: u"TIMEOUT",
            3: u"NOTRUN",
            u"PASS": u"PASS",
            u"FAIL": u"FAIL",
            u"TIMEOUT": u"TIMEOUT",
            u"NOTRUN": u"NOTRUN"
        }

        if u"tests" in result:
            for test in result[u"tests"]:
                test[u"status"] = subtest_status_map[test[u"status"]]
                if u"stack" in test: del test[u"stack"]
            result[u"subtests"] = result[u"tests"]
            del result[u"tests"]

        if u"stack" in result: del result[u"stack"]
        result[u"status"] = harness_status_map[result[u"status"]]

        return result

    def get_json_path(self, token, api):
        session = self._sessions_manager.read_session(token)
        api_directory = os.path.join(self._results_directory_path, token, api)
        
        browser = parse_user_agent(session.user_agent)
        abbreviation = abbreviate_browser_name(browser[u"name"])
        version = browser[u"version"]
        if u"." in version:
            version = version.split(u".")[0]
        version = version.zfill(2)
        file_name = abbreviation + version + ".json"

        return os.path.join(api_directory, file_name)

    def save_api_results(self, token, api):
        results = self.read_results(token)
        api_results = { "results": results[api] }
        session = self._sessions_manager.read_session(token)

        self._ensure_results_directory_existence(api, token, session)

        file_path = self.get_json_path(token, api)

        file = open(file_path, "w+")
        file.write(json.dumps(api_results, indent=4, separators=(',', ': ')))
        file.close()

    def _ensure_results_directory_existence(self, api, token, session):
        directory = os.path.join(self._results_directory_path, token, api)
        if not os.path.exists(directory):
            os.makedirs(directory)

        self.create_info_file(session)
    
    def generate_report(self, token, api):
        file_path = self.get_json_path(token, api)
        dir_path = os.path.dirname(file_path)
        generate_report(
                input_json_directory_path=dir_path,
                output_html_directory_path=dir_path,
                spec_name=api
        )

    def generate_multi_report(self, tokens, api):
        comparison_directory_name = self.get_comparison_identifier(tokens)

        api_directory_path = os.path.join(
                self._results_directory_path,
                comparison_directory_name,
                api
        )

        if os.path.isdir(api_directory_path): return None

        os.makedirs(api_directory_path)

        result_json_files = []
        for token in tokens:
            result_json_files.append({
                "token": token,
                "path": self.get_json_path(token, api)
            })
        for file in result_json_files:
            if not os.path.isfile(file["path"]):
                return None
        generate_multi_report(
                output_html_directory_path=api_directory_path,
                spec_name=api,
                result_json_files=result_json_files
        )


    def get_comparison_identifier(self, tokens, ref_tokens = []):
        comparison_directory = u"comparison"
        short_token_concat = ""
        tokens.sort()
        for token in tokens:
            short_token = token.split("-")[0]
            comparison_directory += "-" + short_token
        hash = hashlib.sha1()
        ref_tokens.sort()
        for token in ref_tokens:
            hash.update(token)
        for token in tokens:
            hash.update(token)
        hash = hash.hexdigest()
        comparison_directory += hash[0:8]
        return comparison_directory

    def create_info_file(self, session):
        token = session.token
        info_file_path = os.path.join(
            self._results_directory_path,
            token,
            "info.json"
        )
        info = serialize_session(session)
        del info[u"running_tests"]
        del info[u"pending_tests"]
        del info[u"completed_tests"]

        file_content = json.dumps(info, indent=2)
        file = open(info_file_path, "w+")
        file.write(file_content)
        file.close()

    def export_results_api_json(self, token, api):
        results = self.read_results(token)
        if api in results:
            return json.dumps({ "results": results[api] }, indent=4)

        file_path = self.get_json_path(token, api)
        if not os.path.isfile(file_path): return None
        file = open(file_path, "r")
        blob = file.read()
        file.close()
        return blob

    def export_results_all_api_jsons(self, token):
        session = self._sessions_manager.read_session(token)
        results_directory = os.path.join(self._results_directory_path, token)
        results = self.read_results(token)

        zip_file_name = unicode(time.time()) + ".zip"
        zip = zipfile.ZipFile(zip_file_name, "w")
        for api, result in results.iteritems():
            zip.writestr(
                    api + ".json",
                    json.dumps({ "results": result }, indent=4),
                    zipfile.ZIP_DEFLATED
            )
        
        results_directory = os.path.join(self._results_directory_path, token)
        if os.path.isdir(results_directory):
            persisted_apis = os.listdir(results_directory)

            for api in persisted_apis:
                if api in results: continue
                blob = self.export_results_api_json(token, api)
                if blob is None: continue
                zip.writestr(api + ".json", blob, zipfile.ZIP_DEFLATED)

        zip.close()

        file = open(zip_file_name, "r")
        blob = file.read()
        file.close()
        os.remove(zip_file_name)

        return blob

    def export_results(self, token):
        if token is None: return
        session = self._sessions_manager.read_session(token)
        if session.status != COMPLETED: return None

        session_results_directory = os.path.join(self._results_directory_path, token)
        if not os.path.isdir(session_results_directory): return None

        zip_file_name = unicode(time.time()) + ".zip"
        zip = zipfile.ZipFile(zip_file_name, "w")
        for root, dirs, files in os.walk(session_results_directory):
            for file in files:
                file_name = os.path.join(root.split(token)[1], file)
                file_path = os.path.join(root, file)
                zip.write(file_path, file_name, zipfile.ZIP_DEFLATED)
        zip.close()

        file = open(zip_file_name, "r")
        blob = file.read()
        file.close()
        os.remove(zip_file_name)

        return blob

    def export_results_overview(self, token):
        session = self._sessions_manager.read_session(token)
        if session is None: raise NotFoundException("Could not find session {}".format(token))

        tmp_file_name = unicode(time.time()) + ".zip"
        zip = zipfile.ZipFile(tmp_file_name, "w")

        flattened_results = self.read_flattened_results(token)
        results_script = "const results = " + json.dumps(flattened_results, indent=4)
        zip.writestr("results.json.js", results_script)

        session_dict = serialize_session(session)
        del session_dict["running_tests"]
        del session_dict["completed_tests"]
        del session_dict["pending_tests"]
        details_script = "const details = " + json.dumps(session_dict, indent=4)
        zip.writestr("details.json.js", details_script)

        for root, dirs, files in os.walk(os.path.join(WAVE_SRC_DIR, "export")):
            for file in files:
                file_name = os.path.join(root.split("export")[1], file)
                file_path = os.path.join(root, file)
                zip.write(file_path, file_name, zipfile.ZIP_DEFLATED)

        zip.close()

        file = open(tmp_file_name, "r")
        blob = file.read()
        file.close()

        self.remove_tmp_files()

        return blob

    def is_import_enabled(self):
        return self._import_enabled

    def are_reports_enabled(self):
        return self._reports_enabled

    def load_results(self):
        if not os.path.isdir(self._results_directory_path): return

        tokens = os.listdir(self._results_directory_path)

        print("Looking for results to import ...")
        for token in tokens:
            result_directory_path = os.path.join(self._results_directory_path, token)
            if os.path.isfile(result_directory_path): continue
            if self._sessions_manager.read_session(token) is not None: continue

            info_file_path = os.path.join(result_directory_path, "info.json")
            session = self.load_session_from_info_file(info_file_path)
            if session is None: continue
            browser = session.browser
            print("Loading {} {} results ...".format(browser["name"], browser["version"]))

            results = self.load_result(result_directory_path)

            self._sessions_manager.add_session(session)
            for result in results:
                self._database.create_result(token, result)

    def load_result(self, result_directory_path):
        all_results = []

        apis = os.listdir(result_directory_path)

        for api in apis:
            api_path = os.path.join(result_directory_path, api)
            if not os.path.isdir(api_path): continue
            files = os.listdir(api_path)
            results_file_path = ""
            for file in files:
                if re.match(r"\w\w\d{1,3}\.json", file) is None: continue
                results_file_path = os.path.join(api_path, file)
                break
            file = open(results_file_path, "r")
            data = file.read()
            file.close()
            parsed_data = json.loads(data)
            all_results = all_results + parsed_data["results"]
        return all_results

    def load_session_from_info_file(self, info_file_path):
        if not os.path.isfile(info_file_path): return None

        info_file = open(info_file_path, "r")
        data = info_file.read()
        info_file.close()
        info = json.loads(unicode(data))
        return deserialize_session(info)

    def import_results(self, blob):
        if not self.is_import_enabled: raise PermissionDeniedError()
        tmp_file_name = "{}.zip".format(unicode(time.time()))
        file = open(tmp_file_name, "w")
        file.write(blob)
        file.close()
        zip = zipfile.ZipFile(tmp_file_name)
        if "info.json" not in zip.namelist(): raise InvalidDataException("Invalid session ZIP!")
        zipped_info = zip.open("info.json")
        info = zipped_info.read()
        zipped_info.close()
        parsed_info = json.loads(info)
        token = parsed_info["token"]
        session = self._sessions_manager.read_session(token)
        if session is not None: raise DuplicateException("Session already exists!")
        destination_path = os.path.join(self._results_directory_path, token)
        os.makedirs(destination_path)
        zip.extractall(destination_path)
        self.remove_tmp_files()
        self.load_results()
        return token

    def remove_tmp_files(self):
        files = os.listdir(".")

        for file in files:
            if re.match(r"\d{10}\.\d{2}\.zip", file) is None: continue
            os.remove(file)
