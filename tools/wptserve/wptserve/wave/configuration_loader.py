import json
import os

DEFAULT_CONFIGURATION_FILE_PATH = "./tools/wave/config.default.json"


def load(configuration_file_path):
    configuration = {}
    if configuration_file_path:
        configuration = load_configuration_file(configuration_file_path)
    default_configuration = load_configuration_file(
        DEFAULT_CONFIGURATION_FILE_PATH)

    configuration["port"] = configuration.get(
        "ports", default_configuration["ports"]).get(
        "wave", default_configuration["ports"]["wave"])[0]
    configuration["wpt_port"] = configuration.get(
        "ports", default_configuration["ports"]).get(
        "http", default_configuration["ports"]["http"])[0]
    configuration["wpt_ssl_port"] = configuration.get(
        "ports", default_configuration["ports"]).get(
        "https", default_configuration["ports"]["https"])[0]

    configuration["results_directory_path"] = configuration.get(
        "results", default_configuration["results"])

    configuration["timeouts"] = {}
    configuration["timeouts"]["automatic"] = configuration.get(
        "timeouts", default_configuration["timeouts"]).get(
        "automatic", default_configuration["timeouts"]["automatic"])
    configuration["timeouts"]["manual"] = configuration.get(
        "timeouts", default_configuration["timeouts"]).get(
        "manual", default_configuration["timeouts"]["manual"])

    configuration["hostname"] = configuration.get(
        "browser_host", default_configuration["browser_host"])

    configuration["import_enabled"] = configuration.get(
        "enable_results_import", default_configuration["enable_results_import"])

    configuration["tests_directory_path"] = os.getcwd()

    configuration["manifest_file_path"] = os.path.join(
        os.getcwd(), "MANIFEST.json")

    configuration["database_directory_path"] = os.path.join(
        os.getcwd(), "tools/wave/data")

    return configuration


def load_configuration_file(path):
    if not os.path.isfile(path):
        return {}
    configuration_file = open(path, "r")
    configuration_file_content = configuration_file.read()
    configuration = json.loads(configuration_file_content)
    return configuration
