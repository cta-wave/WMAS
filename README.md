The Web Media API Test Suite 2018
========================================

The Web Media API Snapshot Test Suite 2018 (WMATS2018) is a test suite for 
the [Web Media API Snapshot 2018](https://w3c.github.io/webmediaapi/) specification.
The test suite and specification are being developed as part of
the [CTA WAVE Project](http://cta.tech/WAVE).

This project is forked from
[W3C Web Platform Tests](https://github.com/web-platform-tests/wpt) and is customized
to automate test rusn on web browsers for embedded devices and appliances suchs as TV sets,
set-top boxes, consoles, etc.

A hosted version is available at: https://webapitests2018.ctawave.org


Test server
===========
The introduction of a test server enables running the tests in a single window
(for compatibility with embedded devices).

## Setup

Requirements:

* Python 2.7+ (but not Python 3.x)
* Node.js 8.x.x (LTS recommended)
* Git 2.4+ (should support sparse checkout)
* Bash script support (on windows we recommend Git BASH)

Generate hosts file:
```
$ ./wpt make-hosts-file | sudo tee -a /etc/hosts
```
on Windows:
```
$ python wpt make-hosts-file | Out-File %SystemRoot%\System32\drivers\etc\hosts -Encoding ascii -Append
```

Initialize WAVE Server:
```
$ ./wave init
```

Generate test subset, call from WPT root directory:
```
$ ./wmats2018-subset.sh
```
[]([url](url))
To run passing subsets of the reference browser, download the test results by running:
```
$ ./wave download-reference-results
```

Start WAVE Server:
```
$ ./wave start
```

Start Web Platform Test runner:
```
$ ./wpt serve
```

Open in Web browser (on the same host):
```
http://web-platform.test:8050
```

## Configuration
The default configuration is loaded from the ```config.default.json```
in the root directory. Configurations from the ```config.json```
in the same format as the ```config.default.json```override those.

Provide a different location with ```--config < path_to_config >``` as a
start parameter.

## Test Run Parameters
It is possible to parameterize a test run with various query parameters
provided with the query in the url of the initial request.

Example:
```
web-platform.test:8050/?path=/2dcontext&types=testharness
```

### Query Parameters
Parameter|Description|Example
------|------|------
`path`|Specify tests to run. Can be directory or file. Multiple paths can be chained by using `, `. Paths with leading '/' are interpreted as absolute paths, paths without as regular expressions. (Default: ```/```)|```web-platform.test:8050/?path=/2dcontext```
types|What types of tests to run. Possible types: ```testharness```, ```manual``` and ```reftest``` (Default: ```testharness```)|```web-platform.test:8050/?types=testharness,manual```
`timeout`|Specify a server side timeout in ms after which a test with no result is timed out|```web-platform.test:8050/?timeout=65000```
`token` and `resume` |Providing a token of an unfinished session will resume it.|```web-platform.test:8050/?token=2fb0fb80-63db-4425-8a76-2ea3e6f8269d&resume=1```

Certificates
============

By default pregenerated certificates for the web-platform.test domain
are provided in [`tools/certs`](tools/certs). If you wish to generate new
certificates for any reason it's possible to use OpenSSL when starting
the server, or starting a test run, by providing the
`--ssl-type=openssl` argument to the `wpt serve` or `wpt run`
commands.

If you installed OpenSSL in such a way that running `openssl` at a
command line doesn't work, you also need to adjust the path to the
OpenSSL binary. This can be done by adding a section to `config.json`
like:

```
"ssl": {"openssl": {"binary": "/path/to/openssl"}}
```

### Trusting Root CA

To prevent browser SSL warnings when running HTTPS tests locally, the
web-platform-tests Root CA file `cacert.pem` in [tools/certs](tools/certs)
must be added as a trusted certificate in your OS/browser.

Remarks to testharness.js Statuses
==================================

The documentation of testharness.js is available in [testharness.js API](https://web-platform-tests.org/writing-tests/testharness-api.html). Section [Basic Usage](https://web-platform-tests.org/writing-tests/testharness-api.html#basic-usage) says that every single test has as result `PASS`, `FAIL`, `TIMEOUT` and `NOTRUN`. These statuses are also listed in [Callback API](https://web-platform-tests.org/writing-tests/testharness-api.html#callback-api) section. According to [testharness.js#L1469](https://github.com/web-platform-tests/wpt/blob/eed07b8c0de42c2e42432febae2cd31a61a3d2b1/resources/testharness.js#L1469), the status of a single test will be initialized with `NOTRUN` and later set to one of the other values. This means if `TIMEOUT` is disabled (using `explicit_timeout` function described in [Setup](https://web-platform-tests.org/writing-tests/testharness-api.html#setup) section) and the test is not completed (neither `PASS` or `FAIL`), the status will remain `NOTRUN`. This is the interpretation after reading the source code of the testharness.js since there is no explanation in the documentation for the semantic of status `NOTRUN`. 

A test file may contain multiple tests and there is also an overall status for the test file which can be one of the following values: `OK`, `ERROR` and `TIMEOUT`. There is no further explanation for each of these statuses but from reading the code, the `ERROR` status will be set if an [unexpected exception occurred (try catch block)](https://github.com/web-platform-tests/wpt/blob/eed07b8c0de42c2e42432febae2cd31a61a3d2b1/resources/testharness.js#L2107-L2113), [abort() function](https://github.com/web-platform-tests/wpt/blob/eed07b8c0de42c2e42432febae2cd31a61a3d2b1/resources/testharness.js#L2294) is called, [timeout occurs when test in cleanup phase](https://github.com/web-platform-tests/wpt/blob/eed07b8c0de42c2e42432febae2cd31a61a3d2b1/resources/testharness.js#L2167) or test file [contains tests with duplicate names](https://github.com/web-platform-tests/wpt/blob/eed07b8c0de42c2e42432febae2cd31a61a3d2b1/resources/testharness.js#L2337). The status will be [set to `OK`](https://github.com/web-platform-tests/wpt/blob/eed07b8c0de42c2e42432febae2cd31a61a3d2b1/resources/testharness.js#L2344) at the end if it is not set yet (it was `null`) which means no `TIMEOUT` or `ERROR` occurred.

PS: in test reports with comparison of multiple test sessions, the status "-" (with orange background of the table cell) means that the test was not executed on the corresponding user agent.  This can happen if a test runs only if a certain condition is fulfilled or a specific event is fired.