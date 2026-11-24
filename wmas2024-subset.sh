#!/bin/bash

DISTDIR=dist/wmats2024
BRANCHORCOMMITID=de6fd7758b0ca6e075dfc1bbe758a6b9a996166f

WPTBASEDIR=`pwd`


rm -rf $WPTBASEDIR/2dcontext
rm -rf $WPTBASEDIR/accelerometer
rm -rf $WPTBASEDIR/accessibility
rm -rf $WPTBASEDIR/accname
rm -rf $WPTBASEDIR/acid
rm -rf $WPTBASEDIR/ambient-light
rm -rf $WPTBASEDIR/animation-worklet
rm -rf $WPTBASEDIR/annotation-model
rm -rf $WPTBASEDIR/annotation-protocol
rm -rf $WPTBASEDIR/annotation-vocab
rm -rf $WPTBASEDIR/apng
rm -rf $WPTBASEDIR/appmanifest
rm -rf $WPTBASEDIR/attribution-reporting
rm -rf $WPTBASEDIR/audio-output
rm -rf $WPTBASEDIR/autoplay-policy-detection
rm -rf $WPTBASEDIR/avif
rm -rf $WPTBASEDIR/background-fetch
rm -rf $WPTBASEDIR/BackgroundSync
rm -rf $WPTBASEDIR/background-sync
rm -rf $WPTBASEDIR/badging
rm -rf $WPTBASEDIR/battery-status
rm -rf $WPTBASEDIR/beacon
rm -rf $WPTBASEDIR/bluetooth
rm -rf $WPTBASEDIR/clear-site-data
rm -rf $WPTBASEDIR/client-hints
rm -rf $WPTBASEDIR/clipboard-apis
rm -rf $WPTBASEDIR/close-watcher
rm -rf $WPTBASEDIR/compat
rm -rf $WPTBASEDIR/compression
rm -rf $WPTBASEDIR/compute-pressure
rm -rf $WPTBASEDIR/conformance-checkers
rm -rf $WPTBASEDIR/console
rm -rf $WPTBASEDIR/contacts
rm -rf $WPTBASEDIR/content-dpr
rm -rf $WPTBASEDIR/contenteditable
rm -rf $WPTBASEDIR/content-index
rm -rf $WPTBASEDIR/content-security-policy
rm -rf $WPTBASEDIR/cookies
rm -rf $WPTBASEDIR/cookie-store
rm -rf $WPTBASEDIR/core-aam
rm -rf $WPTBASEDIR/cors
rm -rf $WPTBASEDIR/credential-management
rm -rf $WPTBASEDIR/css
rm -rf $WPTBASEDIR/custom-elements
rm -rf $WPTBASEDIR/custom-state-pseudo-class
rm -rf $WPTBASEDIR/delegated-ink
rm -rf $WPTBASEDIR/density-size-correction
rm -rf $WPTBASEDIR/deprecation-reporting
rm -rf $WPTBASEDIR/device-memory
rm -rf $WPTBASEDIR/direct-sockets
rm -rf $WPTBASEDIR/document-picture-in-picture
rm -rf $WPTBASEDIR/document-policy
rm -rf $WPTBASEDIR/dom
rm -rf $WPTBASEDIR/domparsing
rm -rf $WPTBASEDIR/domxpath
rm -rf $WPTBASEDIR/dpub-aam
rm -rf $WPTBASEDIR/dpub-aria
rm -rf $WPTBASEDIR/ecmascript
rm -rf $WPTBASEDIR/editing
rm -rf $WPTBASEDIR/element-timing
rm -rf $WPTBASEDIR/encoding
rm -rf $WPTBASEDIR/encoding-detection
rm -rf $WPTBASEDIR/encrypted-media
rm -rf $WPTBASEDIR/entries-api
rm -rf $WPTBASEDIR/eventsource
rm -rf $WPTBASEDIR/event-timing
rm -rf $WPTBASEDIR/eyedropper
rm -rf $WPTBASEDIR/feature-policy
rm -rf $WPTBASEDIR/fetch
rm -rf $WPTBASEDIR/FileAPI
rm -rf $WPTBASEDIR/file-system-access
rm -rf $WPTBASEDIR/focus
rm -rf $WPTBASEDIR/font-access
rm -rf $WPTBASEDIR/fonts
rm -rf $WPTBASEDIR/forced-colors-mode
rm -rf $WPTBASEDIR/fs
rm -rf $WPTBASEDIR/fullscreen
rm -rf $WPTBASEDIR/gamepad
rm -rf $WPTBASEDIR/generic-sensor
rm -rf $WPTBASEDIR/geolocation-API
rm -rf $WPTBASEDIR/geolocation-sensor
rm -rf $WPTBASEDIR/gyroscope
rm -rf $WPTBASEDIR/hr-time
rm -rf $WPTBASEDIR/html
rm -rf $WPTBASEDIR/html-longdesc
rm -rf $WPTBASEDIR/html-media-capture
rm -rf $WPTBASEDIR/idle-detection
rm -rf $WPTBASEDIR/imagebitmap-renderingcontext
rm -rf $WPTBASEDIR/images
rm -rf $WPTBASEDIR/import-maps
rm -rf $WPTBASEDIR/IndexedDB
rm -rf $WPTBASEDIR/inert
rm -rf $WPTBASEDIR/infrastructure
rm -rf $WPTBASEDIR/input-device-capabilities
rm -rf $WPTBASEDIR/input-events
rm -rf $WPTBASEDIR/installedapp
rm -rf $WPTBASEDIR/interfaces
rm -rf $WPTBASEDIR/intersection-observer
rm -rf $WPTBASEDIR/intervention-reporting
rm -rf $WPTBASEDIR/is-input-pending
rm -rf $WPTBASEDIR/js
rm -rf $WPTBASEDIR/js-self-profiling
rm -rf $WPTBASEDIR/keyboard-lock
rm -rf $WPTBASEDIR/keyboard-map
rm -rf $WPTBASEDIR/largest-contentful-paint
rm -rf $WPTBASEDIR/layout-instability
rm -rf $WPTBASEDIR/lifecycle
rm -rf $WPTBASEDIR/loading
rm -rf $WPTBASEDIR/longtask-timing
rm -rf $WPTBASEDIR/magnetometer
rm -rf $WPTBASEDIR/managed
rm -rf $WPTBASEDIR/manifest
rm -rf $WPTBASEDIR/mathml
rm -rf $WPTBASEDIR/measure-memory
rm -rf $WPTBASEDIR/media
rm -rf $WPTBASEDIR/media-capabilities
rm -rf $WPTBASEDIR/mediacapture-depth
rm -rf $WPTBASEDIR/mediacapture-extensions
rm -rf $WPTBASEDIR/mediacapture-fromelement
rm -rf $WPTBASEDIR/mediacapture-image
rm -rf $WPTBASEDIR/mediacapture-insertable-streams
rm -rf $WPTBASEDIR/mediacapture-record
rm -rf $WPTBASEDIR/mediacapture-region
rm -rf $WPTBASEDIR/mediacapture-streams
rm -rf $WPTBASEDIR/media-playback-quality
rm -rf $WPTBASEDIR/mediasession
rm -rf $WPTBASEDIR/media-source
rm -rf $WPTBASEDIR/merchant-validation
rm -rf $WPTBASEDIR/mimesniff
rm -rf $WPTBASEDIR/mixed-content
rm -rf $WPTBASEDIR/mst-content-hint
rm -rf $WPTBASEDIR/native-io
rm -rf $WPTBASEDIR/navigation-api
rm -rf $WPTBASEDIR/navigation-timing
rm -rf $WPTBASEDIR/netinfo
rm -rf $WPTBASEDIR/network-error-logging
rm -rf $WPTBASEDIR/notifications
rm -rf $WPTBASEDIR/old-tests
rm -rf $WPTBASEDIR/orientation-event
rm -rf $WPTBASEDIR/orientation-sensor
rm -rf $WPTBASEDIR/origin-isolation
rm -rf $WPTBASEDIR/origin-policy
rm -rf $WPTBASEDIR/page-lifecycle
rm -rf $WPTBASEDIR/page-visibility
rm -rf $WPTBASEDIR/paint-timing
rm -rf $WPTBASEDIR/payment-handler
rm -rf $WPTBASEDIR/payment-method-basic-card
rm -rf $WPTBASEDIR/payment-method-id
rm -rf $WPTBASEDIR/payment-request
rm -rf $WPTBASEDIR/performance-timeline
rm -rf $WPTBASEDIR/periodic-background-sync
rm -rf $WPTBASEDIR/permissions
rm -rf $WPTBASEDIR/permissions-policy
rm -rf $WPTBASEDIR/permissions-request
rm -rf $WPTBASEDIR/permissions-revoke
rm -rf $WPTBASEDIR/picture-in-picture
rm -rf $WPTBASEDIR/pointerevents
rm -rf $WPTBASEDIR/pointerlock
rm -rf $WPTBASEDIR/portals
rm -rf $WPTBASEDIR/preload
rm -rf $WPTBASEDIR/presentation-api
rm -rf $WPTBASEDIR/priority-hints
rm -rf $WPTBASEDIR/private-click-measurement
rm -rf $WPTBASEDIR/proximity
rm -rf $WPTBASEDIR/push-api
rm -rf $WPTBASEDIR/quirks
rm -rf $WPTBASEDIR/raw-sockets
rm -rf $WPTBASEDIR/referrer-policy
rm -rf $WPTBASEDIR/remote-playback
rm -rf $WPTBASEDIR/reporting
rm -rf $WPTBASEDIR/requestidlecallback
rm -rf $WPTBASEDIR/resize-observer
rm -rf $WPTBASEDIR/resource-timing
rm -rf $WPTBASEDIR/sanitizer-api
rm -rf $WPTBASEDIR/savedata
rm -rf $WPTBASEDIR/scheduler
rm -rf $WPTBASEDIR/screen-capture
rm -rf $WPTBASEDIR/screen_enumeration
rm -rf $WPTBASEDIR/screen-orientation
rm -rf $WPTBASEDIR/screen-wake-lock
rm -rf $WPTBASEDIR/scroll-animations
rm -rf $WPTBASEDIR/scroll-to-text-fragment
rm -rf $WPTBASEDIR/secure-contexts
rm -rf $WPTBASEDIR/secure-payment-confirmation
rm -rf $WPTBASEDIR/selection
rm -rf $WPTBASEDIR/serial
rm -rf $WPTBASEDIR/server-timing
rm -rf $WPTBASEDIR/service-workers
rm -rf $WPTBASEDIR/shadow-dom
rm -rf $WPTBASEDIR/shape-detection
rm -rf $WPTBASEDIR/shared-storage
rm -rf $WPTBASEDIR/signed-exchange
rm -rf $WPTBASEDIR/soft-navigation-heuristics
rm -rf $WPTBASEDIR/speculation-rules
rm -rf $WPTBASEDIR/speech-api
rm -rf $WPTBASEDIR/storage
rm -rf $WPTBASEDIR/storage-access-api
rm -rf $WPTBASEDIR/streams
rm -rf $WPTBASEDIR/subapps
rm -rf $WPTBASEDIR/subresource-integrity
rm -rf $WPTBASEDIR/svg
rm -rf $WPTBASEDIR/svg-aam
rm -rf $WPTBASEDIR/timing-entrytypes-registry
rm -rf $WPTBASEDIR/touch-events
rm -rf $WPTBASEDIR/trusted-types
rm -rf $WPTBASEDIR/trust-tokens
rm -rf $WPTBASEDIR/ua-client-hints
rm -rf $WPTBASEDIR/uievents
rm -rf $WPTBASEDIR/upgrade-insecure-requests
rm -rf $WPTBASEDIR/url
rm -rf $WPTBASEDIR/urlpattern
rm -rf $WPTBASEDIR/user-timing
rm -rf $WPTBASEDIR/vibration
rm -rf $WPTBASEDIR/video-rvfc
rm -rf $WPTBASEDIR/virtual-keyboard
rm -rf $WPTBASEDIR/visual-viewport
rm -rf $WPTBASEDIR/wai-aria
rm -rf $WPTBASEDIR/wasm
rm -rf $WPTBASEDIR/web-animations
rm -rf $WPTBASEDIR/webaudio
rm -rf $WPTBASEDIR/webauthn
rm -rf $WPTBASEDIR/web-bundle
rm -rf $WPTBASEDIR/webcodecs
rm -rf $WPTBASEDIR/WebCryptoAPI
rm -rf $WPTBASEDIR/webdriver
rm -rf $WPTBASEDIR/webgl
rm -rf $WPTBASEDIR/webgpu
rm -rf $WPTBASEDIR/webhid
rm -rf $WPTBASEDIR/WebIDL
rm -rf $WPTBASEDIR/webidl
rm -rf $WPTBASEDIR/web-locks
rm -rf $WPTBASEDIR/webmessaging
rm -rf $WPTBASEDIR/webmidi
rm -rf $WPTBASEDIR/webnn
rm -rf $WPTBASEDIR/web-nfc
rm -rf $WPTBASEDIR/web-otp
rm -rf $WPTBASEDIR/webrtc
rm -rf $WPTBASEDIR/webrtc-encoded-transform
rm -rf $WPTBASEDIR/webrtc-extensions
rm -rf $WPTBASEDIR/webrtc-ice
rm -rf $WPTBASEDIR/webrtc-identity
rm -rf $WPTBASEDIR/webrtc-priority
rm -rf $WPTBASEDIR/webrtc-stats
rm -rf $WPTBASEDIR/webrtc-svc
rm -rf $WPTBASEDIR/web-share
rm -rf $WPTBASEDIR/websockets
rm -rf $WPTBASEDIR/webstorage
rm -rf $WPTBASEDIR/webtransport
rm -rf $WPTBASEDIR/webusb
rm -rf $WPTBASEDIR/webvr
rm -rf $WPTBASEDIR/webvtt
rm -rf $WPTBASEDIR/webxr
rm -rf $WPTBASEDIR/window-placement
rm -rf $WPTBASEDIR/window-segments
rm -rf $WPTBASEDIR/workers
rm -rf $WPTBASEDIR/worklets
rm -rf $WPTBASEDIR/x-frame-options
rm -rf $WPTBASEDIR/xhr
rm -rf $WPTBASEDIR/xslt

rm -rf $WPTBASEDIR/browsing-topics
rm -rf $WPTBASEDIR/captured-mouse-events
rm -rf $WPTBASEDIR/cookie-deprecation-label
rm -rf $WPTBASEDIR/fenced-frame
rm -rf $WPTBASEDIR/fledge
rm -rf $WPTBASEDIR/graphics-aam
rm -rf $WPTBASEDIR/graphics-aria
rm -rf $WPTBASEDIR/html-aam
rm -rf $WPTBASEDIR/https-upgrades
rm -rf $WPTBASEDIR/long-animation-frame
rm -rf $WPTBASEDIR/png
rm -rf $WPTBASEDIR/private-aggregation
rm -rf $WPTBASEDIR/shared-storage-selecturl-limit
rm -rf $WPTBASEDIR/window-management

# Web Media API Snapshot 2024 additions: top-level WPT dirs not in the snapshot
# (research/wmas2024-pins.md, exclude-list diff vs 2023)
rm -rf $WPTBASEDIR/ai
rm -rf $WPTBASEDIR/device-posture
rm -rf $WPTBASEDIR/digital-credentials
rm -rf $WPTBASEDIR/fedcm
rm -rf $WPTBASEDIR/geolocation
rm -rf $WPTBASEDIR/jpegxl
rm -rf $WPTBASEDIR/mediacapture-handle
rm -rf $WPTBASEDIR/nav-tracking-mitigations
rm -rf $WPTBASEDIR/parakeet
rm -rf $WPTBASEDIR/partitioned-popins
rm -rf $WPTBASEDIR/print
rm -rf $WPTBASEDIR/screen-details
rm -rf $WPTBASEDIR/top-level-storage-access-api
rm -rf $WPTBASEDIR/viewport
rm -rf $DISTDIR
mkdir -p $DISTDIR
cd $DISTDIR
echo "Fetching W3C test files ..."
git init 2>/dev/null 1>/dev/null
git remote add origin https://github.com/web-platform-tests/wpt.git 2>/dev/null 1>/dev/null
git fetch origin 2>/dev/null 1>/dev/null
# subsetting with regard to Web Media API Snapshot 2024
# published 2024-10-16: https://w3c-cg.github.io/webmediaapi/
# Per-spec pins: one WPT commit per spec directory, chosen relative to that
# spec's publication date (2023 method).

###############################
# 3.3 Core web specifications #
###############################

# DOM [DOM] — WHATWG review draft 2023-06, published 19 Jun 2023
git checkout 84d8aa38655c6c1a010703fc07479108427b3a04 dom 2>/dev/null 1>/dev/null
mv dom $WPTBASEDIR

# HTML [HTML] — WHATWG review draft 2024-01, published 15 Jan 2024
git checkout 1524ff00571e0703f9de1980babc1c2f3ac9ffb2 html 2>/dev/null 1>/dev/null
rm -rf html/**/*shared-workers*
rm -rf html/**/*css-module*
rm -rf html/canvas/element
rm -rf html/canvas/resources
mv html $WPTBASEDIR
# Required via the snapshot's "Other web specifications" note ("required as
# part of HTML [[!HTML]]"): cross-document/channel messaging, web storage,
# web workers → HTML's date, 15 Jan 2024.
git checkout 6495c91853a3cf028a401cf4d228fc0b6a5465e4 webmessaging 2>/dev/null 1>/dev/null
mv webmessaging $WPTBASEDIR
git checkout 9dafa892146c4b5b1f604a39b3cf8677f8f70d44 webstorage 2>/dev/null 1>/dev/null
mv webstorage $WPTBASEDIR
git checkout 7bea24302e1870cb69eefd676fbde546559b2d6d workers 2>/dev/null 1>/dev/null
rm -rf workers/**/*SharedWorker*
rm -rf workers/**/*sharedworker*
mv workers $WPTBASEDIR

##########################
# 3.4 CSS specifications #
##########################
# Derived from CSS Snapshot 2023 plus later revisions (per WMAS2024).
# 2024 additions vs 2023: CSS-BOX-3, CSS-CONTAIN-1, CSS-COUNTER-STYLES-3.
# CSS Color moved to Level 4 and Media Queries are Level 4 — the WPT
# directories are unchanged (css/css-color, css/mediaqueries).

# Cascading Style Sheets Level 2 Revision 1 (CSS 2.1) [CSS2] — REC 7 Jun 2011
# 2023 pin kept unchanged (2021-05-03). Spec date predates the css/CSS2
# directory's history — see "Flagged directories" above.
git checkout 35979641de0b29313f7f28ab352d380186754ecd css/CSS2 2>/dev/null 1>/dev/null
mv css $WPTBASEDIR

# Compositing and Blending Level 1 [COMPOSITING] — spec version of 21 Mar 2024
git checkout 8668841ddcc733bd15678f07dd0ff4570ff4444e css/compositing 2>/dev/null 1>/dev/null
mv css/compositing $WPTBASEDIR/css

# CSS Animations Level 1 [CSS-ANIMATIONS-1] — spec published 2 Mar 2023
# (identical to the 2023 pin)
git checkout c6b7fa7682f4ff3c5aa928443516473523234352 css/css-animations 2>/dev/null 1>/dev/null
mv css/css-animations $WPTBASEDIR/css

# CSS Backgrounds and Borders Module Level 3 [CSS3-BACKGROUND] — spec version of 11 Mar 2024
git checkout 2ef716fcff7eaf8a4778b777f6a24a949a6a0fe5 css/css-backgrounds 2>/dev/null 1>/dev/null
mv css/css-backgrounds $WPTBASEDIR/css

# CSS Basic User Interface Module Level 3 [CSS-UI-3] — spec version of 21 Jun 2018
git checkout e600ea2e919641566238cef57ff59f1ee21e50d3 css/css-ui 2>/dev/null 1>/dev/null
mv css/css-ui $WPTBASEDIR/css

# CSS Box Model Module Level 3 [CSS-BOX-3]  (+ new in WMAS2024) — spec version of 11 Apr 2024
git checkout 84ce645e20620c9ae351024b5741fecd2cd88591 css/css-box 2>/dev/null 1>/dev/null
mv css/css-box $WPTBASEDIR/css

# CSS Cascading and Inheritance Level 4 [CSS-CASCADE-4] — spec published 13 Jan 2022
# (identical to the 2023 pin)
git checkout 5e295079d07ef43bdd9fe1ccea9b59067fc5ae46 css/css-cascade 2>/dev/null 1>/dev/null
mv css/css-cascade $WPTBASEDIR/css

# CSS Color Module Level 4 [CSS-COLOR-4] — spec version of 13 Feb 2024
# (level bumped 3 -> 4 in WMAS2024; dir unchanged). NOTE: the dir necessarily
# also contains newer-level (Color 5) tests — accepted tradeoff.
git checkout ef0aff09143221378466e7481d312d0ddeccdee2 css/css-color 2>/dev/null 1>/dev/null
mv css/css-color $WPTBASEDIR/css

# CSS Conditional Rules Module Level 3 [CSS3-CONDITIONAL] — spec version of 15 Aug 2024
git checkout 27c89c6f06af177cbd8f2ba5517be3c110fa50a0 css/css-conditional 2>/dev/null 1>/dev/null
mv css/css-conditional $WPTBASEDIR/css

# CSS Containment Module Level 1 [CSS-CONTAIN-1]  (+ new in WMAS2024) — spec version of 25 Jun 2024
git checkout 1ec7cf9a1bf651899999bab7f99e09d48416d708 css/css-contain 2>/dev/null 1>/dev/null
mv css/css-contain $WPTBASEDIR/css

# CSS Counter Styles Level 3 [CSS-COUNTER-STYLES-3]  (+ new in WMAS2024) — spec version of 27 Jul 2021
git checkout 0993872f0a326817e4acb9b462930517816f82c4 css/css-counter-styles 2>/dev/null 1>/dev/null
mv css/css-counter-styles $WPTBASEDIR/css

# CSS Custom Properties For Cascading Variables Level 1 [CSS-VARIABLES-1] — spec published 16 Jun 2022
# (identical to the 2023 pin)
git checkout 50ee1c78948a431f193b63d3030e4ebb71d16596 css/css-variables 2>/dev/null 1>/dev/null
mv css/css-variables $WPTBASEDIR/css

# CSS Easing Functions Level 1 [CSS-EASING-1] — spec version of 13 Feb 2023
# (identical to the 2023 pin)
git checkout 879c421fb53703d8c1400874c5c1b1a41833b49b css/css-easing 2>/dev/null 1>/dev/null
mv css/css-easing $WPTBASEDIR/css

# CSS Flexible Box Layout Module Level 1 [CSS-FLEXBOX-1] — spec version of 19 Nov 2018
git checkout 34ecd56f063821c113fd20bcb05b80aafd82d787 css/css-flexbox 2>/dev/null 1>/dev/null
mv css/css-flexbox $WPTBASEDIR/css

# CSS Font Loading Module Level 3 [CSS-FONT-LOADING-3] — spec version of 6 Apr 2023
# (identical to the 2023 pin)
git checkout 7906118b285a463cf294f898dfd979f8c8ad44d0 css/css-font-loading 2>/dev/null 1>/dev/null
mv css/css-font-loading $WPTBASEDIR/css

# CSS Fonts Module Level 3 [CSS-FONTS-3] — spec version of 20 Sep 2018
git checkout d3016b777e588039fb81e50095788d5ff8568420 css/css-fonts 2>/dev/null 1>/dev/null
mv css/css-fonts $WPTBASEDIR/css

# CSS Grid Layout Module Level 1 [CSS-GRID-1] — spec published 18 Dec 2020
# (identical to the 2023 pin)
git checkout 6faff25614baf1cedbb02c92c4b016e952e303b2 css/css-grid 2>/dev/null 1>/dev/null
mv css/css-grid $WPTBASEDIR/css

# CSS Image Values and Replaced Content Module Level 3 [CSS-IMAGES-3] — spec version of 18 Dec 2023
git checkout 6495c91853a3cf028a401cf4d228fc0b6a5465e4 css/css-images 2>/dev/null 1>/dev/null
mv css/css-images $WPTBASEDIR/css

# CSS Logical Properties and Values Level 1 [CSS-LOGICAL-1] — spec version of 27 Aug 2018
# (identical to the 2023 pin)
git checkout 9c650fc212cdbba6ee0830a68d3af3e708e031de css/css-logical 2>/dev/null 1>/dev/null
mv css/css-logical $WPTBASEDIR/css

# CSS Multi-column Layout Module Level 1 [CSS3-MULTICOL] — spec version of 16 May 2024
git checkout 283b5a22e65166a6e779d7c845d625f7214909aa css/css-multicol 2>/dev/null 1>/dev/null
mv css/css-multicol $WPTBASEDIR/css

# CSS Namespaces Module Level 3 [CSS-NAMESPACES-3] — REC 20 Mar 2014
# 2023 pin kept unchanged (2019-01-22). Spec date predates the
# css/css-namespaces directory's history — see "Flagged directories" above.
git checkout 29f50c937e8be8ccf73dbb8b8e74f0668a1cd426 css/css-namespaces 2>/dev/null 1>/dev/null
mv css/css-namespaces $WPTBASEDIR/css

# CSS Scroll Snap Module Level 1 [CSS-SCROLL-SNAP-1] — spec published 11 Mar 2021
# (identical to the 2023 pin)
git checkout 5ff83eee19a770bba7396c0688a265970c6ed342 css/css-scroll-snap 2>/dev/null 1>/dev/null
mv css/css-scroll-snap $WPTBASEDIR/css

# CSS Shapes Module Level 1 [CSS-SHAPES-1] — spec version of 15 Nov 2022
# (identical to the 2023 pin)
git checkout 4a9fb22ca75cb6997dc0571859e6762701eeaf7e css/css-shapes 2>/dev/null 1>/dev/null
mv css/css-shapes $WPTBASEDIR/css

# CSS Style Attributes [CSS-STYLE-ATTR] — REC 7 Nov 2013
# 2023 pin kept unchanged (2018-09-04). Spec date predates the
# css/css-style-attr directory's history — see "Flagged directories" above.
git checkout 701892246be156a8a051083c9c50ab22a89a26a5 css/css-style-attr 2>/dev/null 1>/dev/null
mv css/css-style-attr $WPTBASEDIR/css

# CSS Syntax Module Level 3 [CSS-SYNTAX-3] — spec version of 24 Dec 2021
# (identical to the 2023 pin)
git checkout d4beec831b7484382a25bca41b1449b68c235d0a css/css-syntax 2>/dev/null 1>/dev/null
mv css/css-syntax $WPTBASEDIR/css

# CSS Text Decoration Module Level 3 [CSS-TEXT-DECOR-3] — spec published 5 May 2022
# (identical to the 2023 pin)
git checkout fc305a833ec59c12bac1a59d73c4a734c715c0ad css/css-text-decor 2>/dev/null 1>/dev/null
mv css/css-text-decor $WPTBASEDIR/css

# CSS Transforms Module Level 1 [CSS-TRANSFORMS-1] — spec version of 14 Feb 2019
# NOTE: the dir hosts Transforms Level 1 + Level 2 tests — accepted tradeoff.
git checkout a01ac89be3f48fa64bd96d36ac1a65ac9074eb4f css/css-transforms 2>/dev/null 1>/dev/null
mv css/css-transforms $WPTBASEDIR/css

# CSS Transitions Level 1 [CSS-TRANSITIONS-1] — spec version of 11 Oct 2018
git checkout b040cb2a07264d35b9f47cd9deb2fb2889fca6d4 css/css-transitions 2>/dev/null 1>/dev/null
mv css/css-transitions $WPTBASEDIR/css

# CSS Values and Units Module Level 3 [CSS-VALUES] — spec version of 22 Mar 2024
git checkout 65aa1254fd5f8d9c4aa5c9961f039e7f4511eeab css/css-values 2>/dev/null 1>/dev/null
mv css/css-values $WPTBASEDIR/css

# CSS Will Change Module Level 1 [CSS-WILL-CHANGE-1] — spec published 5 May 2022
# (identical to the 2023 pin)
git checkout 1870f621644cc1c9d16403b1fcb59a3a03390905 css/css-will-change 2>/dev/null 1>/dev/null
mv css/css-will-change $WPTBASEDIR/css

# CSS Writing Modes Level 3 [CSS-WRITING-MODES-3] — spec version of 10 Dec 2019
git checkout 251ec7054bfe6c5665b9464238dd4baffa89dbce css/css-writing-modes 2>/dev/null 1>/dev/null
mv css/css-writing-modes $WPTBASEDIR/css

# CSSOM View Module [CSSOM-VIEW] — spec version of 17 Mar 2016
# 2023 pin kept unchanged (2021-05-07). Spec date predates the css/cssom-view
# directory's history — see "Flagged directories" above.
git checkout 3806bf2419e25bd57e70b42103478fd3c12a143b css/cssom-view 2>/dev/null 1>/dev/null
mv css/cssom-view $WPTBASEDIR/css

# Filter Effects Module Level 1 [FILTER-EFFECTS-1] — spec version of 18 Dec 2018
git checkout 4559dab34174df979b5db4d3ba01429c03c06850 css/filter-effects 2>/dev/null 1>/dev/null
mv css/filter-effects $WPTBASEDIR/css

# Media Queries Level 4 [MEDIAQUERIES-4] — spec version of 25 Dec 2021
git checkout 166dd2ceeaecb1e22ecf7c5c08713a47cf828deb css/mediaqueries 2>/dev/null 1>/dev/null
mv css/mediaqueries $WPTBASEDIR/css

# Resize Observer [RESIZE-OBSERVER-1] — spec published 11 Feb 2020
# (identical to the 2023 pin)
git checkout 9adb08e545f44c24c12a01f105f1683f254d53fe resize-observer 2>/dev/null 1>/dev/null
mv resize-observer $WPTBASEDIR

# Selectors Level 3 [SELECT] — spec version of 6 Nov 2018
# NOTE: the dir hosts Selectors Level 3 + Level 4 tests — accepted tradeoff.
git checkout ac9fb615fcc36341b9c204c2a525fa30157f24d1 css/selectors 2>/dev/null 1>/dev/null
mv css/selectors $WPTBASEDIR/css

# Web Animations [WEB-ANIMATIONS] — spec version of 5 Jun 2023
# (identical to the 2023 pin)
git checkout 35283827b1658ca4856238bb798d53ece16f1445 web-animations 2>/dev/null 1>/dev/null
mv web-animations $WPTBASEDIR/css

##########################
# 3.5 Media specifications #
##########################

# Encrypted Media Extensions [ENCRYPTED-MEDIA-1] — spec version of 18 Sep 2017
git checkout 6a2c8b8de6d19b055190e633ea163e2d7dce6bad encrypted-media 2>/dev/null 1>/dev/null
mv encrypted-media $WPTBASEDIR

# Media Capabilities [MEDIA-CAPABILITIES] — spec version of 7 Oct 2024
git checkout f1f1925c4876c73f932d35e0a038b619b861ed83 media-capabilities 2>/dev/null 1>/dev/null
mv media-capabilities $WPTBASEDIR

# Media Fragments URI 1.0 (basic) [MEDIA-FRAGS]
echo "No WPT tests specified for Media Fragments URI 1.0 [MEDIA-FRAGS]"   # as in 2023; support limited to video track ranges

# Media Source Extensions [MEDIA-SOURCE-1] — spec version of 17 Nov 2016
# (snapshot also requires MSE v2 changeType() — tested in media-source)
git checkout 359815a0ff565cb6ca89349f6e9e154789267d8b media-source 2>/dev/null 1>/dev/null
mv media-source $WPTBASEDIR

# Web Audio API [WEBAUDIO] — W3C Recommendation 17 Jun 2021
# (errata renames link text to WEBAUDIO-1.0)
git checkout b12b21f9defea333ebb945c052ccaa935aeb963c webaudio 2>/dev/null 1>/dev/null
mv webaudio $WPTBASEDIR

# WebRTC 1.0: Real-Time Communication Between Browsers [WEBRTC] — TR version of 8 Oct 2024
git checkout e093609edda48c99f0951bf5862664dc58fd1a70 webrtc 2>/dev/null 1>/dev/null
mv webrtc $WPTBASEDIR
git checkout 2432577309abcb0e6d1068cd1fdbac2756596532 webrtc-encoded-transform 2>/dev/null 1>/dev/null
mv webrtc-encoded-transform $WPTBASEDIR
git checkout ce1c71eba0b23c44adc6ccca8ed6ce2d80deb175 webrtc-extensions 2>/dev/null 1>/dev/null
mv webrtc-extensions $WPTBASEDIR
git checkout 48af5d410146da01b1a8f695db7ab2470bbbbdd6 webrtc-ice 2>/dev/null 1>/dev/null
mv webrtc-ice $WPTBASEDIR
git checkout 7e8c07686a91ee9b7f211209afb7830546f134d8 webrtc-identity 2>/dev/null 1>/dev/null
mv webrtc-identity $WPTBASEDIR
git checkout 5dee4bba55f610227d5c6c94da3c634266b39a85 webrtc-priority 2>/dev/null 1>/dev/null
mv webrtc-priority $WPTBASEDIR
git checkout 2294a9619699907cf85d252d9be2ae8b68914dc9 webrtc-stats 2>/dev/null 1>/dev/null
mv webrtc-stats $WPTBASEDIR
git checkout f664d06d7df6873725afed28af26e71e34e80d36 webrtc-svc 2>/dev/null 1>/dev/null
mv webrtc-svc $WPTBASEDIR

###############################
# 3.6 Graphics specifications #
###############################

# Fullscreen API Standard [FULLSCREEN] — WHATWG review draft 2023-07, published 18 Jul 2023
git checkout 5ba5b59fa23f2cbeaeee4f705746fb2a566a3bce fullscreen 2>/dev/null 1>/dev/null
mv fullscreen $WPTBASEDIR

# Graphics Interchange Format [GIF]
echo "No tests specified for Graphics Interchange Format [GIF]"

# HTML Canvas 2D Context [2DCONTEXT] — part of HTML [HTML] per the 2024 errata
# (HTML's date, 15 Jan 2024)
git checkout da004e9bcac9c63c0b247cc105e897c6b3f0cbfa html/canvas/element 2>/dev/null 1>/dev/null
mv html/canvas/element $WPTBASEDIR/2dcontext
git checkout b2c0c53477ebe43606de065fcb91f782f374287b html/canvas/resources 2>/dev/null 1>/dev/null
mv html/canvas/resources $WPTBASEDIR/html/canvas
git checkout 8c1a575e315bb34a5eefe5974829edf2e9775ce1 images 2>/dev/null 1>/dev/null
mv images $WPTBASEDIR/images
ln -s $WPTBASEDIR/images $WPTBASEDIR/html/canvas/images

# JPEG File Interchange Format [JPEG]
echo "No tests specified for JPEG File Interchange Format [JPEG]"

# Portable Network Graphics (PNG) Second Edition [PNG2e-20031110]
echo "No tests specified for Portable Network Graphics (PNG) Specification (Second Edition) [PNG]"
# NOTE: WPT has a top-level `png/` directory (PNG Test Suite), but its history
# predates the PNG 2e spec date (2003), so the strict per-spec method yields no
# pin — 2023 practice tested no PNG files either. Left as-is.

# WebGL Specification [WEBGL-103] — generated from KhronosGroup/WebGL, see below

###########################
# 3.7 Font specifications #
###########################

# Open Font Format [OPEN-FONT-FORMAT] — ISO/IEC 14496-22:2019 (Edition 4), published 24 Jan 2019
# NOTE: differs from the 2023 pin (d9a933a8…, 7 Jan 2021); this one follows the
# spec's 2019 publication date per the per-spec method.
git checkout 18f379edbf37c467f232d7d94b0f184c76c6cf26 fonts 2>/dev/null 1>/dev/null
mv fonts $WPTBASEDIR

# WOFF File Format 1.0 [WOFF]
echo "No tests specified for WOFF File Format 1.0 [WOFF]"

#################################
# 3.8 Networking specifications #
#################################

# Fetch [FETCH] — WHATWG review draft 2023-12, published 18 Dec 2023
git checkout 2cc5c3c5a56a1a1f9e7fcd12d6a392ccfeb663ad fetch 2>/dev/null 1>/dev/null
mv fetch $WPTBASEDIR

# WebSockets [WEBSOCKETS] — WHATWG review draft 2023-09, published 18 Sep 2023
git checkout 9dafa892146c4b5b1f604a39b3cf8677f8f70d44 websockets 2>/dev/null 1>/dev/null
mv websockets $WPTBASEDIR

# XMLHttpRequest [XHR] — WHATWG review draft 2024-02, published 19 Feb 2024
git checkout 4bd41bb00b97d753b7c0a75146c23243296918b2 xhr 2>/dev/null 1>/dev/null
mv xhr $WPTBASEDIR

###############################
# 3.9 Security specifications #
###############################

# Content Security Policy Level 2 [CSP2] — W3C Recommendation 15 Dec 2016
git checkout 00c40305409f35d0e71fd7fc70b8e3363a47ef7b content-security-policy 2>/dev/null 1>/dev/null
mv content-security-policy $WPTBASEDIR

# Referrer Policy [REFERRER-POLICY] — spec version of 26 Jan 2017
git checkout 5cb55f708883f21ee5ad5c7fd4f2434c8cf7f60b referrer-policy 2>/dev/null 1>/dev/null
mv referrer-policy $WPTBASEDIR

# Subresource Integrity [SRI] — W3C Recommendation 23 Jun 2016
git checkout 9529f7246bab893c3e70f93829e25bf240e193f3 subresource-integrity 2>/dev/null 1>/dev/null
mv subresource-integrity $WPTBASEDIR

# Transport Layer Security (TLS) Protocol Version 1.2 [RFC5246]
echo "No tests specified for Transport Layer Security (TLS) Protocol Version 1.2 [RFC5246]"

# Transport Layer Security (TLS) Protocol Version 1.3 [RFC8446]
echo "No tests specified for Transport Layer Security (TLS) Protocol Version 1.3 [RFC8446]"

# Upgrade Insecure Requests [UPGRADE-INSECURE-REQUESTS] — spec published 8 Oct 2015
# 2023 pin kept unchanged (2020-06-26). The tests did not exist in wpt at the
# spec date — see "Flagged directories" above.
git checkout b4b88e7de8f61c8c8fe1ac615fd883b3a042709f upgrade-insecure-requests 2>/dev/null 1>/dev/null
mv upgrade-insecure-requests $WPTBASEDIR

# Web Cryptography API [WEBCRYPTOAPI] — W3C Recommendation 26 Jan 2017
git checkout 3bfcdf5047d270ee3b99b94c286bb0c793e46609 WebCryptoAPI 2>/dev/null 1>/dev/null
mv WebCryptoAPI $WPTBASEDIR

#######################################
# 3.10 Web Performance specifications #
#######################################

# Beacon [BEACON] — spec version of 3 Aug 2022
# (identical to the 2023 pin)
git checkout a341862f7bf55470eb456fbdbb20e465508e7cb9 beacon 2>/dev/null 1>/dev/null
mv beacon $WPTBASEDIR

# High Resolution Time [HR-TIME-3] — spec version of 19 Jul 2023
# (identical to the 2023 pin)
git checkout 34cafd797e58dad280d20040eee012d49ccfa91f hr-time 2>/dev/null 1>/dev/null
mv hr-time $WPTBASEDIR

# Navigation Timing [NAVIGATION-TIMING] — spec version of 17 Dec 2012
# 2023 pin kept unchanged (2021-04-30). The tests did not exist in wpt at the
# spec date — see "Flagged directories" above.
git checkout df24fb604e2d40528ac1d1b5dd970e32fc5c2978 navigation-timing 2>/dev/null 1>/dev/null
mv navigation-timing $WPTBASEDIR

# Performance Timeline [PERFORMANCE-TIMELINE] — spec version of 16 Feb 2024
git checkout 553ce3471718aca8d8aee53d2e6f7df2f28d4afc performance-timeline 2>/dev/null 1>/dev/null
mv performance-timeline $WPTBASEDIR

# Resource Timing Level 1 [RESOURCE-TIMING-1] — spec version of 30 Mar 2017
git checkout 98363ab22b5de38b24e84bbaa239257086f6f01b resource-timing 2>/dev/null 1>/dev/null
mv resource-timing $WPTBASEDIR

# User Timing Level 2 [USER-TIMING-2] — spec version of 26 Feb 2019
git checkout 47abba18888c01102b7db38916e2f1a708cd1f19 user-timing 2>/dev/null 1>/dev/null
mv user-timing $WPTBASEDIR

#################################
# 3.11 Other web specifications #
#################################

# Indexed Database API [INDEXEDDB] — IndexedDB 3 Working Draft 15 Oct 2024
git checkout c4de27055b51c63693554edc8efbf24d078ccdc4 IndexedDB 2>/dev/null 1>/dev/null
mv IndexedDB $WPTBASEDIR

# File API [FILEAPI] — spec version of 24 May 2024
git checkout cceaf3628da950621004d9b5d8c1d1f367073347 FileAPI 2>/dev/null 1>/dev/null
mv FileAPI $WPTBASEDIR

# Notifications API [NOTIFICATIONS] — WHATWG review draft 2023-07, published 18 Jul 2023
git checkout ac2c4415f6ea3f0d08a2d19f0e104ce447054db1 notifications 2>/dev/null 1>/dev/null
mv notifications $WPTBASEDIR

# Service Workers 1 [SERVICE-WORKERS-1] — spec version of 12 Jul 2022
git checkout 8ee81d9c52f7c47292ba8ae731b52de03a078352 service-workers 2>/dev/null 1>/dev/null
mv service-workers $WPTBASEDIR

# UI Events [UIEVENTS] — spec version of 7 Sep 2024
git checkout d29d52c142794d36d88de1a16a73e751817b9cae uievents 2>/dev/null 1>/dev/null
mv uievents $WPTBASEDIR

# Install node modules
echo "Installing node modules ..."
cd $WPTBASEDIR/tools/wave && npm install 2>/dev/null 1>/dev/null

# Integrate ECMASCRIPT tests [ECMASCRIPT-2024]
ECMADISTDIR=$DISTDIR/es6-tests
cd $WPTBASEDIR
echo "Fetching ecmascript test files ..."
git clone https://github.com/tc39/test262.git $ECMADISTDIR 2>/dev/null 1>/dev/null
cd $ECMADISTDIR
git checkout 616dcadff406451eb249c6170253c5ff7486a3ea 2>/dev/null 1>/dev/null #this is the Commit ID from Jul 30, 2024. ES2024 (ECMA-262 15.0) was ratified Jun 2024
cd $WPTBASEDIR
echo "Generating ecmascript tests ..."
node tools/wave/ecmascript/generate-tests.js $ECMADISTDIR
cp $ECMADISTDIR/LICENSE $WPTBASEDIR/ecmascript
rm -rf ecmascript/tests/**/*lookBehind*
rm -rf ecmascript/tests/**/*lookbehind*
rm -rf ecmascript/tests/**/*Temporal*
rm -rf ecmascript/tests/**/*temporal*
rm -rf ecmascript/tests/staging

# Integrate webgl tests [WEBGL-103]
WEBGLDISTDIR=$DISTDIR/webgl
cd $WPTBASEDIR
echo "Fetching webgl test files ..."
git clone https://github.com/KhronosGroup/WebGL $WEBGLDISTDIR 2>/dev/null 1>/dev/null
cd $WEBGLDISTDIR
git checkout 495b85b3505837566e724e9f595354149af547f9 2>/dev/null 1>/dev/null #this is the Commit ID from 06 Jul 2021. Same pin as 2023, kept unchanged
cd $WPTBASEDIR
echo "Generating webgl tests ..."
node tools/wave/webgl/prepare-tests.js $WEBGLDISTDIR
cp $WEBGLDISTDIR/LICENSE.txt $WPTBASEDIR/webgl

# Blacklisted tests
rm ./content-security-policy/navigate-to/meta-refresh-blocked.sub.html
rm ./content-security-policy/navigate-to/unsafe-allow-redirects/allowed-end-of-chain-because-of-same-origin.sub.html
rm ./content-security-policy/navigate-to/anchor-navigation-always-allowed.html
rm ./content-security-policy/navigate-to/parent-navigates-child-blocked.html
rm ./referrer-policy/generic/iframe-upgrade-request-to-cross-origin.sub.html
rm ./workers/postMessage_block.https.html

# Remove the dist folder before manifest generation
rm -rf $DISTDIR

echo "now run './wpt serve-wave --report'"
