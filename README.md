# The Web Media API Test Suite

The Web Media API Snapshot Test Suite (WMATS) is a test suite for
the [Web Media API Snapshot](https://www.w3.org/webmediaapi.html) specification.
The test suite and specification are being developed as part of
the [CTA WAVE Project](http://cta.tech/WAVE).

This project is forked from
[W3C Web Platform Tests](https://github.com/web-platform-tests/wpt) and is customized
to automate test runs on web browsers for embedded devices and appliances suchs as TV sets,
set-top boxes, consoles, etc.

This repository contains source code and tests of all WMAS Test Runner versions. See the table below for an overview of all important links for each version.

| version   | spec                                                | source branch                                          | docker deploy                                                 | tests branch                                                 | docs                                                                   |
| --------- | --------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------- |
| WMAS 2021 | [link](https://www.w3.org/2021/12/webmediaapi.html) | [link](https://github.com/cta-wave/WMAS/tree/wmas2021) | [link](https://github.com/cta-wave/WMAS-deploy/tree/wmas2021) | N/A | [link](https://github.com/cta-wave/WMAS/tree/wmas2021/tools/wave/docs) |
| WMAS 2020 | [link](https://www.w3.org/2020/12/webmediaapi.html) | [link](https://github.com/cta-wave/WMAS/tree/wmas2020) | [link](https://github.com/cta-wave/WMAS-deploy/tree/wmas2020) | [link](https://github.com/cta-wave/WMAS/tree/wmas2020-tests) | [link](https://github.com/cta-wave/WMAS/tree/wmas2020/tools/wave/docs) |
| WMAS 2019 | [link](https://www.w3.org/2019/12/webmediaapi.html) | [link](https://github.com/cta-wave/WMAS/tree/wmas2019) | [link](https://github.com/cta-wave/WMAS-deploy/tree/wmas2019) | [link](https://github.com/cta-wave/WMAS/tree/wmas2019-tests) | [link](https://github.com/cta-wave/WMAS/tree/wmas2019/tools/wave/docs) |
| WMAS 2018 | [link](https://www.w3.org/2018/12/webmediaapi.html) | [link](https://github.com/cta-wave/WMAS/tree/wmas2018) | [link](https://github.com/cta-wave/WMAS-deploy/tree/wmas2018) | [link](https://github.com/cta-wave/WMAS/tree/wmas2018-tests) | [link](https://github.com/cta-wave/WMAS/tree/wmas2018/tools/wave/docs) |
| WMAS 2017 | [link](https://www.w3.org/2017/12/webmediaapi.html) | [link](https://github.com/cta-wave/WMAS/tree/wmas2017) | n/a                                                           | [link](https://github.com/cta-wave/WMAS/tree/wmas2017-tests) | [link](https://github.com/cta-wave/WMAS/tree/wmas2017#setup)           |

# Architecture

![architecure](./wave_architecture.jpg)

The WAVE Test Runner is an extension to the WPT server, that doesn't modify the original code. It allows to run tests in a single window and lets the tester monitor it from a second device, which makes it suiteable for embedded devices. The device under test fetches individual tests from the WAVE Test Runner to execute and sends the results back via XHR. The test runner updates the internal state of the running test session and pushes the new updates to a companion page which shows the progress of the test session (it also offers other helpful features like generating test reports, exporting test results, compare test sessions, etc. through an easy to use interface). Once a Test is completed, the WAVE Test Runner sends the URL of the next test which will be opened in the same browser window. This process will be repeated until all tests are completed.

# Deployment

The test runner is easily deployable using docker. See the corresponding links in the table above.
