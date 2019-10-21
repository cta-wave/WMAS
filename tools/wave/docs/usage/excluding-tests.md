# Excluding Tests - [WAVE Test Suite](../README.md)

To have a fine control over what test cases are executed when configuring a session, it is possible to provide a list of test cases, that are omitted in the run. This list of tests can be specified using the web interface or the [REST API](../rest-api/sessions-api/create.md).

## Contents
1. [Using the web interface](#web-interface)
   1. [Manually specify tests to exclude](#add-raw)
   2. [Use a session's malfunctioning list to add tests to exclude](#add-malfunctioning)
   3. [Use a previous session's exclude list to add tests to exclude](#add-prev-exclude)
2. [Using the REST API](#rest-api)

## 1. Using the web interface <a name="web-interface"></a>

To set the list of excluded test using the web interface, open the configuration page to configure a new session. You can access the configuration page from the landing page.

![Landing Page][landing_page]

To open the configuration page, click on the "Configure Session" button, or scan the QR-Code.

![Configuration Page][configuration_page]

On the configuration page, there is the option "Excluded Tests" where you can add tests to exclude in the session in three ways.

### 1.1 Manually specify tests to exclude <a name="add-raw"></a>

To add tests to exclude by providing a plain text list, click on "Add Raw" in the "Excluded Tests" setting. This opens a input field, where you can enter multiple full paths to test files or directories.

![Exclude List Add Raw][configuration_page_add_raw]

Each line will be interpreted as a path to exclude a single or a group of tests. All tests that have a path starting with one of the provided, will be excluded in the session. Lines starting with a # symbol will be ignored, in case you want to organize test paths in a text file using comments. Click "Add" and you will see the paths listed in the table below.

### 1.2 Use a session's malfunctioning list to add tests to exclude <a name="add-malfunctioning"></a>

When flagging tests in a running session as malfunctioning, e.g. when crashing the device, it is possible to add these test to the exclude list of the new session. To do this, click on "Add Malfunctioning" in the "Excluded Tests" section.

![Exclude List Add Malfunctioning][configuration_page_add_malfunctioning]

Enter the first eight characters or more into the text field labelled "Session Token" to import all tests from the session's malfunctioning list into the new session's exclude list. Click "Add" to confirm. The tests should now appear in the list below.

### 1.3 Use a previous session's exclude list to add tests to exclude <a name="add-prev-exclude"></a>

If you have already specified a suitable exclude list or want to expand an existing, you can apply the exclude list of a previous session. Click on "Add Previous Excluded" in the "Excluded Tests" section to open the corresponding controls.

![Exclude List Add Previously Excluded][configuration_page_add_prev_excluded]

Enter the first eight characters or more into the text field labelled "Session Token" to import all tests from the previous session's exclude list into the new session's exclude list. Click "Add" to confirm. The tests should now appear in the list below.

[landing_page]: ../res/landing_page.jpg "Landing Page"
[configuration_page]: ../res/configuration_page_top.jpg "Configuration Page"
[configuration_page_add_raw]: ../res/configuration_page_exclude_add_raw.jpg "Exclude Tests - Add Raw"
[configuration_page_add_malfunctioning]: ../res/configuration_page_exclude_add_malfunctioning.jpg "Exclude Tests - Add Malfunctioning"
[configuration_page_add_prev_excluded]: ../res/configuration_page_exclude_add_prev_excluded.jpg "Exclude Tests - Add Previously Excluded"

## 2. Using the REST API <a name="rest-api"></a>

An exclude list can also be specified in the payload of the [create](../rest-api/sessions-api/create.md) and [update](../rest-api/sessions-api/update.md) methods of the sessions API. To fetch the malfunctioning list of a specific session, use the corresponding [API method](../rest-api/tests-api/read-malfunctioning.md) of the tests API. To get the excluded list of a previous session, simply [fetch the configuration](../rest-api/sessions-api/read.md) using the sessions API.