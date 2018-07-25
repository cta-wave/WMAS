var tests = [
  {
    "url": "Close-1000-reason.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-closeevent-reason",
      "#dom-websocket-close"
    ]
  },
  {
    "url": "Close-1000.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-close"
    ]
  },
  {
    "url": "Close-Reason-124Bytes.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-closeevent-reason",
      "#dom-websocket-close"
    ]
  },
  {
    "url": "Close-reason-unpaired-surrogates.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-closeevent-reason",
      "#dom-websocket-close"
    ]
  },
  {
    "url": "Close-undefined.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-close"
    ]
  },
  {
    "url": "Create-Secure-extensions-empty.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-extensions"
    ]
  },
  {
    "url": "Create-Secure-url-with-space.htm",
    "checks": [
      "#the-websocket-interface",
      "#parsing-websocket-urls"
    ]
  },
  {
    "url": "Create-Secure-valid-url-array-protocols.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-protocol",
      "#parsing-websocket-urls"
    ]
  },
  {
    "url": "Create-Secure-valid-url-binaryType-blob.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-binarytype",
      "#parsing-websocket-urls"
    ]
  },
  {
    "url": "Create-Secure-valid-url-protocol-setCorrectly.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-protocol",
      "#parsing-websocket-urls"
    ]
  },
  {
    "url": "Create-Secure-valid-url-protocol-string.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-protocol",
      "#parsing-websocket-urls"
    ]
  },
  {
    "url": "Create-Secure-valid-url.htm",
    "checks": [
      "#the-websocket-interface",
      "#parsing-websocket-urls"
    ]
  },
  {
    "url": "Create-Secure-verify-url-set-non-default-port.htm",
    "checks": [
      "#the-websocket-interface",
      "#parsing-websocket-urls"
    ]
  },
  {
    "url": "Create-asciiSep-protocol-string.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-protocol"
    ]
  },
  {
    "url": "Create-blocked-port.htm",
    "checks": [
      "#the-websocket-interface"
    ]
  },
  {
    "url": "Create-invalid-urls.htm",
    "checks": [
      "#parsing-websocket-urls"
    ]
  },
  {
    "url": "Create-non-absolute-url.htm",
    "checks": [
      "#parsing-websocket-urls"
    ]
  },
  {
    "url": "Create-nonAscii-protocol-string.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-protocol"
    ]
  },
  {
    "url": "Create-on-worker-shutdown.html",
    "checks": []
  },
  {
    "url": "Create-protocol-with-space.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-protocol"
    ]
  },
  {
    "url": "Create-protocols-repeated-case-insensitive.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-protocol"
    ]
  },
  {
    "url": "Create-protocols-repeated.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-protocol"
    ]
  },
  {
    "url": "Create-valid-url-array-protocols.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-protocol",
      "#parsing-websocket-urls"
    ]
  },
  {
    "url": "Create-valid-url-protocol-empty.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-protocol",
      "#parsing-websocket-urls"
    ]
  },
  {
    "url": "Create-valid-url-protocol.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-protocol",
      "#parsing-websocket-urls"
    ]
  },
  {
    "url": "Create-valid-url.htm",
    "checks": [
      "#parsing-websocket-urls"
    ]
  },
  {
    "url": "Create-verify-url-set-non-default-port.htm",
    "checks": [
      "#parsing-websocket-urls"
    ]
  },
  {
    "url": "Create-wrong-scheme.htm",
    "checks": [
      "#the-websocket-interface",
      "#parsing-websocket-urls"
    ]
  },
  {
    "url": "Secure-Close-1000-reason.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-closeevent-reason",
      "#dom-websocket-close"
    ]
  },
  {
    "url": "Secure-Close-1000-verify-code.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-close"
    ]
  },
  {
    "url": "Secure-Close-1000.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-close"
    ]
  },
  {
    "url": "Secure-Close-1005-verify-code.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-close"
    ]
  },
  {
    "url": "Secure-Close-1005.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-close"
    ]
  },
  {
    "url": "Secure-Close-2999-reason.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-closeevent-reason",
      "#dom-websocket-close"
    ]
  },
  {
    "url": "Secure-Close-3000-reason.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-closeevent-reason",
      "#dom-websocket-close"
    ]
  },
  {
    "url": "Secure-Close-3000-verify-code.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-close"
    ]
  },
  {
    "url": "Secure-Close-4999-reason.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-closeevent-reason",
      "#dom-websocket-close"
    ]
  },
  {
    "url": "Secure-Close-Reason-124Bytes.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-closeevent-reason",
      "#dom-websocket-close"
    ]
  },
  {
    "url": "Secure-Close-Reason-Unpaired-surrogates.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-closeevent-reason",
      "#dom-websocket-close"
    ]
  },
  {
    "url": "Secure-Close-onlyReason.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-closeevent-reason",
      "#dom-websocket-close"
    ]
  },
  {
    "url": "Secure-Close-readyState-Closed.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-readystate",
      "#dom-websocket-close"
    ]
  },
  {
    "url": "Secure-Close-readyState-Closing.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-readystate",
      "#dom-websocket-close"
    ]
  },
  {
    "url": "Secure-Close-server-initiated-close.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-close"
    ]
  },
  {
    "url": "Secure-Close-undefined.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-close"
    ]
  },
  {
    "url": "Secure-Send-65K-data.htm",
    "checks": [
      "#dom-websocket-binarytype"
    ]
  },
  {
    "url": "Secure-Send-binary-65K-arraybuffer.htm",
    "checks": [
      "#dom-websocket-binarytype"
    ]
  },
  {
    "url": "Secure-Send-binary-arraybuffer.htm",
    "checks": [
      "#dom-websocket-binarytype"
    ]
  },
  {
    "url": "Secure-Send-binary-arraybufferview-float32.htm",
    "checks": [
      "#dom-websocket-binarytype"
    ]
  },
  {
    "url": "Secure-Send-binary-arraybufferview-float64.htm",
    "checks": [
      "#dom-websocket-binarytype"
    ]
  },
  {
    "url": "Secure-Send-binary-arraybufferview-int32.htm",
    "checks": [
      "#dom-websocket-binarytype"
    ]
  },
  {
    "url": "Secure-Send-binary-arraybufferview-uint16-offset-length.htm",
    "checks": [
      "#dom-websocket-binarytype"
    ]
  },
  {
    "url": "Secure-Send-binary-arraybufferview-uint32-offset.htm",
    "checks": [
      "#dom-websocket-binarytype"
    ]
  },
  {
    "url": "Secure-Send-binary-arraybufferview-uint8-offset-length.htm",
    "checks": [
      "#dom-websocket-binarytype"
    ]
  },
  {
    "url": "Secure-Send-binary-arraybufferview-uint8-offset.htm",
    "checks": [
      "#dom-websocket-binarytype"
    ]
  },
  {
    "url": "Secure-Send-binary-blob.htm",
    "checks": [
      "#dom-websocket-send",
      "#dom-websocket-binarytype"
    ]
  },
  {
    "url": "Secure-Send-data.htm",
    "checks": [
      "#dom-websocket-send"
    ]
  },
  {
    "url": "Secure-Send-null.htm",
    "checks": [
      "#dom-websocket-send"
    ]
  },
  {
    "url": "Secure-Send-paired-surrogates.htm",
    "checks": [
      "#dom-websocket-send"
    ]
  },
  {
    "url": "Secure-Send-unicode-data.htm",
    "checks": [
      "#dom-websocket-send"
    ]
  },
  {
    "url": "Secure-Send-unpaired-surrogates.htm",
    "checks": [
      "#dom-websocket-send"
    ]
  },
  {
    "url": "Send-0byte-data.htm",
    "checks": [
      "#dom-websocket-send"
    ]
  },
  {
    "url": "Send-65K-data.htm",
    "checks": [
      "#dom-websocket-send"
    ]
  },
  {
    "url": "Send-Unpaired-Surrogates.htm",
    "checks": [
      "#dom-websocket-send"
    ]
  },
  {
    "url": "Send-before-open.htm",
    "checks": [
      "#dom-websocket-send"
    ]
  },
  {
    "url": "Send-binary-65K-arraybuffer.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-binarytype"
    ]
  },
  {
    "url": "Send-binary-arraybuffer.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-binarytype"
    ]
  },
  {
    "url": "Send-binary-arraybufferview-int16-offset.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-binarytype"
    ]
  },
  {
    "url": "Send-binary-arraybufferview-int8.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-binarytype"
    ]
  },
  {
    "url": "Send-binary-blob.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-binarytype"
    ]
  },
  {
    "url": "Send-data.htm",
    "checks": [
      "#dom-websocket-send"
    ]
  },
  {
    "url": "Send-null.htm",
    "checks": [
      "#dom-websocket-send"
    ]
  },
  {
    "url": "Send-paired-surrogates.htm",
    "checks": [
      "#dom-websocket-send"
    ]
  },
  {
    "url": "Send-unicode-data.htm",
    "checks": [
      "#dom-websocket-send"
    ]
  },
  {
    "url": "binaryType-wrong-value.htm",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-binarytype"
    ]
  },
  {
    "url": "constructor.html",
    "checks": [
      "#the-websocket-interface"
    ]
  },
  {
    "url": "eventhandlers.html",
    "checks": [
      "#the-websocket-interface"
    ]
  },
  {
    "url": "extended-payload-length.html",
    "checks": [
      "#the-websocket-interface"
    ]
  },
  {
    "url": "constructor/001.html",
    "checks": [
      "#the-websocket-interface"
    ]
  },
  {
    "url": "constructor/002.html",
    "checks": [
      "#the-websocket-interface"
    ]
  },
  {
    "url": "constructor/004.html",
    "checks": [
      "#the-websocket-interface"
    ]
  },
  {
    "url": "constructor/005.html",
    "checks": [
      "#the-websocket-interface"
    ]
  },
  {
    "url": "constructor/006.html",
    "checks": [
      "#the-websocket-interface"
    ]
  },
  {
    "url": "constructor/007.html",
    "checks": [
      "#the-websocket-interface"
    ]
  },
  {
    "url": "constructor/008.html",
    "checks": [
      "#the-websocket-interface"
    ]
  },
  {
    "url": "constructor/009.html",
    "checks": [
      "#the-websocket-interface"
    ]
  },
  {
    "url": "constructor/010.html",
    "checks": [
      "#the-websocket-interface"
    ]
  },
  {
    "url": "constructor/011.html",
    "checks": [
      "#the-websocket-interface"
    ]
  },
  {
    "url": "constructor/012.html",
    "checks": [
      "#the-websocket-interface"
    ]
  },
  {
    "url": "constructor/013.html",
    "checks": [
      "#the-websocket-interface"
    ]
  },
  {
    "url": "constructor/014.html",
    "checks": [
      "#the-websocket-interface"
    ]
  },
  {
    "url": "constructor/016.html",
    "checks": [
      "#the-websocket-interface"
    ]
  },
  {
    "url": "constructor/017.html",
    "checks": [
      "#the-websocket-interface"
    ]
  },
  {
    "url": "constructor/018.html",
    "checks": [
      "#the-websocket-interface"
    ]
  },
  {
    "url": "constructor/019.html",
    "checks": [
      "#the-websocket-interface"
    ]
  },
  {
    "url": "constructor/020.html",
    "checks": [
      "#the-websocket-interface"
    ]
  },
  {
    "url": "constructor/021.html",
    "checks": [
      "#the-websocket-interface"
    ]
  },
  {
    "url": "constructor/022.html",
    "checks": [
      "#the-websocket-interface"
    ]
  },
  {
    "url": "binary/001.html",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-binarytype"
    ]
  },
  {
    "url": "binary/002.html",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-binarytype"
    ]
  },
  {
    "url": "binary/004.html",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-binarytype"
    ]
  },
  {
    "url": "binary/005.html",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-binarytype"
    ]
  },
  {
    "url": "closing-handshake/002.html",
    "checks": [
      "#the-websocket-interface"
    ]
  },
  {
    "url": "closing-handshake/003.html",
    "checks": [
      "#the-websocket-interface"
    ]
  },
  {
    "url": "closing-handshake/004.html",
    "checks": [
      "#the-websocket-interface"
    ]
  },
  {
    "url": "cookies/001.html",
    "checks": [
      "#feedback-from-the-protocol"
    ]
  },
  {
    "url": "cookies/002.html",
    "checks": [
      "#feedback-from-the-protocol"
    ]
  },
  {
    "url": "cookies/003.html",
    "checks": [
      "#feedback-from-the-protocol"
    ]
  },
  {
    "url": "cookies/004.html",
    "checks": [
      "#feedback-from-the-protocol"
    ]
  },
  {
    "url": "cookies/005.html",
    "checks": [
      "#feedback-from-the-protocol"
    ]
  },
  {
    "url": "cookies/006.html",
    "checks": [
      "#feedback-from-the-protocol"
    ]
  },
  {
    "url": "cookies/007.html",
    "checks": [
      "#feedback-from-the-protocol"
    ]
  },
  {
    "url": "keeping-connection-open/001.html",
    "checks": [
      "#the-websocket-interface",
      "#ping-and-pong-frames"
    ]
  },
  {
    "url": "multi-globals/message-received.html",
    "checks": [
      "#feedback-from-the-protocol"
    ]
  },
  {
    "url": "opening-handshake/001.html",
    "checks": [
      "#the-websocket-interface"
    ]
  },
  {
    "url": "opening-handshake/002.html",
    "checks": [
      "#the-websocket-interface"
    ]
  },
  {
    "url": "opening-handshake/003.html",
    "checks": [
      "#the-websocket-interface"
    ]
  },
  {
    "url": "opening-handshake/005.html",
    "checks": [
      "#the-websocket-interface"
    ]
  },
  {
    "url": "security/001.html",
    "checks": []
  },
  {
    "url": "security/002.html",
    "checks": []
  },
  {
    "url": "unload-a-document/001-1.html",
    "checks": []
  },
  {
    "url": "unload-a-document/001-2.html",
    "checks": []
  },
  {
    "url": "unload-a-document/001.html",
    "checks": []
  },
  {
    "url": "unload-a-document/002-1.html",
    "checks": []
  },
  {
    "url": "unload-a-document/002-2.html",
    "checks": []
  },
  {
    "url": "unload-a-document/002.html",
    "checks": []
  },
  {
    "url": "unload-a-document/003.html",
    "checks": []
  },
  {
    "url": "unload-a-document/004.html",
    "checks": []
  },
  {
    "url": "unload-a-document/005-1.html",
    "checks": []
  },
  {
    "url": "unload-a-document/005.html",
    "checks": []
  },
  {
    "url": "interfaces/CloseEvent/clean-close.html",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-close"
    ]
  },
  {
    "url": "interfaces/CloseEvent/constructor.html",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-close"
    ]
  },
  {
    "url": "interfaces/CloseEvent/historical.html",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-close"
    ]
  },
  {
    "url": "interfaces/WebSocket/bufferedAmount/bufferedAmount-arraybuffer.html",
    "checks": [
      "#dom-websocket-binarytype",
      "#dom-websocket-bufferedamount"
    ]
  },
  {
    "url": "interfaces/WebSocket/bufferedAmount/bufferedAmount-blob.html",
    "checks": [
      "#dom-websocket-binarytype",
      "#dom-websocket-bufferedamount"
    ]
  },
  {
    "url": "interfaces/WebSocket/bufferedAmount/bufferedAmount-defineProperty-getter.html",
    "checks": [
      "#dom-websocket-bufferedamount"
    ]
  },
  {
    "url": "interfaces/WebSocket/bufferedAmount/bufferedAmount-defineProperty-setter.html",
    "checks": [
      "#dom-websocket-bufferedamount"
    ]
  },
  {
    "url": "interfaces/WebSocket/bufferedAmount/bufferedAmount-deleting.html",
    "checks": [
      "#dom-websocket-bufferedamount"
    ]
  },
  {
    "url": "interfaces/WebSocket/bufferedAmount/bufferedAmount-getting.html",
    "checks": [
      "#dom-websocket-bufferedamount"
    ]
  },
  {
    "url": "interfaces/WebSocket/bufferedAmount/bufferedAmount-initial.html",
    "checks": [
      "#dom-websocket-bufferedamount"
    ]
  },
  {
    "url": "interfaces/WebSocket/bufferedAmount/bufferedAmount-large.html",
    "checks": [
      "#dom-websocket-bufferedamount"
    ]
  },
  {
    "url": "interfaces/WebSocket/bufferedAmount/bufferedAmount-readonly.html",
    "checks": [
      "#dom-websocket-bufferedamount"
    ]
  },
  {
    "url": "interfaces/WebSocket/bufferedAmount/bufferedAmount-unicode.html",
    "checks": [
      "#dom-websocket-bufferedamount"
    ]
  },
  {
    "url": "interfaces/WebSocket/close/close-basic.html",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-close"
    ]
  },
  {
    "url": "interfaces/WebSocket/close/close-connecting.html",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-close"
    ]
  },
  {
    "url": "interfaces/WebSocket/close/close-multiple.html",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-close"
    ]
  },
  {
    "url": "interfaces/WebSocket/close/close-nested.html",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-close"
    ]
  },
  {
    "url": "interfaces/WebSocket/close/close-replace.html",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-close"
    ]
  },
  {
    "url": "interfaces/WebSocket/close/close-return.html",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-close"
    ]
  },
  {
    "url": "interfaces/WebSocket/constants/001.html",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-readystate"
    ]
  },
  {
    "url": "interfaces/WebSocket/constants/002.html",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-readystate"
    ]
  },
  {
    "url": "interfaces/WebSocket/constants/003.html",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-readystate"
    ]
  },
  {
    "url": "interfaces/WebSocket/constants/004.html",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-readystate"
    ]
  },
  {
    "url": "interfaces/WebSocket/constants/005.html",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-readystate"
    ]
  },
  {
    "url": "interfaces/WebSocket/constants/006.html",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-readystate"
    ]
  },
  {
    "url": "interfaces/WebSocket/events/001.html",
    "checks": [
      "#the-websocket-interface",
      "#event-definitions"
    ]
  },
  {
    "url": "interfaces/WebSocket/events/002.html",
    "checks": [
      "#the-websocket-interface",
      "#event-definitions"
    ]
  },
  {
    "url": "interfaces/WebSocket/events/003.html",
    "checks": [
      "#the-websocket-interface",
      "#event-definitions"
    ]
  },
  {
    "url": "interfaces/WebSocket/events/004.html",
    "checks": [
      "#the-websocket-interface",
      "#event-definitions"
    ]
  },
  {
    "url": "interfaces/WebSocket/events/006.html",
    "checks": [
      "#the-websocket-interface",
      "#event-definitions"
    ]
  },
  {
    "url": "interfaces/WebSocket/events/007.html",
    "checks": [
      "#the-websocket-interface",
      "#event-definitions"
    ]
  },
  {
    "url": "interfaces/WebSocket/events/008.html",
    "checks": [
      "#the-websocket-interface",
      "#event-definitions"
    ]
  },
  {
    "url": "interfaces/WebSocket/events/009.html",
    "checks": [
      "#the-websocket-interface",
      "#event-definitions"
    ]
  },
  {
    "url": "interfaces/WebSocket/events/010.html",
    "checks": [
      "#the-websocket-interface",
      "#event-definitions"
    ]
  },
  {
    "url": "interfaces/WebSocket/events/011.html",
    "checks": [
      "#the-websocket-interface",
      "#event-definitions"
    ]
  },
  {
    "url": "interfaces/WebSocket/events/012.html",
    "checks": [
      "#the-websocket-interface",
      "#event-definitions"
    ]
  },
  {
    "url": "interfaces/WebSocket/events/013.html",
    "checks": [
      "#the-websocket-interface",
      "#event-definitions"
    ]
  },
  {
    "url": "interfaces/WebSocket/events/014.html",
    "checks": [
      "#the-websocket-interface",
      "#event-definitions"
    ]
  },
  {
    "url": "interfaces/WebSocket/events/015.html",
    "checks": [
      "#the-websocket-interface",
      "#event-definitions"
    ]
  },
  {
    "url": "interfaces/WebSocket/events/016.html",
    "checks": [
      "#the-websocket-interface",
      "#event-definitions"
    ]
  },
  {
    "url": "interfaces/WebSocket/events/017.html",
    "checks": [
      "#the-websocket-interface",
      "#event-definitions"
    ]
  },
  {
    "url": "interfaces/WebSocket/events/018.html",
    "checks": [
      "#the-websocket-interface",
      "#event-definitions"
    ]
  },
  {
    "url": "interfaces/WebSocket/events/019.html",
    "checks": [
      "#the-websocket-interface",
      "#event-definitions"
    ]
  },
  {
    "url": "interfaces/WebSocket/events/020.html",
    "checks": [
      "#the-websocket-interface",
      "#event-definitions"
    ]
  },
  {
    "url": "interfaces/WebSocket/extensions/001.html",
    "checks": [
      "#the-websocket-interface",
      "#feedback-from-the-protocol",
      "#dom-websocket-extensions"
    ]
  },
  {
    "url": "interfaces/WebSocket/protocol/protocol-initial.html",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-protocol"
    ]
  },
  {
    "url": "interfaces/WebSocket/readyState/001.html",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-readystate"
    ]
  },
  {
    "url": "interfaces/WebSocket/readyState/002.html",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-readystate"
    ]
  },
  {
    "url": "interfaces/WebSocket/readyState/003.html",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-readystate"
    ]
  },
  {
    "url": "interfaces/WebSocket/readyState/004.html",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-readystate"
    ]
  },
  {
    "url": "interfaces/WebSocket/readyState/005.html",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-readystate"
    ]
  },
  {
    "url": "interfaces/WebSocket/readyState/006.html",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-readystate"
    ]
  },
  {
    "url": "interfaces/WebSocket/readyState/007.html",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-readystate"
    ]
  },
  {
    "url": "interfaces/WebSocket/readyState/008.html",
    "checks": [
      "#the-websocket-interface",
      "#dom-websocket-readystate"
    ]
  },
  {
    "url": "interfaces/WebSocket/send/001.html",
    "checks": [
      "#dom-websocket-send"
    ]
  },
  {
    "url": "interfaces/WebSocket/send/002.html",
    "checks": [
      "#dom-websocket-send"
    ]
  },
  {
    "url": "interfaces/WebSocket/send/003.html",
    "checks": [
      "#dom-websocket-send"
    ]
  },
  {
    "url": "interfaces/WebSocket/send/004.html",
    "checks": [
      "#dom-websocket-send"
    ]
  },
  {
    "url": "interfaces/WebSocket/send/005.html",
    "checks": [
      "#dom-websocket-send"
    ]
  },
  {
    "url": "interfaces/WebSocket/send/006.html",
    "checks": [
      "#dom-websocket-send"
    ]
  },
  {
    "url": "interfaces/WebSocket/send/007.html",
    "checks": [
      "#dom-websocket-send"
    ]
  },
  {
    "url": "interfaces/WebSocket/send/008.html",
    "checks": [
      "#dom-websocket-send"
    ]
  },
  {
    "url": "interfaces/WebSocket/send/009.html",
    "checks": [
      "#dom-websocket-send"
    ]
  },
  {
    "url": "interfaces/WebSocket/send/010.html",
    "checks": [
      "#dom-websocket-send"
    ]
  },
  {
    "url": "interfaces/WebSocket/send/011.html",
    "checks": [
      "#dom-websocket-send"
    ]
  },
  {
    "url": "interfaces/WebSocket/send/012.html",
    "checks": [
      "#dom-websocket-send"
    ]
  },
  {
    "url": "interfaces/WebSocket/url/001.html",
    "checks": [
      "#parsing-websocket-urls"
    ]
  },
  {
    "url": "interfaces/WebSocket/url/002.html",
    "checks": [
      "#parsing-websocket-urls"
    ]
  },
  {
    "url": "interfaces/WebSocket/url/003.html",
    "checks": [
      "#parsing-websocket-urls"
    ]
  },
  {
    "url": "interfaces/WebSocket/url/004.html",
    "checks": [
      "#parsing-websocket-urls"
    ]
  },
  {
    "url": "interfaces/WebSocket/url/005.html",
    "checks": [
      "#parsing-websocket-urls"
    ]
  },
  {
    "url": "interfaces/WebSocket/url/006.html",
    "checks": [
      "#parsing-websocket-urls"
    ]
  },
  {
    "url": "interfaces/WebSocket/url/resolve.html",
    "checks": [
      "#parsing-websocket-urls"
    ]
  }
]