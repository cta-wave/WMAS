var tests = [
  {
    "url": "interfaces.html",
    "checks": [
      "#api",
    ]
  },
  {
    "url": "model/move-to-fullscreen-iframe-manual.html",
    "checks": [
      "#model",
      "#api",
    ]
  },
  {
    "url": "model/move-to-iframe-manual.html",
    "checks": [
      "#model",
      "#api",
    ]
  },
  {
    "url": "model/move-to-inactive-document-manual.html",
    "checks": [
      "#model",
      "#api",
    ]
  },
  {
    "url": "model/remove-child-manual.html",
    "checks": [
      "#model",
      "#api",
    ]
  },
  {
    "url": "model/remove-first-manual.html",
    "checks": [
      "#model",
      "#api",
    ]
  },
  {
    "url": "model/remove-last-manual.html",
    "checks": [
      "#model",
      "#api",
    ]
  },
  {
    "url": "model/remove-parent-manual.html",
    "checks": [
      "#model",
      "#api",
    ]
  },
  {
    "url": "model/remove-single-manual.html",
    "checks": [
      "#model",
      "#api",
    ]
  },
  {
    "url": "api/document-exit-fullscreen-active-document.html",
    "checks": [
      "#ui",
      "#api",
    ]
  },
  {
    "url": "api/document-exit-fullscreen-timing-manual.html",
    "checks": [
      "#ui",
      "#api",
    ]
  },
  {
    "url": "api/document-exit-fullscreen-twice-manual.html",
    "checks": [
      "#ui",
      "#api",
    ]
  },
  {
    "url": "api/document-exit-fullscreen-manual.html",
    "checks": [
      "#ui",
      "#api",
    ]
  },
  {
    "url": "api/document-exit-fullscreen-nested-manual.html",
    "checks": [
      "#ui",
      "#api",
    ]
  },
  {
    "url": "api/document-exit-fullscreen-nested-in-iframe-manual.html",
    "checks": [
      "#ui",
      "#api",
    ]
  },
  {
    "url": "api/document-fullscreen-enabled-active-document.html",
    "checks": [
      "#api",
    ]
  },
  {
    "url": "api/document-fullscreen-element-manual.html",
    "checks": [
      "#api",
    ]
  },
  {
    "url": "api/document-fullscreen-enabled.html",
    "checks": [
      "#api",
    ]
  },
  {
    "url": "api/document-fullscreen-enabled-cross-origin.sub.html",
    "checks": [
      "#api",
    ]
  },
  {
    "url": "api/document-onfullscreenchange-manual.html",
    "checks": [
      "#api",
    ]
  },
  {
    "url": "api/document-onfullscreenerror.html",
    "checks": [
      "#api",
    ]
  },
  {
    "url": "api/element-ready-check-allowed-cross-origin-manual.sub.html",
    "checks": [
      "#api",
    ]
  },
  {
    "url": "api/element-ready-check-containing-iframe-manual.html",
    "checks": [
      "#api",
    ]
  },
  {
    "url": "api/element-ready-check-fullscreen-iframe-child-manual.html",
    "checks": [
      "#api",
    ]
  },
  {
    "url": "api/element-ready-check-fullscreen-element-sibling-manual.html",
    "checks": [
      "#api",
    ]
  },
  {
    "url": "api/element-ready-check-iframe-child-manual.html",
    "checks": [
      "#api",
    ]
  },
  {
    "url": "api/element-ready-check-not-allowed-cross-origin-manual.sub.html",
    "checks": [
      "#api",
    ]
  },
  {
    "url": "api/element-ready-check-not-allowed-manual.html",
    "checks": [
      "#api",
    ]
  },
  {
    "url": "api/element-ready-check-not-in-document-manual.html",
    "checks": [
      "#api",
    ]
  },
  {
    "url": "api/element-request-fullscreen-active-document.html",
    "checks": [
      "#api",
    ]
  },
  {
    "url": "api/element-request-fullscreen-and-exit-iframe-manual.html",
    "checks": [
      "#api",
    ]
  },
  {
    "url": "api/element-request-fullscreen-and-move-manual.html",
    "checks": [
      "#api",
    ]
  },
  {
    "url": "api/element-request-fullscreen-and-move-to-iframe-manual.html",
    "checks": [
      "#api",
    ]
  },
  {
    "url": "api/element-request-fullscreen-and-remove-iframe-manual.html",
    "checks": [
      "#api",
    ]
  },
  {
    "url": "api/element-request-fullscreen-and-remove-manual.html",
    "checks": [
      "#api",
    ]
  },
  {
    "url": "api/element-request-fullscreen-manual.html",
    "checks": [
      "#api",
    ]
  },
  {
    "url": "api/element-request-fullscreen-non-top-manual.html",
    "checks": [
      "#api",
    ]
  },
  {
    "url": "api/element-request-fullscreen-not-allowed.html",
    "checks": [
      "#api",
    ]
  },
  {
    "url": "api/element-request-fullscreen-same-manual.html",
    "checks": [
      "#api",
    ]
  },
  {
    "url": "api/element-request-fullscreen-null-ns-manual.html",
    "checks": [
      "#api",
    ]
  },
  {
    "url": "api/element-request-fullscreen-svg-svg-manual.html",
    "checks": [
      "#api",
    ]
  },
  {
    "url": "api/element-request-fullscreen-svg-rect-manual.html",
    "checks": [
      "#api",
    ]
  },
  {
    "url": "api/element-request-fullscreen-timing-manual.html",
    "checks": [
      "#api",
    ]
  },
  {
    "url": "api/element-request-fullscreen-dialog-manual.html",
    "checks": [
      "#api",
    ]
  },
  {
    "url": "api/element-request-fullscreen-top-manual.html",
    "checks": [
      "#api",
    ]
  },
  {
    "url": "api/element-request-fullscreen-twice-manual.html",
    "checks": [
      "#api",
    ]
  },
  {
    "url": "api/element-request-fullscreen-two-elements-manual.html",
    "checks": [
      "#api",
    ]
  },
  {
    "url": "api/element-request-fullscreen-two-iframes-manual.html",
    "checks": [
      "#api",
    ]
  },
  {
    "url": "api/historical.html",
    "checks": [
      "#api",
    ]
  },
  {
    "url": "rendering/fullscreen-pseudo-class-manual.html",
    "checks": [
      "#fullscreen-pseudo-class",
    ]
  },
  {
    "url": "rendering/fullscreen-pseudo-class-support.html",
    "checks": [
      "#fullscreen-pseudo-class",
    ]
  },
  {
    "url": "rendering/ua-style-iframe-manual.html",
    "checks": [
      "#user-agent-level-style-sheet-defaults",
    ]
  },
  {
    "url": "api/resources/report-fullscreen-enabled.html",
    "checks": [
      "#api",
    ]
  },
  {
    "url": "api/resources/attempt-fullscreen.html",
    "checks": [
      "#api",
    ]
  }
]
