#!/bin/bash

DISTDIR=dist/wmas2017
BRANCHORCOMMITID=a8a8377b1ecb700709c923f3e72b513eedb3c0c2

WPTBASEDIR=`pwd`
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

# HTML 5.1 [HTML51], devices acting as Web browsers that support the HTML syntax and the XHTML syntax, scripting, and the suggested default rendering.
echo "html/*" >> .git/info/sparse-checkout
# ECMAScript Language Specification, Edition 5.1 [ECMASCRIPT-5.1]
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
echo "css/css-syntax/*" >> .git/info/sparse-checkout
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
echo "[OPEN-FONT-FORMAT] TO BE INTEGRATED"
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
# Web Storage [WEBSTORAGE]
echo "webstorage/*" >> .git/info/sparse-checkout
# Web Workers [WORKERS]
# Exceptions: Shared Workers are not yet widely supported.
echo "workers/*" >> .git/info/sparse-checkout
# Indexed Database API [IndexedDB-20150108]
# Exceptions: Array key path and array keys are not yet widely supported.
# Separate checkout. See below.
# Cross-document messaging [WEB-MESSAGING]
# Channel messaging [CHANNEL-MESSAGING]
echo "webmessaging/*" >> .git/info/sparse-checkout
# Web Notifications [notifications-20151022]
# Separate checkout. See below.

# Additionally requested tests
# uievents
echo "uievents/*" >> .git/info/sparse-checkout
# websockets
# already in, see above
# cssom-view
echo "css/cssom-view/*" >> .git/info/sparse-checkout
# dom4
echo "dom/*" >> .git/info/sparse-checkout

git pull origin master
git checkout -b WMAS2017 $BRANCHORCOMMITID

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

# Indexed Database API [IndexedDB-20150108]
# Exceptions: Array key path and array keys are not yet widely supported.
echo "IndexedDB/*" >> .git/info/sparse-checkout
git read-tree -mu HEAD
git checkout -b WMAS2017-IndexedDB $BRANCHORCOMMITID
rm -rf $WPTBASEDIR/IndexedDB/
cp -R ./* $WPTBASEDIR

# Separate checkout for specific version of notifications

BRANCHORCOMMITID=7632a8cb9383898ded73af1880c92f3714f4bac4
rm -rf .git/info/sparse-checkout

# Web Notifications [notifications-20151022]
# Separate checkout. See below.
echo "notifications/*" >> .git/info/sparse-checkout
git read-tree -mu HEAD
git checkout -b WMAS2017-notifications $BRANCHORCOMMITID
rm -rf $WPTBASEDIR/notifications/
cp -R ./* $WPTBASEDIR

# Integrate ECMASCRIPT tests [ECMASCRIPT-5.1]
DISTDIR=dist/es5-tests
cd $WPTBASEDIR
rm -rf $WPTBASEDIR/ecmascript
rm -rf $DISTDIR
git clone https://github.com/tc39/test262.git -b es5-tests $DISTDIR
node tools/wave/ecmascript/generate-tests.js $DISTDIR

# Remove the dist folder before manifest generation
rm -rf dist

# build the MANIFEST.json
./wpt manifest --no-download --work

echo "now run './wave start' and './wpt serve'"
