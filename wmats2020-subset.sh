#!/bin/bash

DISTDIR=dist/wmats2018
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
rm -rf $WPTBASEDIR/appmanifest
rm -rf $WPTBASEDIR/audio-output
rm -rf $WPTBASEDIR/background-fetch
rm -rf $WPTBASEDIR/BackgroundSync
rm -rf $WPTBASEDIR/badging
rm -rf $WPTBASEDIR/battery-status
rm -rf $WPTBASEDIR/beacon
rm -rf $WPTBASEDIR/bluetooth
rm -rf $WPTBASEDIR/clear-site-data
rm -rf $WPTBASEDIR/client-hints
rm -rf $WPTBASEDIR/clipboard-apis
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
rm -rf $WPTBASEDIR/document-policy
rm -rf $WPTBASEDIR/dom
rm -rf $WPTBASEDIR/domparsing
rm -rf $WPTBASEDIR/domxpath
rm -rf $WPTBASEDIR/dpub-aam
rm -rf $WPTBASEDIR/dpub-aria
rm -rf $WPTBASEDIR/editing
rm -rf $WPTBASEDIR/element-timing
rm -rf $WPTBASEDIR/encoding
rm -rf $WPTBASEDIR/encoding-detection
rm -rf $WPTBASEDIR/encrypted-media
rm -rf $WPTBASEDIR/entries-api
rm -rf $WPTBASEDIR/eventsource
rm -rf $WPTBASEDIR/event-timing
rm -rf $WPTBASEDIR/feature-policy
rm -rf $WPTBASEDIR/fetch
rm -rf $WPTBASEDIR/FileAPI
rm -rf $WPTBASEDIR/file-system-access
rm -rf $WPTBASEDIR/focus
rm -rf $WPTBASEDIR/font-access
rm -rf $WPTBASEDIR/fonts
rm -rf $WPTBASEDIR/forced-colors-mode
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
rm -rf $WPTBASEDIR/mathml
rm -rf $WPTBASEDIR/measure-memory
rm -rf $WPTBASEDIR/media
rm -rf $WPTBASEDIR/media-capabilities
rm -rf $WPTBASEDIR/mediacapture-depth
rm -rf $WPTBASEDIR/mediacapture-fromelement
rm -rf $WPTBASEDIR/mediacapture-image
rm -rf $WPTBASEDIR/mediacapture-insertable-streams
rm -rf $WPTBASEDIR/mediacapture-record
rm -rf $WPTBASEDIR/mediacapture-streams
rm -rf $WPTBASEDIR/media-playback-quality
rm -rf $WPTBASEDIR/mediasession
rm -rf $WPTBASEDIR/media-source
rm -rf $WPTBASEDIR/merchant-validation
rm -rf $WPTBASEDIR/mimesniff
rm -rf $WPTBASEDIR/mixed-content
rm -rf $WPTBASEDIR/mst-content-hint
rm -rf $WPTBASEDIR/native-io
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
rm -rf $WPTBASEDIR/signed-exchange
rm -rf $WPTBASEDIR/speech-api
rm -rf $WPTBASEDIR/storage
rm -rf $WPTBASEDIR/storage-access-api
rm -rf $WPTBASEDIR/streams
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
rm -rf $WPTBASEDIR/web-locks
rm -rf $WPTBASEDIR/webmessaging
rm -rf $WPTBASEDIR/webmidi
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
rm -rf $WPTBASEDIR/window-segments
rm -rf $WPTBASEDIR/workers
rm -rf $WPTBASEDIR/worklets
rm -rf $WPTBASEDIR/x-frame-options
rm -rf $WPTBASEDIR/xhr
rm -rf $WPTBASEDIR/xslt

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
git checkout 5fb2692263f71ff8cb1b8af8349c3873d69e6ba5 dom 2>/dev/null 1>/dev/null
mv dom $WPTBASEDIR

# HTML [HTML]
git checkout 40dc04fca82111bedc417296361bd5f31333bef8 html 2>/dev/null 1>/dev/null
rm -rf html/**/*shared-workers*
rm -rf html/canvas/element
rm -rf html/canvas/resources
mv html $WPTBASEDIR
git checkout b83ec322c2c9dbeba625d94351a69136f8584629 websockets 2>/dev/null 1>/dev/null
mv websockets $WPTBASEDIR
git checkout 02ebfda73367c0419e19f83048fa5895a78cb418 webmessaging 2>/dev/null 1>/dev/null
mv webmessaging $WPTBASEDIR
git checkout a7ff355e88929913036932ed16598b4682541d59 webstorage 2>/dev/null 1>/dev/null
mv webstorage $WPTBASEDIR
git checkout 59873545965cc737221c40c4004f2a3c9ce23f28 workers 2>/dev/null 1>/dev/null
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
git checkout 398cdfa444185dda88ca6e87fb12096bc8a82199 css/css-backgrounds 2>/dev/null 1>/dev/null
mv css/css-backgrounds $WPTBASEDIR/css

# CSS Basic User Interface Module Level 3 (CSS3 UI) [CSS-UI-3]
git checkout 545c96ead1616661ce2e97b66450efcf1b032851 css/css-ui 2>/dev/null 1>/dev/null
mv css/css-ui $WPTBASEDIR/css

# CSS Cascading and Inheritance Level 3 [CSS-CASCADE-3]
git checkout 9ad6ebf9fff00dcd46d6c5438ebbd0f7e71c15f8 css/css-cascade 2>/dev/null 1>/dev/null
mv css/css-cascade $WPTBASEDIR/css

# CSS Color Module Level 3 [CSS3-COLOR]
git checkout b6e84edf4a398cc48f4983cbd8398858816996ae css/css-color 2>/dev/null 1>/dev/null
mv css/css-color $WPTBASEDIR/css

# CSS Conditional Rules Module Level 3 [CSS3-CONDITIONAL]
git checkout 01bda5c03bf8ae4ee00251b8969adf1ef69f443d css/css-conditional 2>/dev/null 1>/dev/null
mv css/css-conditional $WPTBASEDIR/css

# CSS Custom Properties For Cascading Variables Module Level 1 [CSS-VARIABLES-1]
git checkout b1f24df9a2e449e0545bf6d74b62c0a40c543fde css/css-variables 2>/dev/null 1>/dev/null
mv css/css-variables $WPTBASEDIR/css

# CSS Easing Functions Level 1 [CSS-EASING-1]
git checkout 9f47205824fa25eca5d9ab2c87a016a7c5c4df3a css/css-easing 2>/dev/null 1>/dev/null
rm -rf css/css-easing/**/*step*
mv css/css-easing $WPTBASEDIR/css

# CSS Flexible Box Layout Module Level 1 [CSS-FLEXBOX-1]
git checkout 9d6f1c1aa7e1daa62c350b3fec18d594792f408a css/css-flexbox 2>/dev/null 1>/dev/null
mv css/css-flexbox $WPTBASEDIR/css

# CSS Fonts Module Level 3 [CSS-FONTS-3]
git checkout 3d83b8688bbd6d9e2a7fc31021bc214cbf0ebcb7 css/css-fonts 2>/dev/null 1>/dev/null
mv css/css-fonts $WPTBASEDIR/css

# CSS Grid Layout Module Level 1 [CSS-GRID-1]
git checkout 8c317250a78e2bd178373528a1e61d550485159d css/css-grid 2>/dev/null 1>/dev/null
mv css/css-grid $WPTBASEDIR/css

# CSS Image Values and Replaced Content Module Level 3 [CSS3-IMAGES]
git checkout 0624a18c9ebc3cc710d1e54dfd5adb5a0a829c42 css/css-images 2>/dev/null 1>/dev/null
mv css/css-images $WPTBASEDIR/css

# CSS Multi-column Layout Module [CSS3-MULTICOL]
git checkout c0b406d151940c4253d59c041d895e763c27e754 css/css-multicol 2>/dev/null 1>/dev/null
mv css/css-multicol $WPTBASEDIR/css

# CSS Namespaces Module Level 3 [CSS-NAMESPACES-3]
git checkout 29f50c937e8be8ccf73dbb8b8e74f0668a1cd426 css/css-namespaces 2>/dev/null 1>/dev/null
mv css/css-namespaces $WPTBASEDIR/css

# CSS Scroll Snap Module Level 1 [CSS-SCROLL-SNAP-1]
git checkout 546f149c579b3c78422d1f998b56edf73b5cfedc css/css-scroll-snap 2>/dev/null 1>/dev/null
mv css/css-scroll-snap $WPTBASEDIR/css

# CSS Shapes Module Level 1 [CSS-SHAPES-1]
git checkout 1cae03c4c11acf12fe20722e5eda3513df9dd79c css/css-shapes 2>/dev/null 1>/dev/null
mv css/css-shapes $WPTBASEDIR/css

# CSS Style Attributes [CSS-STYLE-ATTR]
git checkout a5f707c18b3d893a6e332994064911c2f11e800d css/css-style-attr 2>/dev/null 1>/dev/null
mv css/css-style-attr $WPTBASEDIR/css

# CSS Syntax Module Level 3 [CSS-SYNTAX-3]
git checkout 3696f2233a37437896505b7187968aa605be9255 css/css-syntax 2>/dev/null 1>/dev/null
mv css/css-syntax $WPTBASEDIR/css

# CSS Text Decoration Module Level 3 [CSS-TEXT-DECOR-3]
git checkout c04dd6a79ab11d2c8cf5e0c69848d7b518a30b76 css/css-text-decor 2>/dev/null 1>/dev/null
rm -rf css/css-text-decor/**/*text-emphasis*
mv css/css-text-decor $WPTBASEDIR/css

# CSS Transforms Module Level 1 [CSS-TRANSFORMS-1]
git checkout 5f0da8e0ee156d0561ebcb9c9304dedd06119bd8 css/css-transforms 2>/dev/null 1>/dev/null
mv css/css-transforms $WPTBASEDIR/css

# CSS Transitions [CSS3-TRANSITIONS]
git checkout 2ed850a370f099478001a7ae6bb765d38dab8057 css/css-transitions 2>/dev/null 1>/dev/null
mv css/css-transitions $WPTBASEDIR/css

# CSS Values and Units Module Level 3 [CSS-VALUES]
git checkout 861e227caba7dc9341dd833518f0d01b1e02d0a4 css/css-values 2>/dev/null 1>/dev/null
mv css/css-values $WPTBASEDIR/css

# CSS Will Change Module Level 1 [CSS-WILL-CHANGE-1]
git checkout e5456864c2964700255ba32ea59c1aa46ad1155c css/css-will-change 2>/dev/null 1>/dev/null
mv css/css-will-change $WPTBASEDIR/css

# CSS Writing Modes Level 3 [CSS-WRITING-MODES-3] 
git checkout 6085f658ace31a3c962a69d5128cc7e66d79cbb9 css/css-writing-modes 2>/dev/null 1>/dev/null
rm -rf css/css-writing-modes/**/*text-orientation*
mv css/css-writing-modes $WPTBASEDIR/css

# CSSOM View Module [CSSOM-VIEW]
git checkout 3806bf2419e25bd57e70b42103478fd3c12a143b css/cssom-view 2>/dev/null 1>/dev/null
mv css/cssom-view $WPTBASEDIR/css

# Filter Effects Module Level 1 [FILTER-EFFECTS-1]
git checkout 98ed5928328dd2121d13752ec7c84e1e29c39f4b css/filter-effects 2>/dev/null 1>/dev/null
mv css/filter-effects $WPTBASEDIR/css

# Media Queries [CSS3-MEDIAQUERIES]
git checkout b09e7e2e78695b5e2052bfadd941de602f1e16fb css/mediaqueries 2>/dev/null 1>/dev/null
mv css/mediaqueries $WPTBASEDIR/css

# Selectors Level 3 [SELECT]
git checkout eff766e5c8c39be7b9bff064bce3a18eb2953ac5 css/selectors 2>/dev/null 1>/dev/null
mv css/selectors $WPTBASEDIR/css

############################
# 3.5 Media specifications #
############################

# Encrypted Media Extensions [ENCRYPTED-MEDIA]
git checkout 5845bba1671bad710561b6b6e5825989878bb44c encrypted-media 2>/dev/null 1>/dev/null
mv encrypted-media $WPTBASEDIR

# Media Source Extensions [MEDIA-SOURCE]
git checkout e0dc0f1a554ed116efa992a7095def76c58e13ee media-source 2>/dev/null 1>/dev/null
mv media-source $WPTBASEDIR

# Web Audio API [WEBAUDIO]
git checkout 6a6a92e48d907b3c5a9b2be2386aecc4e67c8b99 webaudio 2>/dev/null 1>/dev/null
rm -rf webaudio/**/*mediastreamaudiosourcenode*
rm -rf webaudio/**/*mediastreamaudiodestinationnode*
mv webaudio $WPTBASEDIR

###############################
# 3.6 Graphics specifications #
###############################

# Fullscreen API Standard [FULLSCREEN]
git checkout 87cd9eb2adafed5d4c6ce08a6716927f4d4fb4ea fullscreen 2>/dev/null 1>/dev/null
mv fullscreen $WPTBASEDIR

# Graphics Interchange Format [GIF]
echo "No tests specified for Graphics Interchange Format [GIF]"

# HTML Canvas 2D Context [2DCONTEXT]
git checkout 178b6bcde9cbb1d8e04076fe59c86ea94f122964 html/canvas/element 2>/dev/null 1>/dev/null
mv html/canvas/element $WPTBASEDIR/2dcontext
git checkout 178b6bcde9cbb1d8e04076fe59c86ea94f122964 html/canvas/resources 2>/dev/null 1>/dev/null
mv html/canvas $WPTBASEDIR/html/canvas
git checkout 178b6bcde9cbb1d8e04076fe59c86ea94f122964 images 2>/dev/null 1>/dev/null
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
git checkout 2f6111ecc1c0bc803a5287e0714f9c715023f5b9 fetch 2>/dev/null 1>/dev/null
mv fetch $WPTBASEDIR

# XMLHttpRequest [XHR]
git checkout a35aa4089a7498dd4e107828c0925823fe512c97 xhr 2>/dev/null 1>/dev/null
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

# High Resolution Time Level 1 [HR-TIME-1]
git checkout 57747da202f050d84df2b73e5821a56b18af66f7 hr-time 2>/dev/null 1>/dev/null
mv hr-time $WPTBASEDIR

# Navigation Timing [NAVIGATION-TIMING]
git checkout df24fb604e2d40528ac1d1b5dd970e32fc5c2978 navigation-timing 2>/dev/null 1>/dev/null
mv navigation-timing $WPTBASEDIR

# Page Visibility Level 2 [PAGE-VISIBILITY-2]
git checkout df24fb604e2d40528ac1d1b5dd970e32fc5c2978 page-visibility 2>/dev/null 1>/dev/null
mv page-visibility $WPTBASEDIR

# Performance Timeline [PERFORMANCE-TIMELINE]
git checkout 561f5a515ff8c39d414581ba2906aa980591d539 performance-timeline 2>/dev/null 1>/dev/null
mv performance-timeline $WPTBASEDIR

# Resource Timing Level 1 [RESOURCE-TIMING-1]
git checkout 794e5cbf23f420cc4394207f22135344255f66aa resource-timing 2>/dev/null 1>/dev/null
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
git checkout 648205dcf15d75c37b7abe7a0c1a2a7128baea36 FileAPI 2>/dev/null 1>/dev/null
mv FileAPI $WPTBASEDIR

# Notifications API [NOTIFICATIONS] 
git checkout 2c5c3c4c27d27a419c1fdba3e9879c2d22037074 notifications 2>/dev/null 1>/dev/null
mv notifications $WPTBASEDIR

# Service Workers 1 [SERVICE-WORKERS-1]
git checkout b26c9dcf86ba2f91e2ea20ad72d67c0ce51b5b5d service-workers 2>/dev/null 1>/dev/null
mv service-workers $WPTBASEDIR

# UI Events [UIEVENTS]
git checkout 66ec292ee48a9a2bbfa2f556e614926cd07211aa uievents 2>/dev/null 1>/dev/null
mv uievents $WPTBASEDIR


# Separate checkout for specific version of IndexedDB

#BRANCHORCOMMITID=eaf5d6035d68da3593b0b50b8b25a0cb64fc1f5e
#rm -rf .git/info/sparse-checkout

# Install node modules
echo "Installing node modules ..."
cd $WPTBASEDIR/tools/wave && npm install 2>/dev/null 1>/dev/null

# Integrate ECMASCRIPT tests [ECMASCRIPT-2020]
ECMADISTDIR=$DISTDIR/es6-tests
cd $WPTBASEDIR
echo "Fetching ecmascript test files ..."
git clone https://github.com/tc39/test262.git $ECMADISTDIR 2>/dev/null 1>/dev/null
cd $ECMADISTDIR
git checkout 59f5b4935985ff456a4f3438bffe0dcc60af1294 2>/dev/null 1>/dev/null #this is the Commit ID from 10 Jul 2020. ES2020 was released on 11 June 2020
cd $WPTBASEDIR
echo "Generating ecmascript tests ..."
node tools/wave/ecmascript/generate-tests.js $ECMADISTDIR
cp $ECMADISTDIR/LICENSE $WPTBASEDIR/ecmascript
rm -rf ecmascript/tests/**/*SharedArrayBuffer*
rm -rf ecmascript/tests/**/*sharedarraybuffer*
rm -rf ecmascript/tests/**/*Atomics*
rm -rf ecmascript/tests/**/*lookBehind*
rm -rf ecmascript/tests/**/*lookbehind*
rm -rf ecmascript/tests/**/*BigInt*
rm -rf ecmascript/tests/**/*bigint*
rm -rf ecmascript/tests/**/*BigUint*
rm -rf ecmascript/tests/**/*biguint*

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
