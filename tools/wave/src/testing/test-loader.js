const path = require("path");

const FileSystem = require("../utils/file-system");
const UserAgentParser = require("../utils/user-agent-parser");

// test types
const TEST_HARNESS_TESTS = "testharness";
const REF_TESTS = "reftest";
const MANUAL_TESTS = "manual";

/*
  API Status
  x = not in wma coverage list

  2dcontext               DONE
  x apng                  DONE
  content-security-policy DONE OPENS TABS
  css                     DONE
  x custom-elements       DONE
  dom                     DONE
  encrypted-media         DONE
  x eventsource           DONE
  fetch                   DONE OPENS TABS
  fullscreen              DONE
  html                    DONE OPENS TABS AND WINDOWS
  x http                  DONE
  IndexedDB               DONE
  x infrastructure        DONE
  x input-events          DONE
  x js                    DONE
  media-source            DONE
  x mediacapture-streams  DONE
  x mediasession          DONE
  x mixed-content         DONE
  notifications           DONE
  x service-workers       DONE
  uievents                DONE
  x url                   DONE OPENS TABS
  webaudio                DONE
  WebCryptoAPI            DONE
  x webgl                 DONE
  webmessaging            DONE
  websockets              DONE
  webstorage              DONE OPENS TABS AND WINDOWS
  workers                 DONE OPENS TABS
  xhr                     DONE OPENS TABS
 */

const EXCLUDED_APIS = [
  "apng",
  "custom-elements",
  "eventsource",
  "http",
  "infrastructure",
  "input-events",
  "js",
  "mediacapture-streams",
  "mediasession",
  "mixed-content",
  "url"
];

const EXCLUDED_TESTS = [
  "html/browsers/browsing-the-web/history-traversal/window-name-after-cross-origin-main-frame-navigation.sub.html", // tab with running test closes, starts new test session
  "html/browsers/browsing-the-web/history-traversal/window-name-after-same-origin-main-frame-navigation.sub.html", // tab with running test closes, starts new test session
  "html/browsers/browsing-the-web/navigating-across-documents/005.html", // navigates to href.html without testharness.js in chrome
  "html/browsers/browsing-the-web/navigating-across-documents/006.html", // navigates to href.html without testharness.js in chrome
  "html/browsers/browsing-the-web/navigating-across-documents/007.html", // navigates to href.html without testharness.js in chrome
  "html/browsers/browsing-the-web/navigating-across-documents/008.html", // form action javascript url loads empty page in chrome
  "html/browsers/browsing-the-web/navigating-across-documents/009.html", // form action javascript url loads empty page in chrome
  "html/browsers/browsing-the-web/navigating-across-documents/010.html", // form action javascript url loads empty page in chrome
  "html/browsers/browsing-the-web/navigating-across-documents/011.html", // navigates to href.html without testharness.js in chrome
  "html/browsers/browsing-the-web/navigating-across-documents/012.html", // navigates to href.html without testharness.js in chrome
  "html/semantics/scripting-1/the-script-element/module/dynamic-import/string-compilation-integrity-classic.html", // test script hash is different
  "html/semantics/scripting-1/the-script-element/module/dynamic-import/string-compilation-integrity-module.html", // test script hash is different
  "html/dom/dynamic-markup-insertion/document-write/047.html", // NS_ERROR_FAILURE under FF
  "html/dom/dynamic-markup-insertion/document-write/048.html", // NS_ERROR_FAILURE under FF
  "xhr/access-control-preflight-credential-async.htm", // Basic Auth
  "xhr/access-control-preflight-credential-sync.htm", // Basic Auth
  //  'content-security-policy/script-src/script-src-strict_dynamic_worker-importScripts.https.html',

  // safari & edge
  "content-security-policy/worker-src/dedicated-worker-src-child-fallback.sub.html", // safari, edge timeout, result in get request with query does not work: 404
  "content-security-policy/worker-src/dedicated-worker-src-script-fallback.sub.html", // safari, edge timeout, result in get request with query does not work: 404
  "content-security-policy/worker-src/dedicated-worker-src-self-fallback.sub.html", // safari, edge timeout, result in get request with query does not work: 404
  "content-security-policy/worker-src/shared-worker-src-child-fallback.sub.html", // safari, edge timeout, result in get request with query does not work: 404
  "content-security-policy/worker-src/shared-worker-src-script-fallback.sub.html", // safari, edge timeout, result in get request with query does not work: 404
  "content-security-policy/worker-src/shared-worker-src-self-fallback.sub.html", // safari, edge timeout, result in get request with query does not work: 404
  "content-security-policy/worker-src/service-worker-src-child-fallback.https.sub.html", // safari, edge timeout, result in get request with query does not work: 404
  "content-security-policy/worker-src/service-worker-src-script-fallback.https.sub.html", // safari, edge timeout, result in get request with query does not work: 404
  "content-security-policy/worker-src/service-worker-src-self-fallback.https.sub.html", // safari, edge timeout, result in get request with query does not work: 404
  "content-security-policy/style-src/style-src-hash-default-src-allowed.html", // safari, edge timeout, result in get request with query does not work: 404
  "css/css-color/color-resolving-hsl.html", // safari, edge timeout, result in get request with query does not work: 404
  "dom/ranges/Range-compareBoundaryPoints.html", // safari, edge timeout, result as query request failed?
  "dom/ranges/Range-set.html", // safari, edge timeout, result as query request failed?
  "fetch/api/policies/csp-blocked.html", // safari, edge timeout, strange redirect to results directory
  "html/semantics/embedded-content/the-iframe-element/iframe_sandbox_block_modals-1.html", // safari, edge timeout, opens modal browser dialog
  "html/semantics/embedded-content/the-iframe-element/iframe_sandbox_block_modals-2.html", // safari, edge timeout, opens modal browser dialog
  "html/semantics/embedded-content/the-iframe-element/iframe_sandbox_block_modals-3.html", // safari, edge timeout, opens modal browser dialog
  "html/semantics/embedded-content/the-iframe-element/iframe_sandbox_block_modals-4.html", // safari, edge timeout, opens modal browser dialog

  // safari
  "content-security-policy/script-src/script-src-multiple-policies-one-using-hashing-algorithms.html", // safari timeout
  "fetch/security/redirect-to-url-with-credentials.https.html", // safari timeout, redirect to page w/o testharnessreport.js
  "html/browsers/browsing-the-web/unloading-documents/beforeunload-canceling.html", // safari, opens modal browser dialog asking whether to leave page
  "html/browsers/the-window-object/security-window/window-security.https.html", // safari, redirects to directory listing
  "html/dom/dynamic-markup-insertion/opening-the-input-stream/010.html", // safari timeout, no error, it just stops
  "html/dom/interfaces.https.html", // safari timeout, result as query request failed?
  "html/semantics/scripting-1/the-script-element/module/choice-of-error-2.html", // safari browser crash
  "html/semantics/scripting-1/the-script-element/module/instantiation-error-1.html", // safari browser crash
  "html/semantics/scripting-1/the-script-element/module/instantiation-error-2.html", // safari browser crash
  "html/semantics/scripting-1/the-script-element/module/instantiation-error-3.html", // safari browser crash
  "html/webappapis/scripting/events/body-exposed-window-event-handlers.html", // safari timeout, opens modal browser dialog
  "html/webappapis/scripting/events/body-onload.html", // safari timeout, opens modal browser dialog
  "webstorage/storage_session_setitem_quotaexceedederr.html", // safari timeout, page cannot be loaded
  "workers/SharedWorker_dataUrl.html", // safari timeout, empty https page?

  // edge
  "content-security-policy/nonce-hiding/script-nonces-hidden.tentative.html", // edge timeout
  "content-security-policy/nonce-hiding/svgscript-nonces-hidden.tentative.html", // edge timeout
  "content-security-policy/script-src/javascript-window-open-blocked.html", // edge timeout
  "content-security-policy/script-src/nonce-enforce-blocked.html", // edge timeout
  "content-security-policy/script-src/script-src-multiple-policies-multiple-hashing-algorithms.html", // edge timeout
  "content-security-policy/script-src/script-src-multiple-policies-one-using-hashing-algorithms.html", // edge timeout
  "content-security-policy/script-src/script-src-report-only-policy-works-with-external-hash-policy.html", // edge timeout
  "content-security-policy/script-src/script-src-report-only-policy-works-with-hash-policy.html", // edge timeout
  "content-security-policy/script-src/script-src-sri_hash.sub.html", // edge timeout
  "content-security-policy/script-src/script-src-strict_dynamic_and_unsafe_eval_eval.html", // edge timeout
  "content-security-policy/script-src/script-src-strict_dynamic_and_unsafe_eval_new_function.html", // edge timeout
  "content-security-policy/script-src/script-src-strict_dynamic_double_policy_different_nonce.html", // edge timeout
  "content-security-policy/script-src/script-src-strict_dynamic_double_policy_honor_whitelist.sub.html", // edge timeout
  "content-security-policy/script-src/script-src-strict_dynamic_double_policy_report_only.html", // edge timeout
  "content-security-policy/script-src/script-src-strict_dynamic_eval.html", // edge timeout
  "content-security-policy/script-src/script-src-strict_dynamic_hashes.html", // edge timeout
  "content-security-policy/script-src/script-src-strict_dynamic_javascript_uri.html", // edge timeout
  "content-security-policy/script-src/script-src-strict_dynamic_meta_tag.html", // edge timeout
  "content-security-policy/script-src/script-src-strict_dynamic_new_function.html", // edge timeout
  "content-security-policy/script-src/script-src-strict_dynamic_non_parser_inserted.html", // edge timeout
  "content-security-policy/script-src/script-src-strict_dynamic_non_parser_inserted_incorrect_nonce.html", // edge timeout
  "content-security-policy/script-src/script-src-strict_dynamic_parser_inserted.html", // edge timeout
  "content-security-policy/script-src/script-src-strict_dynamic_parser_inserted_correct_nonce.html", // edge timeout
  "content-security-policy/securitypolicyviolation/blockeduri-inline.html", // edge timeout
  "content-security-policy/securitypolicyviolation/script-sample-no-opt-in.html", // edge timeout
  "content-security-policy/securitypolicyviolation/script-sample.html", // edge timeout
  "content-security-policy/securitypolicyviolation/targeting.html", // edge timeout
  "content-security-policy/unsafe-hashed-attributes/script_event_handlers_allowed.html", // edge timeout
  "content-security-policy/unsafe-hashed-attributes/script_event_handlers_denied_matching_hash_no_unsafe_inline_attribute.html", // edge timeout
  "content-security-policy/unsafe-hashed-attributes/script_event_handlers_denied_not_matching_hash.html", // edge timeout
  "css/css-grid/grid-definition/grid-inline-support-flexible-lengths-001.html", // edge timeout, cannot load page at all
  "css/css-grid/grid-definition/grid-support-flexible-lengths-001.html", // edge timeout, cannot load page at all
  "dom/ranges/Range-comparePoint.html", // edge timeout, result in get request with query does not work: 404
  "dom/ranges/Range-intersectsNode.html", // edge timeout, result in get request with query does not work: 404
  "html/browsers/windows/targeting-cross-origin-nested-browsing-contexts.html", // edge timeout, page is not responding
  "html/dom/dynamic-markup-insertion/opening-the-input-stream/document.open-01.xhtml", // edge timeout
  "html/dom/reflection-embedded.html", // edge timeout, result in get request with query does not work: browser load indefenitely
  "html/dom/reflection-forms.html", // edge timeout, result in get request with query does not work: browser load indefenitely
  "html/dom/reflection-grouping.html", // edge timeout, result in get request with query does not work: browser load indefenitely
  "html/dom/reflection-metadata.html", // edge timeout, result in get request with query does not work: browser load indefenitely
  "html/dom/reflection-misc.html", // edge timeout, result in get request with query does not work: browser load indefenitely
  "html/dom/reflection-obsolete.html", // edge timeout, result in get request with query does not work: browser load indefenitely
  "html/dom/reflection-sections.html", // edge timeout, result in get request with query does not work: browser load indefenitely
  "html/dom/reflection-tabular.html", // edge timeout
  "html/dom/reflection-text.html", // edge timeout, result in get request with query does not work: browser load indefenitely
  "html/dom/interfaces.https.html", // edge timeout, result in get request with query does not work: browser load indefenitely
  "html/semantics/forms/textfieldselection/selection-after-content-change.html", // edge, "page has problems loading"
  "html/semantics/forms/the-select-element/common-HTMLOptionsCollection-namedItem.html", // edge, "page has problems loading"
  "html/semantics/scripting-1/the-script-element/module/dynamic-import/propagate-nonce-external-classic.html", // edge timeout
  "html/semantics/scripting-1/the-script-element/module/dynamic-import/propagate-nonce-external-module.html", // edge timeout
  "html/semantics/scripting-1/the-script-element/module/dynamic-import/propagate-nonce-inline-classic.html", // edge timeout
  "html/semantics/scripting-1/the-script-element/module/dynamic-import/propagate-nonce-inline-module.html", // edge timeout
  "html/semantics/scripting-1/the-script-element/module/dynamic-import/string-compilation-nonce-classic.html", // edge timeout
  "html/semantics/scripting-1/the-script-element/module/dynamic-import/string-compilation-nonce-module.html", // edge timeout
  "html/semantics/scripting-1/the-script-element/module/instantiation-error-5.html", // edge, "page has problems loading"
  "WebCryptoAPI/derive_bits_keys/test_hkdf.https.html", // edge timeout, result in get request with query does not work: 404
  "xhr/xmlhttprequest-timeout-worker-synconworker.html" // edge timeout, edge cannot load page
];



class TestLoader {
  constructor({ resultsDirectoryPath }) {
    this._resultsDirectoryPath = resultsDirectoryPath;
    this._tests = {};
    this._tests[TEST_HARNESS_TESTS] = [];
    this._tests[REF_TESTS] = [];
    this._tests[MANUAL_TESTS] = [];
  }

  _getFilePath({ userAgent, api, token }) {
    const apiDirectory = path.join(this._resultsDirectoryPath, token, api);
    return path.join(apiDirectory, this._getFileName(userAgent));
  }

  _getFileName(userAgent) {
    const {
      browser: { name, version }
    } = UserAgentParser.parse(userAgent);
    const abbreviation = UserAgentParser.abbreviateBrowserName(name);
    return abbreviation + version + ".json";
  }

  async loadTests(manifestPath) {
    const manifest = JSON.parse(await FileSystem.readFile(manifestPath));
    let tests = manifest.items;
    if (tests.hasOwnProperty(TEST_HARNESS_TESTS)) {
      this._tests[TEST_HARNESS_TESTS] = this._loadTests(
        tests[TEST_HARNESS_TESTS]
      );
    }
    if (tests.hasOwnProperty(REF_TESTS)) {
      this._tests[REF_TESTS] = this._loadTests(tests[REF_TESTS]);
    }
    if (tests.hasOwnProperty(MANUAL_TESTS)) {
      this._tests[MANUAL_TESTS] = this._loadTests(tests[MANUAL_TESTS]);
    }
  }

  _loadTests(testPaths) {
    const tests = {};
    for (let testPath in testPaths) {
      if (this._isValidTest(testPath)) {
        if (testPath.startsWith("/")) testPath = testPath.substr(1);
        const apiName = this._getApiName(testPath);
        if (!tests[apiName]) tests[apiName] = [];
        tests[apiName].push(testPath);
      }
    }
    return tests;
  }

  _isValidTest(testPath) {
    return (
      !testPath.endsWith(".js") &&
      !EXCLUDED_TESTS.some(excludedTest => testPath === excludedTest) &&
      !EXCLUDED_APIS.map(api => new RegExp("^" + api, "i")).some(regExp =>
        regExp.test(testPath)
      )
    );
  }

  _getApiName(testPath) {
    return testPath.split("/")[0];
  }

  async _getRefResults({ token, userAgent, api }) {
    const readApiResults = async ({ userAgent, token, api }) => {
      try {
        const file = await FileSystem.readFile(
          this._getFilePath({ token, userAgent, api })
        );
        return JSON.parse(file).results;
      } catch (e) {
        console.error("warn: could not read json result file:", e);
        return [];
      }
    };

    if (!api || api === "/") {
      const apis = await FileSystem.readDirectory(
        path.join(this._resultsDirectoryPath, token)
      );
      const results = await Promise.all(
        apis.map(async api => readApiResults({ userAgent, token, api }))
      );
      return results.reduce(
        (accumulator, current) => accumulator.concat(current),
        []
      );
    }
    return await readApiResults({ userAgent, token, api });
  }

  async getTests({ types, path, refSessions }) {
    let tests = {};

    let paths = path.split(/, ?/);
    await Promise.all(
      paths.map(async path => {
        let regex = null;
        if (path.startsWith("/")) {
          path = path.substr(1);
          regex = new RegExp("^" + path, "i");
        } else {
          regex = new RegExp(path, "i");
        }

        for (let type of types) {
          let refResults = await Promise.all(
            refSessions.map(async session => {
              return await this._getRefResults({
                userAgent: session.getUserAgent(),
                token: session.getToken(),
                api: path
              });
            })
          );

          // console.log(refResults)
          // web-platform.test:8050/?path=/2dcontext,/css,/content-security-policy,/dom,/ecmascript,/encrypted-media,/fetch,/fullscreen,/html,/IndexedDB,/media-source,/notifications,/uievents,/WebCryptoAPI,/webaudio,/webmessaging,/websockets,/webstorage,/workers,/xhr&reftoken=01d11810-7938-11e8-8749-a6ac1d216fc7,a831a820-7855-11e8-9ce0-d6175576bb4b,c0cdb6c0-7b99-11e8-939a-90ffd3c0ec6f,ce4aec10-7855-11e8-b81b-6714c602f007
          for (let api in this._tests[type]) {
            for (let testPath of this._tests[type][api]) {
              if (!regex.test(testPath)) continue;
              if (!tests[api]) tests[api] = [];

              // filter out test files that didn't pass in the reference results
              if (
                refResults.some(refResult => {
                  let refTest = refResult.find(
                    result => result.test === "/" + testPath
                  );
                  if (!refTest) return false;
                  let hasSubFailed = true; // assuming sub test failed
                  if (refTest.subtests.length) {
                    hasSubFailed = refTest.subtests.some(
                      sub => !(sub.status === "PASS")
                    ); // until its proven wrong
                  }
                  return hasSubFailed;
                })
              )
                continue;

              tests[api].push(testPath);
            }
          }
        }
      })
    );

    for (let api in tests) {
      tests[api] = tests[api].sort((testA, testB) =>
        testA.toLowerCase() > testB.toLowerCase() ? 1 : -1
      );
    }

    return tests;
  }
}

TestLoader.TEST_HARNESS_TESTS = TEST_HARNESS_TESTS;
TestLoader.REF_TESTS = REF_TESTS;
TestLoader.MANUAL_TESTS = MANUAL_TESTS;

module.exports = TestLoader;
