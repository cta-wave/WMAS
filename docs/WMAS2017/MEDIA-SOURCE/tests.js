var tests = [
  {
    "url": "SourceBuffer-abort-readyState.html",
    "checks": [
      "#sourcebuffer",
      "#methods-1"
    ]
  },
  {
    "url": "SourceBuffer-abort-removed.html",
    "checks": [
      "#sourcebuffer",
      "#methods-1"
    ]
  },
  {
    "url": "SourceBuffer-abort-updating.html",
    "checks": [
      "#sourcebuffer",
      "#methods-1"
    ]
  },
  {
    "url": "SourceBuffer-abort.html",
    "checks": [
      "#sourcebuffer",
      "#methods-1"
    ]
  },
  {
    "url": "URL-createObjectURL-null.html",
    "checks": [
      "#url",
      "#methods-3"
    ]
  },
  {
    "url": "URL-createObjectURL-revoke.html",
    "checks": [
      "#url",
      "#methods-3"
    ]
  },
  {
    "url": "URL-createObjectURL.html",
    "checks": [
      "#url",
      "#methods-3"
    ]
  },
  {
    "url": "mediasource-activesourcebuffers.html",
    "checks": [
      "#mediasource",
      "#attributes",
      "#mediasource-algorithms",
      "#active-source-buffer-changes"
    ]
  },
  {
    "url": "mediasource-addsourcebuffer-mode.html",
    "checks": [
      "#mediasource",
      "#methods",
      "#attributes"
    ]
  },
  {
    "url": "mediasource-addsourcebuffer.html",
    "checks": [
      "#mediasource",
      "#attributes",
      "#methods"
    ]
  },
  {
    "url": "mediasource-append-buffer.html",
    "checks": [
      "#mediasource",
      "#attributes",
      "#mediasource-algorithms",
      "#end-of-stream-algorithm",
      "#sourcebuffer",
      "#attributes-1",
      "#methods-1",
      "#sourcebuffer-buffer-append"
    ]
  },
  {
    "url": "mediasource-appendbuffer-quota-exceeded.html",
    "checks": [
      "#sourcebuffer",
      "#sourcebuffer-algorithms",
      "#sourcebuffer-prepare-append"
    ]
  },
  {
    "url": "mediasource-appendwindow.html",
    "checks": [
      "#sourcebuffer",
      "#attributes-1"
    ]
  },
  {
    "url": "mediasource-attach-stops-delaying-load-event.html",
    "checks": [
      "#mediasource",
      "#mediasource-algorithms",
      "#mediasource-attach"
    ]
  },
  {
    "url": "mediasource-avtracks.html",
    "checks": [
      "#mediasource",
      "#attributes",
      "#methods",
      "#mediasource-algorithms",
      "#sourcebuffer",
      "#mediasource-detach",
      "#attributes-1",
      "#methods-1",
      "#sourcebuffer-algorithms",
      "#sourcebuffer-buffer-append",
      "#audio-track-extensions",
      "#video-track-extensions"
    ]
  },
  {
    "url": "mediasource-buffered.html",
    "checks": [
      "#sourcebuffer",
      "#attributes-1",
      "#mediasource",
      "#attributes",
      "#htmlmediaelement-extensions"
    ]
  },
  {
    "url": "mediasource-closed.html",
    "checks": [
      "#attributes",
      "#mediasource",
      "#methods"
    ]
  },
  {
    "url": "mediasource-config-change-mp4-a-bitrate.html",
    "checks": [
      "#mediasource",
      "#attributes",
      "#sourcebuffer",
      "#methods-1",
      "#sourcebuffer-algorithms",
      "#sourcebuffer-buffer-append",
      "#mediasource-algorithms",
      "#duration-change-algorithm"
    ]
  },
  {
    "url": "mediasource-config-change-mp4-av-audio-bitrate.html",
    "checks": [
      "#mediasource",
      "#attributes",
      "#sourcebuffer",
      "#attributes-1",
      "#methods-1",
      "#sourcebuffer-algorithms",
      "#sourcebuffer-buffer-append",
      "#mediasource-algorithms",
      "#duration-change-algorithm"
    ]
  },
  {
    "url": "mediasource-config-change-mp4-av-framesize.html",
    "checks": [
      "#mediasource",
      "#attributes",
      "#sourcebuffer",
      "#attributes-1",
      "#methods-1",
      "#sourcebuffer-algorithms",
      "#sourcebuffer-buffer-append",
      "#mediasource-algorithms",
      "#duration-change-algorithm"
    ]
  },
  {
    "url": "mediasource-config-change-mp4-av-video-bitrate.html",
    "checks": [
      "#mediasource",
      "#attributes",
      "#sourcebuffer",
      "#attributes-1",
      "#methods-1",
      "#sourcebuffer-algorithms",
      "#sourcebuffer-buffer-append",
      "#mediasource-algorithms",
      "#duration-change-algorithm"
    ]
  },
  {
    "url": "mediasource-config-change-mp4-v-bitrate.html",
    "checks": [
      "#mediasource",
      "#attributes",
      "#sourcebuffer",
      "#attributes-1",
      "#methods-1",
      "#sourcebuffer-algorithms",
      "#sourcebuffer-buffer-append",
      "#mediasource-algorithms",
      "#duration-change-algorithm"
    ]
  },
  {
    "url": "mediasource-config-change-mp4-v-framerate.html",
    "checks": [
      "#mediasource",
      "#attributes",
      "#mediasource-algorithms",
      "#duration-change-algorithm",
      "#sourcebuffer",
      "#attributes-1",
      "#methods-1",
      "#sourcebuffer-algorithms",
      "#sourcebuffer-buffer-append"
    ]
  },
  {
    "url": "mediasource-config-change-mp4-v-framesize.html",
    "checks": [
      "#mediasource",
      "#attributes",
      "#mediasource-algorithms",
      "#duration-change-algorithm",
      "#sourcebuffer",
      "#attributes-1",
      "#methods-1",
      "#sourcebuffer-algorithms",
      "#sourcebuffer-buffer-append"
    ]
  },
  {
    "url": "mediasource-config-change-webm-a-bitrate.html",
    "checks": [
      "#mediasource",
      "#attributes",
      "#mediasource-algorithms",
      "#duration-change-algorithm",
      "#sourcebuffer",
      "#attributes-1",
      "#methods-1",
      "#sourcebuffer-algorithms",
      "#sourcebuffer-buffer-append"
    ]
  },
  {
    "url": "mediasource-config-change-webm-av-audio-bitrate.html",
    "checks": [
      "#mediasource",
      "#attributes",
      "#mediasource-algorithms",
      "#duration-change-algorithm",
      "#sourcebuffer",
      "#attributes-1",
      "#methods-1",
      "#sourcebuffer-algorithms",
      "#sourcebuffer-buffer-append"
    ]
  },
  {
    "url": "mediasource-config-change-webm-av-framesize.html",
    "checks": [
      "#mediasource",
      "#attributes",
      "#mediasource-algorithms",
      "#duration-change-algorithm",
      "#sourcebuffer",
      "#attributes-1",
      "#methods-1",
      "#sourcebuffer-algorithms",
      "#sourcebuffer-buffer-append"
    ]
  },
  {
    "url": "mediasource-config-change-webm-av-video-bitrate.html",
    "checks": [
      "#mediasource",
      "#attributes",
      "#mediasource-algorithms",
      "#duration-change-algorithm",
      "#sourcebuffer",
      "#attributes-1",
      "#methods-1",
      "#sourcebuffer-algorithms",
      "#sourcebuffer-buffer-append"
    ]
  },
  {
    "url": "mediasource-config-change-webm-v-bitrate.html",
    "checks": [
      "#mediasource",
      "#attributes",
      "#mediasource-algorithms",
      "#duration-change-algorithm",
      "#sourcebuffer",
      "#attributes-1",
      "#methods-1",
      "#sourcebuffer-algorithms",
      "#sourcebuffer-buffer-append"
    ]
  },
  {
    "url": "mediasource-config-change-webm-v-framerate.html",
    "checks": [
      "#mediasource",
      "#attributes",
      "#mediasource-algorithms",
      "#duration-change-algorithm",
      "#sourcebuffer",
      "#attributes-1",
      "#methods-1",
      "#sourcebuffer-algorithms",
      "#sourcebuffer-buffer-append"
    ]
  },
  {
    "url": "mediasource-config-change-webm-v-framesize.html",
    "checks": [
      "#mediasource",
      "#attributes",
      "#mediasource-algorithms",
      "#duration-change-algorithm",
      "#sourcebuffer",
      "#attributes-1",
      "#methods-1",
      "#sourcebuffer-algorithms",
      "#sourcebuffer-buffer-append"
    ]
  },
  {
    "url": "mediasource-detach.html",
    "checks": [
      "#mediasource",
      "#attributes",
      "#methods",
      "#mediasource-algorithms",
      "#mediasource-detach"
    ]
  },
  {
    "url": "mediasource-duration-boundaryconditions.html",
    "checks": [
      "#mediasource",
      "#attributes",
      "#mediasource-algorithms",
      "#duration-change-algorithm"
    ]
  },
  {
    "url": "mediasource-duration.html",
    "checks": [
      "#mediasource",
      "#attributes",
      "#mediasource-algorithms",
      "#duration-change-algorithm"
    ]
  },
  {
    "url": "mediasource-endofstream-invaliderror.html",
    "checks": [
      "#mediasource",
      "#methods",
      "#mediasource-algorithms",
      "#end-of-stream-algorithm"
    ]
  },
  {
    "url": "mediasource-endofstream.html",
    "checks": [
      "#mediasource",
      "#methods",
      "#mediasource-algorithms",
      "#end-of-stream-algorithm"
    ]
  },
  {
    "url": "mediasource-errors.html",
    "checks": [
      "#mediasource",
      "#mediasource-algorithms",
      "#mediasource-attach",
      "#mediasource-detach",
      "#end-of-stream-algorithm",
      "#sourcebuffer",
      "#methods-1",
      "#sourcebuffer-algorithms",
      "#sourcebuffer-segment-parser-loop",
      "#sourcebuffer-append-error",
      "#sourcebuffer-buffer-append"
    ]
  },
  {
    "url": "mediasource-getvideoplaybackquality.html",
    "checks": []
  },
  {
    "url": "mediasource-is-type-supported.html",
    "checks": [
      "#mediasource",
      "#methods"
    ]
  },
  {
    "url": "mediasource-liveseekable.html",
    "checks": [
      "#mediasource",
      "#methods",
      "#htmlmediaelement-extensions"
    ]
  },
  {
    "url": "mediasource-multiple-attach.html",
    "checks": [
      "#mediasource",
      "#mediasource-algorithms",
      "#mediasource-attach"
    ]
  },
  {
    "url": "mediasource-play-then-seek-back.html",
    "checks": [
      "#mediasource",
      "#mediasource-algorithms",
      "#mediasource-seeking"
    ]
  },
  {
    "url": "mediasource-play.html",
    "checks": [
      "#sourcebuffer",
      "#sourcebuffer-algorithms",
      "#sourcebuffer-buffer-append",
      "#methods-1"
    ]
  },
  {
    "url": "mediasource-preload.html",
    "checks": [
      "#mediasource",
      "#mediasource-algorithms",
      "#mediasource-attach"
    ]
  },
  {
    "url": "mediasource-redundant-seek.html",
    "checks": [
      "#mediasource",
      "#mediasource-algorithms",
      "#mediasource-seeking"
    ]
  },
  {
    "url": "mediasource-remove.html",
    "checks": [
      "#sourcebuffer",
      "#methods-1",
      "#sourcebuffer-algorithms",
      "#sourcebuffer-range-removal"
    ]
  },
  {
    "url": "mediasource-removesourcebuffer.html",
    "checks": [
      "#mediasource",
      "#methods"
    ]
  },
  {
    "url": "mediasource-seek-beyond-duration.html",
    "checks": [
      "#mediasource",
      "#mediasource-algorithms",
      "#mediasource-seeking"
    ]
  },
  {
    "url": "mediasource-seek-during-pending-seek.html",
    "checks": [
      "#mediasource",
      "#mediasource-algorithms",
      "#mediasource-seeking"
    ]
  },
  {
    "url": "mediasource-seekable.html",
    "checks": [
      "#htmlmediaelement-extensions"
    ]
  },
  {
    "url": "mediasource-sequencemode-append-buffer.html",
    "checks": [
      "#sourcebuffer",
      "#methods-1",
      "#sourcebuffer-algorithms",
      "#sourcebuffer-buffer-append",
      "#sourcebuffer-prepare-append"
    ]
  },
  {
    "url": "mediasource-sourcebuffer-mode-timestamps.html",
    "checks": [
      "#sourcebuffer",
      "#attributes-1"
    ]
  },
  {
    "url": "mediasource-sourcebuffer-mode.html",
    "checks": [
      "#sourcebuffer",
      "#attributes-1",
      "#mediasource",
      "#methods"
    ]
  },
  {
    "url": "mediasource-sourcebuffer-trackdefaults.html",
    "checks": [
      "#sourcebuffer",
      "#track-buffers"
    ]
  },
  {
    "url": "mediasource-sourcebufferlist.html",
    "checks": [
      "#mediasource",
      "#attributes",
      "#methods",
      "#mediasource-algorithms",
      "#mediasource-detach",
      "#sourcebufferlist",
      "#attributes-2",
      "#methods-2"
    ]
  },
  {
    "url": "mediasource-timestamp-offset.html",
    "checks": [
      "#sourcebuffer",
      "#attributes-1"
    ]
  },
  {
    "url": "mediasource-trackdefault.html",
    "checks": [
      "#sourcebuffer",
      "#track-buffers"
    ]
  },
  {
    "url": "mediasource-trackdefaultlist.html",
    "checks": [
      "#sourcebuffer",
      "#track-buffers"
    ]
  }
]