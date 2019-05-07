try {
  var documentRoot = document.body ? document.body : document.documentElement;
  documentRoot.style["background-color"] = "#FFF";
  window.open = function() {
    logToConsole(
      "window.open() is overridden in testharnessreport.js and has not effect"
    );
    var dummyWin = {
      close: function() {
        logToConsole(
          "dummyWindow.close() in testharnessreport.js and has not effect"
        );
      }
    };
    return dummyWin;
  };
  window.close = function() {
    logToConsole(
      "window.close() is overridden in testharnessreport.js and has not effect"
    );
  };
} catch (err) {}

/* global add_completion_callback */
/* global setup */

/*
 * This file is intended for vendors to implement code needed to integrate
 * testharness.js tests with their own test systems.
 *
 * Typically test system integration will attach callbacks when each test has
 * run, using add_result_callback(callback(test)), or when the whole test file
 * has completed, using
 * add_completion_callback(callback(tests, harness_status)).
 *
 * For more documentation about the callback functions and the
 * parameters they are called with see testharness.js
 */

var __WAVE__HOSTNAME = location.hostname;
var __WAVE__PORT = location.port;
var __WAVE__PROTOCOL = location.protocol.replace(/:/, "");
var __WAVE__QUERY = location.search;
if (!__WAVE__QUERY) __WAVE__QUERY = "?";
var match = __WAVE__QUERY.match(/timeout=(\d+)&/);
var __WAVE__TIMEOUT = parseInt(match && match[1] ? match[1] : 65000);
match = __WAVE__QUERY.match(/token=([^&]+)/);
var __WAVE__TOKEN = match ? match[1] : null;
console.log("TOKEN", __WAVE__TOKEN);
var __WAVE__TEST = location.pathname;
console.log("TEST", __WAVE__TEST);
var nextUrl = null;
var resultSent = false;

setTimeout(function() {
  loadNext();
}, __WAVE__TIMEOUT);

function logToConsole() {
  var text = "";
  for (var i = 0; i < arguments.length; i++) {
    text += arguments[i] + " ";
  }
  if (console && console.log) {
    console.log(text);
  }
  var screenConsole = document.getElementById("console");
  if (screenConsole) {
    screenConsole.innerText += text + "\n";
  }
}

function dump_test_results(tests, status) {
    var results_element = document.createElement("script");
    results_element.type = "text/json";
    results_element.id = "__testharness__results__";
    var test_results = tests.map(function(x) {
        return {name:x.name, status:x.status, message:x.message, stack:x.stack}
    });
    var data = {test:window.location.href,
                tests:test_results,
                status: status.status,
                message: status.message,
                stack: status.stack};
    results_element.textContent = JSON.stringify(data);

    // To avoid a HierarchyRequestError with XML documents, ensure that 'results_element'
    // is inserted at a location that results in a valid document.
    var parent = document.body
        ? document.body                 // <body> is required in XHTML documents
        : document.documentElement;     // fallback for optional <body> in HTML5, SVG, etc.

    parent.appendChild(results_element);

  var screenConsole = document.createElement("div");
  screenConsole.setAttribute("id", "console");
  screenConsole.setAttribute("style", "font-family: monospace; padding: 5px");
  parent.appendChild(screenConsole);
  window.onerror = logToConsole;

  finishWptTest(data);
}

add_completion_callback(dump_test_results);

function getURL(uri) {
  var url = __WAVE__PROTOCOL + "://";
  url += __WAVE__HOSTNAME + ":" + __WAVE__PORT;
  url += "/nodejs" + uri + __WAVE__QUERY;
  url += "&hostname=" + __WAVE__HOSTNAME;
  return url;
}

function sendRequest(method, uri, data, headers, callback, onerror) {
  var url = getURL(uri);
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", function() {
    callback(xhr.response);
  });
  xhr.addEventListener("error", function(error) {
    logToConsole(
      'Could not connect to "' + url + '":\n' + JSON.stringify(error)
    );
    onerror(error);
  });
  logToConsole("Sending", method, 'request to "' + url + '"');
  xhr.open(method, url, true);
  if (headers) {
    for (var header in headers) {
      xhr.setRequestHeader(header, headers[header]);
    }
  }
  xhr.setRequestHeader("Token", __WAVE__TOKEN);
  xhr.setRequestHeader("Test", __WAVE__TEST);
  xhr.send(data);
}

function loadNext() {
  if (!nextUrl) {
    logToConsole("Requesting next url ...");
    sendRequest(
      "GET",
      "/next",
      null,
      null,
      function(response) {
        nextUrl = response;
        logToConsole('Received url "' + nextUrl + '"');
        if (nextUrl && __WAVE__TOKEN) {
          logToConsole("Redirecting ...");
          location.href = nextUrl;
        }
      },
      function() {
        logToConsole("Connection failed, retrying ...");
        location.href = getURL("/next") + "&redirect=1";
      }
    );
  } else {
    location.href = nextUrl;
  }
}

function finishWptTest(data) {
  if (resultSent) {
    loadNext();
  } else {
    logToConsole("Sending test results ...");
    sendRequest(
      "POST",
      "/results",
      JSON.stringify(data),
      {
        "Content-Type": "application/json"
      },
      function() {
        resultSent = true;
        loadNext();
      },
      function() {
        logToConsole("Connection failed, retrying ...");
        location.href =
          getURL("/results") + "&data=" + encodeURI(JSON.stringify(data));
      }
    );
  }
}

/* If the parent window has a testharness_properties object,
 * we use this to provide the test settings. This is used by the
 * default in-browser runner to configure the timeout and the
 * rendering of results
 */
try {
    if (window.opener && "testharness_properties" in window.opener) {
        /* If we pass the testharness_properties object as-is here without
         * JSON stringifying and reparsing it, IE fails & emits the message
         * "Could not complete the operation due to error 80700019".
         */
        setup(JSON.parse(JSON.stringify(window.opener.testharness_properties)));
    }
} catch (e) {
}
// vim: set expandtab shiftwidth=4 tabstop=4:
