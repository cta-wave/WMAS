var toc = {
  "name": "Table of Contents",
  "version": "https://www.w3.org/TR/2017/REC-encrypted-media-20170918/",
  "children": [
    {
      "number": "3.",
      "name": "Obtaining Access to Key Systems",
      "url": "obtaining-access-to-key-systems",
      "children": [
        {
          "number": "3.1",
          "name": "Navigator Extension: requestMediaKeySystemAccess()",
          "url": "navigator-extension:-requestmediakeysystemaccess()",
          "children": [
            {
              "number": "3.1.1",
              "name": "Algorithms",
              "url": "algorithms",
              "children": [
                {
                  "number": "3.1.1.1",
                  "name": "Get Supported Configuration",
                  "url": "get-supported-configuration"
                },
                {
                  "number": "3.1.1.2",
                  "name": "Get Supported Configuration and Consent",
                  "url": "get-supported-configuration-and-consent"
                },
                {
                  "number": "3.1.1.3",
                  "name": "Get Supported Capabilities for Audio/Video Type",
                  "url": "get-supported-capabilities-for-audio-video-type"
                },
                {
                  "number": "3.1.1.4",
                  "name": "Get Consent Status",
                  "url": "get-consent-status"
                }
              ]
            }
          ]
        },
        {
          "number": "3.2",
          "name": "MediaKeySystemConfiguration dictionary",
          "url": "mediakeysystemconfiguration-dictionary"
        },
        {
          "number": "3.3",
          "name": "MediaKeySystemMediaCapability dictionary",
          "url": "mediakeysystemmediacapability-dictionary"
        }
      ]
    },
    {
      "number": "4.",
      "name": "MediaKeySystemAccess Interface",
      "url": "mediakeysystemaccess-interface"
    },
    {
      "number": "5.",
      "name": "MediaKeys Interface",
      "url": "mediakeys-interface",
      "children": [
        {
          "number": "5.1",
          "name": "Algorithms",
          "url": "algorithms-0",
          "children": [
            {
              "number": "5.1.1",
              "name": "Is persistent session type?",
              "url": "is-persistent-session-type"
            },
            {
              "number": "5.1.2",
              "name": "CDM Unavailable",
              "url": "cdm-unavailable"
            }
          ]
        },
        {
          "number": "5.2",
          "name": "Storage and Persistence",
          "url": "media-keys-storage"
        }
      ]
    },
    {
      "number": "6.",
      "name": "MediaKeySession Interface",
      "url": "mediakeysession-interface",
      "containsNonNormativeSubSections": true,
      "children": [
        {
          "number": "6.1",
          "name": "MediaKeyStatusMap Interface",
          "url": "mediakeystatusmap-interface"
        },
        {
          "number": "6.2",
          "name": "MediaKeyMessageEvent",
          "url": "mediakeymessageevent",
          "children": [
            {
              "number": "6.2.1",
              "name": "MediaKeyMessageEventInit",
              "url": "mediakeymessageeventinit"
            }
          ]
        },
        {
          "number": "6.3",
          "name": "Event Summary",
          "url": "mediakeysession-events",
          "containsNonNormativeSubSections": true
        },
        {
          "number": "6.4",
          "name": "Algorithms",
          "url": "mediakeysession-algorithms",
          "children": [
            {
              "number": "6.4.1",
              "name": "Queue a \"message\" Event",
              "url": "queue-message"
            },
            {
              "number": "6.4.2",
              "name": "Update Key Statuses",
              "url": "update-key-statuses"
            },
            {
              "number": "6.4.3",
              "name": "Update Expiration",
              "url": "update-expiration"
            },
            {
              "number": "6.4.4",
              "name": "Session Closed",
              "url": "session-closed"
            },
            {
              "number": "6.4.5",
              "name": "Monitor for CDM State Changes",
              "url": "monitor-cdm"
            }
          ]
        },
        {
          "number": "6.5",
          "name": "Exceptions",
          "url": "exceptions"
        },
        {
          "number": "6.6",
          "name": "Session Storage and Persistence",
          "url": "session-storage"
        }
      ]
    },
    {
      "number": "7.",
      "name": "HTMLMediaElement Extensions",
      "url": "htmlmediaelement-extensions",
      "containsNonNormativeSubSections": true,
      "children": [
        {
          "number": "7.1",
          "name": "MediaEncryptedEvent",
          "url": "mediaencryptedevent",
          "children": [
            {
              "number": "7.1.1",
              "name": "MediaEncryptedEventInit",
              "url": "mediaencryptedeventinit"
            }
          ]
        },
        {
          "number": "7.2",
          "name": "Event Summary",
          "url": "htmlmediaelement-events",
          "containsNonNormativeSubSections": true
        },
        {
          "number": "7.3",
          "name": "Algorithms",
          "url": "htmlmediaelement-algorithms",
          "children": [
            {
              "number": "7.3.1",
              "name": "Media Data May Contain Encrypted Blocks",
              "url": "media-may-contain-encrypted-blocks"
            },
            {
              "number": "7.3.2",
              "name": "Initialization Data Encountered",
              "url": "initdata-encountered"
            },
            {
              "number": "7.3.3",
              "name": "Encrypted Block Encountered",
              "url": "encrypted-block-encountered"
            },
            {
              "number": "7.3.4",
              "name": "Attempt to Decrypt",
              "url": "attempt-to-decrypt"
            },
            {
              "number": "7.3.5",
              "name": "Wait for Key",
              "url": "wait-for-key"
            },
            {
              "number": "7.3.6",
              "name": "Attempt to Resume Playback If Necessary",
              "url": "resume-playback"
            }
          ]
        },
        {
          "number": "7.4",
          "name": "Media Element Restrictions",
          "url": "media-element-restrictions",
          "containsNonNormativeSubSections": true
        }
      ]
    },
    {
      "number": "9.",
      "name": "Common Key Systems",
      "url": "common-key-systems",
      "containsNonNormativeSubSections": true,
      "children": [
        {
          "number": "9.1",
          "name": "Clear Key",
          "url": "clear-key",
          "containsNonNormativeSubSections": true,
          "children": [
            {
              "number": "9.1.1",
              "name": "Capabilities",
              "url": "clear-key-capabilities"
            },
            {
              "number": "9.1.2",
              "name": "Behavior",
              "url": "clear-key-behavior"
            },
            {
              "number": "9.1.3",
              "name": "License Request Format",
              "url": "clear-key-request-format",
              "containsNonNormativeSubSections": true
            },
            {
              "number": "9.1.4",
              "name": "License Format",
              "url": "clear-key-license-format",
              "containsNonNormativeSubSections": true
            },
            {
              "number": "9.1.5",
              "name": "License Release Format",
              "url": "clear-key-release-format",
              "containsNonNormativeSubSections": true
            },
            {
              "number": "9.1.7",
              "name": "Using base64url",
              "url": "using-base64url",
              "containsNonNormativeSubSections": true
            }
          ]
        }
      ]
    },
    {
      "number": "10.",
      "name": "Security",
      "url": "security",
      "containsNonNormativeSubSections": true,
      "children": [
        {
          "number": "10.1",
          "name": "Input Data Attacks and Vulnerabilities",
          "url": "input-data-security"
        },
        {
          "number": "10.2",
          "name": "CDM Attacks and Vulnerabilities",
          "url": "cdm-security"
        },
        {
          "number": "10.3",
          "name": "Network Attacks",
          "url": "network-attacks",
          "containsNonNormativeSubSections": true,
          "children": [
            {
              "number": "10.3.1",
              "name": "Potential Attacks",
              "url": "potential-attacks",
              "containsNonNormativeSubSections": true
            },
            {
              "number": "10.3.2",
              "name": "Mitigations",
              "url": "mitigations"
            }
          ]
        },
        {
          "number": "10.4",
          "name": "iframe Attacks",
          "url": "iframe-attacks",
          "containsNonNormativeSubSections": true,
          "children": [
            {
              "number": "10.4.1",
              "name": "Potential Attacks",
              "url": "potential-attacks-0",
              "containsNonNormativeSubSections": true
            },
            {
              "number": "10.4.2",
              "name": "Mitigations",
              "url": "mitigations-0"
            }
          ]
        },
        {
          "number": "10.5",
          "name": "Cross-Directory Attacks",
          "url": "cross-directory-attacks",
          "containsNonNormativeSubSections": true
        }
      ]
    },
    {
      "number": "11.",
      "name": "Privacy",
      "url": "privacy",
      "containsNonNormativeSubSections": true,
      "children": [
        {
          "number": "11.1",
          "name": "Information Disclosed by EME and Key Systems",
          "url": "privacy-disclosure"
        },
        {
          "number": "11.2",
          "name": "Fingerprinting",
          "url": "privacy-fingerprinting"
        },
        {
          "number": "11.3",
          "name": "Information Leakage",
          "url": "privacy-leakage",
          "containsNonNormativeSubSections": true,
          "children": [
            {
              "number": "11.3.1",
              "name": "Concerns",
              "url": "concerns",
              "containsNonNormativeSubSections": true
            },
            {
              "number": "11.3.2",
              "name": "Mitigations",
              "url": "mitigations-1"
            }
          ]
        },
        {
          "number": "11.4",
          "name": "User Tracking",
          "url": "user-tracking",
          "containsNonNormativeSubSections": true,
          "children": [
            {
              "number": "11.4.1",
              "name": "Concerns",
              "url": "concerns-0",
              "containsNonNormativeSubSections": true
            },
            {
              "number": "11.4.2",
              "name": "Mitigations",
              "url": "mitigations-2"
            }
          ]
        },
        {
          "number": "11.5",
          "name": "Information Stored on User Devices",
          "url": "privacy-storedinfo",
          "containsNonNormativeSubSections": true,
          "children": [
            {
              "number": "11.5.1",
              "name": "Concerns",
              "url": "concerns-1",
              "containsNonNormativeSubSections": true
            },
            {
              "number": "11.5.2",
              "name": "Mitigations",
              "url": "mitigations-3"
            }
          ]
        },
        {
          "number": "11.6",
          "name": "Incomplete Clearing of Data",
          "url": "incomplete-clearing",
          "containsNonNormativeSubSections": true,
          "children": [
            {
              "number": "11.6.1",
              "name": "Concerns",
              "url": "concerns-2",
              "containsNonNormativeSubSections": true
            },
            {
              "number": "11.6.2",
              "name": "Mitigations",
              "url": "mitigations-4"
            }
          ]
        },
        {
          "number": "11.7",
          "name": "Private Browsing Modes",
          "url": "private-browsing"
        },
        {
          "number": "11.8",
          "name": "Secure Origin and Transport",
          "url": "privacy-secureorigin"
        }
      ]
    }
  ]
}