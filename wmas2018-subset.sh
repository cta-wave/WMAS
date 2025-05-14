#!/bin/bash

DISTDIR=dist/wmats2018
BRANCHORCOMMITID=4bdeca6b451519a7f60f592468600e0a6cbfc42b

WPTBASEDIR=`pwd`

rm -rf $WPTBASEDIR/accessibility
rm -rf $WPTBASEDIR/attribution-reporting
rm -rf $WPTBASEDIR/autoplay-policy-detection
rm -rf $WPTBASEDIR/avif
rm -rf $WPTBASEDIR/background-sync
rm -rf $WPTBASEDIR/badging
rm -rf $WPTBASEDIR/browsing-topics
rm -rf $WPTBASEDIR/captured-mouse-events
rm -rf $WPTBASEDIR/close-watcher
rm -rf $WPTBASEDIR/compression
rm -rf $WPTBASEDIR/compute-pressure
rm -rf $WPTBASEDIR/contacts
rm -rf $WPTBASEDIR/content-dpr
rm -rf $WPTBASEDIR/contenteditable
rm -rf $WPTBASEDIR/content-index
rm -rf $WPTBASEDIR/cookie-deprecation-label
rm -rf $WPTBASEDIR/custom-state-pseudo-class
rm -rf $WPTBASEDIR/delegated-ink
rm -rf $WPTBASEDIR/density-size-correction
rm -rf $WPTBASEDIR/deprecation-reporting
rm -rf $WPTBASEDIR/direct-sockets
rm -rf $WPTBASEDIR/document-picture-in-picture
rm -rf $WPTBASEDIR/document-policy
rm -rf $WPTBASEDIR/ecmascript
rm -rf $WPTBASEDIR/element-timing
rm -rf $WPTBASEDIR/encoding-detection
rm -rf $WPTBASEDIR/eyedropper
rm -rf $WPTBASEDIR/fenced-frame
rm -rf $WPTBASEDIR/file-system-access
rm -rf $WPTBASEDIR/fledge
rm -rf $WPTBASEDIR/focus
rm -rf $WPTBASEDIR/font-access
rm -rf $WPTBASEDIR/fonts
rm -rf $WPTBASEDIR/forced-colors-mode
rm -rf $WPTBASEDIR/fs
rm -rf $WPTBASEDIR/graphics-aria
rm -rf $WPTBASEDIR/html-aam
rm -rf $WPTBASEDIR/https-upgrades
rm -rf $WPTBASEDIR/idle-detection
rm -rf $WPTBASEDIR/images
rm -rf $WPTBASEDIR/import-maps
rm -rf $WPTBASEDIR/installedapp
rm -rf $WPTBASEDIR/interfaces
rm -rf $WPTBASEDIR/intervention-reporting
rm -rf $WPTBASEDIR/is-input-pending
rm -rf $WPTBASEDIR/jpegxl
rm -rf $WPTBASEDIR/js-self-profiling
rm -rf $WPTBASEDIR/largest-contentful-paint
rm -rf $WPTBASEDIR/layout-instability
rm -rf $WPTBASEDIR/long-animation-frame
rm -rf $WPTBASEDIR/managed
rm -rf $WPTBASEDIR/manifest
rm -rf $WPTBASEDIR/measure-memory
rm -rf $WPTBASEDIR/media
rm -rf $WPTBASEDIR/mediacapture-extensions
rm -rf $WPTBASEDIR/mediacapture-handle
rm -rf $WPTBASEDIR/mediacapture-insertable-streams
rm -rf $WPTBASEDIR/mediacapture-region
rm -rf $WPTBASEDIR/media-playback-quality
rm -rf $WPTBASEDIR/merchant-validation
rm -rf $WPTBASEDIR/native-io
rm -rf $WPTBASEDIR/navigation-api
rm -rf $WPTBASEDIR/origin-isolation
rm -rf $WPTBASEDIR/page-lifecycle
rm -rf $WPTBASEDIR/parakeet
rm -rf $WPTBASEDIR/pending-beacon
rm -rf $WPTBASEDIR/periodic-background-sync
rm -rf $WPTBASEDIR/permissions-policy
rm -rf $WPTBASEDIR/permissions-request
rm -rf $WPTBASEDIR/permissions-revoke
rm -rf $WPTBASEDIR/png
rm -rf $WPTBASEDIR/portals
rm -rf $WPTBASEDIR/print
rm -rf $WPTBASEDIR/private-aggregation
rm -rf $WPTBASEDIR/private-click-measurement
rm -rf $WPTBASEDIR/raw-sockets
rm -rf $WPTBASEDIR/sanitizer-api
rm -rf $WPTBASEDIR/savedata
rm -rf $WPTBASEDIR/scheduler
rm -rf $WPTBASEDIR/screen-details
rm -rf $WPTBASEDIR/screen_enumeration
rm -rf $WPTBASEDIR/screen-wake-lock
rm -rf $WPTBASEDIR/scroll-to-text-fragment
rm -rf $WPTBASEDIR/secure-payment-confirmation
rm -rf $WPTBASEDIR/serial
rm -rf $WPTBASEDIR/shared-storage
rm -rf $WPTBASEDIR/shared-storage-selecturl-limit
rm -rf $WPTBASEDIR/soft-navigation-heuristics
rm -rf $WPTBASEDIR/speculation-rules
rm -rf $WPTBASEDIR/storage-access-api
rm -rf $WPTBASEDIR/subapps
rm -rf $WPTBASEDIR/timing-entrytypes-registry
rm -rf $WPTBASEDIR/top-level-storage-access-api
rm -rf $WPTBASEDIR/trust-tokens
rm -rf $WPTBASEDIR/ua-client-hints
rm -rf $WPTBASEDIR/urlpattern
rm -rf $WPTBASEDIR/video-rvfc
rm -rf $WPTBASEDIR/virtual-keyboard
rm -rf $WPTBASEDIR/web-bundle
rm -rf $WPTBASEDIR/webcodecs
rm -rf $WPTBASEDIR/webgpu
rm -rf $WPTBASEDIR/webhid
rm -rf $WPTBASEDIR/webidl
rm -rf $WPTBASEDIR/webnn
rm -rf $WPTBASEDIR/web-otp
rm -rf $WPTBASEDIR/webrtc-encoded-transform
rm -rf $WPTBASEDIR/webrtc-extensions
rm -rf $WPTBASEDIR/webrtc-ice
rm -rf $WPTBASEDIR/webrtc-priority
rm -rf $WPTBASEDIR/webrtc-svc
rm -rf $WPTBASEDIR/webtransport
rm -rf $WPTBASEDIR/window-management
rm -rf $WPTBASEDIR/window-segments

rm -rf $WPTBASEDIR/2dcontext
rm -rf $WPTBASEDIR/accelerometer
rm -rf $WPTBASEDIR/accname
rm -rf $WPTBASEDIR/acid
rm -rf $WPTBASEDIR/ambient-light
rm -rf $WPTBASEDIR/animation-worklet
rm -rf $WPTBASEDIR/annotation-model
rm -rf $WPTBASEDIR/annotation-protocol
rm -rf $WPTBASEDIR/annotation-vocab
rm -rf $WPTBASEDIR/apng
rm -rf $WPTBASEDIR/appmanifest
rm -rf $WPTBASEDIR/async-local-storage
rm -rf $WPTBASEDIR/audio-output
rm -rf $WPTBASEDIR/background-fetch
rm -rf $WPTBASEDIR/BackgroundSync
rm -rf $WPTBASEDIR/battery-status
rm -rf $WPTBASEDIR/beacon
rm -rf $WPTBASEDIR/bluetooth
rm -rf $WPTBASEDIR/clear-site-data
rm -rf $WPTBASEDIR/client-hints
rm -rf $WPTBASEDIR/clipboard-apis
rm -rf $WPTBASEDIR/compat
rm -rf $WPTBASEDIR/conformance-checkers
rm -rf $WPTBASEDIR/console
rm -rf $WPTBASEDIR/content-security-policy
rm -rf $WPTBASEDIR/cookies
rm -rf $WPTBASEDIR/cookie-store
rm -rf $WPTBASEDIR/core-aam
rm -rf $WPTBASEDIR/cors
rm -rf $WPTBASEDIR/credential-management
rm -rf $WPTBASEDIR/css
rm -rf $WPTBASEDIR/custom-elements
rm -rf $WPTBASEDIR/device-memory
rm -rf $WPTBASEDIR/dom
rm -rf $WPTBASEDIR/domparsing
rm -rf $WPTBASEDIR/domxpath
rm -rf $WPTBASEDIR/dpub-aam
rm -rf $WPTBASEDIR/dpub-aria
rm -rf $WPTBASEDIR/editing
rm -rf $WPTBASEDIR/encoding
rm -rf $WPTBASEDIR/encrypted-media
rm -rf $WPTBASEDIR/entries-api
rm -rf $WPTBASEDIR/eventsource
rm -rf $WPTBASEDIR/event-timing
rm -rf $WPTBASEDIR/feature-policy
rm -rf $WPTBASEDIR/fetch
rm -rf $WPTBASEDIR/FileAPI
rm -rf $WPTBASEDIR/fullscreen
rm -rf $WPTBASEDIR/gamepad
rm -rf $WPTBASEDIR/generic-sensor
rm -rf $WPTBASEDIR/geolocation-API
rm -rf $WPTBASEDIR/geolocation-sensor
rm -rf $WPTBASEDIR/graphics-aam
rm -rf $WPTBASEDIR/gyroscope
rm -rf $WPTBASEDIR/hr-time
rm -rf $WPTBASEDIR/html
rm -rf $WPTBASEDIR/html-longdesc
rm -rf $WPTBASEDIR/html-media-capture
rm -rf $WPTBASEDIR/imagebitmap-renderingcontext
rm -rf $WPTBASEDIR/IndexedDB
rm -rf $WPTBASEDIR/inert
rm -rf $WPTBASEDIR/infrastructure
rm -rf $WPTBASEDIR/input-device-capabilities
rm -rf $WPTBASEDIR/input-events
rm -rf $WPTBASEDIR/intersection-observer
rm -rf $WPTBASEDIR/js
rm -rf $WPTBASEDIR/keyboard-lock
rm -rf $WPTBASEDIR/keyboard-map
rm -rf $WPTBASEDIR/lifecycle
rm -rf $WPTBASEDIR/loading
rm -rf $WPTBASEDIR/longtask-timing
rm -rf $WPTBASEDIR/magnetometer
rm -rf $WPTBASEDIR/mathml
rm -rf $WPTBASEDIR/media-capabilities
rm -rf $WPTBASEDIR/mediacapture-depth
rm -rf $WPTBASEDIR/mediacapture-fromelement
rm -rf $WPTBASEDIR/mediacapture-image
rm -rf $WPTBASEDIR/mediacapture-record
rm -rf $WPTBASEDIR/mediacapture-streams
rm -rf $WPTBASEDIR/mediasession
rm -rf $WPTBASEDIR/media-source
rm -rf $WPTBASEDIR/mimesniff
rm -rf $WPTBASEDIR/mixed-content
rm -rf $WPTBASEDIR/mst-content-hint
rm -rf $WPTBASEDIR/navigation-timing
rm -rf $WPTBASEDIR/netinfo
rm -rf $WPTBASEDIR/network-error-logging
rm -rf $WPTBASEDIR/notifications
rm -rf $WPTBASEDIR/offscreen-canvas
rm -rf $WPTBASEDIR/old-tests
rm -rf $WPTBASEDIR/orientation-event
rm -rf $WPTBASEDIR/orientation-sensor
rm -rf $WPTBASEDIR/origin-policy
rm -rf $WPTBASEDIR/page-visibility
rm -rf $WPTBASEDIR/paint-timing
rm -rf $WPTBASEDIR/payment-handler
rm -rf $WPTBASEDIR/payment-method-basic-card
rm -rf $WPTBASEDIR/payment-method-id
rm -rf $WPTBASEDIR/payment-request
rm -rf $WPTBASEDIR/performance-timeline
rm -rf $WPTBASEDIR/permissions
rm -rf $WPTBASEDIR/picture-in-picture
rm -rf $WPTBASEDIR/pointerevents
rm -rf $WPTBASEDIR/pointerlock
rm -rf $WPTBASEDIR/preload
rm -rf $WPTBASEDIR/presentation-api
rm -rf $WPTBASEDIR/priority-hints
rm -rf $WPTBASEDIR/proximity
rm -rf $WPTBASEDIR/push-api
rm -rf $WPTBASEDIR/quirks
rm -rf $WPTBASEDIR/referrer-policy
rm -rf $WPTBASEDIR/remote-playback
rm -rf $WPTBASEDIR/reporting
rm -rf $WPTBASEDIR/requestidlecallback
rm -rf $WPTBASEDIR/resize-observer
rm -rf $WPTBASEDIR/resource-timing
rm -rf $WPTBASEDIR/screen-capture
rm -rf $WPTBASEDIR/screen-orientation
rm -rf $WPTBASEDIR/scroll-animations
rm -rf $WPTBASEDIR/secure-contexts
rm -rf $WPTBASEDIR/selection
rm -rf $WPTBASEDIR/server-timing
rm -rf $WPTBASEDIR/service-workers
rm -rf $WPTBASEDIR/shadow-dom
rm -rf $WPTBASEDIR/shape-detection
rm -rf $WPTBASEDIR/signed-exchange
rm -rf $WPTBASEDIR/speech-api
rm -rf $WPTBASEDIR/storage
rm -rf $WPTBASEDIR/streams
rm -rf $WPTBASEDIR/subresource-integrity
rm -rf $WPTBASEDIR/svg
rm -rf $WPTBASEDIR/svg-aam
rm -rf $WPTBASEDIR/touch-events
rm -rf $WPTBASEDIR/trusted-types
rm -rf $WPTBASEDIR/uievents
rm -rf $WPTBASEDIR/upgrade-insecure-requests
rm -rf $WPTBASEDIR/url
rm -rf $WPTBASEDIR/user-timing
rm -rf $WPTBASEDIR/vibration
rm -rf $WPTBASEDIR/visual-viewport
rm -rf $WPTBASEDIR/wai-aria
rm -rf $WPTBASEDIR/wake-lock
rm -rf $WPTBASEDIR/wasm
rm -rf $WPTBASEDIR/web-animations
rm -rf $WPTBASEDIR/webaudio
rm -rf $WPTBASEDIR/webauthn
rm -rf $WPTBASEDIR/WebCryptoAPI
rm -rf $WPTBASEDIR/webdriver
rm -rf $WPTBASEDIR/webgl
rm -rf $WPTBASEDIR/wave-extra
rm -rf $WPTBASEDIR/WebIDL
rm -rf $WPTBASEDIR/web-locks
rm -rf $WPTBASEDIR/webmessaging
rm -rf $WPTBASEDIR/webmidi
rm -rf $WPTBASEDIR/web-nfc
rm -rf $WPTBASEDIR/webrtc
rm -rf $WPTBASEDIR/webrtc-identity
rm -rf $WPTBASEDIR/webrtc-quic
rm -rf $WPTBASEDIR/webrtc-stats
rm -rf $WPTBASEDIR/web-share
rm -rf $WPTBASEDIR/websockets
rm -rf $WPTBASEDIR/webstorage
rm -rf $WPTBASEDIR/webusb
rm -rf $WPTBASEDIR/webvr
rm -rf $WPTBASEDIR/webvtt
rm -rf $WPTBASEDIR/webxr
rm -rf $WPTBASEDIR/workers
rm -rf $WPTBASEDIR/worklets
rm -rf $WPTBASEDIR/x-frame-options
rm -rf $WPTBASEDIR/xhr

rm -rf $DISTDIR
mkdir -p $DISTDIR
git init $DISTDIR
cd $DISTDIR
git remote add origin https://github.com/web-platform-tests/wpt.git
git config core.sparsecheckout true

# subsetting with regard to Web Media API Snapshot 2017
# https://w3c.github.io/webmediaapi/

# 3.2 HTML core specifications
# Devices MUST be conforming implementations of the following specifications:

# HTML [HTML],
echo "html/*" >> .git/info/sparse-checkout
# ECMAScript Language Specification, Edition 6 [ECMASCRIPT-6]
# Separate checkout. See below.

# 3.3 CSS specifications
# EDITOR'S NOTE
# The following list of widely deployed and interoperable CSS specs is taken directly from CSS Snapshot 2017 [CSS-2017]
#
# Devices MUST be conforming implementations of the following specifications:
#
# Cascading Style Sheets Level 2 Revision 1 (CSS 2.1) Specification [CSS2]
echo "css/CSS2/*" >> .git/info/sparse-checkout
# CSS Syntax Module Level 3 [CSS-SYNTAX-3]
echo "css/css-syntax/*" >> .git/info/sparse-checkout
# CSS Style Attributes [CSS-STYLE-ATTR]
echo "css/css-style-attr/*" >> .git/info/sparse-checkout
# Media Queries [CSS3-MEDIAQUERIES]
echo "css/mediaqueries/*" >> .git/info/sparse-checkout
# CSS Conditional Rules Module Level 3 [CSS3-CONDITIONAL]
echo "css/css-conditional/*" >> .git/info/sparse-checkout
# CSS Namespaces Module Level 3 [CSS-NAMESPACES-3]
echo "css/css-namespaces/*" >> .git/info/sparse-checkout
# Selectors Level 3 [SELECT]
echo "css/selectors/*" >> .git/info/sparse-checkout
# CSS Cascading and Inheritance Level 3 [CSS-CASCADE-3]
echo "css/css-cascade/*" >> .git/info/sparse-checkout
# CSS Values and Units Module Level 3 [CSS-VALUES]
echo "css/css-values/*" >> .git/info/sparse-checkout
# CSS Writing Modes Level 3 [CSS-WRITING-MODES-3]
echo "css/css-writing-modes/*" >> .git/info/sparse-checkout
# CSS Color Module Level 3 [CSS3-COLOR]
echo "css/css-color/*" >> .git/info/sparse-checkout
# CSS Backgrounds and Borders Module Level 3 [CSS3-BACKGROUND]
echo "css/css-backgrounds/*" >> .git/info/sparse-checkout
# CSS Image Values and Replaced Content Module Level 3 [CSS3-IMAGES]
echo "css/css-images/*" >> .git/info/sparse-checkout
# CSS Fonts Module Level 3 [CSS-FONTS-3]
echo "css/css-fonts/*" >> .git/info/sparse-checkout
# CSS Multi-column Layout Module [CSS3-MULTICOL]
echo "css/css-multicol/*" >> .git/info/sparse-checkout
# CSS Basic User Interface Module Level 3 (CSS3 UI) [CSS-UI-3]
echo "css/css-ui/*" >> .git/info/sparse-checkout
# Compositing and Blending Level 1 [COMPOSITING]
echo "css/compositing/*" >> .git/info/sparse-checkout
# CSS Transitions [CSS3-TRANSITIONS]
echo "css/css-transitions/*" >> .git/info/sparse-checkout
# CSS Animations [CSS3-ANIMATIONS]
echo "css/css-animations/*" >> .git/info/sparse-checkout
# CSS Flexible Box Layout Module Level 1 [CSS-FLEXBOX-1]
echo "css/css-flexbox/*" >> .git/info/sparse-checkout
# CSS Transforms Module Level 1 [CSS-TRANSFORMS-1]
echo "css/css-transforms/*" >> .git/info/sparse-checkout

# 3.4 Media specifications
# Devices MUST be conforming implementations of the following specifications:
#
# Encrypted Media Extensions [ENCRYPTED-MEDIA]
echo "encrypted-media/*" >> .git/info/sparse-checkout
# Media Source Extensions [MEDIA-SOURCE]
echo "media-source/*" >> .git/info/sparse-checkout
# Web Audio API [WEBAUDIO]
# Exceptions: Since not all environments currently support Media Streams [mediacapture-streams], MediaStreamAudioSourceNode and MediaStreamAudioDestinationNode are not yet widely supported.
echo "webaudio/*" >> .git/info/sparse-checkout

# 3.5 Graphics specifications
# Devices MUST be conforming implementations of the following specifications:
#
# HTML Canvas 2D Context [2DCONTEXT]
echo "2dcontext/*" >> .git/info/sparse-checkout
# Fullscreen API Standard [WHATWG-FULLSCREEN]
echo "fullscreen/*" >> .git/info/sparse-checkout
# JPEG File Interchange Format [JPEG]
echo "[JPEG] TO BE INTEGRATED"
# Portable Network Graphics (PNG) Specification (Second Edition) [PNG]
echo "[PNG] TO BE INTEGRATED"
# Graphics Interchange Format [GIF]
echo "[GIF] TO BE INTEGRATED"

# 3.6 Font specifications
# Devices MUST be conforming implementations of the following specifications:
#
# Open Font Format [OPEN-FONT-FORMAT]
echo "fonts/*" >> .git/info/sparse-checkout
# WOFF File Format 1.0 [WOFF]
echo "[WOFF] TO BE INTEGRATED"

# 3.7 Networking specifications
# Devices MUST be conforming implementations of the following specifications:
#
# The WebSocket API [WEBSOCKETS]
echo "websockets/*" >> .git/info/sparse-checkout
# XMLHttpRequest [XHR]
echo "xhr/*" >> .git/info/sparse-checkout
# Fetch [FETCH]
echo "fetch/*" >> .git/info/sparse-checkout

# 3.8 Security specifications
# Devices MUST be conforming implementations of the following specifications:
#
# Content Security Policy Level 2 [CSP2]
echo "content-security-policy/*" >> .git/info/sparse-checkout
# Web Cryptography API [WebCryptoAPI]
echo "WebCryptoAPI/*" >> .git/info/sparse-checkout

# 3.9 Other web specifications
# Devices MUST be conforming implementations of the following specifications:
#
# File API [FILEAPI]
echo "FileAPI/*" >> .git/info/sparse-checkout
# Web Notifications [notifications]
echo "notifications/*" >> .git/info/sparse-checkout
# Page Visibility Level 2 [PAGE-VISIBILITY-2]
echo "page-visibility/*" >> .git/info/sparse-checkout
# Service Workers 1 [SERVICE-WORKERS-1]
echo "service-workers/*" >> .git/info/sparse-checkout
# Web Storage [WEBSTORAGE]
echo "webstorage/*" >> .git/info/sparse-checkout
# Web Workers [WORKERS]
# Exceptions: Shared Workers are not yet widely supported.
echo "workers/*" >> .git/info/sparse-checkout
# Indexed Database API [IndexedDB]
# Exceptions: Array key path and array keys are not yet widely supported.
echo "IndexedDB/*" >> .git/info/sparse-checkout
# Cross-document messaging [WEB-MESSAGING]
# Channel messaging [CHANNEL-MESSAGING]
echo "webmessaging/*" >> .git/info/sparse-checkout

# Additionally requested tests
# uievents
echo "uievents/*" >> .git/info/sparse-checkout
# websockets
# already in, see above
# cssom-view
echo "css/cssom-view/*" >> .git/info/sparse-checkout
# dom
echo "dom/*" >> .git/info/sparse-checkout

git pull origin master
git checkout -b WMAS2018_SUBSET $BRANCHORCOMMITID

# copy subset back to root since many tests have assumptions to have them there
rm -rf $WPTBASEDIR/html/
rm -rf $WPTBASEDIR/css/
rm -rf $WPTBASEDIR/encrypted-media/
rm -rf $WPTBASEDIR/media-source/
rm -rf $WPTBASEDIR/webaudio/
rm -rf $WPTBASEDIR/2dcontext/
rm -rf $WPTBASEDIR/fullscreen/
rm -rf $WPTBASEDIR/websockets/
rm -rf $WPTBASEDIR/xhr/
rm -rf $WPTBASEDIR/fetch/
rm -rf $WPTBASEDIR/content-security-policy/
rm -rf $WPTBASEDIR/WebCryptoAPI/
rm -rf $WPTBASEDIR/webstorage/
rm -rf $WPTBASEDIR/workers/
rm -rf $WPTBASEDIR/webmessaging/
rm -rf $WPTBASEDIR/uievents/
rm -rf $WPTBASEDIR/dom/
cp -R ./* $WPTBASEDIR

# Separate checkout for specific version of IndexedDB

BRANCHORCOMMITID=eaf5d6035d68da3593b0b50b8b25a0cb64fc1f5e
rm -rf .git/info/sparse-checkout

# Install node modules
echo "Installing node modules ..."
cd $WPTBASEDIR/tools/wave && npm install

# Integrate ECMASCRIPT tests [ECMASCRIPT-6]
echo "Generating ecmascript test files ..."
DISTDIR=dist/es6-tests
cd $WPTBASEDIR
rm -rf $WPTBASEDIR/ecmascript
rm -rf $DISTDIR
git clone https://github.com/tc39/test262.git $DISTDIR
cd $DISTDIR
git checkout 5e653f2e6ca14ac1ad8e801955a709cae7ac8a11 #this is the Commit ID from 29 Dec 2015. ES6 was released in June 2016
cd $WPTBASEDIR
node tools/wave/ecmascript/generate-tests.js $DISTDIR
cp $DISTDIR/LICENSE $WPTBASEDIR/ecmascript

# Integrate webgl tests [WEBGL-103]
echo "Generating webgl test files ..."
DISTDIR=dist/webgl
cd $WPTBASEDIR
rm -rf $WPTBASEDIR/webgl
rm -rf $DISTDIR
git clone https://github.com/KhronosGroup/WebGL $DISTDIR
cd $DISTDIR
git checkout 0c1173e509ccbc3a1135f86ea6f3b3e4757bb96c #this is the Commit ID from 06 Dec 2018. ES6 was released in June 2016
cd $WPTBASEDIR
node tools/wave/webgl/prepare-tests.js $DISTDIR
cp $DISTDIR/LICENSE.txt $WPTBASEDIR/webgl

# Checkout the wave cookies und url tests
DISTDIR=wave-extra
cd $WPTBASEDIR
rm -rf $DISTDIR
git clone https://github.com/fraunhoferfokus/WMATS2018-cookies.git $DISTDIR
cd $DISTDIR
git checkout master
cd $WPTBASEDIR

# Remove the dist folder before manifest generation
rm -rf dist

# delete old MANIFEST.json
rm MANIFEST.json

# build the MANIFEST.json
echo "Building MANIFEST.json ..."
./wpt manifest --no-download --work

echo "now run './wave start' and './wpt serve'"
