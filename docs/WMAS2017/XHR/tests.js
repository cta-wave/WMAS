var tests = [
  {
    "url": "FormData-append.html",
    "checks": [
      "#interface-formdata"
    ]
  },
  {
    "url": "abort-after-receive.htm",
    "checks": [
      "#the-abort()-method"
    ]
  },
  {
    "url": "abort-after-send.htm",
    "checks": [
      "#the-abort()-method"
    ]
  },
  {
    "url": "abort-after-stop.htm",
    "checks": [
      "#the-abort()-method"
    ]
  },
  {
    "url": "abort-after-timeout.htm",
    "checks": [
      "#the-abort()-method"
    ]
  },
  {
    "url": "abort-during-done.htm",
    "checks": [
      "#the-abort()-method"
    ]
  },
  {
    "url": "abort-during-headers-received.htm",
    "checks": [
      "#the-abort()-method"
    ]
  },
  {
    "url": "abort-during-loading.htm",
    "checks": [
      "#the-abort()-method"
    ]
  },
  {
    "url": "abort-during-open.htm",
    "checks": [
      "#the-abort()-method"
    ]
  },
  {
    "url": "abort-during-unsent.htm",
    "checks": [
      "#the-abort()-method"
    ]
  },
  {
    "url": "abort-during-upload.htm",
    "checks": [
      "#the-abort()-method"
    ]
  },
  {
    "url": "abort-event-abort.htm",
    "checks": [
      "#the-abort()-method",
      "#event-handlers"
    ]
  },
  {
    "url": "abort-event-listeners.htm",
    "checks": [
      "#the-abort()-method",
      "#event-handlers"
    ]
  },
  {
    "url": "abort-event-loadend.htm",
    "checks": [
      "#the-abort()-method",
      "#event-handlers"
    ]
  },
  {
    "url": "abort-event-order.htm",
    "checks": [
      "#the-abort()-method",
      "#event-handlers"
    ]
  },
  {
    "url": "abort-upload-event-abort.htm",
    "checks": [
      "#the-abort()-method",
      "#event-handlers"
    ]
  },
  {
    "url": "abort-upload-event-loadend.htm",
    "checks": [
      "#the-abort()-method",
      "#event-handlers"
    ]
  },
  {
    "url": "access-control-and-redirects-async-same-origin.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-and-redirects-async.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-and-redirects.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-basic-allow-access-control-origin-header-data-url.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-basic-allow-access-control-origin-header.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-basic-allow-async.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-basic-allow-non-cors-safelisted-method-async.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-basic-allow-non-cors-safelisted-method.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-basic-allow-preflight-cache-invalidation-by-header.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-basic-allow-preflight-cache-invalidation-by-method.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-basic-allow-preflight-cache-timeout.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-basic-allow-preflight-cache.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-basic-allow-star.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-basic-allow.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-basic-cors-safelisted-request-headers.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-basic-cors-safelisted-response-headers.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-basic-denied.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-basic-get-fail-non-simple.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-basic-non-cors-safelisted-content-type.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-basic-post-success-no-content-type.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-basic-post-with-non-cors-safelisted-content-type.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-basic-preflight-denied.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-preflight-async-header-denied.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-preflight-async-method-denied.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-preflight-async-not-supported.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-preflight-credential-async.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-preflight-credential-sync.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-preflight-headers-async.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-preflight-headers-sync.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-preflight-request-header-lowercase.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-preflight-request-header-sorted.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-preflight-request-headers-origin.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-preflight-request-invalid-status-301.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-preflight-request-invalid-status-400.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-preflight-request-invalid-status-501.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-preflight-request-must-not-contain-cookie.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-preflight-sync-header-denied.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-preflight-sync-method-denied.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-preflight-sync-not-supported.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-recursive-failed-request.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-response-with-body-sync.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-response-with-body.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-response-with-exposed-headers.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-sandboxed-iframe-allow-origin-null.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-sandboxed-iframe-allow.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-sandboxed-iframe-denied-without-wildcard.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "access-control-sandboxed-iframe-denied.htm",
    "checks": [
      "#the-withcredentials-attribute"
    ]
  },
  {
    "url": "allow-lists-starting-with-comma.htm",
    "checks": [
      "#the-open()-method",
      "#the-setrequestheader()-method"
    ]
  },
  {
    "url": "anonymous-mode-unsupported.htm",
    "checks": []
  },
  {
    "url": "data-uri.htm",
    "checks": []
  },
  {
    "url": "event-abort.htm",
    "checks": [
      "#event-handlers",
      "#events"
    ]
  },
  {
    "url": "event-error-order.sub.html",
    "checks": [
      "#event-handlers",
      "#events"
    ]
  },
  {
    "url": "event-error.sub.html",
    "checks": [
      "#event-handlers",
      "#events"
    ]
  },
  {
    "url": "event-load.htm",
    "checks": [
      "#event-handlers",
      "#events"
    ]
  },
  {
    "url": "event-loadend.htm",
    "checks": [
      "#event-handlers",
      "#events"
    ]
  },
  {
    "url": "event-loadstart-upload.htm",
    "checks": [
      "#event-handlers",
      "#events"
    ]
  },
  {
    "url": "event-loadstart.htm",
    "checks": [
      "#event-handlers",
      "#events"
    ]
  },
  {
    "url": "event-progress.htm",
    "checks": [
      "#event-handlers",
      "#events"
    ]
  },
  {
    "url": "event-readystate-sync-open.htm",
    "checks": [
      "#event-handlers",
      "#events"
    ]
  },
  {
    "url": "event-readystatechange-loaded.htm",
    "checks": [
      "#event-handlers",
      "#events"
    ]
  },
  {
    "url": "event-timeout-order.htm",
    "checks": [
      "#event-handlers",
      "#events"
    ]
  },
  {
    "url": "event-timeout.htm",
    "checks": [
      "#event-handlers",
      "#events",
      "#the-timeout-attribute"
    ]
  },
  {
    "url": "event-upload-progress-crossorigin.htm",
    "checks": [
      "#event-handlers",
      "#events"
    ]
  },
  {
    "url": "event-upload-progress.htm",
    "checks": [
      "#event-handlers",
      "#events"
    ]
  },
  {
    "url": "firing-events-http-content-length.html",
    "checks": [
      "#event-handlers",
      "#events"
    ]
  },
  {
    "url": "firing-events-http-no-content-length.html",
    "checks": [
      "#event-handlers",
      "#events"
    ]
  },
  {
    "url": "formdata-blob.htm",
    "checks": [
      "#interface-formdata"
    ]
  },
  {
    "url": "formdata-delete.htm",
    "checks": [
      "#interface-formdata"
    ]
  },
  {
    "url": "formdata-foreach.html",
    "checks": [
      "#interface-formdata"
    ]
  },
  {
    "url": "formdata-get.htm",
    "checks": [
      "#interface-formdata"
    ]
  },
  {
    "url": "formdata-has.htm",
    "checks": [
      "#interface-formdata"
    ]
  },
  {
    "url": "formdata-set.htm",
    "checks": [
      "#interface-formdata"
    ]
  },
  {
    "url": "formdata.htm",
    "checks": [
      "#interface-formdata"
    ]
  },
  {
    "url": "getallresponseheaders-cookies.htm",
    "checks": [
      "#the-getallresponseheaders()-method"
    ]
  },
  {
    "url": "getallresponseheaders-status.htm",
    "checks": [
      "#the-getallresponseheaders()-method"
    ]
  },
  {
    "url": "getallresponseheaders.htm",
    "checks": [
      "#the-getallresponseheaders()-method"
    ]
  },
  {
    "url": "getresponseheader-case-insensitive.htm",
    "checks": [
      "#the-getresponseheader()-method"
    ]
  },
  {
    "url": "getresponseheader-chunked-trailer.htm",
    "checks": [
      "#the-getresponseheader()-method"
    ]
  },
  {
    "url": "getresponseheader-cookies-and-more.htm",
    "checks": [
      "#the-getresponseheader()-method"
    ]
  },
  {
    "url": "getresponseheader-error-state.htm",
    "checks": [
      "#the-getresponseheader()-method"
    ]
  },
  {
    "url": "getresponseheader-server-date.htm",
    "checks": [
      "#the-getresponseheader()-method"
    ]
  },
  {
    "url": "getresponseheader-special-characters.htm",
    "checks": []
  },
  {
    "url": "getresponseheader-unsent-opened-state.htm",
    "checks": [
      "#the-getresponseheader()-method"
    ]
  },
  {
    "url": "header-user-agent-async.htm",
    "checks": [
      "#the-setrequestheader()-method"
    ]
  },
  {
    "url": "header-user-agent-sync.htm",
    "checks": [
      "#the-setrequestheader()-method"
    ]
  },
  {
    "url": "headers-normalize-response.htm",
    "checks": [
      "#the-getresponseheader()-method"
    ]
  },
  {
    "url": "historical.html",
    "checks": []
  },
  {
    "url": "interfaces.html",
    "checks": [
      "#interface-xmlhttprequest",
      "#interface-formdata",
      "#interface-progressevent"
    ]
  },
  {
    "url": "loadstart-and-state.html",
    "checks": [
      "#event-handlers",
      "#events",
      "#states"
    ]
  },
  {
    "url": "no-utf16-json.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "open-after-abort.htm",
    "checks": [
      "#the-open()-method",
      "#the-abort()-method"
    ]
  },
  {
    "url": "open-after-setrequestheader.htm",
    "checks": [
      "#the-open()-method",
      "#the-setrequestheader()-method"
    ]
  },
  {
    "url": "open-during-abort-event.htm",
    "checks": [
      "#the-open()-method",
      "#the-setrequestheader()-method",
      "#event-handlers",
      "#events"
    ]
  },
  {
    "url": "open-during-abort-processing.htm",
    "checks": [
      "#the-open()-method",
      "#the-setrequestheader()-method",
      "#event-handlers",
      "#events"
    ]
  },
  {
    "url": "open-during-abort.htm",
    "checks": [
      "#the-open()-method",
      "#the-setrequestheader()-method",
      "#event-handlers",
      "#events"
    ]
  },
  {
    "url": "open-method-bogus.htm",
    "checks": [
      "#constructors"
    ]
  },
  {
    "url": "open-method-case-insensitive.htm",
    "checks": [
      "#the-open()-method"
    ]
  },
  {
    "url": "open-method-case-sensitive.htm",
    "checks": [
      "#the-open()-method"
    ]
  },
  {
    "url": "open-method-insecure.htm",
    "checks": [
      "#the-open()-method"
    ]
  },
  {
    "url": "open-method-responsetype-set-sync.htm",
    "checks": [
      "#the-open()-method"
    ]
  },
  {
    "url": "open-open-send.htm",
    "checks": [
      "#the-open()-method",
      "#the-send()-method"
    ]
  },
  {
    "url": "open-open-sync-send.htm",
    "checks": [
      "#the-open()-method",
      "#the-send()-method"
    ]
  },
  {
    "url": "open-parameters-toString.htm",
    "checks": [
      "#the-open()-method"
    ]
  },
  {
    "url": "open-referer.htm",
    "checks": [
      "#the-open()-method"
    ]
  },
  {
    "url": "open-send-during-abort.htm",
    "checks": [
      "#the-open()-method",
      "#the-abort()-method"
    ]
  },
  {
    "url": "open-send-open.htm",
    "checks": [
      "#the-open()-method",
      "#the-send()-method"
    ]
  },
  {
    "url": "open-sync-open-send.htm",
    "checks": [
      "#the-open()-method",
      "#the-send()-method"
    ]
  },
  {
    "url": "open-url-about-blank-window.htm",
    "checks": [
      "#the-open()-method"
    ]
  },
  {
    "url": "open-url-base-inserted-after-open.htm",
    "checks": [
      "#the-open()-method"
    ]
  },
  {
    "url": "open-url-base-inserted.htm",
    "checks": [
      "#the-open()-method"
    ]
  },
  {
    "url": "open-url-base.htm",
    "checks": [
      "#the-open()-method"
    ]
  },
  {
    "url": "open-url-encoding.htm",
    "checks": [
      "#the-open()-method"
    ]
  },
  {
    "url": "open-url-fragment.htm",
    "checks": [
      "#the-open()-method"
    ]
  },
  {
    "url": "open-url-javascript-window-2.htm",
    "checks": [
      "#the-open()-method"
    ]
  },
  {
    "url": "open-url-javascript-window.htm",
    "checks": [
      "#the-open()-method"
    ]
  },
  {
    "url": "open-url-multi-window-2.htm",
    "checks": [
      "#the-open()-method"
    ]
  },
  {
    "url": "open-url-multi-window-3.htm",
    "checks": [
      "#the-open()-method"
    ]
  },
  {
    "url": "open-url-multi-window-4.htm",
    "checks": [
      "#the-open()-method"
    ]
  },
  {
    "url": "open-url-multi-window-5.htm",
    "checks": [
      "#the-open()-method"
    ]
  },
  {
    "url": "open-url-multi-window-6.htm",
    "checks": [
      "#the-open()-method"
    ]
  },
  {
    "url": "open-url-multi-window.htm",
    "checks": [
      "#the-open()-method"
    ]
  },
  {
    "url": "open-url-redirected-worker-origin.htm",
    "checks": [
      "#the-open()-method"
    ]
  },
  {
    "url": "open-url-worker-origin.htm",
    "checks": [
      "#the-open()-method"
    ]
  },
  {
    "url": "open-url-worker-simple.htm",
    "checks": [
      "#the-open()-method"
    ]
  },
  {
    "url": "open-user-password-non-same-origin.htm",
    "checks": [
      "#the-open()-method"
    ]
  },
  {
    "url": "overridemimetype-blob.html",
    "checks": [
      "#the-responsetype-attribute"
    ]
  },
  {
    "url": "overridemimetype-done-state.htm",
    "checks": [
      "#the-responsetype-attribute",
      "#states"
    ]
  },
  {
    "url": "overridemimetype-headers-received-state-force-shiftjis.htm",
    "checks": [
      "#the-responsetype-attribute",
      "#states"
    ]
  },
  {
    "url": "overridemimetype-invalid-mime-type.htm",
    "checks": [
      "#the-responsetype-attribute"
    ]
  },
  {
    "url": "overridemimetype-loading-state.htm",
    "checks": [
      "#the-responsetype-attribute",
      "#states"
    ]
  },
  {
    "url": "overridemimetype-open-state-force-utf-8.htm",
    "checks": [
      "#the-responsetype-attribute",
      "#states"
    ]
  },
  {
    "url": "overridemimetype-open-state-force-xml.htm",
    "checks": [
      "#the-responsetype-attribute",
      "#states"
    ]
  },
  {
    "url": "overridemimetype-unsent-state-force-shiftjis.htm",
    "checks": [
      "#the-responsetype-attribute",
      "#states"
    ]
  },
  {
    "url": "preserve-ua-header-on-redirect.htm",
    "checks": [
      "#the-setrequestheader()-method"
    ]
  },
  {
    "url": "progress-events-response-data-gzip.htm",
    "checks": [
      "#event-handlers",
      "#events",
      "#the-responsetext-attribute"
    ]
  },
  {
    "url": "progressevent-constructor.html",
    "checks": [
      "#interface-progressevent"
    ]
  },
  {
    "url": "progressevent-interface.html",
    "checks": [
      "#interface-progressevent"
    ]
  },
  {
    "url": "response-data-arraybuffer.htm",
    "checks": [
      "#response-body"
    ]
  },
  {
    "url": "response-data-blob.htm",
    "checks": [
      "#response-body"
    ]
  },
  {
    "url": "response-data-deflate.htm",
    "checks": [
      "#response-body"
    ]
  },
  {
    "url": "response-data-gzip.htm",
    "checks": [
      "#response-body"
    ]
  },
  {
    "url": "response-data-progress.htm",
    "checks": [
      "#response-body"
    ]
  },
  {
    "url": "response-invalid-responsetype.htm",
    "checks": [
      "#the-responsetype-attribute"
    ]
  },
  {
    "url": "response-json.htm",
    "checks": [
      "#the-responsetype-attribute"
    ]
  },
  {
    "url": "response-method.htm",
    "checks": [
      "#the-open()-method"
    ]
  },
  {
    "url": "responseText-status.html",
    "checks": [
      "#the-responsetext-attribute"
    ]
  },
  {
    "url": "responseType-document-in-worker.html",
    "checks": [
      "#the-responsetype-attribute"
    ]
  },
  {
    "url": "responseXML-unavailable-in-worker.html",
    "checks": [
      "#the-responsexml-attribute"
    ]
  },
  {
    "url": "responsedocument-decoding.htm",
    "checks": [
      "#the-responsexml-attribute"
    ]
  },
  {
    "url": "responsetext-decoding.htm",
    "checks": [
      "#the-responsetext-attribute"
    ]
  },
  {
    "url": "responsetype.html",
    "checks": [
      "#the-responsetype-attribute"
    ]
  },
  {
    "url": "responseurl.html",
    "checks": [
      "#the-responseurl-attribute"
    ]
  },
  {
    "url": "responsexml-basic.htm",
    "checks": [
      "#the-responsexml-attribute"
    ]
  },
  {
    "url": "responsexml-document-properties.htm",
    "checks": [
      "#the-responsexml-attribute"
    ]
  },
  {
    "url": "responsexml-get-twice.htm",
    "checks": [
      "#the-responsexml-attribute"
    ]
  },
  {
    "url": "responsexml-media-type.htm",
    "checks": [
      "#the-responsexml-attribute"
    ]
  },
  {
    "url": "responsexml-non-document-types.htm",
    "checks": [
      "#the-responsexml-attribute"
    ]
  },
  {
    "url": "responsexml-non-well-formed.htm",
    "checks": [
      "#the-responsexml-attribute"
    ]
  },
  {
    "url": "security-consideration.sub.html",
    "checks": [
      "#events"
    ]
  },
  {
    "url": "send-accept-language.htm",
    "checks": []
  },
  {
    "url": "send-accept.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-after-setting-document-domain.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-authentication-basic-cors-not-enabled.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-authentication-basic-cors.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-authentication-basic-repeat-no-args.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-authentication-basic-setrequestheader-and-arguments.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-authentication-basic-setrequestheader-existing-session.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-authentication-basic-setrequestheader.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-authentication-basic.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-authentication-competing-names-passwords.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-authentication-cors-basic-setrequestheader.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-authentication-cors-setrequestheader-no-cred.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-authentication-existing-session-manual.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-authentication-prompt-2-manual.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-authentication-prompt-manual.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-blob-with-no-mime-type.html",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-conditional-cors.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-conditional.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-content-type-charset.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-content-type-string.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-data-arraybuffer.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-data-arraybufferview.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-data-blob.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-data-es-object.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-data-formdata.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-data-unexpected-tostring.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-entity-body-basic.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-entity-body-document-bogus.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-entity-body-document.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-entity-body-empty.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-entity-body-get-head-async.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-entity-body-get-head.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-entity-body-none.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-network-error-async-events.sub.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-network-error-sync-events.sub.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-no-response-event-loadend.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-no-response-event-loadstart.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-no-response-event-order.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-non-same-origin.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-receive-utf16.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-redirect-bogus-sync.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-redirect-bogus.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-redirect-infinite-sync.htm",
    "checks": []
  },
  {
    "url": "send-redirect-infinite.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-redirect-no-location.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-redirect-post-upload.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-redirect-to-cors.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-redirect-to-non-cors.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-redirect.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-response-event-order.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-response-upload-event-loadend.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-response-upload-event-loadstart.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-response-upload-event-progress.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-send.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-sync-blocks-async.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-sync-no-response-event-load.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-sync-no-response-event-loadend.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-sync-no-response-event-order.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-sync-response-event-order.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-sync-timeout.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "send-timeout-events.htm",
    "checks": [
      "#the-send()-method"
    ]
  },
  {
    "url": "setrequestheader-after-send.htm",
    "checks": [
      "#the-setrequestheader()-method"
    ]
  },
  {
    "url": "setrequestheader-allow-empty-value.htm",
    "checks": [
      "#the-setrequestheader()-method"
    ]
  },
  {
    "url": "setrequestheader-allow-whitespace-in-value.htm",
    "checks": [
      "#the-setrequestheader()-method"
    ]
  },
  {
    "url": "setrequestheader-before-open.htm",
    "checks": [
      "#the-setrequestheader()-method"
    ]
  },
  {
    "url": "setrequestheader-bogus-name.htm",
    "checks": [
      "#the-setrequestheader()-method"
    ]
  },
  {
    "url": "setrequestheader-bogus-value.htm",
    "checks": [
      "#the-setrequestheader()-method"
    ]
  },
  {
    "url": "setrequestheader-case-insensitive.htm",
    "checks": [
      "#the-setrequestheader()-method"
    ]
  },
  {
    "url": "setrequestheader-content-type.htm",
    "checks": [
      "#the-setrequestheader()-method"
    ]
  },
  {
    "url": "setrequestheader-header-allowed.htm",
    "checks": [
      "#the-setrequestheader()-method"
    ]
  },
  {
    "url": "setrequestheader-header-forbidden.htm",
    "checks": [
      "#the-setrequestheader()-method"
    ]
  },
  {
    "url": "setrequestheader-open-setrequestheader.htm",
    "checks": [
      "#the-setrequestheader()-method"
    ]
  },
  {
    "url": "status-async.htm",
    "checks": [
      "#the-status-attribute"
    ]
  },
  {
    "url": "status-basic.htm",
    "checks": [
      "#the-status-attribute"
    ]
  },
  {
    "url": "status-error.htm",
    "checks": [
      "#the-status-attribute"
    ]
  },
  {
    "url": "template-element.html",
    "checks": [
      "#the-responsexml-attribute"
    ]
  },
  {
    "url": "timeout-cors-async.htm",
    "checks": [
      "#the-timeout-attribute"
    ]
  },
  {
    "url": "timeout-multiple-fetches.html",
    "checks": [
      "#the-timeout-attribute"
    ]
  },
  {
    "url": "timeout-sync.htm",
    "checks": [
      "#the-timeout-attribute"
    ]
  },
  {
    "url": "xmlhttprequest-basic.htm",
    "checks": [
      "#interface-xmlhttprequest"
    ]
  },
  {
    "url": "xmlhttprequest-eventtarget.htm",
    "checks": [
      "#interface-xmlhttprequest"
    ]
  },
  {
    "url": "xmlhttprequest-network-error-sync.htm",
    "checks": [
      "#interface-xmlhttprequest"
    ]
  },
  {
    "url": "xmlhttprequest-network-error.htm",
    "checks": [
      "#interface-xmlhttprequest"
    ]
  },
  {
    "url": "xmlhttprequest-sync-block-defer-scripts-subframe.html",
    "checks": [
      "#interface-xmlhttprequest"
    ]
  },
  {
    "url": "xmlhttprequest-sync-block-defer-scripts.html",
    "checks": [
      "#interface-xmlhttprequest"
    ]
  },
  {
    "url": "xmlhttprequest-sync-block-scripts.html",
    "checks": [
      "#interface-xmlhttprequest"
    ]
  },
  {
    "url": "xmlhttprequest-sync-default-feature-policy.sub.html",
    "checks": [
      "#interface-xmlhttprequest"
    ]
  },
  {
    "url": "xmlhttprequest-sync-not-hang-scriptloader-subframe.html",
    "checks": [
      "#interface-xmlhttprequest"
    ]
  },
  {
    "url": "xmlhttprequest-sync-not-hang-scriptloader.html",
    "checks": [
      "#interface-xmlhttprequest"
    ]
  },
  {
    "url": "xmlhttprequest-timeout-aborted.html",
    "checks": [
      "#interface-xmlhttprequest",
      "#the-timeout-attribute"
    ]
  },
  {
    "url": "xmlhttprequest-timeout-abortedonmain.html",
    "checks": [
      "#interface-xmlhttprequest",
      "#the-timeout-attribute"
    ]
  },
  {
    "url": "xmlhttprequest-timeout-overrides.html",
    "checks": [
      "#interface-xmlhttprequest",
      "#the-timeout-attribute"
    ]
  },
  {
    "url": "xmlhttprequest-timeout-overridesexpires.html",
    "checks": [
      "#interface-xmlhttprequest",
      "#the-timeout-attribute"
    ]
  },
  {
    "url": "xmlhttprequest-timeout-reused.html",
    "checks": [
      "#interface-xmlhttprequest",
      "#the-timeout-attribute"
    ]
  },
  {
    "url": "xmlhttprequest-timeout-simple.html",
    "checks": [
      "#interface-xmlhttprequest",
      "#the-timeout-attribute"
    ]
  },
  {
    "url": "xmlhttprequest-timeout-synconmain.html",
    "checks": [
      "#interface-xmlhttprequest",
      "#the-timeout-attribute"
    ]
  },
  {
    "url": "xmlhttprequest-timeout-twice.html",
    "checks": [
      "#interface-xmlhttprequest",
      "#the-timeout-attribute"
    ]
  },
  {
    "url": "xmlhttprequest-timeout-worker-aborted.html",
    "checks": [
      "#interface-xmlhttprequest",
      "#the-timeout-attribute"
    ]
  },
  {
    "url": "xmlhttprequest-timeout-worker-overrides.html",
    "checks": [
      "#interface-xmlhttprequest",
      "#the-timeout-attribute"
    ]
  },
  {
    "url": "xmlhttprequest-timeout-worker-overridesexpires.html",
    "checks": [
      "#interface-xmlhttprequest",
      "#the-timeout-attribute"
    ]
  },
  {
    "url": "xmlhttprequest-timeout-worker-simple.html",
    "checks": [
      "#interface-xmlhttprequest",
      "#the-timeout-attribute"
    ]
  },
  {
    "url": "xmlhttprequest-timeout-worker-synconworker.html",
    "checks": [
      "#interface-xmlhttprequest",
      "#the-timeout-attribute"
    ]
  },
  {
    "url": "xmlhttprequest-timeout-worker-twice.html",
    "checks": [
      "#interface-xmlhttprequest",
      "#the-timeout-attribute"
    ]
  },
  {
    "url": "xmlhttprequest-unsent.htm",
    "checks": [
      "#interface-xmlhttprequest",
      "#states"
    ]
  },
  {
    "url": "resources/access-control-sandboxed-iframe.html",
    "checks": []
  },
  {
    "url": "resources/init.htm",
    "checks": []
  },
  {
    "url": "resources/send-after-setting-document-domain-window-1.htm",
    "checks": []
  },
  {
    "url": "resources/send-after-setting-document-domain-window-2.htm",
    "checks": []
  }
]