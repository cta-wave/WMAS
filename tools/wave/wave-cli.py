import sys
import os
import urllib.request
import zipfile

START = "start"
DOWNLOAD_REFERENCE_BROWSERS = "download-reference-results"

REFERENCE_BROWSERS = {
    "chrome": {
        "name": "Chromium 98.0.4740.0",
        "url": "https://wave-browser-snapshots.s3.us-east-2.amazonaws.com/WMAS2021/chromium-98.0.4740.0-0d52d988-b693-11ed-bd24-0242ac110002.zip"
    },
    "edge": {
        "name": "Edge 96.0.1054.57",
        "url": "https://wave-browser-snapshots.s3.us-east-2.amazonaws.com/WMAS2021/edge-96.0.1054.57-40227a4e-e2f8-11ed-86a3-0242ac110002.zip"
    },
    "firefox": {
        "name": "Firefox 91.4esr",
        "url": "https://wave-browser-snapshots.s3.us-east-2.amazonaws.com/WMAS2021/firefox-91.4esr-8cce906a-bc3a-11ed-a230-0242ac110002.zip"
    },
    "safari": {
        "name": "Safari 15.6.1",
        "url": "https://wave-browser-snapshots.s3.us-east-2.amazonaws.com/WMAS2021/safari-15.6.1-18315b3c-d91f-11ed-aad7-0242ac110002.zip"
    }
}


def main():
    parameters = get_run_parameters()
    #configuration_file_path = None
    #if ("configuration_file_path" in parameters):
    #    configuration_file_path = parameters["configuration_file_path"]

    if (parameters["operation"] == DOWNLOAD_REFERENCE_BROWSERS):
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
        if (argument.lower() == "--config"):
            path = next(iterator)
            if not path.startswith("/"):
                path = os.path.join(os.getcwd(), path)
            parameters["configuration_file_path"] = path
            continue

        raise Exception("Unknown option {}".format(argument))

    if "configuration_file_path" not in parameters:
        parameters["configuration_file_path"] = os.path.join(
            os.getcwd(), "config.json")

    return parameters


def download_file(url, file_path):
    response = urllib.request.urlopen(url)
    data = response.read()
    file = open(file_path, "wb")
    file.write(data)
    file.close()


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
        download_file(browser["url"], os.path.join(
            result_directory, browser["zip"]))
        print(" done.")

    for id in REFERENCE_BROWSERS:
        browser = REFERENCE_BROWSERS[id]
        printt("Extracting {} results ...".format(browser["name"]))
        zip_file = zipfile.ZipFile(os.path.join(
            result_directory, browser["zip"]))
        zip_file.extractall(result_directory)
        print(" done.")

    print("Cleaning ...")
    for id in REFERENCE_BROWSERS:
        browser = REFERENCE_BROWSERS[id]
        os.remove(os.path.join(
            result_directory, browser["zip"]))

main()