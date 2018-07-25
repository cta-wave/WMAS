var tests = [
  {
    "url": "clearkey-check-initdata-type.https.html",
    "checks": [
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemconfiguration-dictionary",
      "#clear-key",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#mediakeysession-interface",
      "#get-supported-configuration"
    ]
  },
  {
    "url": "clearkey-events-session-closed-event.https.html",
    "checks": [
      "#clear-key",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemconfiguration-dictionary",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#session-closed"
    ]
  },
  {
    "url": "clearkey-events.https.html",
    "checks": [
      "#clear-key",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#get-supported-configuration",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#mediakeymessageevent",
      "#mediakeysession-interface",
      "#exceptions",
      "#update-key-statuses",
      "#mediakeysession-events"
    ]
  },
  {
    "url": "clearkey-generate-request-disallowed-input.https.html",
    "checks": [
      "#clear-key",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeys-interface",
      "#mediakeysession-interface",
      "#exceptions",
      "#is-persistent-session-type"
    ]
  },
  {
    "url": "clearkey-invalid-license.https.html",
    "checks": [
      "#clear-key",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#mediakeysession-interface",
      "#exceptions"
    ]
  },
  {
    "url": "clearkey-keystatuses-multiple-sessions.https.html",
    "checks": [
      "#clear-key",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#mediakeysession-interface",
      "#queue-message",
      "#update-key-statuses"
    ]
  },
  {
    "url": "clearkey-keystatuses.https.html",
    "checks": [
      "#clear-key",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#update-key-statuses",
      "#mediakeysession-interface",
      "#mediakeymessageevent"
    ]
  },
  {
    "url": "clearkey-mp4-playback-destroy-persistent-license.https.html",
    "checks": [
      "#clear-key",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#is-persistent-session-type",
      "#mediaencryptedevent",
      "#queue-message",
      "#mediakeysession-interface",
      "#session-closed",
      "#exceptions",
      "#attempt-to-decrypt"
    ]
  },
  {
    "url": "clearkey-mp4-playback-persistent-license-events.https.html",
    "checks": [
      "#clear-key",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#is-persistent-session-type",
      "#mediakeysession-interface",
      "#mediakeysession-events",
      "#mediakeymessageevent",
      "#mediaencryptedevent",
      "#htmlmediaelement-events",
      "#update-key-statuses",
      "#attempt-to-decrypt"
    ]
  },
  {
    "url": "clearkey-mp4-playback-persistent-license.https.html",
    "checks": [
      "#clear-key",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#is-persistent-session-type",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#attempt-to-decrypt"
    ]
  },
  {
    "url": "clearkey-mp4-playback-persistent-usage-record-events.https.html",
    "checks": [
      "#clear-key",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#is-persistent-session-type",
      "#mediakeysession-interface",
      "#mediakeymessageevent",
      "#queue-message",
      "#attempt-to-decrypt"
    ]
  },
  {
    "url": "clearkey-mp4-playback-persistent-usage-record.https.html",
    "checks": [
      "#clear-key",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#is-persistent-session-type",
      "#mediakeysession-interface",
      "#attempt-to-decrypt"
    ]
  },
  {
    "url": "clearkey-mp4-playback-retrieve-destroy-persistent-license.https.html",
    "checks": [
      "#clear-key",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#is-persistent-session-type",
      "#mediaencryptedevent",
      "#queue-message",
      "#mediakeysession-interface",
      "#session-closed",
      "#attempt-to-decrypt"
    ]
  },
  {
    "url": "clearkey-mp4-playback-retrieve-persistent-license.https.html",
    "checks": [
      "#clear-key",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#is-persistent-session-type",
      "#mediaencryptedevent",
      "#queue-message",
      "#mediakeysession-interface",
      "#session-closed",
      "#attempt-to-decrypt"
    ]
  },
  {
    "url": "clearkey-mp4-playback-retrieve-persistent-usage-record.https.html",
    "checks": [
      "#clear-key",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#is-persistent-session-type",
      "#mediakeysession-interface",
      "#queue-message",
      "#attempt-to-decrypt"
    ]
  },
  {
    "url": "clearkey-mp4-playback-temporary-clear-encrypted.https.html",
    "checks": [
      "#clear-key",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#mediakeymessageevent",
      "#is-persistent-session-type",
      "#attempt-to-decrypt"
    ]
  },
  {
    "url": "clearkey-mp4-playback-temporary-encrypted-clear-sources.https.html",
    "checks": [
      "#clear-key",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#mediakeymessageevent",
      "#is-persistent-session-type",
      "#attempt-to-decrypt"
    ]
  },
  {
    "url": "clearkey-mp4-playback-temporary-encrypted-clear.https.html",
    "checks": [
      "#clear-key",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#mediakeymessageevent",
      "#is-persistent-session-type",
      "#attempt-to-decrypt"
    ]
  },
  {
    "url": "clearkey-mp4-playback-temporary-events.https.html",
    "checks": [
      "#clear-key",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#mediakeymessageevent",
      "#is-persistent-session-type",
      "#mediakeysession-events",
      "#htmlmediaelement-events",
      "#update-key-statuses",
      "#attempt-to-decrypt"
    ]
  },
  {
    "url": "clearkey-mp4-playback-temporary-multikey-sequential-readyState.https.html",
    "checks": [
      "#clear-key",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#mediakeymessageevent",
      "#is-persistent-session-type",
      "#mediakeysession-interface",
      "#wait-for-key",
      "#attempt-to-decrypt"
    ]
  },
  {
    "url": "clearkey-mp4-playback-temporary-multikey-sequential.https.html",
    "checks": [
      "#clear-key",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#mediakeymessageevent",
      "#is-persistent-session-type",
      "#wait-for-key",
      "#attempt-to-decrypt"
    ]
  },
  {
    "url": "clearkey-mp4-playback-temporary-multikey.https.html",
    "checks": [
      "#clear-key",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#mediakeymessageevent",
      "#is-persistent-session-type",
      "#wait-for-key",
      "#mediakeysession-interface",
      "#attempt-to-decrypt"
    ]
  },
  {
    "url": "clearkey-mp4-playback-temporary-multisession.https.html",
    "checks": [
      "#clear-key",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#mediakeymessageevent",
      "#is-persistent-session-type",
      "#mediakeysession-interface",
      "#attempt-to-decrypt",
      "#queue-message"
    ]
  },
  {
    "url": "clearkey-mp4-playback-temporary-setMediaKeys-after-src.https.html",
    "checks": [
      "#clear-key",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#is-persistent-session-type",
      "#mediakeysession-interface",
      "#attempt-to-decrypt",
      "#htmlmediaelement-extensions",
      "#media-may-contain-encrypted-blocks"
    ]
  },
  {
    "url": "clearkey-mp4-playback-temporary-setMediaKeys-after-update.https.html",
    "checks": [
      "#clear-key",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#is-persistent-session-type",
      "#mediakeysession-interface",
      "#attempt-to-decrypt",
      "#htmlmediaelement-extensions",
      "#media-may-contain-encrypted-blocks"
    ]
  },
  {
    "url": "clearkey-mp4-playback-temporary-setMediaKeys-immediately.https.html",
    "checks": [
      "#clear-key",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#is-persistent-session-type",
      "#mediakeysession-interface",
      "#attempt-to-decrypt",
      "#htmlmediaelement-extensions",
      "#media-may-contain-encrypted-blocks"
    ]
  },
  {
    "url": "clearkey-mp4-playback-temporary-setMediaKeys-onencrypted.https.html",
    "checks": [
      "#clear-key",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#is-persistent-session-type",
      "#mediakeysession-interface",
      "#attempt-to-decrypt",
      "#htmlmediaelement-extensions",
      "#media-may-contain-encrypted-blocks"
    ]
  },
  {
    "url": "clearkey-mp4-playback-temporary-two-videos.https.html",
    "checks": [
      "#clear-key",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#is-persistent-session-type",
      "#mediakeysession-interface",
      "#attempt-to-decrypt"
    ]
  },
  {
    "url": "clearkey-mp4-playback-temporary-waitingforkey.https.html",
    "checks": [
      "#clear-key",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#is-persistent-session-type",
      "#mediakeysession-interface",
      "#attempt-to-decrypt",
      "#wait-for-key"
    ]
  },
  {
    "url": "clearkey-mp4-playback-temporary.https.html",
    "checks": [
      "#clear-key",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#is-persistent-session-type",
      "#mediakeysession-interface",
      "#attempt-to-decrypt"
    ]
  },
  {
    "url": "clearkey-mp4-requestmediakeysystemaccess.https.html",
    "checks": [
      "#clear-key",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#get-supported-configuration",
      "#get-supported-configuration-and-consent",
      "#get-supported-capabilities-for-audio-video-type"
    ]
  },
  {
    "url": "clearkey-mp4-reset-src-after-setmediakeys.https.html",
    "checks": [
      "#clear-key",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediaencryptedevent",
      "#initdata-encountered"
    ]
  },
  {
    "url": "clearkey-mp4-setmediakeys-again-after-playback.https.html",
    "checks": [
      "#clear-key",
      "#htmlmediaelement-extensions",
      "#attempt-to-decrypt",
      "#resume-playback"
    ]
  },
  {
    "url": "clearkey-mp4-setmediakeys-again-after-resetting-src.https.html",
    "checks": [
      "#clear-key",
      "#htmlmediaelement-extensions",
      "#htmlmediaelement-algorithms"
    ]
  },
  {
    "url": "clearkey-mp4-setmediakeys-at-same-time.https.html",
    "checks": [
      "#clear-key",
      "#htmlmediaelement-extensions",
      "#htmlmediaelement-algorithms",
      "#mediakeysystemaccess-interface"
    ]
  },
  {
    "url": "clearkey-mp4-setmediakeys-multiple-times-with-different-mediakeys.https.html",
    "checks": [
      "#clear-key",
      "#htmlmediaelement-extensions",
      "#htmlmediaelement-algorithms",
      "#mediakeysystemaccess-interface"
    ]
  },
  {
    "url": "clearkey-mp4-setmediakeys-multiple-times-with-the-same-mediakeys.https.html",
    "checks": [
      "#clear-key",
      "#htmlmediaelement-extensions",
      "#htmlmediaelement-algorithms",
      "#mediakeysystemaccess-interface"
    ]
  },
  {
    "url": "clearkey-mp4-setmediakeys-to-multiple-video-elements.https.html",
    "checks": [
      "#clear-key",
      "#htmlmediaelement-extensions",
      "#htmlmediaelement-algorithms",
      "#mediakeysystemaccess-interface"
    ]
  },
  {
    "url": "clearkey-mp4-setmediakeys.https.html",
    "checks": [
      "#clear-key",
      "#htmlmediaelement-extensions",
      "#htmlmediaelement-algorithms",
      "#mediakeysystemaccess-interface"
    ]
  },
  {
    "url": "clearkey-mp4-syntax-mediakeys.https.html",
    "checks": [
      "#clear-key",
      "#mediakeys-interface"
    ]
  },
  {
    "url": "clearkey-mp4-syntax-mediakeysession.https.html",
    "checks": [
      "#clear-key",
      "#mediakeysession-interface"
    ]
  },
  {
    "url": "clearkey-mp4-syntax-mediakeysystemaccess.https.html",
    "checks": [
      "#clear-key",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#obtaining-access-to-key-systems",
      "#mediakeysystemaccess-interface"
    ]
  },
  {
    "url": "clearkey-mp4-unique-origin.https.html",
    "checks": [
      "#clear-key",
      "#iframe-attacks",
      "#user-tracking",
      "#mitigations-2"
    ]
  },
  {
    "url": "clearkey-mp4-update-disallowed-input.https.html",
    "checks": [
      "#clear-key",
      "#mediakeysession-interface",
      "#exceptions",
      "#clear-key-behavior",
      "#clear-key-release-format"
    ]
  },
  {
    "url": "clearkey-mp4-waiting-for-a-key.https.html",
    "checks": [
      "#clear-key",
      "#wait-for-key",
      "#htmlmediaelement-events",
      "#mediakeysession-events"
    ]
  },
  {
    "url": "clearkey-not-callable-after-createsession.https.html",
    "checks": [
      "#clear-key",
      "#mediakeys-interface",
      "#mediakeysession-interface",
      "#exceptions"
    ]
  },
  {
    "url": "clearkey-update-non-ascii-input.https.html",
    "checks": [
      "#clear-key",
      "#exceptions",
      "#clear-key-request-format",
      "#clear-key-license-format",
      "#clear-key-release-format"
    ]
  },
  {
    "url": "drm-check-initdata-type.https.html",
    "checks": [
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemconfiguration-dictionary",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#mediakeysession-interface",
      "#get-supported-configuration"
    ]
  },
  {
    "url": "drm-events-session-closed-event.https.html",
    "checks": [
      "#common-key-systems",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemconfiguration-dictionary",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#session-closed"
    ]
  },
  {
    "url": "drm-events.https.html",
    "checks": [
      "#common-key-systems",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#get-supported-configuration",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#mediakeymessageevent",
      "#mediakeysession-interface",
      "#exceptions",
      "#update-key-statuses",
      "#mediakeysession-events"
    ]
  },
  {
    "url": "drm-expiration.https.html",
    "checks": [
      "#common-key-systems",
      "#update-expiration",
      "#mediakeysession-interface"
    ]
  },
  {
    "url": "drm-generate-request-disallowed-input.https.html",
    "checks": [
      "#common-key-systems",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeys-interface",
      "#mediakeysession-interface",
      "#exceptions",
      "#is-persistent-session-type"
    ]
  },
  {
    "url": "drm-invalid-license.https.html",
    "checks": [
      "#common-key-systems",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#mediakeysession-interface",
      "#exceptions"
    ]
  },
  {
    "url": "drm-keystatuses-multiple-sessions.https.html",
    "checks": [
      "#common-key-systems",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#mediakeysession-interface",
      "#queue-message",
      "#update-key-statuses"
    ]
  },
  {
    "url": "drm-keystatuses.https.html",
    "checks": [
      "#common-key-systems",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#update-key-statuses",
      "#mediakeysession-interface",
      "#mediakeymessageevent"
    ]
  },
  {
    "url": "drm-mp4-onencrypted.https.html",
    "checks": [
      "#common-key-systems",
      "#htmlmediaelement-extensions",
      "#media-may-contain-encrypted-blocks",
      "#initdata-encountered",
      "#mediaencryptedevent",
      "#mediaencryptedeventinit",
      "#htmlmediaelement-events"
    ]
  },
  {
    "url": "drm-mp4-playback-destroy-persistent-license.https.html",
    "checks": [
      "#common-key-systems",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#is-persistent-session-type",
      "#mediaencryptedevent",
      "#queue-message",
      "#mediakeysession-interface",
      "#session-closed",
      "#exceptions",
      "#attempt-to-decrypt"
    ]
  },
  {
    "url": "drm-mp4-playback-persistent-license-events.https.html",
    "checks": [
      "#common-key-systems",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#is-persistent-session-type",
      "#mediakeysession-interface",
      "#mediakeysession-events",
      "#mediakeymessageevent",
      "#mediaencryptedevent",
      "#htmlmediaelement-events",
      "#update-key-statuses",
      "#attempt-to-decrypt"
    ]
  },
  {
    "url": "drm-mp4-playback-persistent-license.https.html",
    "checks": [
      "#common-key-systems",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#is-persistent-session-type",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#attempt-to-decrypt"
    ]
  },
  {
    "url": "drm-mp4-playback-persistent-usage-record-events.https.html",
    "checks": [
      "#common-key-systems",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#is-persistent-session-type",
      "#mediakeysession-interface",
      "#mediakeymessageevent",
      "#queue-message",
      "#attempt-to-decrypt"
    ]
  },
  {
    "url": "drm-mp4-playback-persistent-usage-record.https.html",
    "checks": [
      "#common-key-systems",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#is-persistent-session-type",
      "#mediakeysession-interface",
      "#attempt-to-decrypt"
    ]
  },
  {
    "url": "drm-mp4-playback-retrieve-destroy-persistent-license.https.html",
    "checks": [
      "#common-key-systems",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#is-persistent-session-type",
      "#mediaencryptedevent",
      "#queue-message",
      "#mediakeysession-interface",
      "#session-closed",
      "#attempt-to-decrypt"
    ]
  },
  {
    "url": "drm-mp4-playback-retrieve-persistent-license.https.html",
    "checks": [
      "#common-key-systems",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#is-persistent-session-type",
      "#mediaencryptedevent",
      "#queue-message",
      "#mediakeysession-interface",
      "#session-closed",
      "#attempt-to-decrypt"
    ]
  },
  {
    "url": "drm-mp4-playback-retrieve-persistent-usage-record.https.html",
    "checks": [
      "#common-key-systems",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#is-persistent-session-type",
      "#mediakeysession-interface",
      "#queue-message",
      "#attempt-to-decrypt"
    ]
  },
  {
    "url": "drm-mp4-playback-temporary-clear-encrypted.https.html",
    "checks": [
      "#common-key-systems",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#mediakeymessageevent",
      "#is-persistent-session-type",
      "#attempt-to-decrypt"
    ]
  },
  {
    "url": "drm-mp4-playback-temporary-encrypted-clear-sources.https.html",
    "checks": [
      "#common-key-systems",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#mediakeymessageevent",
      "#is-persistent-session-type",
      "#attempt-to-decrypt"
    ]
  },
  {
    "url": "drm-mp4-playback-temporary-encrypted-clear.https.html",
    "checks": [
      "#common-key-systems",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#mediakeymessageevent",
      "#is-persistent-session-type",
      "#attempt-to-decrypt"
    ]
  },
  {
    "url": "drm-mp4-playback-temporary-events.https.html",
    "checks": [
      "#common-key-systems",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#mediakeymessageevent",
      "#is-persistent-session-type",
      "#mediakeysession-events",
      "#htmlmediaelement-events",
      "#update-key-statuses",
      "#attempt-to-decrypt"
    ]
  },
  {
    "url": "drm-mp4-playback-temporary-expired.https.html",
    "checks": [
      "#common-key-systems",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#mediakeymessageevent",
      "#is-persistent-session-type",
      "#mediakeysession-events",
      "#htmlmediaelement-events",
      "#attempt-to-decrypt",
      "#update-expiration"
    ]
  },
  {
    "url": "drm-mp4-playback-temporary-multikey-sequential-readyState.https.html",
    "checks": [
      "#common-key-systems",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#mediakeymessageevent",
      "#is-persistent-session-type",
      "#mediakeysession-interface",
      "#wait-for-key",
      "#attempt-to-decrypt"
    ]
  },
  {
    "url": "drm-mp4-playback-temporary-multikey-sequential.https.html",
    "checks": [
      "#common-key-systems",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#mediakeymessageevent",
      "#is-persistent-session-type",
      "#wait-for-key",
      "#attempt-to-decrypt"
    ]
  },
  {
    "url": "drm-mp4-playback-temporary-multikey.https.html",
    "checks": [
      "#common-key-systems",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#mediakeymessageevent",
      "#is-persistent-session-type",
      "#wait-for-key",
      "#mediakeysession-interface",
      "#attempt-to-decrypt"
    ]
  },
  {
    "url": "drm-mp4-playback-temporary-multisession.https.html",
    "checks": [
      "#common-key-systems",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#mediakeymessageevent",
      "#is-persistent-session-type",
      "#mediakeysession-interface",
      "#attempt-to-decrypt",
      "#queue-message"
    ]
  },
  {
    "url": "drm-mp4-playback-temporary-playduration-keystatus.html",
    "checks": [
      "#common-key-systems",
      "#update-key-statuses",
      "#mediakeystatusmap-interface",
      "#mediakeysession-interface",
      "#mediakeys-interface"
    ]
  },
  {
    "url": "drm-mp4-playback-temporary-playduration.html",
    "checks": [
      "#common-key-systems",
      "#mediakeysession-interface",
      "#mediakeys-interface",
      "#htmlmediaelement-extensions"
    ]
  },
  {
    "url": "drm-mp4-playback-temporary-setMediaKeys-after-src.https.html",
    "checks": [
      "#common-key-systems",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#is-persistent-session-type",
      "#mediakeysession-interface",
      "#attempt-to-decrypt",
      "#htmlmediaelement-extensions",
      "#media-may-contain-encrypted-blocks"
    ]
  },
  {
    "url": "drm-mp4-playback-temporary-setMediaKeys-after-update.https.html",
    "checks": [
      "#common-key-systems",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#is-persistent-session-type",
      "#mediakeysession-interface",
      "#attempt-to-decrypt",
      "#htmlmediaelement-extensions",
      "#media-may-contain-encrypted-blocks"
    ]
  },
  {
    "url": "drm-mp4-playback-temporary-setMediaKeys-immediately.https.html",
    "checks": [
      "#common-key-systems",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#is-persistent-session-type",
      "#mediakeysession-interface",
      "#attempt-to-decrypt",
      "#htmlmediaelement-extensions",
      "#media-may-contain-encrypted-blocks"
    ]
  },
  {
    "url": "drm-mp4-playback-temporary-setMediaKeys-onencrypted.https.html",
    "checks": [
      "#common-key-systems",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#is-persistent-session-type",
      "#mediakeysession-interface",
      "#attempt-to-decrypt",
      "#htmlmediaelement-extensions",
      "#media-may-contain-encrypted-blocks"
    ]
  },
  {
    "url": "drm-mp4-playback-temporary-two-videos.https.html",
    "checks": [
      "#common-key-systems",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#is-persistent-session-type",
      "#mediakeysession-interface",
      "#attempt-to-decrypt"
    ]
  },
  {
    "url": "drm-mp4-playback-temporary-waitingforkey.https.html",
    "checks": [
      "#common-key-systems",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#is-persistent-session-type",
      "#mediakeysession-interface",
      "#attempt-to-decrypt",
      "#wait-for-key"
    ]
  },
  {
    "url": "drm-mp4-playback-temporary.https.html",
    "checks": [
      "#common-key-systems",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediakeys-interface",
      "#is-persistent-session-type",
      "#mediakeysession-interface",
      "#attempt-to-decrypt"
    ]
  },
  {
    "url": "drm-mp4-requestmediakeysystemaccess.https.html",
    "checks": [
      "#common-key-systems",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#get-supported-configuration",
      "#get-supported-configuration-and-consent",
      "#get-supported-capabilities-for-audio-video-type"
    ]
  },
  {
    "url": "drm-mp4-reset-src-after-setmediakeys.https.html",
    "checks": [
      "#common-key-systems",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#mediakeysystemaccess-interface",
      "#mediaencryptedevent",
      "#initdata-encountered"
    ]
  },
  {
    "url": "drm-mp4-setmediakeys-again-after-playback.https.html",
    "checks": [
      "#common-key-systems",
      "#htmlmediaelement-extensions",
      "#attempt-to-decrypt",
      "#resume-playback"
    ]
  },
  {
    "url": "drm-mp4-setmediakeys-again-after-resetting-src.https.html",
    "checks": [
      "#common-key-systems",
      "#htmlmediaelement-extensions",
      "#htmlmediaelement-algorithms"
    ]
  },
  {
    "url": "drm-mp4-setmediakeys-at-same-time.https.html",
    "checks": [
      "#common-key-systems",
      "#htmlmediaelement-extensions",
      "#htmlmediaelement-algorithms",
      "#mediakeysystemaccess-interface"
    ]
  },
  {
    "url": "drm-mp4-setmediakeys-multiple-times-with-different-mediakeys.https.html",
    "checks": [
      "#common-key-systems",
      "#htmlmediaelement-extensions",
      "#htmlmediaelement-algorithms",
      "#mediakeysystemaccess-interface"
    ]
  },
  {
    "url": "drm-mp4-setmediakeys-multiple-times-with-the-same-mediakeys.https.html",
    "checks": [
      "#common-key-systems",
      "#htmlmediaelement-extensions",
      "#htmlmediaelement-algorithms",
      "#mediakeysystemaccess-interface"
    ]
  },
  {
    "url": "drm-mp4-setmediakeys-to-multiple-video-elements.https.html",
    "checks": [
      "#common-key-systems",
      "#htmlmediaelement-extensions",
      "#htmlmediaelement-algorithms",
      "#mediakeysystemaccess-interface"
    ]
  },
  {
    "url": "drm-mp4-setmediakeys.https.html",
    "checks": [
      "#common-key-systems",
      "#htmlmediaelement-extensions",
      "#htmlmediaelement-algorithms",
      "#mediakeysystemaccess-interface"
    ]
  },
  {
    "url": "drm-mp4-syntax-mediakeys.https.html",
    "checks": [
      "#common-key-systems",
      "#mediakeys-interface"
    ]
  },
  {
    "url": "drm-mp4-syntax-mediakeysession.https.html",
    "checks": [
      "#common-key-systems",
      "#mediakeysession-interface"
    ]
  },
  {
    "url": "drm-mp4-syntax-mediakeysystemaccess.https.html",
    "checks": [
      "#common-key-systems",
      "#navigator-extension:-requestmediakeysystemaccess()",
      "#obtaining-access-to-key-systems",
      "#mediakeysystemaccess-interface"
    ]
  },
  {
    "url": "drm-mp4-unique-origin.https.html",
    "checks": [
      "#common-key-systems",
      "#iframe-attacks",
      "#user-tracking",
      "#mitigations-2"
    ]
  },
  {
    "url": "drm-mp4-waiting-for-a-key.https.html",
    "checks": [
      "#common-key-systems",
      "#wait-for-key",
      "#htmlmediaelement-events",
      "#mediakeysession-events"
    ]
  },
  {
    "url": "drm-not-callable-after-createsession.https.html",
    "checks": [
      "#common-key-systems",
      "#wait-for-key",
      "#htmlmediaelement-events",
      "#mediakeysession-events"
    ]
  },
  {
    "url": "drm-temporary-license-type.https.html",
    "checks": [
      "#common-key-systems",
      "#is-persistent-session-type",
      "#exceptions",
      "#mediakeysession-interface"
    ]
  },
  {
    "url": "encrypted-media-default-feature-policy.https.sub.html",
    "checks": []
  },
  {
    "url": "idlharness.https.html",
    "checks": []
  },
  {
    "url": "resources/clearkey-retrieve-destroy-persistent-license.html",
    "checks": []
  },
  {
    "url": "resources/clearkey-retrieve-persistent-license.html",
    "checks": []
  },
  {
    "url": "resources/drm-retrieve-destroy-persistent-license.html",
    "checks": []
  },
  {
    "url": "resources/drm-retrieve-persistent-license.html",
    "checks": []
  },
  {
    "url": "resources/drm-retrieve-persistent-usage-record.html",
    "checks": []
  },
  {
    "url": "resources/retrieve-persistent-usage-record.html",
    "checks": []
  }
]
