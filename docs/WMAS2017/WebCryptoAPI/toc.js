var toc = {
  "name": "Table of Contents",
  "version": "https://www.w3.org/TR/2017/REC-WebCryptoAPI-20170126/",
  "children": [
    {
      "number": "2.",
      "name": "Use Cases",
      "url": "use-cases",
      "containsNonNormativeSubSections": true,
      "children": [
        {
          "number": "2.1.",
          "name": ". Multi-factor Authentication",
          "url": "multifactor-authentication"
        },
        {
          "number": "2.2.",
          "name": ". Protected Document Exchange",
          "url": "protected-document"
        },
        {
          "number": "2.3.",
          "name": ". Cloud Storage",
          "url": "cloud-storage"
        },
        {
          "number": "2.4.",
          "name": ". Document Signing",
          "url": "document-signing"
        },
        {
          "number": "2.5.",
          "name": ". Data Integrity Protection",
          "url": "data-integrity-protection"
        },
        {
          "number": "2.6.",
          "name": ". Secure Messaging",
          "url": "secure-messaging"
        },
        {
          "number": "2.7.",
          "name": ". JavaScript Object Signing and Encryption (JOSE)",
          "url": "jose"
        }
      ]
    },
    {
      "number": "4.",
      "name": "Scope",
      "url": "scope",
      "containsNonNormativeSubSections": true,
      "children": [
        {
          "number": "4.1.",
          "name": ". Level of abstraction",
          "url": "scope-abstraction"
        },
        {
          "number": "4.2.",
          "name": ". Cryptographic algorithms",
          "url": "scope-algorithms"
        },
        {
          "number": "4.3.",
          "name": ". Out of scope",
          "url": "scope-out-of-scope"
        }
      ]
    },
    {
      "number": "5.",
      "name": "Concepts",
      "url": "concepts",
      "containsNonNormativeSubSections": true,
      "children": [
        {
          "number": "5.1.",
          "name": ". Underlying Cryptographic Implementation",
          "url": "concepts-underlying-implementation"
        },
        {
          "number": "5.2.",
          "name": ". Key Storage",
          "url": "concepts-key-storage"
        }
      ]
    },
    {
      "number": "6.",
      "name": "Security considerations",
      "url": "security-considerations",
      "containsNonNormativeSubSections": true,
      "children": [
        {
          "number": "6.1.",
          "name": ". Security considerations for implementers",
          "url": "security-implementers"
        },
        {
          "number": "6.3.",
          "name": ". Security considerations for users",
          "url": "security-users"
        }
      ]
    },
    {
      "number": "7.",
      "name": "Privacy considerations",
      "url": "privacy",
      "containsNonNormativeSubSections": true
    },
    {
      "number": "10.",
      "name": "Crypto interface",
      "url": "crypto-interface",
      "containsNonNormativeSubSections": true,
      "children": [
        {
          "number": "10.1.",
          "name": ". Description",
          "url": "Crypto-description",
          "containsNonNormativeSubSections": true
        },
        {
          "number": "10.2.",
          "name": ". Methods and Parameters",
          "url": "Crypto-interface-methods",
          "children": [
            {
              "number": "10.2.1.",
              "name": ". The getRandomValues method",
              "url": "Crypto-method-getRandomValues"
            }
          ]
        },
        {
          "number": "10.3.",
          "name": ". Attributes",
          "url": "Crypto-interface-attributes",
          "children": [
            {
              "number": "10.3.1.",
              "name": ". The subtle attribute",
              "url": "Crypto-attribute-subtle"
            }
          ]
        }
      ]
    },
    {
      "number": "11.",
      "name": "Algorithm dictionary",
      "url": "algorithm-dictionary",
      "children": [
        {
          "number": "11.1.",
          "name": ". Algorithm Dictionary Members",
          "url": "algorithm-dictionary-members"
        }
      ]
    },
    {
      "number": "12.",
      "name": "KeyAlgorithm dictionary",
      "url": "key-algorithm-dictionary",
      "containsNonNormativeSubSections": true,
      "children": [
        {
          "number": "12.1.",
          "name": ". Description",
          "url": "key-algorithm-dictionary-description",
          "containsNonNormativeSubSections": true
        },
        {
          "number": "12.2.",
          "name": ". KeyAlgorithm dictionary members",
          "url": "key-algorithm-dictionary-members"
        }
      ]
    },
    {
      "number": "13.",
      "name": "CryptoKey interface",
      "url": "cryptokey-interface",
      "containsNonNormativeSubSections": true,
      "children": [
        {
          "number": "13.1.",
          "name": ". Description",
          "url": "cryptokey-interface-description",
          "containsNonNormativeSubSections": true
        },
        {
          "number": "13.2.",
          "name": ". Key interface data types",
          "url": "cryptokey-interface-types"
        },
        {
          "number": "13.3.",
          "name": ". CryptoKey internal slots",
          "url": "cryptokey-interface-internal-slots"
        },
        {
          "number": "13.4.",
          "name": ". CryptoKey interface members",
          "url": "cryptokey-interface-members"
        },
        {
          "number": "13.5.",
          "name": ". Structured clone algorithm",
          "url": "cryptokey-interface-clone"
        }
      ]
    },
    {
      "number": "14.",
      "name": "SubtleCrypto interface",
      "url": "subtlecrypto-interface",
      "containsNonNormativeSubSections": true,
      "children": [
        {
          "number": "14.1.",
          "name": ". Description",
          "url": "subtlecrypto-interface-description",
          "containsNonNormativeSubSections": true
        },
        {
          "number": "14.2.",
          "name": ". Data Types",
          "url": "subtlecrypto-interface-datatypes"
        },
        {
          "number": "14.3.",
          "name": ". Methods and Parameters",
          "url": "subtlecrypto-interface-methods",
          "children": [
            {
              "number": "14.3.1.",
              "name": ". The encrypt method",
              "url": "SubtleCrypto-method-encrypt"
            },
            {
              "number": "14.3.2.",
              "name": ". The decrypt method",
              "url": "SubtleCrypto-method-decrypt"
            },
            {
              "number": "14.3.3.",
              "name": ". The sign method",
              "url": "SubtleCrypto-method-sign"
            },
            {
              "number": "14.3.4.",
              "name": ". The verify method",
              "url": "SubtleCrypto-method-verify"
            },
            {
              "number": "14.3.5.",
              "name": ". The digest method",
              "url": "SubtleCrypto-method-digest"
            },
            {
              "number": "14.3.6.",
              "name": ". The generateKey method",
              "url": "SubtleCrypto-method-generateKey"
            },
            {
              "number": "14.3.7.",
              "name": ". The deriveKey method",
              "url": "SubtleCrypto-method-deriveKey"
            },
            {
              "number": "14.3.8.",
              "name": ". The deriveBits method",
              "url": "SubtleCrypto-method-deriveBits"
            },
            {
              "number": "14.3.9.",
              "name": ". The importKey method",
              "url": "SubtleCrypto-method-importKey"
            },
            {
              "number": "14.3.10.",
              "name": ". The exportKey method",
              "url": "SubtleCrypto-method-exportKey"
            },
            {
              "number": "14.3.11.",
              "name": ". The wrapKey method",
              "url": "SubtleCrypto-method-wrapKey"
            },
            {
              "number": "14.3.12.",
              "name": ". The unwrapKey method",
              "url": "SubtleCrypto-method-unwrapKey"
            }
          ]
        },
        {
          "number": "14.4.",
          "name": ". Exceptions",
          "url": "SubtleCrypto-Exceptions"
        }
      ]
    },
    {
      "number": "15.",
      "name": "JsonWebKey dictionary",
      "url": "JsonWebKey-dictionary",
      "containsNonNormativeSubSections": true
    },
    {
      "number": "16.",
      "name": "BigInteger",
      "url": "big-integer"
    },
    {
      "number": "17.",
      "name": "CryptoKeyPair dictionary",
      "url": "keypair"
    },
    {
      "number": "18.",
      "name": "Algorithms",
      "url": "algorithms",
      "containsNonNormativeSubSections": true,
      "children": [
        {
          "number": "18.1.",
          "name": ". Overview",
          "url": "algorithms-section-overview",
          "containsNonNormativeSubSections": true
        },
        {
          "number": "18.2.",
          "name": ". Concepts",
          "url": "algorithm-concepts",
          "children": [
            {
              "number": "18.2.1.",
              "name": ". Naming",
              "url": "algorithm-concepts-naming"
            },
            {
              "number": "18.2.2.",
              "name": ". Supported Operations",
              "url": "algorithm-concepts-operations"
            },
            {
              "number": "18.2.3.",
              "name": ". Normalization",
              "url": "algorithm-concepts-normalization"
            }
          ]
        },
        {
          "number": "18.3.",
          "name": ". Specification Conventions",
          "url": "algorithm-conventions"
        },
        {
          "number": "18.4.",
          "name": ". Algorithm Normalization",
          "url": "algorithm-normalization",
          "containsNonNormativeSubSections": true,
          "children": [
            {
              "number": "18.4.1.",
              "name": ". Description",
              "url": "algorithm-normalization-description",
              "containsNonNormativeSubSections": true
            },
            {
              "number": "18.4.2.",
              "name": ". Internal State Objects",
              "url": "algorithm-normalization-internal"
            },
            {
              "number": "18.4.3.",
              "name": ". Defining an Algorithm",
              "url": "algorithm-normalization-define-an-algorithm"
            },
            {
              "number": "18.4.4.",
              "name": ". Normalizing an algorithm",
              "url": "algorithm-normalization-normalize-an-algorithm"
            }
          ]
        },
        {
          "number": "18.5.",
          "name": ". Recommendations",
          "url": "algorithm-recommendations",
          "containsNonNormativeSubSections": true,
          "children": [
            {
              "number": "18.5.2.",
              "name": ". For Implementers",
              "url": "algorithm-recommendations-implementers"
            }
          ]
        }
      ]
    },
    {
      "number": "19.",
      "name": "Algorithm Overview",
      "url": "algorithm-overview",
      "containsNonNormativeSubSections": true
    },
    {
      "number": "20.",
      "name": "RSASSA-PKCS1-v1_5",
      "url": "rsassa-pkcs1",
      "containsNonNormativeSubSections": true,
      "children": [
        {
          "number": "20.1.",
          "name": ". Description",
          "url": "rsassa-pkcs1-description",
          "containsNonNormativeSubSections": true
        },
        {
          "number": "20.2.",
          "name": ". Registration",
          "url": "rsassa-pkcs1-registration"
        },
        {
          "number": "20.3.",
          "name": ". RsaKeyGenParams dictionary",
          "url": "RsaKeyGenParams-dictionary"
        },
        {
          "number": "20.4.",
          "name": ". RsaHashedKeyGenParams dictionary",
          "url": "RsaHashedKeyGenParams-dictionary"
        },
        {
          "number": "20.5.",
          "name": ". RsaKeyAlgorithm dictionary",
          "url": "RsaKeyAlgorithm-dictionary"
        },
        {
          "number": "20.6.",
          "name": ". RsaHashedKeyAlgorithm dictionary",
          "url": "RsaHashedKeyAlgorithm-dictionary"
        },
        {
          "number": "20.7.",
          "name": ". RsaHashedImportParams dictionary",
          "url": "RsaHashedImportParams-dictionary"
        },
        {
          "number": "20.8.",
          "name": ". Operations",
          "url": "rsassa-pkcs1-operations"
        }
      ]
    },
    {
      "number": "21.",
      "name": "RSA-PSS",
      "url": "rsa-pss",
      "containsNonNormativeSubSections": true,
      "children": [
        {
          "number": "21.1.",
          "name": ". Description",
          "url": "rsa-pss-description",
          "containsNonNormativeSubSections": true
        },
        {
          "number": "21.2.",
          "name": ". Registration",
          "url": "rsa-pss-registration"
        },
        {
          "number": "21.3.",
          "name": ". RsaPssParams dictionary",
          "url": "RsaPssParams-dictionary"
        },
        {
          "number": "21.4.",
          "name": ". Operations",
          "url": "rsa-pss-operations"
        }
      ]
    },
    {
      "number": "22.",
      "name": "RSA-OAEP",
      "url": "rsa-oaep",
      "containsNonNormativeSubSections": true,
      "children": [
        {
          "number": "22.1.",
          "name": ". Description",
          "url": "rsa-oaep-description",
          "containsNonNormativeSubSections": true
        },
        {
          "number": "22.2.",
          "name": ". Registration",
          "url": "rsa-oaep-registration"
        },
        {
          "number": "22.3.",
          "name": ". RsaOaepParams dictionary",
          "url": "rsa-oaep-params"
        },
        {
          "number": "22.4.",
          "name": ". Operations",
          "url": "rsa-oaep-operations"
        }
      ]
    },
    {
      "number": "23.",
      "name": "ECDSA",
      "url": "ecdsa",
      "containsNonNormativeSubSections": true,
      "children": [
        {
          "number": "23.1.",
          "name": ". Description",
          "url": "ecdsa-description",
          "containsNonNormativeSubSections": true
        },
        {
          "number": "23.2.",
          "name": ". Registration",
          "url": "ecdsa-registration"
        },
        {
          "number": "23.3.",
          "name": ". EcdsaParams dictionary",
          "url": "EcdsaParams-dictionary"
        },
        {
          "number": "23.4.",
          "name": ". EcKeyGenParams dictionary",
          "url": "EcKeyGenParams-dictionary"
        },
        {
          "number": "23.5.",
          "name": ". EcKeyAlgorithm dictionary",
          "url": "EcKeyAlgorithm-dictionary"
        },
        {
          "number": "23.6.",
          "name": ". EcKeyImportParams dictionary",
          "url": "EcKeyImportParams-dictionary"
        },
        {
          "number": "23.7.",
          "name": ". Operations",
          "url": "ecdsa-operations"
        }
      ]
    },
    {
      "number": "24.",
      "name": "ECDH",
      "url": "ecdh",
      "containsNonNormativeSubSections": true,
      "children": [
        {
          "number": "24.1.",
          "name": ". Description",
          "url": "ecdh-description",
          "containsNonNormativeSubSections": true
        },
        {
          "number": "24.2.",
          "name": ". Registration",
          "url": "ecdh-registration"
        },
        {
          "number": "24.3.",
          "name": ". EcdhKeyDeriveParams dictionary",
          "url": "dh-EcdhKeyDeriveParams"
        },
        {
          "number": "24.4.",
          "name": ". Operations",
          "url": "ecdh-operations"
        }
      ]
    },
    {
      "number": "25.",
      "name": "AES-CTR",
      "url": "aes-ctr",
      "containsNonNormativeSubSections": true,
      "children": [
        {
          "number": "25.1.",
          "name": ". Description",
          "url": "aes-ctr-description",
          "containsNonNormativeSubSections": true
        },
        {
          "number": "25.2.",
          "name": ". Registration",
          "url": "aes-ctr-registration"
        },
        {
          "number": "25.3.",
          "name": ". AesCtrParams dictionary",
          "url": "aes-ctr-params"
        },
        {
          "number": "25.4.",
          "name": ".",
          "url": "AesKeyAlgorithm-dictionary"
        },
        {
          "number": "25.5.",
          "name": ". AesKeyGenParams dictionary",
          "url": "aes-keygen-params"
        },
        {
          "number": "25.6.",
          "name": ". AesDerivedKeyParams dictionary",
          "url": "aes-derivedkey-params"
        },
        {
          "number": "25.7.",
          "name": ". Operations",
          "url": "aes-ctr-operations"
        }
      ]
    },
    {
      "number": "26.",
      "name": "AES-CBC",
      "url": "aes-cbc",
      "containsNonNormativeSubSections": true,
      "children": [
        {
          "number": "26.1.",
          "name": ". Description",
          "url": "aes-cbc-description",
          "containsNonNormativeSubSections": true
        },
        {
          "number": "26.2.",
          "name": ". Registration",
          "url": "aes-cbc-registration"
        },
        {
          "number": "26.3.",
          "name": ". AesCbcParams dictionary",
          "url": "aes-cbc-params"
        },
        {
          "number": "26.4.",
          "name": ". Operations",
          "url": "aes-cbc-operations"
        }
      ]
    },
    {
      "number": "27.",
      "name": "AES-GCM",
      "url": "aes-gcm",
      "containsNonNormativeSubSections": true,
      "children": [
        {
          "number": "27.1.",
          "name": ". Description",
          "url": "aes-gcm-description",
          "containsNonNormativeSubSections": true
        },
        {
          "number": "27.2.",
          "name": ". Registration",
          "url": "aes-gcm-registration"
        },
        {
          "number": "27.3.",
          "name": ". AesGcmParams dictionary",
          "url": "aes-gcm-params"
        },
        {
          "number": "27.4.",
          "name": ". Operations",
          "url": "aes-gcm-operations"
        }
      ]
    },
    {
      "number": "28.",
      "name": "AES-KW",
      "url": "aes-kw",
      "containsNonNormativeSubSections": true,
      "children": [
        {
          "number": "28.1.",
          "name": ". Description",
          "url": "aes-kw-description",
          "containsNonNormativeSubSections": true
        },
        {
          "number": "28.2.",
          "name": ". Registration",
          "url": "aes-kw-registration"
        },
        {
          "number": "28.3.",
          "name": ". Operations",
          "url": "aes-kw-operations"
        }
      ]
    },
    {
      "number": "29.",
      "name": "HMAC",
      "url": "hmac",
      "containsNonNormativeSubSections": true,
      "children": [
        {
          "number": "29.1.",
          "name": ". Description",
          "url": "hmac-description",
          "containsNonNormativeSubSections": true
        },
        {
          "number": "29.2.",
          "name": ". Registration",
          "url": "hmac-registration"
        },
        {
          "number": "29.3.",
          "name": ". HmacImportParams dictionary",
          "url": "hmac-importparams"
        },
        {
          "number": "29.4.",
          "name": ". HmacKeyAlgorithm dictionary",
          "url": "HmacKeyAlgorithm-dictionary"
        },
        {
          "number": "29.5.",
          "name": ". HmacKeyGenParams dictionary",
          "url": "hmac-keygen-params"
        },
        {
          "number": "29.6.",
          "name": ". Operations",
          "url": "hmac-operations"
        }
      ]
    },
    {
      "number": "30.",
      "name": "SHA",
      "url": "sha",
      "containsNonNormativeSubSections": true,
      "children": [
        {
          "number": "30.1.",
          "name": ". Description",
          "url": "sha-description",
          "containsNonNormativeSubSections": true
        },
        {
          "number": "30.2.",
          "name": ". Registration",
          "url": "sha-registration"
        },
        {
          "number": "30.3.",
          "name": ". Operations",
          "url": "sha-operations"
        }
      ]
    },
    {
      "number": "31.",
      "name": "HKDF",
      "url": "hkdf",
      "containsNonNormativeSubSections": true,
      "children": [
        {
          "number": "31.1.",
          "name": ". Description",
          "url": "hkdf-description",
          "containsNonNormativeSubSections": true
        },
        {
          "number": "31.2.",
          "name": ". Registration",
          "url": "hkdf-registration"
        },
        {
          "number": "31.3.",
          "name": ". HkdfParams dictionary",
          "url": "hkdf-params"
        },
        {
          "number": "31.4.",
          "name": ". Operations",
          "url": "hkdf2-operations"
        }
      ]
    },
    {
      "number": "32.",
      "name": "PBKDF2",
      "url": "pbkdf2",
      "containsNonNormativeSubSections": true,
      "children": [
        {
          "number": "32.1.",
          "name": ". Description",
          "url": "pbkdf2-description",
          "containsNonNormativeSubSections": true
        },
        {
          "number": "32.2.",
          "name": ". Registration",
          "url": "pbkdf2-registration"
        },
        {
          "number": "32.3.",
          "name": ". Pbkdf2Params dictionary",
          "url": "pbkdf2-params"
        },
        {
          "number": "32.4.",
          "name": ". Operations",
          "url": "pbkdf2-operations"
        }
      ]
    },
    {
      "number": "34.",
      "name": "IANA Considerations",
      "url": "iana-section",
      "children": [
        {
          "number": "34.1.",
          "name": ". JSON Web Signature and Encryption Algorithms Registration",
          "url": "iana-section-jws-jwa"
        },
        {
          "number": "34.2.",
          "name": ". JSON Web Key Parameters Registration",
          "url": "iana-section-jwk"
        }
      ]
    },
    {
      "number": "A.",
      "name": "Mapping between JSON Web Key / JSON Web Algorithm",
      "url": "jwk-mapping",
      "containsNonNormativeSubSections": true,
      "children": [
        {
          "number": "A.1.",
          "name": ". Algorithm mappings",
          "url": "jwk-mapping-alg"
        }
      ]
    },
    {
      "number": "B.",
      "name": "Mapping between Algorithm and SubjectPublicKeyInfo",
      "url": "spki-mapping",
      "containsNonNormativeSubSections": true
    },
    {
      "number": "C.",
      "name": "Mapping between Algorithm and PKCS#8 PrivateKeyInfo",
      "url": "pkcs8-mapping",
      "containsNonNormativeSubSections": true
    }
  ]
}
