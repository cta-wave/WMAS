import sys
import os
import zipfile
import requests

START = "start"
DOWNLOAD_REFERENCE_BROWSERS = "download-reference-results"

REFERENCE_BROWSERS = {}


def main():
    parameters = get_run_parameters()
    configuration_file_path = None
    if "configuration_file_path" in parameters:
        configuration_file_path = parameters["configuration_file_path"]

    if parameters["operation"] == DOWNLOAD_REFERENCE_BROWSERS:
        download_reference_browsers()


def get_run_parameters():
    arguments = sys.argv
    parameters = {}

    operation = arguments[1].lower()

    if operation != START and operation != DOWNLOAD_REFERENCE_BROWSERS:
        raise Exception("Unknown operation {}".format(operation))

    parameters["operation"] = operation

    iterator = iter(arguments)
    next(iterator)
    next(iterator)
    for argument in iterator:
        if argument.lower() == "--config":
            path = next(iterator)
            if not path.startswith("/"):
                path = os.path.join(os.getcwd(), path)
            parameters["configuration_file_path"] = path
            continue

        raise Exception("Unknown option {}".format(argument))

    if "configuration_file_path" not in parameters:
        parameters["configuration_file_path"] = os.path.join(os.getcwd(), "config.json")

    return parameters


def download_file(url, file_path):
    response = requests.get(url)
    with open(file_path, "wb") as file:
        file.write(response.content)


def printt(text):
    sys.stdout.write(text)
    sys.stdout.flush()


def download_reference_browsers():
    result_directory = os.path.abspath("./results")

    if not os.path.isdir(result_directory):
        os.mkdir(result_directory)

    for id in REFERENCE_BROWSERS:
        browser = REFERENCE_BROWSERS[id]
        browser["zip"] = browser["url"].split("/")[-1]
        printt("Downloading {} results ...".format(browser["name"]))
        download_file(browser["url"], os.path.join(result_directory, browser["zip"]))
        print(" done.")

    for id in REFERENCE_BROWSERS:
        browser = REFERENCE_BROWSERS[id]
        printt("Extracting {} results ...".format(browser["name"]))
        zip_file = zipfile.ZipFile(os.path.join(result_directory, browser["zip"]))
        zip_file.extractall(result_directory)
        print(" done.")

    print("Cleaning ...")
    for id in REFERENCE_BROWSERS:
        browser = REFERENCE_BROWSERS[id]
        os.remove(os.path.join(result_directory, browser["zip"]))


main()
