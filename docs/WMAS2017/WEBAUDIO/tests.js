var tests = [
  {
    "url": "historical.html",
    "checks": [
      "#audioapi"
    ]
  },
  {
    "url": "idlharness.https.html",
    "checks": [
      "#audioapi"
    ]
  },
  {
    "url": "the-audio-api/the-analysernode-interface/test-analyser-gain.html",
    "checks": [
      "#BaseAudioContent-methods",
      "#AnalyserNode-constructors",
      "#AnalyserNode-attributes",
      "#AnalyserNode-methods",
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-analysernode-interface/test-analyser-minimum.html",
    "checks": [
      "#BaseAudioContent-methods",
      "#AnalyserNode-constructors",
      "#AnalyserNode-attributes",
      "#AnalyserNode-methods",
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-analysernode-interface/test-analyser-output.html",
    "checks": [
      "#BaseAudioContent-methods",
      "#AnalyserNode-constructors",
      "#AnalyserNode-attributes",
      "#AnalyserNode-methods",
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-analysernode-interface/test-analyser-scale.html",
    "checks": [
      "#BaseAudioContent-methods",
      "#AnalyserNode-constructors",
      "#AnalyserNode-attributes",
      "#AnalyserNode-methods",
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods",
      "#OscillatorNode-attributes",
      "#OscillatorNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-analysernode-interface/test-analysernode.html",
    "checks": [
      "#BaseAudioContent-methods",
      "#AnalyserNode-constructors",
      "#AnalyserNode-attributes",
      "#AnalyserNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-audiobuffer-interface/idl-test.html",
    "checks": [
      "#AudioContext-attributes",
      "#callback-decodesuccesscallback-parameters",
      "#callback-decodeerrorcallback-parameters",
      "#AudioBuffer-constructors",
      "#AudioBuffer-attributes",
      "#AudioBuffer-methods",
      "#OscillatorNode-attributes",
      "#OscillatorNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-audiodestinationnode-interface/idl-test.html",
    "checks": [
      "#AudioContext-attributes",
      "#callback-decodesuccesscallback-parameters",
      "#callback-decodeerrorcallback-parameters",
      "#AudioDestinationNode-attributes",
      "#OscillatorNode-attributes",
      "#OscillatorNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-audionode-interface/audionode-channel-rules.html",
    "checks": [
      "#AudioNode-creation",
      "#AudioNode-attributes",
      "#AudioNode-methods",
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-audionode-interface/audionode-connect-method-chaining.html",
    "checks": [
      "#AudioNode-creation",
      "#AudioNode-attributes",
      "#AudioNode-methods",
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods",
      "#OscillatorNode-attributes",
      "#OscillatorNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-audionode-interface/audionode-connect-order.html",
    "checks": [
      "#AudioNode-creation",
      "#AudioNode-attributes",
      "#AudioNode-methods",
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-audionode-interface/audionode-connect-return-value.html",
    "checks": [
      "#AudioNode-creation",
      "#AudioNode-attributes",
      "#AudioNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-audionode-interface/audionode-disconnect-audioparam.html",
    "checks": [
      "#AudioNode-creation",
      "#AudioNode-attributes",
      "#AudioNode-methods",
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-audionode-interface/audionode-disconnect.html",
    "checks": [
      "#AudioNode-creation",
      "#AudioNode-attributes",
      "#AudioNode-methods",
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-audionode-interface/audionode.html",
    "checks": [
      "#AudioNode-creation",
      "#AudioNode-attributes",
      "#AudioNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-audionode-interface/channel-mode-interp-basic.html",
    "checks": [
      "#AudioNode-creation",
      "#AudioNode-attributes",
      "#AudioNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-audioparam-interface/idl-test.html",
    "checks": [
      "#AudioParam-attributes",
      "#AudioParam-methods"
    ]
  },
  {
    "url": "the-audio-api/the-audioparam-interface/retrospective-exponentialRampToValueAtTime.html",
    "checks": [
      "#AudioParam-attributes",
      "#AudioParam-methods",
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-audioparam-interface/retrospective-linearRampToValueAtTime.html",
    "checks": [
      "#AudioParam-attributes",
      "#AudioParam-methods",
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-audioparam-interface/retrospective-setTargetAtTime.html",
    "checks": [
      "#AudioParam-attributes",
      "#AudioParam-methods",
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-audioparam-interface/retrospective-setValueAtTime.html",
    "checks": [
      "#AudioParam-attributes",
      "#AudioParam-methods",
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-audioparam-interface/retrospective-setValueCurveAtTime.html",
    "checks": [
      "#AudioParam-attributes",
      "#AudioParam-methods",
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-audioparam-interface/setTargetAtTime-after-event-within-block.html",
    "checks": [
      "#AudioParam-attributes",
      "#AudioParam-methods",
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-audioparam-interface/setValueAtTime-within-block.html",
    "checks": [
      "#AudioParam-attributes",
      "#AudioParam-methods",
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-audioworklet-interface/audioworklet-addmodule-resolution.https.html",
    "checks": [
      "#AudioWorkletGlobalScope-attributes",
      "#AudioWorkletGlobalScope-methods"
    ]
  },
  {
    "url": "the-audio-api/the-audioworklet-interface/audioworklet-audioparam.https.html",
    "checks": [
      "#AudioWorkletGlobalScope-attributes",
      "#AudioWorkletGlobalScope-methods",
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-audioworklet-interface/audioworklet-messageport.https.html",
    "checks": [
      "#AudioWorkletGlobalScope-attributes",
      "#AudioWorkletGlobalScope-methods"
    ]
  },
  {
    "url": "the-audio-api/the-audioworklet-interface/audioworkletglobalscope-sample-rate.https.html",
    "checks": [
      "#AudioWorkletGlobalScope-attributes",
      "#AudioWorkletGlobalScope-methods"
    ]
  },
  {
    "url": "the-audio-api/the-audioworklet-interface/audioworkletglobalscope-timing-info.https.html",
    "checks": [
      "#AudioWorkletGlobalScope-attributes",
      "#AudioWorkletGlobalScope-methods"
    ]
  },
  {
    "url": "the-audio-api/the-audioworklet-interface/audioworkletnode-automatic-pull.https.html",
    "checks": [
      "#AudioWorkletNode-constructors",
      "#AudioWorkletNode-attributes",
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-audioworklet-interface/audioworkletnode-channel-count.https.html",
    "checks": [
      "#AudioWorkletNode-constructors",
      "#AudioWorkletNode-attributes",
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-audioworklet-interface/audioworkletnode-construction.https.html",
    "checks": [
      "#AudioWorkletNode-constructors",
      "#AudioWorkletNode-attributes"
    ]
  },
  {
    "url": "the-audio-api/the-audioworklet-interface/audioworkletnode-constructor-options.https.html",
    "checks": [
      "#AudioWorkletNode-constructors",
      "#AudioWorkletNode-attributes"
    ]
  },
  {
    "url": "the-audio-api/the-audioworklet-interface/audioworkletnode-disconnected-input.https.html",
    "checks": [
      "#AudioWorkletNode-constructors",
      "#AudioWorkletNode-attributes",
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-audioworklet-interface/audioworkletnode-onerror.https.html",
    "checks": [
      "#AudioWorkletNode-constructors",
      "#AudioWorkletNode-attributes"
    ]
  },
  {
    "url": "the-audio-api/the-audioworklet-interface/audioworkletprocessor-options.https.html",
    "checks": [
      "#AudioWorkletNode-constructors",
      "#AudioWorkletNode-attributes",
      "#dictionary-audioworkletnodeoptions-members",
      "#configuring-channels-with-audioworkletnodeoptions"
    ]
  },
  {
    "url": "the-audio-api/the-audioworklet-interface/baseaudiocontext-audioworklet.https.html",
    "checks": [
      "#AudioWorkletNode-constructors",
      "#AudioWorkletNode-attributes",
      "#BaseAudioContext-attributes",
      "#BaseAudioContext-methods"
    ]
  },
  {
    "url": "the-audio-api/the-biquadfilternode-interface/biquad-allpass.html",
    "checks": [
      "#BiquadFilterNode-constructors",
      "#BiquadFilterNode-attributes",
      "#BiquadFilterNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-biquadfilternode-interface/biquad-automation.html",
    "checks": [
      "#BiquadFilterNode-constructors",
      "#BiquadFilterNode-attributes",
      "#BiquadFilterNode-methods",
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-biquadfilternode-interface/biquad-bandpass.html",
    "checks": [
      "#BiquadFilterNode-constructors",
      "#BiquadFilterNode-attributes",
      "#BiquadFilterNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-biquadfilternode-interface/biquad-basic.html",
    "checks": [
      "#BiquadFilterNode-constructors",
      "#BiquadFilterNode-attributes",
      "#BiquadFilterNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-biquadfilternode-interface/biquad-getFrequencyResponse.html",
    "checks": [
      "#BiquadFilterNode-constructors",
      "#BiquadFilterNode-attributes",
      "#BiquadFilterNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-biquadfilternode-interface/biquad-highpass.html",
    "checks": [
      "#BiquadFilterNode-constructors",
      "#BiquadFilterNode-attributes",
      "#BiquadFilterNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-biquadfilternode-interface/biquad-highshelf.html",
    "checks": [
      "#BiquadFilterNode-constructors",
      "#BiquadFilterNode-attributes",
      "#BiquadFilterNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-biquadfilternode-interface/biquad-lowpass.html",
    "checks": [
      "#BiquadFilterNode-constructors",
      "#BiquadFilterNode-attributes",
      "#BiquadFilterNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-biquadfilternode-interface/biquad-lowshelf.html",
    "checks": [
      "#BiquadFilterNode-constructors",
      "#BiquadFilterNode-attributes",
      "#BiquadFilterNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-biquadfilternode-interface/biquad-notch.html",
    "checks": [
      "#BiquadFilterNode-constructors",
      "#BiquadFilterNode-attributes",
      "#BiquadFilterNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-biquadfilternode-interface/biquad-peaking.html",
    "checks": [
      "#BiquadFilterNode-constructors",
      "#BiquadFilterNode-attributes",
      "#BiquadFilterNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-biquadfilternode-interface/biquad-tail.html",
    "checks": [
      "#BiquadFilterNode-constructors",
      "#BiquadFilterNode-attributes",
      "#BiquadFilterNode-methods",
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-biquadfilternode-interface/biquadfilternode-basic.html",
    "checks": [
      "#BiquadFilterNode-constructors",
      "#BiquadFilterNode-attributes",
      "#BiquadFilterNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-biquadfilternode-interface/no-dezippering.html",
    "checks": [
      "#BiquadFilterNode-constructors",
      "#BiquadFilterNode-attributes",
      "#BiquadFilterNode-methods",
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods",
      "#OscillatorNode-attributes",
      "#OscillatorNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-channelmergernode-interface/audiochannelmerger-basic.html",
    "checks": [
      "#ChannelMergerNode-constructors"
    ]
  },
  {
    "url": "the-audio-api/the-channelmergernode-interface/audiochannelmerger-disconnect.html",
    "checks": [
      "#ChannelMergerNode-constructors",
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-channelmergernode-interface/audiochannelmerger-input-non-default.html",
    "checks": [
      "#ChannelMergerNode-constructors"
    ]
  },
  {
    "url": "the-audio-api/the-channelmergernode-interface/audiochannelmerger-input.html",
    "checks": [
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods",
      "#ChannelMergerNode-constructors"
    ]
  },
  {
    "url": "the-audio-api/the-channelsplitternode-interface/audiochannelsplitter.html",
    "checks": [
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods",
      "#ChannelMergerNode-constructors"
    ]
  },
  {
    "url": "the-audio-api/the-constantsourcenode-interface/constant-source-basic.html",
    "checks": [
      "#ConstantSourceNode-constructors",
      "#ConstantSourceNode-attributes"
    ]
  },
  {
    "url": "the-audio-api/the-constantsourcenode-interface/constant-source-onended.html",
    "checks": [
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods",
      "#ConstantSourceNode-constructors",
      "#ConstantSourceNode-attributes"
    ]
  },
  {
    "url": "the-audio-api/the-constantsourcenode-interface/constant-source-output.html",
    "checks": [
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods",
      "#ConstantSourceNode-constructors",
      "#ConstantSourceNode-attributes",
      "#OscillatorNode-attributes",
      "#OscillatorNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-constantsourcenode-interface/test-constantsourcenode.html",
    "checks": [
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods",
      "#ConstantSourceNode-constructors",
      "#ConstantSourceNode-attributes"
    ]
  },
  {
    "url": "the-audio-api/the-convolvernode-interface/convolution-mono-mono.html",
    "checks": [
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods",
      "#ConvolverNode-constructors",
      "#ConvolverNode-attributes"
    ]
  },
  {
    "url": "the-audio-api/the-convolvernode-interface/convolver-cascade.html",
    "checks": [
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods",
      "#ConvolverNode-constructors",
      "#ConvolverNode-attributes",
      "#OscillatorNode-attributes",
      "#OscillatorNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-convolvernode-interface/convolver-channels.html",
    "checks": [
      "#ConvolverNode-constructors",
      "#ConvolverNode-attributes"
    ]
  },
  {
    "url": "the-audio-api/the-convolvernode-interface/convolver-response-1-chan.html",
    "checks": [
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods",
      "#ConvolverNode-constructors",
      "#ConvolverNode-attributes",
      "#OscillatorNode-attributes",
      "#OscillatorNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-convolvernode-interface/convolver-response-2-chan.html",
    "checks": [
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods",
      "#ConvolverNode-constructors",
      "#ConvolverNode-attributes",
      "#OscillatorNode-attributes",
      "#OscillatorNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-convolvernode-interface/convolver-response-4-chan.html",
    "checks": [
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods",
      "#ConvolverNode-constructors",
      "#ConvolverNode-attributes",
      "#OscillatorNode-attributes",
      "#OscillatorNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-convolvernode-interface/convolver-setBuffer-null.html",
    "checks": [
      "#ConvolverNode-constructors",
      "#ConvolverNode-attributes"
    ]
  },
  {
    "url": "the-audio-api/the-delaynode-interface/delaynode-max-default-delay.html",
    "checks": [
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods",
      "#DelayNode-constructors",
      "#DelayNode-attributes"
    ]
  },
  {
    "url": "the-audio-api/the-delaynode-interface/delaynode-max-nondefault-delay.html",
    "checks": [
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods",
      "#DelayNode-constructors",
      "#DelayNode-attributes"
    ]
  },
  {
    "url": "the-audio-api/the-delaynode-interface/delaynode-maxdelay.html",
    "checks": [
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods",
      "#DelayNode-constructors",
      "#DelayNode-attributes"
    ]
  },
  {
    "url": "the-audio-api/the-delaynode-interface/delaynode-maxdelaylimit.html",
    "checks": [
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods",
      "#DelayNode-constructors",
      "#DelayNode-attributes"
    ]
  },
  {
    "url": "the-audio-api/the-delaynode-interface/delaynode-scheduling.html",
    "checks": [
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods",
      "#DelayNode-constructors",
      "#DelayNode-attributes"
    ]
  },
  {
    "url": "the-audio-api/the-delaynode-interface/delaynode.html",
    "checks": [
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods",
      "#DelayNode-constructors",
      "#DelayNode-attributes"
    ]
  },
  {
    "url": "the-audio-api/the-delaynode-interface/no-dezippering.html",
    "checks": [
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods",
      "#DelayNode-constructors",
      "#DelayNode-attributes",
      "#OscillatorNode-attributes",
      "#OscillatorNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-dynamicscompressornode-interface/dynamicscompressor-basic.html",
    "checks": [
      "#DynamicsCompressorNode-constructors",
      "#DynamicsCompressorNode-attributes"
    ]
  },
  {
    "url": "the-audio-api/the-gainnode-interface/gain-basic.html",
    "checks": [
      "#GainNode-constructors",
      "#GainNode-attributes"
    ]
  },
  {
    "url": "the-audio-api/the-gainnode-interface/gain.html",
    "checks": [
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods",
      "#GainNode-constructors",
      "#GainNode-attributes"
    ]
  },
  {
    "url": "the-audio-api/the-gainnode-interface/no-dezippering.html",
    "checks": [
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods",
      "#GainNode-constructors",
      "#GainNode-attributes",
      "#OscillatorNode-attributes",
      "#OscillatorNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-gainnode-interface/test-gainnode.html",
    "checks": [
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods",
      "#GainNode-constructors",
      "#GainNode-attributes"
    ]
  },
  {
    "url": "the-audio-api/the-iirfilternode-interface/iirfilter-basic.html",
    "checks": [
      "#IIRFilterNode-constructors",
      "#IIRFilterNode-attributes"
    ]
  },
  {
    "url": "the-audio-api/the-iirfilternode-interface/iirfilter-getFrequencyResponse.html",
    "checks": [
      "#IIRFilterNode-constructors",
      "#IIRFilterNode-attributes"
    ]
  },
  {
    "url": "the-audio-api/the-iirfilternode-interface/iirfilter.html",
    "checks": [
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods",
      "#IIRFilterNode-constructors",
      "#IIRFilterNode-attributes",
      "#OscillatorNode-attributes",
      "#OscillatorNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-iirfilternode-interface/test-iirfilternode.html",
    "checks": [
      "#IIRFilterNode-constructors",
      "#IIRFilterNode-attributes"
    ]
  },
  {
    "url": "the-audio-api/the-mediaelementaudiosourcenode-interface/mediaElementAudioSourceToScriptProcessorTest.html",
    "checks": [
      "#AudioContext-methods",
      "#MediaElementAudioSourceNode-constructors",
      "#MediaElementAudioSourceNode-attributes"
    ]
  },
  {
    "url": "the-audio-api/the-offlineaudiocontext-interface/current-time-block-size.html",
    "checks": [
      "#OfflineAudioContext-constructors",
      "#OfflineAudioContext-attributes",
      "#OfflineAudioContext-methods"
    ]
  },
  {
    "url": "the-audio-api/the-pannernode-interface/distance-exponential.html",
    "checks": [
      "#PannerNode-constructors",
      "#PannerNode-attributes",
      "#PannerNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-pannernode-interface/distance-inverse.html",
    "checks": [
      "#PannerNode-constructors",
      "#PannerNode-attributes",
      "#PannerNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-pannernode-interface/distance-linear.html",
    "checks": [
      "#PannerNode-constructors",
      "#PannerNode-attributes",
      "#PannerNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-pannernode-interface/panner-automation-basic.html",
    "checks": [
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods",
      "#AudioListener-attributes",
      "#AudioListener-methods",
      "#PannerNode-constructors",
      "#PannerNode-attributes",
      "#PannerNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-pannernode-interface/panner-automation-equalpower-stereo.html",
    "checks": [
      "#PannerNode-constructors",
      "#PannerNode-attributes",
      "#PannerNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-pannernode-interface/panner-automation-position.html",
    "checks": [
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods",
      "#PannerNode-constructors",
      "#PannerNode-attributes",
      "#PannerNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-pannernode-interface/panner-distance-clamping.html",
    "checks": [
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods",
      "#PannerNode-constructors",
      "#PannerNode-attributes",
      "#PannerNode-methods",
      "#OscillatorNode-attributes",
      "#OscillatorNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-pannernode-interface/panner-equalpower-stereo.html",
    "checks": [
      "#AudioListener-attributes",
      "#AudioListener-methods",
      "#PannerNode-constructors",
      "#PannerNode-attributes",
      "#PannerNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-pannernode-interface/panner-equalpower.html",
    "checks": [
      "#AudioListener-attributes",
      "#AudioListener-methods",
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods",
      "#PannerNode-constructors",
      "#PannerNode-attributes",
      "#PannerNode-methods",
      "#OscillatorNode-attributes",
      "#OscillatorNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-pannernode-interface/panner-rolloff-clamping.html",
    "checks": [
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods",
      "#PannerNode-constructors",
      "#PannerNode-attributes",
      "#PannerNode-methods",
      "#OscillatorNode-attributes",
      "#OscillatorNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-pannernode-interface/pannernode-basic.html",
    "checks": [
      "#PannerNode-constructors",
      "#PannerNode-attributes",
      "#PannerNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-pannernode-interface/test-pannernode-automation.html",
    "checks": [
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods",
      "#PannerNode-constructors",
      "#PannerNode-attributes",
      "#PannerNode-methods",
      "#OscillatorNode-attributes",
      "#OscillatorNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-stereopanner-interface/no-dezippering.html",
    "checks": [
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods",
      "#StereoPannerNode-constructors",
      "#StereoPannerNode-attributes",
      "#OscillatorNode-attributes",
      "#OscillatorNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-stereopanner-interface/stereopannernode-basic.html",
    "checks": [
      "#StereoPannerNode-constructors",
      "#StereoPannerNode-attributes"
    ]
  },
  {
    "url": "the-audio-api/the-stereopanner-interface/stereopannernode-panning.html",
    "checks": [
      "#StereoPannerNode-constructors",
      "#StereoPannerNode-attributes"
    ]
  },
  {
    "url": "the-audio-api/the-waveshapernode-interface/curve-tests.html",
    "checks": [
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods",
      "#WaveShaperNode-constructors",
      "#WaveShaperNode-attributes"
    ]
  },
  {
    "url": "the-audio-api/the-waveshapernode-interface/waveshaper-copy-curve.html",
    "checks": [
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods",
      "#WaveShaperNode-constructors",
      "#WaveShaperNode-attributes",
      "#OscillatorNode-attributes",
      "#OscillatorNode-methods"
    ]
  },
  {
    "url": "the-audio-api/the-waveshapernode-interface/waveshaper-limits.html",
    "checks": [
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods",
      "#WaveShaperNode-constructors",
      "#WaveShaperNode-attributes"
    ]
  },
  {
    "url": "the-audio-api/the-waveshapernode-interface/waveshaper-simple.html",
    "checks": [
      "#WaveShaperNode-constructors",
      "#WaveShaperNode-attributes"
    ]
  },
  {
    "url": "the-audio-api/the-waveshapernode-interface/waveshaper.html",
    "checks": [
      "#AudioBufferSourceNode-constructors",
      "#AudioBufferSourceNode-attributes",
      "#AudioBufferSourceNode-methods",
      "#WaveShaperNode-constructors",
      "#WaveShaperNode-attributes"
    ]
  }
]
