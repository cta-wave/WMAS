var tests = [
  {
    "url": "corb/img-html-correctly-labeled.sub-expected.html",
    "checks": [
      "#corb"
    ]
  },
  {
    "url": "corb/img-html-correctly-labeled.sub.html",
    "checks": [
      "#corb"
    ]
  },
  {
    "url": "corb/img-mime-types-coverage.tentative.sub.html",
    "checks": [
      "#corb"
    ]
  },
  {
    "url": "corb/img-png-mislabeled-as-html-nosniff.tentative.sub-expected.html",
    "checks": [
      "#corb"
    ]
  },
  {
    "url": "corb/img-png-mislabeled-as-html-nosniff.tentative.sub.html",
    "checks": [
      "#corb"
    ]
  },
  {
    "url": "corb/img-png-mislabeled-as-html.sub-expected.html",
    "checks": [
      "#corb"
    ]
  },
  {
    "url": "corb/img-png-mislabeled-as-html.sub.html",
    "checks": [
      "#corb"
    ]
  },
  {
    "url": "corb/preload-image-png-mislabeled-as-html-nosniff.tentative.sub.html",
    "checks": [
      "#corb"
    ]
  },
  {
    "url": "corb/script-html-correctly-labeled.tentative.sub.html",
    "checks": [
      "#corb"
    ]
  },
  {
    "url": "corb/script-html-via-cross-origin-blob-url.sub.html",
    "checks": [
      "#corb"
    ]
  },
  {
    "url": "corb/script-js-mislabeled-as-html-nosniff.sub.html",
    "checks": [
      "#corb"
    ]
  },
  {
    "url": "corb/script-js-mislabeled-as-html.sub.html",
    "checks": [
      "#corb"
    ]
  },
  {
    "url": "corb/style-css-mislabeled-as-html-nosniff.sub.html",
    "checks": [
      "#corb"
    ]
  },
  {
    "url": "corb/style-css-mislabeled-as-html.sub.html",
    "checks": [
      "#corb"
    ]
  },
  {
    "url": "corb/style-css-with-json-parser-breaker.sub.html",
    "checks": [
      "#corb"
    ]
  },
  {
    "url": "corb/style-html-correctly-labeled.sub.html",
    "checks": [
      "#corb"
    ]
  },
  {
    "url": "http-cache/304-update.html",
    "checks": [
      "#statuses",
      "#requests",
      "#http-network-or-cache-fetch",
      "#terminology-headers"
    ]
  },
  {
    "url": "http-cache/cc-request.html",
    "checks": [
      "#terminology-headers",
      "#requests",
      "#http-network-or-cache-fetch"
    ]
  },
  {
    "url": "http-cache/freshness.html",
    "checks": [
      "#http-network-or-cache-fetch",
      "#requests",
      "#terminology-headers"
    ]
  },
  {
    "url": "http-cache/heuristic.html",
    "checks": []
  },
  {
    "url": "http-cache/invalidate.html",
    "checks": [
      "#http-network-or-cache-fetch"
    ]
  },
  {
    "url": "http-cache/partial.html",
    "checks": [
      "#requests",
      "#responses",
      "#main-fetch",
      "#http-network-or-cache-fetch"
    ]
  },
  {
    "url": "http-cache/status.html",
    "checks": [
      "#statuses"
    ]
  },
  {
    "url": "http-cache/vary.html",
    "checks": [
      "#http-network-or-cache-fetch"
    ]
  },
  {
    "url": "nosniff/image.html",
    "checks": [
      "#x-content-type-options-header",
      "#should-response-to-request-be-blocked-due-to-nosniff?",
      "#should-response-to-request-be-blocked-due-to-mime-type?"
    ]
  },
  {
    "url": "nosniff/importscripts.html",
    "checks": [
      "#x-content-type-options-header",
      "#should-response-to-request-be-blocked-due-to-nosniff?"
    ]
  },
  {
    "url": "nosniff/parsing-nosniff.html",
    "checks": [
      "#x-content-type-options-header",
      "#should-response-to-request-be-blocked-due-to-nosniff?"
    ]
  },
  {
    "url": "nosniff/script.html",
    "checks": [
      "#x-content-type-options-header",
      "#should-response-to-request-be-blocked-due-to-nosniff?",
      "#should-response-to-request-be-blocked-due-to-mime-type?"
    ]
  },
  {
    "url": "nosniff/stylesheet.html",
    "checks": [
      "#x-content-type-options-header",
      "#should-response-to-request-be-blocked-due-to-nosniff?",
      "#should-response-to-request-be-blocked-due-to-mime-type?"
    ]
  },
  {
    "url": "nosniff/worker.html",
    "checks": [
      "#x-content-type-options-header",
      "#should-response-to-request-be-blocked-due-to-nosniff?",
      "#should-response-to-request-be-blocked-due-to-mime-type?"
    ]
  },
  {
    "url": "security/dangling-markup-mitigation-data-url.tentative.sub.html",
    "checks": [
      "#data-urls"
    ]
  },
  {
    "url": "security/embedded-credentials.tentative.sub.html",
    "checks": []
  },
  {
    "url": "security/dangling-markup-mitigation.tentative.html",
    "checks": []
  },
  {
    "url": "security/redirect-to-url-with-credentials.https.html",
    "checks": []
  },
  {
    "url": "api/abort/general-serviceworker.https.html",
    "checks": []
  },
  {
    "url": "api/abort/cache.https.html",
    "checks": []
  },
  {
    "url": "api/abort/general-sharedworker.html",
    "checks": []
  },
  {
    "url": "api/abort/serviceworker-intercepted.https.html",
    "checks": []
  },
  {
    "url": "api/cors/cors-expose-star-worker.html",
    "checks": []
  },
  {
    "url": "api/cors/cors-expose-star.html",
    "checks": []
  },
  {
    "url": "api/cors/cors-filtering.html",
    "checks": []
  },
  {
    "url": "api/cors/cors-filtering-worker.html",
    "checks": []
  },
  {
    "url": "api/cors/cors-multiple-origins-worker.html",
    "checks": []
  },
  {
    "url": "api/cors/cors-multiple-origins.html",
    "checks": []
  },
  {
    "url": "api/basic/block-mime-as-script.html",
    "checks": []
  },
  {
    "url": "api/basic/conditional-get.html",
    "checks": []
  },
  {
    "url": "api/basic/error-after-response.html",
    "checks": []
  },
  {
    "url": "api/basic/integrity-sharedworker.html",
    "checks": []
  },
  {
    "url": "api/basic/integrity-worker.html",
    "checks": []
  },
  {
    "url": "api/basic/integrity.html",
    "checks": []
  },
  {
    "url": "api/basic/keepalive.html",
    "checks": []
  },
  {
    "url": "api/basic/mode-no-cors-worker.html",
    "checks": []
  },
  {
    "url": "api/basic/mode-no-cors.html",
    "checks": []
  },
  {
    "url": "api/basic/request-referrer-redirected-worker.html",
    "checks": []
  },
  {
    "url": "api/basic/response-url-worker.html",
    "checks": [
      "#response-class"
    ]
  },
  {
    "url": "api/basic/response-url.html",
    "checks": []
  },
  {
    "url": "api/basic/scheme-blob-worker.html",
    "checks": []
  },
  {
    "url": "api/basic/scheme-blob.html",
    "checks": []
  },
  {
    "url": "api/basic/scheme-others-worker.html",
    "checks": []
  },
  {
    "url": "api/basic/scheme-others.html",
    "checks": []
  },
  {
    "url": "api/basic/text-utf8.html",
    "checks": []
  },
  {
    "url": "api/headers/header-values-normalize.html",
    "checks": []
  },
  {
    "url": "api/headers/header-values.html",
    "checks": []
  },
  {
    "url": "api/headers/headers-basic.html",
    "checks": []
  },
  {
    "url": "api/headers/headers-casing.html",
    "checks": []
  },
  {
    "url": "api/headers/headers-combine.html",
    "checks": []
  },
  {
    "url": "api/headers/headers-errors.html",
    "checks": []
  },
  {
    "url": "api/headers/headers-idl.html",
    "checks": []
  },
  {
    "url": "api/headers/headers-normalize.html",
    "checks": []
  },
  {
    "url": "api/headers/headers-record.html",
    "checks": []
  },
  {
    "url": "api/headers/headers-structure.html",
    "checks": []
  },
  {
    "url": "api/policies/csp-blocked-worker.html",
    "checks": []
  },
  {
    "url": "api/policies/csp-blocked.html",
    "checks": []
  },
  {
    "url": "api/policies/referrer-no-referrer-service-worker.https.html",
    "checks": []
  },
  {
    "url": "api/policies/referrer-no-referrer-worker.html",
    "checks": []
  },
  {
    "url": "api/policies/referrer-no-referrer.html",
    "checks": []
  },
  {
    "url": "api/policies/referrer-origin-service-worker.https.html",
    "checks": []
  },
  {
    "url": "api/policies/referrer-origin-when-cross-origin-service-worker.https.html",
    "checks": []
  },
  {
    "url": "api/policies/referrer-origin-when-cross-origin-worker.html",
    "checks": []
  },
  {
    "url": "api/policies/referrer-origin-when-cross-origin.html",
    "checks": []
  },
  {
    "url": "api/policies/referrer-origin-worker.html",
    "checks": []
  },
  {
    "url": "api/policies/referrer-origin.html",
    "checks": []
  },
  {
    "url": "api/policies/referrer-unsafe-url-service-worker.https.html",
    "checks": []
  },
  {
    "url": "api/policies/referrer-unsafe-url-worker.html",
    "checks": []
  },
  {
    "url": "api/policies/referrer-unsafe-url.html",
    "checks": []
  },
  {
    "url": "api/redirect/redirect-count-worker.html",
    "checks": [
      "#http-fetch",
      "#http-redirect-fetch"
    ]
  },
  {
    "url": "api/redirect/redirect-count.html",
    "checks": []
  },
  {
    "url": "api/redirect/redirect-empty-location-worker.html",
    "checks": []
  },
  {
    "url": "api/redirect/redirect-empty-location.html",
    "checks": []
  },
  {
    "url": "api/redirect/redirect-location-worker.html",
    "checks": []
  },
  {
    "url": "api/redirect/redirect-location.html",
    "checks": []
  },
  {
    "url": "api/redirect/redirect-method-worker.html",
    "checks": []
  },
  {
    "url": "api/redirect/redirect-method.html",
    "checks": []
  },
  {
    "url": "api/redirect/redirect-mode-worker.html",
    "checks": []
  },
  {
    "url": "api/redirect/redirect-mode.html",
    "checks": []
  },
  {
    "url": "api/redirect/redirect-origin-worker.html",
    "checks": []
  },
  {
    "url": "api/redirect/redirect-origin.html",
    "checks": []
  },
  {
    "url": "api/redirect/redirect-referrer-worker.html",
    "checks": []
  },
  {
    "url": "api/redirect/redirect-referrer.html",
    "checks": []
  },
  {
    "url": "api/redirect/redirect-schemes.html",
    "checks": []
  },
  {
    "url": "api/redirect/redirect-to-dataurl-worker.html",
    "checks": []
  },
  {
    "url": "api/redirect/redirect-to-dataurl.html",
    "checks": []
  },
  {
    "url": "api/resources/basic.html",
    "checks": []
  },
  {
    "url": "api/resources/keepalive-iframe.html",
    "checks": []
  },
  {
    "url": "api/request/request-bad-port.html",
    "checks": []
  },
  {
    "url": "api/request/request-cache-default-conditional.html",
    "checks": []
  },
  {
    "url": "api/request/request-cache-default.html",
    "checks": []
  },
  {
    "url": "api/request/request-cache-force-cache.html",
    "checks": []
  },
  {
    "url": "api/request/request-cache-no-cache.html",
    "checks": []
  },
  {
    "url": "api/request/request-cache-no-store.html",
    "checks": []
  },
  {
    "url": "api/request/request-cache-only-if-cached.html",
    "checks": []
  },
  {
    "url": "api/request/request-cache-reload.html",
    "checks": []
  },
  {
    "url": "api/request/request-clone.sub.html",
    "checks": []
  },
  {
    "url": "api/request/request-consume-empty.html",
    "checks": []
  },
  {
    "url": "api/request/request-consume.html",
    "checks": []
  },
  {
    "url": "api/request/request-disturbed.html",
    "checks": []
  },
  {
    "url": "api/request/request-error.html",
    "checks": []
  },
  {
    "url": "api/request/request-headers.html",
    "checks": []
  },
  {
    "url": "api/request/request-idl.html",
    "checks": []
  },
  {
    "url": "api/request/request-init-001.sub.html",
    "checks": []
  },
  {
    "url": "api/request/request-init-002.html",
    "checks": []
  },
  {
    "url": "api/request/request-init-003.sub.html",
    "checks": []
  },
  {
    "url": "api/request/request-keepalive-quota.html",
    "checks": []
  },
  {
    "url": "api/request/request-keepalive.html",
    "checks": []
  },
  {
    "url": "api/request/request-structure.html",
    "checks": []
  },
  {
    "url": "api/request/request-type-attribute-historical.html",
    "checks": []
  },
  {
    "url": "api/request/url-encoding.html",
    "checks": []
  },
  {
    "url": "api/response/response-cancel-stream.html",
    "checks": []
  },
  {
    "url": "api/response/response-clone.html",
    "checks": []
  },
  {
    "url": "api/response/response-consume-empty.html",
    "checks": []
  },
  {
    "url": "api/response/response-consume-stream.html",
    "checks": []
  },
  {
    "url": "api/response/response-consume.html",
    "checks": []
  },
  {
    "url": "api/response/response-error-from-stream.html",
    "checks": []
  },
  {
    "url": "api/response/response-error.html",
    "checks": [
      "#response-class"
    ]
  },
  {
    "url": "api/response/response-idl.html",
    "checks": []
  },
  {
    "url": "api/response/response-init-001.html",
    "checks": []
  },
  {
    "url": "api/response/response-init-002.html",
    "checks": []
  },
  {
    "url": "api/response/response-static-error.html",
    "checks": []
  },
  {
    "url": "api/response/response-static-redirect.html",
    "checks": []
  },
  {
    "url": "api/response/response-stream-disturbed-1.html",
    "checks": []
  },
  {
    "url": "api/response/response-stream-disturbed-2.html",
    "checks": []
  },
  {
    "url": "api/response/response-stream-disturbed-3.html",
    "checks": []
  },
  {
    "url": "api/response/response-stream-disturbed-4.html",
    "checks": []
  },
  {
    "url": "api/response/response-stream-disturbed-5.html",
    "checks": []
  },
  {
    "url": "api/response/response-stream-disturbed-6.html",
    "checks": []
  },
  {
    "url": "api/response/response-trailer.html",
    "checks": []
  },
  {
    "url": "corb/resources/html-correctly-labeled.html",
    "checks": []
  },
  {
    "url": "corb/resources/subframe-that-posts-html-containing-blob-url-to-parent.html",
    "checks": []
  },
  {
    "url": "security/support/embedded-credential-window.sub.html",
    "checks": []
  },
  {
    "url": "api/request/destination/fetch-destination-iframe.https.html",
    "checks": []
  },
  {
    "url": "api/request/destination/fetch-destination-no-load-event.https.html",
    "checks": []
  },
  {
    "url": "api/request/destination/fetch-destination-worker.https.html",
    "checks": []
  },
  {
    "url": "api/request/destination/fetch-destination.https.html",
    "checks": []
  },
  {
    "url": "api/request/multi-globals/url-parsing.html",
    "checks": []
  },
  {
    "url": "api/response/multi-globals/url-parsing.html",
    "checks": []
  },
  {
    "url": "api/request/multi-globals/current/current.html",
    "checks": []
  },
  {
    "url": "api/request/destination/resources/dummy.html",
    "checks": []
  },
  {
    "url": "api/request/destination/resources/empty.https.html",
    "checks": []
  },
  {
    "url": "api/request/multi-globals/incumbent/incumbent.html",
    "checks": []
  },
  {
    "url": "api/response/multi-globals/current/current.html",
    "checks": []
  },
  {
    "url": "api/response/multi-globals/incumbent/incumbent.html",
    "checks": []
  },
  {
    "url": "api/response/multi-globals/relevant/relevant.html",
    "checks": []
  }
]