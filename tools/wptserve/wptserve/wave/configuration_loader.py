from __future__ import absolute_import
import json
import os
from io import open

DEFAULT_CONFIGURATION_FILE_PATH = u"./tools/wave/config.default.json"


def load(configuration_file_path):
    configuration = {}
    if configuration_file_path:
        configuration = load_configuration_file(configuration_file_path)
    default_configuration = load_configuration_file(
        DEFAULT_CONFIGURATION_FILE_PATH)

    configuration[u"port"] = configuration.get(
        u"ports", default_configuration[u"ports"]).get(
        u"wave", default_configuration[u"ports"][u"wave"])[0]
    configuration[u"wpt_port"] = configuration.get(
        u"ports", default_configuration[u"ports"]).get(
        u"http", default_configuration[u"ports"][u"http"])[0]
    configuration[u"wpt_ssl_port"] = configuration.get(
        u"ports", default_configuration[u"ports"]).get(
        u"https", default_configuration[u"ports"][u"https"])[0]

    configuration[u"results_directory_path"] = configuration.get(
        u"results", default_configuration[u"results"])

    configuration[u"timeouts"] = {}
    configuration[u"timeouts"][u"automatic"] = configuration.get(
        u"timeouts", default_configuration[u"timeouts"]).get(
        u"automatic", default_configuration[u"timeouts"][u"automatic"])
    configuration[u"timeouts"][u"manual"] = configuration.get(
        u"timeouts", default_configuration[u"timeouts"]).get(
        u"manual", default_configuration[u"timeouts"][u"manual"])

    configuration[u"hostname"] = configuration.get(
        u"browser_host", default_configuration[u"browser_host"])

    configuration[u"import_enabled"] = configuration.get(
        u"enable_results_import", default_configuration[u"enable_results_import"])

    configuration[u"tests_directory_path"] = os.getcwdu()

    configuration[u"manifest_file_path"] = os.path.join(
        os.getcwdu(), u"MANIFEST.json")

    configuration[u"database_directory_path"] = os.path.join(
        os.getcwdu(), u"tools/wave/data")

    return configuration


def load_configuration_file(path):
    if not os.path.isfile(path):
        return {}
    configuration_file = open(path, u"r")
    configuration_file_content = configuration_file.read()
    configuration = json.loads(configuration_file_content)
    return configuration
