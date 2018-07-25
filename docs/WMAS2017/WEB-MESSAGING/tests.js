var tests = [
  {
    "url": "Channel_postMessage_Blob.htm",
    "checks": [
      "#channel-messaging",
      "#message-channels",
      "#message-ports",
      "#posting-messages"
    ]
  },
  {
    "url": "Channel_postMessage_DataCloneErr.htm",
    "checks": [
      "#channel-messaging",
      "#message-channels",
      "#message-ports",
      "#posting-messages"
    ]
  },
  {
    "url": "Channel_postMessage_clone_port.htm",
    "checks": [
      "#channel-messaging",
      "#message-channels",
      "#message-ports",
      "#posting-messages"
    ]
  },
  {
    "url": "Channel_postMessage_clone_port_error.htm",
    "checks": [
      "#channel-messaging",
      "#message-channels",
      "#message-ports",
      "#posting-messages"
    ]
  },
  {
    "url": "Channel_postMessage_event_properties.htm",
    "checks": [
      "#channel-messaging",
      "#message-channels",
      "#message-ports",
      "#posting-messages"
    ]
  },
  {
    "url": "Channel_postMessage_ports_readonly_array.htm",
    "checks": [
      "#message-ports",
      "#message-channels",
      "#channel-messaging",
      "#posting-messages"
    ]
  },
  {
    "url": "Channel_postMessage_target_source.htm",
    "checks": [
      "#channel-messaging",
      "#message-ports",
      "#message-channels",
      "#posting-messages"
    ]
  },
  {
    "url": "MessageEvent-trusted.html",
    "checks": [
      "#posting-messages",
      "#channel-messaging",
      "#message-channels",
      "#message-ports",
      "#security-postmsg"
    ]
  },
  {
    "url": "MessageEvent.html",
    "checks": [
      "#posting-messages",
      "#channel-messaging",
      "#message-channels",
      "#message-ports"
    ]
  },
  {
    "url": "MessageEvent_onmessage_postMessage_infinite_loop.html",
    "checks": [
      "#channel-messaging",
      "#message-ports",
      "#message-channels",
      "#posting-messages"
    ]
  },
  {
    "url": "MessageEvent_properties.htm",
    "checks": [
      "#channel-messaging",
      "#web-messaging",
      "#broadcasting-to-other-browsing-contexts"
    ]
  },
  {
    "url": "MessagePort_initial_disabled.htm",
    "checks": [
      "#message-ports"
    ]
  },
  {
    "url": "MessagePort_onmessage_start.htm",
    "checks": [
      "#message-ports"
    ]
  },
  {
    "url": "Transferred_objects_unusable.sub.htm",
    "checks": [
      "#message-ports"
    ]
  },
  {
    "url": "event.data.sub.htm",
    "checks": [
      "#message-ports"
    ]
  },
  {
    "url": "event.origin.sub.htm",
    "checks": [
      "#web-messaging",
      "#security-postmsg"
    ]
  },
  {
    "url": "event.ports.sub.htm",
    "checks": [
      "#channel-messaging",
      "#message-ports"
    ]
  },
  {
    "url": "event.source.htm",
    "checks": [
      "#posting-messages"
    ]
  },
  {
    "url": "event.source.xorigin.sub.htm",
    "checks": [
      "#web-messaging"
    ]
  },
  {
    "url": "messageerror.html",
    "checks": [
      "#message-ports",
      "#broadcasting-to-other-browsing-contexts"
    ]
  },
  {
    "url": "postMessage_ArrayBuffer.sub.htm",
    "checks": [
      "#posting-messages"
    ]
  },
  {
    "url": "postMessage_Date.sub.htm",
    "checks": [
      "#posting-messages"
    ]
  },
  {
    "url": "postMessage_Document.htm",
    "checks": [
      "#posting-messages"
    ]
  },
  {
    "url": "postMessage_Function.htm",
    "checks": [
      "#posting-messages"
    ]
  },
  {
    "url": "postMessage_MessagePorts_sorigin.htm",
    "checks": [
      "#message-ports",
      "#posting-messages"
    ]
  },
  {
    "url": "postMessage_MessagePorts_xorigin.sub.htm",
    "checks": [
      "#message-ports",
      "#web-messaging",
      "#security-postmsg",
      "#user-agents"
    ]
  },
  {
    "url": "postMessage_arrays.sub.htm",
    "checks": [
      "#posting-messages"
    ]
  },
  {
    "url": "postMessage_asterisk_xorigin.sub.htm",
    "checks": [
      "#security-postmsg",
      "#user-agents",
      "#posting-messages"
    ]
  },
  {
    "url": "postMessage_dup_transfer_objects.htm",
    "checks": [
      "#web-messaging",
      "#posting-messages"
    ]
  },
  {
    "url": "postMessage_invalid_targetOrigin.htm",
    "checks": [
      "#posting-messages"
    ]
  },
  {
    "url": "postMessage_objects.sub.htm",
    "checks": [
      "#posting-messages"
    ]
  },
  {
    "url": "postMessage_origin_mismatch.sub.htm",
    "checks": [
      "#web-messaging",
      "#posting-messages",
      "#security-postmsg"
    ]
  },
  {
    "url": "postMessage_origin_mismatch_xorigin.sub.htm",
    "checks": [
      "#security-postmsg",
      "#posting-messages",
      "#web-messaging"
    ]
  },
  {
    "url": "postMessage_solidus_sorigin.htm",
    "checks": [
      "#posting-messages",
      "#web-messaging"
    ]
  },
  {
    "url": "postMessage_solidus_xorigin.sub.htm",
    "checks": [
      "#posting-messages",
      "#web-messaging",
      "#security-postmsg"
    ]
  },
  {
    "url": "broadcastchannel/basics.html",
    "checks": [
      "#broadcasting-to-other-browsing-contexts",
      "#broadcasting-to-many-ports"
    ]
  },
  {
    "url": "broadcastchannel/blobs.html",
    "checks": [
      "#broadcasting-to-other-browsing-contexts",
      "#broadcasting-to-many-ports",
      "#posting-messages"
    ]
  },
  {
    "url": "broadcastchannel/interface.html",
    "checks": [
      "#posting-messages",
      "#broadcasting-to-other-browsing-contexts"
    ]
  },
  {
    "url": "broadcastchannel/sandbox.html",
    "checks": [
      "#broadcasting-to-other-browsing-contexts",
      "#posting-messages",
      "#web-messaging"
    ]
  },
  {
    "url": "broadcastchannel/workers.html",
    "checks": [
      "#web-messaging",
      "#broadcasting-to-other-browsing-contexts",
      "#posting-messages"
    ]
  },
  {
    "url": "message-channels/001.html",
    "checks": [
      "#channel-messaging",
      "#message-channels",
      "#message-ports"
    ]
  },
  {
    "url": "message-channels/002.html",
    "checks": [
      "#channel-messaging",
      "#message-channels",
      "#message-ports"
    ]
  },
  {
    "url": "message-channels/003.html",
    "checks": [
      "#channel-messaging",
      "#message-channels",
      "#message-ports"
    ]
  },
  {
    "url": "message-channels/004-1.html",
    "checks": [
      "#channel-messaging",
      "#message-channels",
      "#message-ports"
    ]
  },
  {
    "url": "message-channels/004-2.html",
    "checks": [
      "#channel-messaging",
      "#message-channels",
      "#message-ports"
    ]
  },
  {
    "url": "message-channels/004.html",
    "checks": [
      "#channel-messaging",
      "#message-channels",
      "#message-ports"
    ]
  },
  {
    "url": "message-channels/close.html",
    "checks": [
      "#channel-messaging",
      "#message-channels",
      "#message-ports"
    ]
  },
  {
    "url": "message-channels/worker.html",
    "checks": [
      "#channel-messaging",
      "#broadcasting-to-other-browsing-contexts",
      "#message-channels",
      "#message-ports"
    ]
  },
  {
    "url": "with-ports/001.html",
    "checks": [
      "#web-messaging",
      "#posting-messages"
    ]
  },
  {
    "url": "with-ports/002.html",
    "checks": [
      "#posting-messages"
    ]
  },
  {
    "url": "with-ports/004.html",
    "checks": [
      "#posting-messages"
    ]
  },
  {
    "url": "with-ports/003.html",
    "checks": [
      "#posting-messages",
      "#security-postmsg"
    ]
  },
  {
    "url": "with-ports/005.html",
    "checks": [
      "#posting-messages"
    ]
  },
  {
    "url": "with-ports/006.html",
    "checks": [
      "#posting-messages"
    ]
  },
  {
    "url": "with-ports/007.html",
    "checks": [
      "#posting-messages"
    ]
  },
  {
    "url": "with-ports/010.html",
    "checks": [
      "#posting-messages"
    ]
  },
  {
    "url": "with-ports/011.html",
    "checks": [
      "#posting-messages"
    ]
  },
  {
    "url": "with-ports/012.html",
    "checks": []
  },
  {
    "url": "with-ports/013.html",
    "checks": []
  },
  {
    "url": "with-ports/014.html",
    "checks": []
  },
  {
    "url": "with-ports/015.html",
    "checks": []
  },
  {
    "url": "with-ports/016.html",
    "checks": []
  },
  {
    "url": "with-ports/017.html",
    "checks": []
  },
  {
    "url": "with-ports/018.html",
    "checks": []
  },
  {
    "url": "with-ports/019.html",
    "checks": []
  },
  {
    "url": "with-ports/020.html",
    "checks": []
  },
  {
    "url": "with-ports/021.html",
    "checks": []
  },
  {
    "url": "with-ports/023.html",
    "checks": []
  },
  {
    "url": "with-ports/024.html",
    "checks": []
  },
  {
    "url": "with-ports/025.html",
    "checks": []
  },
  {
    "url": "with-ports/026.html",
    "checks": []
  },
  {
    "url": "with-ports/027.html",
    "checks": []
  },
  {
    "url": "support/ChildWindowPostMessage.htm",
    "checks": [
      "#posting-messages",
      "#web-messaging"
    ]
  },
  {
    "url": "without-ports/001.html",
    "checks": []
  },
  {
    "url": "without-ports/002.html",
    "checks": []
  },
  {
    "url": "without-ports/003.html",
    "checks": []
  },
  {
    "url": "without-ports/004.html",
    "checks": []
  },
  {
    "url": "without-ports/005.html",
    "checks": []
  },
  {
    "url": "without-ports/006.html",
    "checks": []
  },
  {
    "url": "without-ports/007.html",
    "checks": []
  },
  {
    "url": "without-ports/008.html",
    "checks": []
  },
  {
    "url": "without-ports/009.html",
    "checks": []
  },
  {
    "url": "without-ports/010.html",
    "checks": []
  },
  {
    "url": "without-ports/011.html",
    "checks": []
  },
  {
    "url": "without-ports/012.html",
    "checks": []
  },
  {
    "url": "without-ports/013.html",
    "checks": []
  },
  {
    "url": "without-ports/014.html",
    "checks": []
  },
  {
    "url": "without-ports/015.html",
    "checks": []
  },
  {
    "url": "without-ports/016.html",
    "checks": []
  },
  {
    "url": "without-ports/017.html",
    "checks": []
  },
  {
    "url": "without-ports/018.html",
    "checks": []
  },
  {
    "url": "without-ports/019-1.html",
    "checks": []
  },
  {
    "url": "without-ports/019.html",
    "checks": []
  },
  {
    "url": "without-ports/020-1.html",
    "checks": []
  },
  {
    "url": "without-ports/020.html",
    "checks": []
  },
  {
    "url": "without-ports/021.html",
    "checks": []
  },
  {
    "url": "without-ports/023.html",
    "checks": []
  },
  {
    "url": "without-ports/024.html",
    "checks": []
  },
  {
    "url": "without-ports/025.html",
    "checks": []
  },
  {
    "url": "without-ports/026.html",
    "checks": []
  },
  {
    "url": "without-ports/027.html",
    "checks": []
  },
  {
    "url": "without-ports/028.html",
    "checks": []
  },
  {
    "url": "without-ports/029.html",
    "checks": []
  },
  {
    "url": "broadcastchannel/resources/origin.html",
    "checks": []
  },
  {
    "url": "broadcastchannel/resources/sandboxed.html",
    "checks": []
  }
]