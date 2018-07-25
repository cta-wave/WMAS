var toc = {
  "name": "Table of Contents",
  "version": "https://www.w3.org/TR/2018/WD-webaudio-20180619/",
  "children": [
    {
      "number": "1",
      "name": "1  The Audio API",
      "url": "audioapi",
      "children": [
        {
          "number": "1.1",
          "name": "The BaseAudioContext Interface",
          "url": "BaseAudioContext",
          "children": [
            {
              "number": "1.1.1",
              "name": "Attributes",
              "url": "BaseAudioContext-attributes"
            },
            {
              "number": "1.1.2",
              "name": "Methods",
              "url": "BaseAudioContent-methods"
            },
            {
              "number": "1.1.3",
              "name": "Callback DecodeSuccessCallback() Parameters",
              "url": "callback-decodesuccesscallback-parameters"
            },
            {
              "number": "1.1.4",
              "name": "Callback DecodeErrorCallback() Parameters",
              "url": "callback-decodeerrorcallback-parameters"
            },
            {
              "number": "1.1.5",
              "name": "Lifetime",
              "url": "lifetime-AudioContext"
            },
            {
              "number": "1.1.6",
              "name": "Lack of Introspection or Serialization Primitives",
              "url": "lack-of-introspection-or-serialization-primitives"
            },
            {
              "number": "1.1.7",
              "name": "System Resources Associated with BaseAudioContext Subclasses",
              "url": "system-resources-associated-with-baseaudiocontext-subclasses"
            }
          ]
        },
        {
          "number": "1.2",
          "name": "The AudioContext Interface",
          "url": "AudioContext",
          "children": [
            {
              "number": "1.2.1",
              "name": "Constructors",
              "url": "AudioContext-constructors"
            },
            {
              "number": "1.2.2",
              "name": "Attributes",
              "url": "AudioContext-attributes"
            },
            {
              "number": "1.2.3",
              "name": "Methods",
              "url": "AudioContext-methods"
            },
            {
              "number": "1.2.4",
              "name": "AudioContextOptions",
              "url": "AudioContextOptions",
              "children": [
                {
                  "number": "1.2.4.1",
                  "name": "Dictionary AudioContextOptions Members",
                  "url": "dictionary-audiocontextoptions-members"
                }
              ]
            },
            {
              "number": "1.2.5",
              "name": "AudioTimestamp",
              "url": "AudioTimestamp",
              "children": [
                {
                  "number": "1.2.5.1",
                  "name": "Dictionary AudioTimestamp Members",
                  "url": "dictionary-audiotimestamp-members"
                }
              ]
            }
          ]
        },
        {
          "number": "1.3",
          "name": "The OfflineAudioContext Interface",
          "url": "OfflineAudioContext",
          "children": [
            {
              "number": "1.3.1",
              "name": "Constructors",
              "url": "OfflineAudioContext-constructors"
            },
            {
              "number": "1.3.2",
              "name": "Attributes",
              "url": "OfflineAudioContext-attributes"
            },
            {
              "number": "1.3.3",
              "name": "Methods",
              "url": "OfflineAudioContext-methods"
            },
            {
              "number": "1.3.4",
              "name": "OfflineAudioContextOptions",
              "url": "OfflineAudioContextOptions",
              "children": [
                {
                  "number": "1.3.4.1",
                  "name": "Dictionary OfflineAudioContextOptions Members",
                  "url": "dictionary-offlineaudiocontextoptions-members"
                }
              ]
            },
            {
              "number": "1.3.5",
              "name": "The OfflineAudioCompletionEvent Interface",
              "url": "OfflineAudioCompletionEvent",
              "children": [
                {
                  "number": "1.3.5.1",
                  "name": "Attributes",
                  "url": "OfflineAudioCompletionEvent-attributes"
                },
                {
                  "number": "1.3.5.2",
                  "name": "OfflineAudioCompletionEventInit",
                  "url": "OfflineAudioCompletionEventInit",
                  "children": [
                    {
                      "number": "1.3.5.2.1",
                      "name": "Dictionary OfflineAudioCompletionEventInit Members",
                      "url": "dictionary-offlineaudiocompletioneventinit-members"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "number": "1.4",
          "name": "The AudioBuffer Interface",
          "url": "AudioBuffer",
          "children": [
            {
              "number": "1.4.1",
              "name": "Constructors",
              "url": "AudioBuffer-constructors"
            },
            {
              "number": "1.4.2",
              "name": "Attributes",
              "url": "AudioBuffer-attributes"
            },
            {
              "number": "1.4.3",
              "name": "Methods",
              "url": "AudioBuffer-methods"
            },
            {
              "number": "1.4.4",
              "name": "AudioBufferOptions",
              "url": "AudioBufferOptions",
              "children": [
                {
                  "number": "1.4.4.1",
                  "name": "Dictionary AudioBufferOptions Members",
                  "url": "dictionary-audiobufferoptions-members"
                }
              ]
            }
          ]
        },
        {
          "number": "1.5",
          "name": "The AudioNode Interface",
          "url": "audionode",
          "children": [
            {
              "number": "1.5.1",
              "name": "AudioNode Creation",
              "url": "AudioNode-creation"
            },
            {
              "number": "1.5.2",
              "name": "Attributes",
              "url": "AudioNode-attributes"
            },
            {
              "number": "1.5.3",
              "name": "Methods",
              "url": "AudioNode-methods"
            },
            {
              "number": "1.5.4",
              "name": "AudioNodeOptions",
              "url": "dictdef-audionodeoptions",
              "children": [
                {
                  "number": "1.5.4.1",
                  "name": "Dictionary AudioNodeOptions Members",
                  "url": "dictionary-audionodeoptions-members"
                }
              ]
            },
            {
              "number": "1.5.5",
              "name": "Lifetime",
              "url": "lifetime-AudioNode"
            }
          ]
        },
        {
          "number": "1.6",
          "name": "The AudioParam Interface",
          "url": "AudioParam",
          "children": [
            {
              "number": "1.6.1",
              "name": "Attributes",
              "url": "AudioParam-attributes"
            },
            {
              "number": "1.6.2",
              "name": "Methods",
              "url": "AudioParam-methods"
            },
            {
              "number": "1.6.3",
              "name": "Computation of Value",
              "url": "computation-of-value"
            }
          ]
        },
        {
          "number": "1.7",
          "name": "The AudioScheduledSourceNode Interface",
          "url": "AudioScheduledSourceNode",
          "children": [
            {
              "number": "1.7.1",
              "name": "Attributes",
              "url": "AudioScheduledSourceNode-attributes"
            },
            {
              "number": "1.7.2",
              "name": "Methods",
              "url": "AudioScheduledSourceNode-methods"
            }
          ]
        },
        {
          "number": "1.8",
          "name": "The AnalyserNode Interface",
          "url": "analysernode",
          "children": [
            {
              "number": "1.8.1",
              "name": "Constructors",
              "url": "AnalyserNode-constructors"
            },
            {
              "number": "1.8.2",
              "name": "Attributes",
              "url": "AnalyserNode-attributes"
            },
            {
              "number": "1.8.3",
              "name": "Methods",
              "url": "AnalyserNode-methods"
            },
            {
              "number": "1.8.4",
              "name": "AnalyserOptions",
              "url": "dictdef-analyseroptions",
              "children": [
                {
                  "number": "1.8.4.1",
                  "name": "Dictionary AnalyserOptions Members",
                  "url": "dictionary-analyseroptions-members"
                }
              ]
            },
            {
              "number": "1.8.5",
              "name": "Time-Domain Down-Mixing",
              "url": "time-domain-down-mixing"
            },
            {
              "number": "1.8.6",
              "name": "FFT Windowing and Smoothing over Time",
              "url": "fft-windowing-and-smoothing-over-time"
            }
          ]
        },
        {
          "number": "1.9",
          "name": "The AudioBufferSourceNode Interface",
          "url": "AudioBufferSourceNode",
          "children": [
            {
              "number": "1.9.1",
              "name": "Constructors",
              "url": "AudioBufferSourceNode-constructors"
            },
            {
              "number": "1.9.2",
              "name": "Attributes",
              "url": "AudioBufferSourceNode-attributes"
            },
            {
              "number": "1.9.3",
              "name": "Methods",
              "url": "AudioBufferSourceNode-methods"
            },
            {
              "number": "1.9.4",
              "name": "AudioBufferSourceOptions",
              "url": "dictdef-audiobuffersourceoptions",
              "children": [
                {
                  "number": "1.9.4.1",
                  "name": "Dictionary AudioBufferSourceOptions Members",
                  "url": "dictionary-audiobuffersourceoptions-members"
                }
              ]
            },
            {
              "number": "1.9.6",
              "name": "Playback of AudioBuffer Contents",
              "url": "playback-AudioBufferSourceNode"
            }
          ]
        },
        {
          "number": "1.10",
          "name": "The AudioDestinationNode Interface",
          "url": "AudioDestinationNode",
          "children": [
            {
              "number": "1.10.1",
              "name": "Attributes",
              "url": "AudioDestinationNode-attributes"
            }
          ]
        },
        {
          "number": "1.11",
          "name": "The AudioListener Interface",
          "url": "audiolistener",
          "children": [
            {
              "number": "1.11.1",
              "name": "Attributes",
              "url": "AudioListener-attributes"
            },
            {
              "number": "1.11.2",
              "name": "Methods",
              "url": "AudioListener-methods"
            }
          ]
        },
        {
          "number": "1.12",
          "name": "The AudioProcessingEvent Interface - DEPRECATED",
          "url": "audioprocessingevent",
          "children": [
            {
              "number": "1.12.1",
              "name": "Attributes",
              "url": "AudioProcessingEvent-attributes"
            },
            {
              "number": "1.12.2",
              "name": "AudioProcessingEventInit",
              "url": "dictdef-audioprocessingeventinit",
              "children": [
                {
                  "number": "1.12.2.1",
                  "name": "Dictionary AudioProcessingEventInit Members",
                  "url": "dictionary-audioprocessingeventinit-members"
                }
              ]
            }
          ]
        },
        {
          "number": "1.13",
          "name": "The BiquadFilterNode Interface",
          "url": "biquadfilternode",
          "children": [
            {
              "number": "1.13.1",
              "name": "Constructors",
              "url": "BiquadFilterNode-constructors"
            },
            {
              "number": "1.13.2",
              "name": "Attributes",
              "url": "BiquadFilterNode-attributes"
            },
            {
              "number": "1.13.3",
              "name": "Methods",
              "url": "BiquadFilterNode-methods"
            },
            {
              "number": "1.13.4",
              "name": "BiquadFilterOptions",
              "url": "dictdef-biquadfilteroptions",
              "children": [
                {
                  "number": "1.13.4.1",
                  "name": "Dictionary BiquadFilterOptions Members",
                  "url": "dictionary-biquadfilteroptions-members"
                }
              ]
            },
            {
              "number": "1.13.5",
              "name": "Filters Characteristics",
              "url": "filters-characteristics"
            }
          ]
        },
        {
          "number": "1.14",
          "name": "The ChannelMergerNode Interface",
          "url": "channelmergernode",
          "children": [
            {
              "number": "1.14.1",
              "name": "Constructors",
              "url": "ChannelMergerNode-constructors"
            },
            {
              "number": "1.14.2",
              "name": "ChannelMergerOptions",
              "url": "dictdef-channelmergeroptions",
              "children": [
                {
                  "number": "1.14.2.1",
                  "name": "Dictionary ChannelMergerOptions Members",
                  "url": "dictionary-channelmergeroptions-members"
                }
              ]
            }
          ]
        },
        {
          "number": "1.15",
          "name": "The ChannelSplitterNode Interface",
          "url": "channelsplitternode",
          "children": [
            {
              "number": "1.15.1",
              "name": "Constructors",
              "url": "ChannelSplitterNode-constructors"
            },
            {
              "number": "1.15.2",
              "name": "ChannelSplitterOptions",
              "url": "dictdef-channelsplitteroptions",
              "children": [
                {
                  "number": "1.15.2.1",
                  "name": "Dictionary ChannelSplitterOptions Members",
                  "url": "dictionary-channelsplitteroptions-members"
                }
              ]
            }
          ]
        },
        {
          "number": "1.16",
          "name": "The ConstantSourceNode Interface",
          "url": "ConstantSourceNode",
          "children": [
            {
              "number": "1.16.1",
              "name": "Constructors",
              "url": "ConstantSourceNode-constructors"
            },
            {
              "number": "1.16.2",
              "name": "Attributes",
              "url": "ConstantSourceNode-attributes"
            },
            {
              "number": "1.16.3",
              "name": "ConstantSourceOptions",
              "url": "dictdef-constantsourceoptions",
              "children": [
                {
                  "number": "1.16.3.1",
                  "name": "Dictionary ConstantSourceOptions Members",
                  "url": "dictionary-constantsourceoptions-members"
                }
              ]
            }
          ]
        },
        {
          "number": "1.17",
          "name": "The ConvolverNode Interface",
          "url": "ConvolverNode",
          "children": [
            {
              "number": "1.17.1",
              "name": "Constructors",
              "url": "ConvolverNode-constructors"
            },
            {
              "number": "1.17.2",
              "name": "Attributes",
              "url": "ConvolverNode-attributes"
            },
            {
              "number": "1.17.3",
              "name": "ConvolverOptions",
              "url": "dictdef-convolveroptions",
              "children": [
                {
                  "number": "1.17.3.1",
                  "name": "Dictionary ConvolverOptions Members",
                  "url": "dictionary-convolveroptions-members"
                }
              ]
            },
            {
              "number": "1.17.4",
              "name": "Channel Configurations for Input, Impulse Response and Output",
              "url": "Convolution-channel-configurations"
            }
          ]
        },
        {
          "number": "1.18",
          "name": "The DelayNode Interface",
          "url": "DelayNode",
          "children": [
            {
              "number": "1.18.1",
              "name": "Constructors",
              "url": "DelayNode-constructors"
            },
            {
              "number": "1.18.2",
              "name": "Attributes",
              "url": "DelayNode-attributes"
            },
            {
              "number": "1.18.3",
              "name": "DelayOptions",
              "url": "dictdef-delayoptions",
              "children": [
                {
                  "number": "1.18.3.1",
                  "name": "Dictionary DelayOptions Members",
                  "url": "dictionary-delayoptions-members"
                }
              ]
            }
          ]
        },
        {
          "number": "1.19",
          "name": "The DynamicsCompressorNode Interface",
          "url": "dynamicscompressornode",
          "children": [
            {
              "number": "1.19.1",
              "name": "Constructors",
              "url": "DynamicsCompressorNode-constructors"
            },
            {
              "number": "1.19.2",
              "name": "Attributes",
              "url": "DynamicsCompressorNode-attributes"
            },
            {
              "number": "1.19.3",
              "name": "DynamicsCompressorOptions",
              "url": "dictdef-dynamicscompressoroptions",
              "children": [
                {
                  "number": "1.19.3.1",
                  "name": "Dictionary DynamicsCompressorOptions Members",
                  "url": "dictionary-dynamicscompressoroptions-members"
                }
              ]
            },
            {
              "number": "1.19.4",
              "name": "Processing",
              "url": "DynamicsCompressorOptions-processing"
            }
          ]
        },
        {
          "number": "1.20",
          "name": "The GainNode Interface",
          "url": "gainnode",
          "children": [
            {
              "number": "1.20.1",
              "name": "Constructors",
              "url": "GainNode-constructors"
            },
            {
              "number": "1.20.2",
              "name": "Attributes",
              "url": "GainNode-attributes"
            },
            {
              "number": "1.20.3",
              "name": "GainOptions",
              "url": "dictdef-gainoptions",
              "children": [
                {
                  "number": "1.20.3.1",
                  "name": "Dictionary GainOptions Members",
                  "url": "dictionary-gainoptions-members"
                }
              ]
            }
          ]
        },
        {
          "number": "1.21",
          "name": "The IIRFilterNode Interface",
          "url": "iirfilternode",
          "children": [
            {
              "number": "1.21.1",
              "name": "Constructors",
              "url": "IIRFilterNode-constructors"
            },
            {
              "number": "1.21.2",
              "name": "Methods",
              "url": "IIRFilterNode-methods"
            },
            {
              "number": "1.21.3",
              "name": "IIRFilterOptions",
              "url": "dictdef-iirfilteroptions",
              "children": [
                {
                  "number": "1.21.3.1",
                  "name": "Dictionary IIRFilterOptions Members",
                  "url": "dictionary-iirfilteroptions-members"
                }
              ]
            },
            {
              "number": "1.21.4",
              "name": "Filter Definition",
              "url": "IIRFilterNode-filter-definition"
            }
          ]
        },
        {
          "number": "1.22",
          "name": "The MediaElementAudioSourceNode Interface",
          "url": "mediaelementaudiosourcenode",
          "children": [
            {
              "number": "1.22.1",
              "name": "Constructors",
              "url": "MediaElementAudioSourceNode-constructors"
            },
            {
              "number": "1.22.2",
              "name": "Attributes",
              "url": "MediaElementAudioSourceNode-attributes"
            },
            {
              "number": "1.22.3",
              "name": "MediaElementAudioSourceOptions",
              "url": "dictdef-mediaelementaudiosourceoptions",
              "children": [
                {
                  "number": "1.22.3.1",
                  "name": "Dictionary MediaElementAudioSourceOptions Members",
                  "url": "dictionary-mediaelementaudiosourceoptions-members"
                }
              ]
            },
            {
              "number": "1.22.4",
              "name": "Security with MediaElementAudioSourceNode and Cross-Origin Resources",
              "url": "MediaElementAudioSourceOptions-security"
            }
          ]
        },
        {
          "number": "1.23",
          "name": "The MediaStreamAudioDestinationNode Interface",
          "url": "mediastreamaudiodestinationnode",
          "children": [
            {
              "number": "1.23.1",
              "name": "Constructors",
              "url": "MediaStreamAudioDestinationNode-constructors"
            },
            {
              "number": "1.23.2",
              "name": "Attributes",
              "url": "MediaStreamAudioDestinationNode-attributes"
            }
          ]
        },
        {
          "number": "1.24",
          "name": "The MediaStreamAudioSourceNode Interface",
          "url": "mediastreamaudiosourcenode",
          "children": [
            {
              "number": "1.24.1",
              "name": "Constructors",
              "url": "MediaStreamAudioSourceNode-constructors"
            },
            {
              "number": "1.24.2",
              "name": "Attributes",
              "url": "MediaStreamAudioSourceNode-attributes"
            },
            {
              "number": "1.24.3",
              "name": "MediaStreamAudioSourceOptions",
              "url": "dictdef-mediastreamaudiosourceoptions",
              "children": [
                {
                  "number": "1.24.3.1",
                  "name": "Dictionary MediaStreamAudioSourceOptions Members",
                  "url": "dictionary-mediastreamaudiosourceoptions-members"
                }
              ]
            }
          ]
        },
        {
          "number": "1.25",
          "name": "The MediaStreamTrackAudioSourceNode Interface",
          "url": "mediastreamtrackaudiosourcenode",
          "children": [
            {
              "number": "1.25.1",
              "name": "Constructors",
              "url": "MediaStreamTrackAudioSourceNode-constructors"
            },
            {
              "number": "1.25.2",
              "name": "MediaStreamTrackAudioSourceOptions",
              "url": "dictdef-mediastreamtrackaudiosourceoptions",
              "children": [
                {
                  "number": "1.25.2.1",
                  "name": "Dictionary MediaStreamTrackAudioSourceOptions Members",
                  "url": "dictionary-mediastreamtrackaudiosourceoptions-members"
                }
              ]
            }
          ]
        },
        {
          "number": "1.26",
          "name": "The OscillatorNode Interface",
          "url": "oscillatornode"
        },
        {
          "number": "1.27",
          "name": "Constructors",
          "url": "OscillatorNode-constructors",
          "children": [
            {
              "number": "1.27.1",
              "name": "Attributes",
              "url": "OscillatorNode-attributes"
            },
            {
              "number": "1.27.2",
              "name": "Methods",
              "url": "OscillatorNode-methods"
            },
            {
              "number": "1.27.3",
              "name": "OscillatorOptions",
              "url": "dictdef-oscillatoroptions",
              "children": [
                {
                  "number": "1.27.3.1",
                  "name": "Dictionary OscillatorOptions Members",
                  "url": "dictionary-oscillatoroptions-members"
                }
              ]
            },
            {
              "number": "1.27.4",
              "name": "Basic Waveform Phase",
              "url": "basic-waveform-phase"
            }
          ]
        },
        {
          "number": "1.28",
          "name": "The PannerNode Interface",
          "url": "pannernode",
          "children": [
            {
              "number": "1.28.1",
              "name": "Constructors",
              "url": "PannerNode-constructors"
            },
            {
              "number": "1.28.2",
              "name": "Attributes",
              "url": "PannerNode-attributes"
            },
            {
              "number": "1.28.3",
              "name": "Methods",
              "url": "PannerNode-methods"
            },
            {
              "number": "1.28.4",
              "name": "PannerOptions",
              "url": "dictdef-panneroptions",
              "children": [
                {
                  "number": "1.28.4.1",
                  "name": "Dictionary PannerOptions Members",
                  "url": "dictionary-pannernode-members"
                }
              ]
            },
            {
              "number": "1.28.5",
              "name": "Channel Limitations",
              "url": "panner-channel-limitations"
            }
          ]
        },
        {
          "number": "1.29",
          "name": "The PeriodicWave Interface",
          "url": "periodicwave",
          "children": [
            {
              "number": "1.29.1",
              "name": "Constructors",
              "url": "PeriodicWave-constructors"
            },
            {
              "number": "1.29.2",
              "name": "PeriodicWaveConstraints",
              "url": "dictdef-periodicwaveconstraints",
              "children": [
                {
                  "number": "1.29.2.1",
                  "name": "Dictionary PeriodicWaveConstraints Members",
                  "url": "dictionary-periodicwaveconstraints-members"
                }
              ]
            },
            {
              "number": "1.29.3",
              "name": "PeriodicWaveOptions",
              "url": "dictdef-periodicwaveoptions",
              "children": [
                {
                  "number": "1.29.3.1",
                  "name": "Dictionary PeriodicWaveOptions Members",
                  "url": "dictionary-periodicwaveoptions-members"
                }
              ]
            },
            {
              "number": "1.29.4",
              "name": "Waveform Generation",
              "url": "waveform-generation"
            },
            {
              "number": "1.29.5",
              "name": "Waveform Normalization",
              "url": "waveform-normalization"
            },
            {
              "number": "1.29.6",
              "name": "Oscillator Coefficients",
              "url": "oscillator-coefficients"
            }
          ]
        },
        {
          "number": "1.30",
          "name": "The ScriptProcessorNode Interface - DEPRECATED",
          "url": "scriptprocessornode",
          "children": [
            {
              "number": "1.30.1",
              "name": "Attributes",
              "url": "ScriptProcessorNode-attributes"
            }
          ]
        },
        {
          "number": "1.31",
          "name": "The StereoPannerNode Interface",
          "url": "stereopannernode",
          "children": [
            {
              "number": "1.31.1",
              "name": "Constructors",
              "url": "StereoPannerNode-constructors"
            },
            {
              "number": "1.31.2",
              "name": "Attributes",
              "url": "StereoPannerNode-attributes"
            },
            {
              "number": "1.31.3",
              "name": "StereoPannerOptions",
              "url": "dictdef-stereopanneroptions",
              "children": [
                {
                  "number": "1.31.3.1",
                  "name": "Dictionary StereoPannerOptions Members",
                  "url": "dictionary-stereopanneroptions-members"
                }
              ]
            },
            {
              "number": "1.31.4",
              "name": "Channel Limitations",
              "url": "StereoPanner-channel-limitations"
            }
          ]
        },
        {
          "number": "1.32",
          "name": "The WaveShaperNode Interface",
          "url": "waveshapernode",
          "children": [
            {
              "number": "1.32.1",
              "name": "Constructors",
              "url": "WaveShaperNode-constructors"
            },
            {
              "number": "1.32.2",
              "name": "Attributes",
              "url": "WaveShaperNode-attributes"
            },
            {
              "number": "1.32.3",
              "name": "WaveShaperOptions",
              "url": "dictdef-waveshaperoptions",
              "children": [
                {
                  "number": "1.32.3.1",
                  "name": "Dictionary WaveShaperOptions Members",
                  "url": "dictionary-waveshaperoptions-members"
                }
              ]
            }
          ]
        },
        {
          "number": "1.33",
          "name": "The AudioWorklet Interface",
          "url": "audioworklet",
          "children": [
            {
              "number": "1.33.1",
              "name": "Concepts",
              "url": "AudioWorklet-concepts"
            },
            {
              "number": "1.33.2",
              "name": "The AudioWorkletGlobalScope Interface",
              "url": "audioworkletglobalscope",
              "children": [
                {
                  "number": "1.33.2.1",
                  "name": "Attributes",
                  "url": "AudioWorkletGlobalScope-attributes"
                },
                {
                  "number": "1.33.2.2",
                  "name": "Methods",
                  "url": "AudioWorkletGlobalScope-methods"
                }
              ]
            },
            {
              "number": "1.33.3",
              "name": "The AudioWorkletNode Interface",
              "url": "audioworkletnode",
              "children": [
                {
                  "number": "1.33.3.1",
                  "name": "Constructors",
                  "url": "AudioWorkletNode-constructors"
                },
                {
                  "number": "1.33.3.2",
                  "name": "Attributes",
                  "url": "AudioWorkletNode-attributes"
                },
                {
                  "number": "1.33.3.3",
                  "name": "AudioWorkletNodeOptions",
                  "url": "dictdef-audioworkletnodeoptions",
                  "children": [
                    {
                      "number": "1.33.3.3.1",
                      "name": "Dictionary AudioWorkletNodeOptions Members",
                      "url": "dictionary-audioworkletnodeoptions-members"
                    },
                    {
                      "number": "1.33.3.3.2",
                      "name": "Configuring Channels with AudioWorkletNodeOptions",
                      "url": "configuring-channels-with-audioworkletnodeoptions"
                    }
                  ]
                }
              ]
            },
            {
              "number": "1.33.4",
              "name": "The AudioWorkletProcessor Interface",
              "url": "audioworkletprocessor",
              "children": [
                {
                  "number": "1.33.4.1",
                  "name": "Constructors",
                  "url": "AudioWorketProcessor-constructors"
                },
                {
                  "number": "1.33.4.2",
                  "name": "Attributes",
                  "url": "AudioWorkletProcessor-attributes"
                },
                {
                  "number": "1.33.4.3",
                  "name": "Methods",
                  "url": "AudioWorkletProcessor-methods"
                },
                {
                  "number": "1.33.4.4",
                  "name": "AudioParamDescriptor",
                  "url": "dictdef-audioparamdescriptor",
                  "children": [
                    {
                      "number": "1.33.4.4.1",
                      "name": "Dictionary AudioParamDescriptor Members",
                      "url": "dictionary-audioparamdescriptor-members"
                    }
                  ]
                }
              ]
            },
            {
              "number": "1.33.5",
              "name": "The instantiation of AudioWorkletNode and AudioWorkletProcessor",
              "url": "instantiation-of-AudioWorkletNode-and-AudioWorkletProcessor"
            },
            {
              "number": "1.33.6",
              "name": "AudioWorklet Sequence of Events",
              "url": "AudioWorklet-Sequence"
            }
          ]
        }
      ]
    },
    {
      "number": "2",
      "name": "2  Processing model",
      "url": "processing-model",
      "children": [
        {
          "number": "2.1",
          "name": "Background",
          "url": "processing-model-background"
        },
        {
          "number": "2.2",
          "name": "Control Thread and Rendering Thread",
          "url": "control-thread-and-rendering-thread"
        },
        {
          "number": "2.3",
          "name": "Asynchronous Operations",
          "url": "asynchronous-operations"
        },
        {
          "number": "2.4",
          "name": "Rendering an Audio Graph",
          "url": "rendering-loop"
        }
      ]
    },
    {
      "number": "3",
      "name": "3  Mixer Gain Structure",
      "url": "mixer-gain-structure",
      "children": [
        {
          "number": "3.1",
          "name": "Background",
          "url": "background"
        },
        {
          "number": "3.2",
          "name": "Summing Inputs",
          "url": "SummingJunction"
        },
        {
          "number": "3.3",
          "name": "Gain Control",
          "url": "gain-control"
        }
      ]
    },
    {
      "number": "4",
      "name": "4  Dynamic Lifetime",
      "url": "DynamicLifetime",
      "children": []
    },
    {
      "number": "5",
      "name": "5  Channel Up-Mixing and Down-Mixing",
      "url": "channel-up-mixing-and-down-mixing",
      "children": [
        {
          "number": "5.1",
          "name": "Speaker Channel Layouts",
          "url": "ChannelLayouts"
        },
        {
          "number": "5.2",
          "name": "Channel Ordering",
          "url": "ChannelOrdering"
        },
        {
          "number": "5.3",
          "name": "Up Mixing Speaker Layouts",
          "url": "UpMix-sub"
        },
        {
          "number": "5.4",
          "name": "Down Mixing Speaker Layouts",
          "url": "down-mix"
        }
      ]
    },
    {
      "number": "6",
      "name": "6  Audio Signal Values",
      "url": "audio-sample-values"
    },
    {
      "number": "7",
      "name": "7  Spatialization/Panning",
      "url": "Spatialization",
      "children": [
        {
          "number": "7.1",
          "name": "Background",
          "url": "Spatialization-background"
        },
        {
          "number": "7.2",
          "name": "Azimuth and Elevation",
          "url": "azimuth-elevation"
        },
        {
          "number": "7.3",
          "name": "Panning Algorithm",
          "url": "Spatialization-panning-algorithm",
          "children": [
            {
              "number": "7.3.1",
              "name": "PannerNode \"equalpower\" Panning",
              "url": "Spatialization-equal-power-panning"
            },
            {
              "number": "7.3.2",
              "name": "PannerNode \"HRTF\" Panning (Stereo Only)",
              "url": "Spatialization-hrtf-panning"
            },
            {
              "number": "7.3.3",
              "name": "StereoPannerNode Panning",
              "url": "stereopanner-algorithm"
            }
          ]
        },
        {
          "number": "7.4",
          "name": "Distance Effects",
          "url": "Spatialization-distance-effects"
        },
        {
          "number": "7.5",
          "name": "Sound Cones",
          "url": "Spatialization-sound-cones"
        }
      ]
    }
  ]
}