#!/bin/bash

DISTDIR=dist/wmats2021
BRANCHORCOMMITID=4bdeca6b451519a7f60f592468600e0a6cbfc42b

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

rm -rf $DISTDIR
mkdir -p $DISTDIR
cd $DISTDIR
echo "Fetching W3C test files ..."
git init 2>/dev/null 1>/dev/null
git remote add origin https://github.com/web-platform-tests/wpt.git 2>/dev/null 1>/dev/null
git fetch origin 2>/dev/null 1>/dev/null

# subsetting with regard to Web Media API Snapshot 2020
# https://w3c.github.io/webmediaapi/

###############################
# 3.3 Core web specifications #
###############################

# DOM [DOM]
git checkout 0bcc7a3e722bd8a310aa7942c622f55d8b0bef50 dom 2>/dev/null 1>/dev/null
mv dom $WPTBASEDIR

# HTML [HTML]
git checkout ba48453d52bb878769bb7415d5e98e90f55c5921 html 2>/dev/null 1>/dev/null
rm -rf html/**/*shared-workers*
rm -rf html/**/*css-module*
rm -rf html/canvas/element
rm -rf html/canvas/resources
mv html $WPTBASEDIR
git checkout ba48453d52bb878769bb7415d5e98e90f55c5921 websockets 2>/dev/null 1>/dev/null
mv websockets $WPTBASEDIR
git checkout 74a7f0ac9da8a098c16e421de381d5bcc1c3b5f7 webmessaging 2>/dev/null 1>/dev/null
mv webmessaging $WPTBASEDIR
git checkout 997a9777f4bdd87f5d26061106b251a685ca437c webstorage 2>/dev/null 1>/dev/null
mv webstorage $WPTBASEDIR
git checkout 561641ea142379ee9cb2531ea2ad593631868d6d workers 2>/dev/null 1>/dev/null
rm -rf workers/**/*SharedWorker*
rm -rf workers/**/*sharedworker*
mv workers $WPTBASEDIR

##########################
# 3.4 CSS specifications #
##########################

# Cascading Style Sheets Level 2 Revision 1 (CSS 2.1) Specification [CSS2]
git checkout 35979641de0b29313f7f28ab352d380186754ecd css/CSS2 2>/dev/null 1>/dev/null
mv css $WPTBASEDIR

# Compositing and Blending Level 1 [COMPOSITING]
git checkout 5d0dcf0142d07916584db9c76c2fdec02833e959 css/compositing 2>/dev/null 1>/dev/null
mv css/compositing $WPTBASEDIR/css

# CSS Animations [CSS3-ANIMATIONS]
git checkout f6acb6c0316cabf895c8c47dc654e77ef4b2a287 css/css-animations 2>/dev/null 1>/dev/null
mv css/css-animations $WPTBASEDIR/css

# CSS Backgrounds and Borders Module Level 3 [CSS3-BACKGROUND]
git checkout 4c83511984d28d692a68de2330a844183b9d488e css/css-backgrounds 2>/dev/null 1>/dev/null
mv css/css-backgrounds $WPTBASEDIR/css

# CSS Basic User Interface Module Level 3 (CSS3 UI) [CSS-UI-3]
git checkout 545c96ead1616661ce2e97b66450efcf1b032851 css/css-ui 2>/dev/null 1>/dev/null
mv css/css-ui $WPTBASEDIR/css

# CSS Cascading and Inheritance Level 4 [CSS-CASCADE-4]
git checkout 5e295079d07ef43bdd9fe1ccea9b59067fc5ae46 css/css-cascade 2>/dev/null 1>/dev/null
mv css/css-cascade $WPTBASEDIR/css

# CSS Color Module Level 3 [CSS3-COLOR]
git checkout 5e295079d07ef43bdd9fe1ccea9b59067fc5ae46 css/css-color 2>/dev/null 1>/dev/null
mv css/css-color $WPTBASEDIR/css

# CSS Conditional Rules Module Level 3 [CSS3-CONDITIONAL]
git checkout 5e295079d07ef43bdd9fe1ccea9b59067fc5ae46 css/css-conditional 2>/dev/null 1>/dev/null
mv css/css-conditional $WPTBASEDIR/css

# CSS Custom Properties For Cascading Variables Module Level 1 [CSS-VARIABLES-1]
git checkout 50ee1c78948a431f193b63d3030e4ebb71d16596 css/css-variables 2>/dev/null 1>/dev/null
mv css/css-variables $WPTBASEDIR/css

# CSS Easing Functions Level 1 [CSS-EASING-1]
git checkout 9f47205824fa25eca5d9ab2c87a016a7c5c4df3a css/css-easing 2>/dev/null 1>/dev/null
mv css/css-easing $WPTBASEDIR/css

# CSS Flexible Box Layout Module Level 1 [CSS-FLEXBOX-1]
git checkout 9d6f1c1aa7e1daa62c350b3fec18d594792f408a css/css-flexbox 2>/dev/null 1>/dev/null
mv css/css-flexbox $WPTBASEDIR/css

# CSS Font Loading Module Level 3 [CSS-FONT-LOADING-3]
git checkout 2ed60cb4b19a1b1695d38fed4060bb9f62f9f3bb css/css-font-loading 2>/dev/null 1>/dev/null
mv css/css-font-loading $WPTBASEDIR/css

# CSS Fonts Module Level 3 [CSS-FONTS-3]
git checkout 3d83b8688bbd6d9e2a7fc31021bc214cbf0ebcb7 css/css-fonts 2>/dev/null 1>/dev/null
mv css/css-fonts $WPTBASEDIR/css

# CSS Grid Layout Module Level 1 [CSS-GRID-1]
git checkout 6faff25614baf1cedbb02c92c4b016e952e303b2 css/css-grid 2>/dev/null 1>/dev/null
mv css/css-grid $WPTBASEDIR/css

# CSS Image Values and Replaced Content Module Level 3 [CSS3-IMAGES]
git checkout 48e3fd2f4d41fa00640d27738bdda07db95594cc css/css-images 2>/dev/null 1>/dev/null
mv css/css-images $WPTBASEDIR/css

# CSS Multi-column Layout Module [CSS3-MULTICOL]
git checkout d625d30d9c6e6634fcac316d094af314accca8a2 css/css-multicol 2>/dev/null 1>/dev/null
mv css/css-multicol $WPTBASEDIR/css

# CSS Logical Properties and Values Level 1 [CSS-LOGICAL-1]
git checkout 9c650fc212cdbba6ee0830a68d3af3e708e031de css/css-logical 2>/dev/null 1>/dev/null
mv css/css-logical $WPTBASEDIR/css

# CSS Namespaces Module Level 3 [CSS-NAMESPACES-3]
git checkout 29f50c937e8be8ccf73dbb8b8e74f0668a1cd426 css/css-namespaces 2>/dev/null 1>/dev/null
mv css/css-namespaces $WPTBASEDIR/css

# CSS Scroll Snap Module Level 1 [CSS-SCROLL-SNAP-1]
git checkout 5ff83eee19a770bba7396c0688a265970c6ed342 css/css-scroll-snap 2>/dev/null 1>/dev/null
mv css/css-scroll-snap $WPTBASEDIR/css

# CSS Shapes Module Level 1 [CSS-SHAPES-1]
git checkout 4a9fb22ca75cb6997dc0571859e6762701eeaf7e css/css-shapes 2>/dev/null 1>/dev/null
mv css/css-shapes $WPTBASEDIR/css

# CSS Style Attributes [CSS-STYLE-ATTR]
git checkout 701892246be156a8a051083c9c50ab22a89a26a5 css/css-style-attr 2>/dev/null 1>/dev/null
mv css/css-style-attr $WPTBASEDIR/css

# CSS Syntax Module Level 3 [CSS-SYNTAX-3]
git checkout d4beec831b7484382a25bca41b1449b68c235d0a css/css-syntax 2>/dev/null 1>/dev/null
mv css/css-syntax $WPTBASEDIR/css

# CSS Text Decoration Module Level 3 [CSS-TEXT-DECOR-3]
git checkout fc305a833ec59c12bac1a59d73c4a734c715c0ad css/css-text-decor 2>/dev/null 1>/dev/null
mv css/css-text-decor $WPTBASEDIR/css

# CSS Transforms Module Level 1 [CSS-TRANSFORMS-1]
git checkout 5f0da8e0ee156d0561ebcb9c9304dedd06119bd8 css/css-transforms 2>/dev/null 1>/dev/null
mv css/css-transforms $WPTBASEDIR/css

# CSS Transitions [CSS3-TRANSITIONS]
git checkout 2ed850a370f099478001a7ae6bb765d38dab8057 css/css-transitions 2>/dev/null 1>/dev/null
mv css/css-transitions $WPTBASEDIR/css

# CSS Values and Units Module Level 3 [CSS-VALUES]
git checkout 3cc4b3e6e87386e7cc9363cb147c61bc07017c68 css/css-values 2>/dev/null 1>/dev/null
mv css/css-values $WPTBASEDIR/css

# CSS Will Change Module Level 1 [CSS-WILL-CHANGE-1]
git checkout 1870f621644cc1c9d16403b1fcb59a3a03390905 css/css-will-change 2>/dev/null 1>/dev/null
mv css/css-will-change $WPTBASEDIR/css

# CSS Writing Modes Level 3 [CSS-WRITING-MODES-3] 
git checkout 6085f658ace31a3c962a69d5128cc7e66d79cbb9 css/css-writing-modes 2>/dev/null 1>/dev/null
mv css/css-writing-modes $WPTBASEDIR/css

# CSSOM View Module [CSSOM-VIEW]
git checkout 3806bf2419e25bd57e70b42103478fd3c12a143b css/cssom-view 2>/dev/null 1>/dev/null
mv css/cssom-view $WPTBASEDIR/css

# Filter Effects Module Level 1 [FILTER-EFFECTS-1]
git checkout 98ed5928328dd2121d13752ec7c84e1e29c39f4b css/filter-effects 2>/dev/null 1>/dev/null
mv css/filter-effects $WPTBASEDIR/css

# Media Queries [CSS3-MEDIAQUERIES]
git checkout ea1821d4bd24ed1e859db03571cca8e783dbf957 css/mediaqueries 2>/dev/null 1>/dev/null
mv css/mediaqueries $WPTBASEDIR/css

# Resize Observer [RESIZE-OBSERVER-1]
git checkout 9adb08e545f44c24c12a01f105f1683f254d53fe resize-observer 2>/dev/null 1>/dev/null
mv resize-observer $WPTBASEDIR

# Selectors Level 3 [SELECT]
git checkout eff766e5c8c39be7b9bff064bce3a18eb2953ac5 css/selectors 2>/dev/null 1>/dev/null
mv css/selectors $WPTBASEDIR/css

# Web Animations [WEB-ANIMATIONS]
git checkout d5f5d7335e970ba6dcfb319e1c238a69aa5d3c9a web-animations 2>/dev/null 1>/dev/null
mv web-animations $WPTBASEDIR/css

############################
# 3.5 Media specifications #
############################

# Encrypted Media Extensions [ENCRYPTED-MEDIA]
git checkout 5845bba1671bad710561b6b6e5825989878bb44c encrypted-media 2>/dev/null 1>/dev/null
mv encrypted-media $WPTBASEDIR

# Media Capabilities [MEDIA-CAPABILITIES]
git checkout 506012797996fbbd867a28ac9d4af4f22cd54d7d media-capabilities 2>/dev/null 1>/dev/null
mv media-capabilities $WPTBASEDIR

# Media Source Extensions [MEDIA-SOURCE]
git checkout e0dc0f1a554ed116efa992a7095def76c58e13ee media-source 2>/dev/null 1>/dev/null
mv media-source $WPTBASEDIR

# Web Audio API [WEBAUDIO]
git checkout 6a6a92e48d907b3c5a9b2be2386aecc4e67c8b99 webaudio 2>/dev/null 1>/dev/null
mv webaudio $WPTBASEDIR

# WebRTC 1.0: Real-Time Communication Between Browsers [WEBRTC] 
git checkout ef25073ba134d69dd457592477e18dde23a5a15b webrtc 2>/dev/null 1>/dev/null
mv webrtc $WPTBASEDIR
git checkout 3d93078c411196cf83fcc4158f479987b77a18bd webrtc-extensions 2>/dev/null 1>/dev/null
mv webrtc-extensions $WPTBASEDIR
git checkout d3d67f35d9bfe830ccdb0c070cab75ef5b0211c6 webrtc-identity 2>/dev/null 1>/dev/null
mv webrtc-identity $WPTBASEDIR
git checkout a387de647cf491e011ae155311640f1c914fd2f1 webrtc-priority 2>/dev/null 1>/dev/null
mv webrtc-priority $WPTBASEDIR
git checkout e880d97b7cc36c5f3c7f794c7427b46b746e656a webrtc-stats 2>/dev/null 1>/dev/null
mv webrtc-stats $WPTBASEDIR
git checkout a387de647cf491e011ae155311640f1c914fd2f1 webrtc-svc 2>/dev/null 1>/dev/null
mv webrtc-svc $WPTBASEDIR

###############################
# 3.6 Graphics specifications #
###############################

# Fullscreen API Standard [FULLSCREEN]
git checkout 7f6dfe9acab13bc9e86c0fc8c9bf24aee058671b fullscreen 2>/dev/null 1>/dev/null
mv fullscreen $WPTBASEDIR

# Graphics Interchange Format [GIF]
echo "No tests specified for Graphics Interchange Format [GIF]"

# HTML Canvas 2D Context [2DCONTEXT]
git checkout d3ec3f4e594a902b99c4d0b7ab9122f215e2a543 html/canvas/element 2>/dev/null 1>/dev/null
mv html/canvas/element $WPTBASEDIR/2dcontext
git checkout d3ec3f4e594a902b99c4d0b7ab9122f215e2a543 html/canvas/resources 2>/dev/null 1>/dev/null
mv html/canvas/resources $WPTBASEDIR/html/canvas
git checkout d3ec3f4e594a902b99c4d0b7ab9122f215e2a543 images 2>/dev/null 1>/dev/null
mv images $WPTBASEDIR/images
ln -s $WPTBASEDIR/images $WPTBASEDIR/html/canvas/images

# JPEG File Interchange Format [JPEG]
echo "No tests specified for JPEG File Interchange Format [JPEG]"

# Portable Network Graphics (PNG) Specification (Second Edition) [PNG]
echo "No tests specified for Portable Network Graphics (PNG) Specification (Second Edition) [PNG]"

###########################
# 3.7 Font specifications #
###########################

# Open Font Format [OPEN-FONT-FORMAT]
git checkout d9a933a853acb263fe849b9fcfa0c16278d9ce08 fonts 2>/dev/null 1>/dev/null
mv fonts $WPTBASEDIR

# WOFF File Format 1.0 [WOFF]
git checkout d9a933a853acb263fe849b9fcfa0c16278d9ce08 fonts 2>/dev/null 1>/dev/null
echo "No tests specified for WOFF File Format 1.0 [WOFF]"

#################################
# 3.8 Networking specifications #
#################################

# Fetch [FETCH]
git checkout 5fc81f8eaa41bf9ea8ffb9a0869c426a02ff2f64 fetch 2>/dev/null 1>/dev/null
mv fetch $WPTBASEDIR

# XMLHttpRequest [XHR]
git checkout 45757066960382cf9cb7828a1db8859bed766bcc xhr 2>/dev/null 1>/dev/null
mv xhr $WPTBASEDIR

###############################
# 3.9 Security specifications #
###############################

# Content Security Policy Level 2 [CSP2]
git checkout 94d018bb5d7c0d46df7ba1ac1efdbaa88bc159dc content-security-policy 2>/dev/null 1>/dev/null
mv content-security-policy $WPTBASEDIR

# Referrer Policy [REFERRER-POLICY]
git checkout cd9e10befb1edcbb7d04e06ef7255e56c72c07e8 referrer-policy 2>/dev/null 1>/dev/null
mv referrer-policy $WPTBASEDIR

# Subresource Integrity [SRI]
git checkout 8fefedccb9ae49bddd9c84d22b21177f156a561e subresource-integrity 2>/dev/null 1>/dev/null
mv subresource-integrity $WPTBASEDIR

# Transport Layer Security (TLS) Protocol Version 1.2 [RFC5246]
echo "No tests specified for Transport Layer Security (TLS) Protocol Version 1.2 [RFC5246]"

# Transport Layer Security (TLS) Protocol Version 1.3 [RFC8446]
echo "No tests specified for Transport Layer Security (TLS) Protocol Version 1.3 [RFC8446]"

# Upgrade Insecure Requests [UPGRADE-INSECURE-REQUESTS]
git checkout b4b88e7de8f61c8c8fe1ac615fd883b3a042709f upgrade-insecure-requests 2>/dev/null 1>/dev/null
mv upgrade-insecure-requests $WPTBASEDIR

# Web Cryptography API [WEBCRYPTOAPI]
git checkout 14236258ece08c439179427a25f0a2102f5664df WebCryptoAPI 2>/dev/null 1>/dev/null
mv WebCryptoAPI $WPTBASEDIR

#######################################
# 3.10 Web Performance specifications #
#######################################

# Beacon [BEACON]
git checkout a341862f7bf55470eb456fbdbb20e465508e7cb9 beacon 2>/dev/null 1>/dev/null
mv beacon $WPTBASEDIR

# High Resolution Time [HR-TIME-3]
git checkout 34cafd797e58dad280d20040eee012d49ccfa91f hr-time 2>/dev/null 1>/dev/null
mv hr-time $WPTBASEDIR

# Navigation Timing [NAVIGATION-TIMING]
git checkout df24fb604e2d40528ac1d1b5dd970e32fc5c2978 navigation-timing 2>/dev/null 1>/dev/null
mv navigation-timing $WPTBASEDIR

# Performance Timeline [PERFORMANCE-TIMELINE]
git checkout be3a186dffd88ba0faacab930f4650cd2ad4d1e3 performance-timeline 2>/dev/null 1>/dev/null
mv performance-timeline $WPTBASEDIR

# Resource Timing Level 1 [RESOURCE-TIMING-1]
git checkout 8614aa74e398265046d9b710814aa4bdeec4eb54 resource-timing 2>/dev/null 1>/dev/null
mv resource-timing $WPTBASEDIR

# User Timing Level 2 [USER-TIMING-2]
git checkout df24fb604e2d40528ac1d1b5dd970e32fc5c2978 user-timing 2>/dev/null 1>/dev/null
mv user-timing $WPTBASEDIR

#################################
# 3.11 Other web specifications #
#################################

# Indexed Database API [INDEXEDDB]
git checkout b57479444fa21e2854dfb876f36f14f437ef7e35 IndexedDB 2>/dev/null 1>/dev/null
mv IndexedDB $WPTBASEDIR

# File API [FILEAPI]
git checkout 3421aafbd5cd90bccc9274a0e975679630dcb55b FileAPI 2>/dev/null 1>/dev/null
mv FileAPI $WPTBASEDIR

# Notifications API [NOTIFICATIONS] 
git checkout e1e258720df02a79ead784006c7c8b92c7064caa notifications 2>/dev/null 1>/dev/null
mv notifications $WPTBASEDIR

# Service Workers 1 [SERVICE-WORKERS-1]
git checkout 8ee81d9c52f7c47292ba8ae731b52de03a078352 service-workers 2>/dev/null 1>/dev/null
mv service-workers $WPTBASEDIR

# UI Events [UIEVENTS]
git checkout 3211c4aa3ac8fa08e397c74b0e81156992d4dbfc uievents 2>/dev/null 1>/dev/null
mv uievents $WPTBASEDIR


# Separate checkout for specific version of IndexedDB

#BRANCHORCOMMITID=eaf5d6035d68da3593b0b50b8b25a0cb64fc1f5e
#rm -rf .git/info/sparse-checkout

# Install node modules
echo "Installing node modules ..."
cd $WPTBASEDIR/tools/wave && npm install 2>/dev/null 1>/dev/null

# Integrate ECMASCRIPT tests [ECMASCRIPT-2022]
ECMADISTDIR=$DISTDIR/es6-tests
cd $WPTBASEDIR
echo "Fetching ecmascript test files ..."
git clone https://github.com/tc39/test262.git $ECMADISTDIR 2>/dev/null 1>/dev/null
cd $ECMADISTDIR
git checkout f6179a6eb62c0ce83f32d8f11d127463fe30ee1a 2>/dev/null 1>/dev/null #this is the Commit ID from Jun 27, 2022. ES2022 was released in June 2022
cd $WPTBASEDIR
echo "Generating ecmascript tests ..."
node tools/wave/ecmascript/generate-tests.js $ECMADISTDIR
cp $ECMADISTDIR/LICENSE $WPTBASEDIR/ecmascript
rm -rf ecmascript/tests/**/*lookBehind*
rm -rf ecmascript/tests/**/*lookbehind*

# Integrate webgl tests [WEBGL-103]
WEBGLDISTDIR=$DISTDIR/webgl
cd $WPTBASEDIR
echo "Fetching webgl test files ..."
git clone https://github.com/KhronosGroup/WebGL $WEBGLDISTDIR 2>/dev/null 1>/dev/null
cd $WEBGLDISTDIR
git checkout 495b85b3505837566e724e9f595354149af547f9 2>/dev/null 1>/dev/null #this is the Commit ID from 06 Jul 2021.
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

# Checkout the wave cookies und url tests
#DISTDIR=wave-extra
#cd $WPTBASEDIR
#rm -rf $DISTDIR
#git clone https://github.com/fraunhoferfokus/WMATS2018-cookies.git $DISTDIR
#cd $DISTDIR
#git checkout master
#cd $WPTBASEDIR

# Remove the dist folder before manifest generation
rm -rf $DISTDIR

# delete old MANIFEST.json
#rm MANIFEST.json

# build the MANIFEST.json
#echo "Building MANIFEST.json ..."
#./wpt manifest --no-download --work

echo "now run './wpt serve-wave --report'"
