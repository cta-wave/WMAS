var toc = {
  "name": "Table of Contents",
  "version": "https://fetch.spec.whatwg.org/",
  "children": [
    {
      "number": "2",
      "name": "2 Infrastructure",
      "url": "infrastructure",
      "children": [
        {
          "number": "2.1",
          "name": "URL",
          "url": "url"
        },
        {
          "number": "2.2",
          "name": "HTTP",
          "url": "http",
          "children": [
            {
              "number": "2.2.1",
              "name": "Methods",
              "url": "methods"
            },
            {
              "number": "2.2.2",
              "name": "Headers",
              "url": "terminology-headers"
            },
            {
              "number": "2.2.3",
              "name": "Statuses",
              "url": "statuses"
            },
            {
              "number": "2.2.4",
              "name": "Bodies",
              "url": "bodies"
            },
            {
              "number": "2.2.5",
              "name": "Requests",
              "url": "requests"
            },
            {
              "number": "2.2.6",
              "name": "Responses",
              "url": "responses"
            },
            {
              "number": "2.2.7",
              "name": "Miscellaneous",
              "url": "miscellaneous"
            }
          ]
        },
        {
          "number": "2.3",
          "name": "Authentication entries",
          "url": "authentication-entries"
        },
        {
          "number": "2.4",
          "name": "Fetch groups",
          "url": "fetch-groups"
        },
        {
          "number": "2.5",
          "name": "Connections",
          "url": "connections"
        },
        {
          "number": "2.6",
          "name": "Port blocking",
          "url": "port-blocking"
        },
        {
          "number": "2.7",
          "name": "Should response to request be blocked due to its MIME type?",
          "url": "should-response-to-request-be-blocked-due-to-mime-type?"
        },
        {
          "number": "2.8",
          "name": "Client hints list",
          "url": "client-hints-list"
        },
        {
          "number": "2.9",
          "name": "Streams",
          "url": "streams",
          "children": [
            {
              "number": "2.9.1",
              "name": "ReadableStream",
              "url": "readablestream"
            }
          ]
        }
      ]
    },
    {
      "number": "3",
      "name": "3 HTTP extensions",
      "url": "http-extensions",
      "children": [
        {
          "number": "3.1",
          "name": "`Origin` header",
          "url": "origin-header"
        },
        {
          "number": "3.2",
          "name": "CORS protocol",
          "url": "http-cors-protocol",
          "children": [
            {
              "number": "3.2.1",
              "name": "General",
              "url": "general"
            },
            {
              "number": "3.2.2",
              "name": "HTTP requests",
              "url": "http-requests"
            },
            {
              "number": "3.2.3",
              "name": "HTTP responses",
              "url": "http-responses"
            },
            {
              "number": "3.2.4",
              "name": "HTTP new-header syntax",
              "url": "http-new-header-syntax"
            },
            {
              "number": "3.2.5",
              "name": "CORS protocol and credentials",
              "url": "cors-protocol-and-credentials"
            },
            {
              "number": "3.2.7",
              "name": "CORS protocol exceptions",
              "url": "cors-protocol-exceptions"
            }
          ]
        },
        {
          "number": "3.3",
          "name": "`X-Content-Type-Options` header",
          "url": "x-content-type-options-header",
          "children": [
            {
              "number": "3.3.1",
              "name": "Should response to request be blocked due to nosniff?",
              "url": "should-response-to-request-be-blocked-due-to-nosniff?"
            }
          ]
        },
        {
          "number": "3.4",
          "name": "CORB",
          "url": "corb"
        },
        {
          "number": "3.5",
          "name": "`Cross-Origin-Resource-Policy` header",
          "url": "cross-origin-resource-policy-header"
        }
      ]
    },
    {
      "number": "4",
      "name": "4 Fetching",
      "url": "fetching",
      "children": [
        {
          "number": "4.1",
          "name": "Main fetch",
          "url": "main-fetch"
        },
        {
          "number": "4.2",
          "name": "Scheme fetch",
          "url": "scheme-fetch"
        },
        {
          "number": "4.3",
          "name": "HTTP fetch",
          "url": "http-fetch"
        },
        {
          "number": "4.4",
          "name": "HTTP-redirect fetch",
          "url": "http-redirect-fetch"
        },
        {
          "number": "4.5",
          "name": "HTTP-network-or-cache fetch",
          "url": "http-network-or-cache-fetch"
        },
        {
          "number": "4.6",
          "name": "HTTP-network fetch",
          "url": "http-network-fetch"
        },
        {
          "number": "4.7",
          "name": "CORS-preflight fetch",
          "url": "cors-preflight-fetch"
        },
        {
          "number": "4.8",
          "name": "CORS-preflight cache",
          "url": "cors-preflight-cache"
        },
        {
          "number": "4.9",
          "name": "CORS check",
          "url": "cors-check"
        }
      ]
    },
    {
      "number": "5",
      "name": "5 Fetch API",
      "url": "fetch-api",
      "children": [
        {
          "number": "5.1",
          "name": "Headers class",
          "url": "headers-class"
        },
        {
          "number": "5.2",
          "name": "Body mixin",
          "url": "body-mixin"
        },
        {
          "number": "5.3",
          "name": "Request class",
          "url": "request-class"
        },
        {
          "number": "5.4",
          "name": "Response class",
          "url": "response-class"
        },
        {
          "number": "5.5",
          "name": "Fetch method",
          "url": "fetch-method"
        },
        {
          "number": "5.6",
          "name": "Garbage collection",
          "url": "garbage-collection"
        }
      ]
    },
    {
      "number": "6",
      "name": "6 WebSocket protocol alterations",
      "url": "websocket-protocol",
      "children": [
        {
          "number": "6.1",
          "name": "Connections",
          "url": "websocket-connections"
        },
        {
          "number": "6.2",
          "name": "Opening handshake",
          "url": "websocket-opening-handshake"
        }
      ]
    },
    {
      "number": "7",
      "name": "7 data: URLs",
      "url": "data-urls"
    },
    {
      "number": "",
      "name": "Background reading",
      "url": "background-reading",
      "children": [
        {
          "number": "",
          "name": "HTTP header layer division",
          "url": "http-header-layer-division"
        },
        {
          "number": "",
          "name": "Atomic HTTP redirect handling",
          "url": "atomic-http-redirect-handling"
        },
        {
          "number": "",
          "name": "Basic safe CORS protocol setup",
          "url": "basic-safe-cors-protocol-setup"
        },
        {
          "number": "",
          "name": "CORS protocol and HTTP caches",
          "url": "cors-protocol-and-http-caches"
        }
      ]
    }
  ]
}