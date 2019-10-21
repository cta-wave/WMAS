# Resuming Sessions - [WAVE Test Suite](../README.md)

Certain test cases may cause some devices to crash, which makes the test suite unable to automatically run the next test. In this case, external interaction is necessary. To alleviate the process of resuming the test session, the are two mechanisms integrated into the web interface that reduce interaction with the device to a minimum. There is also a mechanism that can be useful if a test framework with access to the tested browser is utilized.

## Contents

1. [Using the web interface](#web-interface)
2. [Using a URL](#url)

## 1. Using the web interface <a name="web-interface"></a>

In any case, it is necessary to open the landing page on the device, in order to resume the session.

![Landing Page][landing_page]

On the landing page, in the section "Resume running session", you can see the token of the last session this device has run. To resume this particular session, click on the "Resume" button next to it, or simply press enter or space. If the presented token is not the one of the session you want to resume, you can change it from the configuration screen. To get there, press the "Configure Session" button or scan the QR-Code.

![Configuration Page][configuration_page]

At the very bottom of the configuration page, there is a section called "Resume session", where you can see the token that was previously displayed on the landing page in a text box. Here you can change the token of the session to resume, just enter the first eight characters or more of the token. When you're done, press the "Resume" button. Note that it is necessary to keep the landing page open in order to automatically run the next test, as it is loaded in the same window.

[landing_page]: ../res/landing_page.jpg "Landing Page"
[configuration_page]: ../res/configuration_page_bottom.jpg "Configuration Page"

## 2. Using a URL <a name="url"></a>

If you have access to the DUTs browser programmatically, you may want to resume a crashed test session automatically. To load the next test of a specific session, simply open the following URL: 

`/next.html?token=<session_token>`

For example:

`/next.html?token=24fcd360-ef4d-11e9-a95f-d6e1ad4c5fdb`
