# Flag tests as malfunctioning in sessions - [WAVE Test Suite](../README.md)

When running test sessions some tests may cause the execution of tests to stop, for example when a test causes the DUT to crash. To avoid these tests to interrupt the test execution in future sessions, they can be added to the list of malfunctioning tests. When configuring new sessions, tests from the list of malfunctioning tests of a previous session can be added to the exclude list.  
Tests can be added to the list of malfunctioning using the web interface or the REST API.

## Contents

## 1. Using the web interface

In the results view of the session for which to add malfunctioning tests, there is a section called "Last Timed-Out Test Files".

![last_timed_out]

The last five tests are listed here, that received a result with status TIMEOUT, with the test at the top being the most recent one. Here you cann add the test to the list of malfunctioning tests by clicking on the button with the + symbol.  
Now that test appears in the list of malfunctioning tests at the very bottom of the result page.

![malfunctioning_list]

In the section "Malfunctioning Tests" you can see a list of test that have been tagged as not executing correctly in this session. By clicking on the button with the trash can icon, you can remove tests from the list.

[last_timed_out]: ../res/results_page_last_timed_out.jpg "Last Timed-Out Test Files"
[malfunctioning_list]: ../res/results_page_malfunctioning_list.jpg "Malfunctioning Tests"

## 2. Using the REST API

You can read the tests tagged as malfunctioning for a given session using the [read malfunctioning](../rest-api/tests-api/read-malfunctioning.md) method of the [tests API](../rest-api/README.md#tests-api). To update the list, use the [update malfunctioning](../rest-api/tests-api/update-malfunctioning.md) method.
