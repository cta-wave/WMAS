var tests = [
  {
    "url": "idlharness.https.html",
    "checks": [
      "#crypto-interface",
      "#algorithm-dictionary",
      "#key-algorithm-dictionary",
      "#cryptokey-interface",
      "#subtlecrypto-interface",
      "#JsonWebKey-dictionary",
      "#big-integer",
      "#keypair"
    ]
  },
  {
    "url": "encrypt_decrypt/test_aes_cbc.https.html",
    "checks": [
      "#aes-cbc",
      "#SubtleCrypto-method-importKey",
      "#SubtleCrypto-method-encrypt",
      "#SubtleCrypto-method-decrypt",
      "#SubtleCrypto-Exceptions"
    ]
  },
  {
    "url": "encrypt_decrypt/test_aes_gcm.https.html",
    "checks": [
      "#aes-gcm",
      "#SubtleCrypto-method-importKey",
      "#SubtleCrypto-method-encrypt",
      "#SubtleCrypto-method-decrypt",
      "#SubtleCrypto-Exceptions"
    ]
  },
  {
    "url": "encrypt_decrypt/test_aes_ctr.https.html",
    "checks": [
      "#aes-ctr",
      "#SubtleCrypto-method-importKey",
      "#SubtleCrypto-method-encrypt",
      "#SubtleCrypto-method-decrypt",
      "#SubtleCrypto-Exceptions"
    ]
  },
  {
    "url": "encrypt_decrypt/test_rsa_oaep.https.html",
    "checks": [
      "#rsa-oaep",
      "#SubtleCrypto-method-importKey",
      "#SubtleCrypto-method-encrypt",
      "#SubtleCrypto-method-decrypt",
      "#SubtleCrypto-Exceptions"
    ]
  },
  {
    "url": "derive_bits_keys/test_ecdh_bits.https.html",
    "checks": [
      "#ecdh",
      "#aes-cbc",
      "#SubtleCrypto-method-importKey",
      "#SubtleCrypto-method-generateKey",
      "#SubtleCrypto-method-deriveBits",
      "#SubtleCrypto-method-deriveKey",
      "#SubtleCrypto-Exceptions"
    ]
  },
  {
    "url": "derive_bits_keys/test_ecdh_keys.https.html",
    "checks": [
      "#ecdh",
      "#hmac",
      "#ecdsa",
      "#SubtleCrypto-method-importKey",
      "#SubtleCrypto-method-exportKey",
      "#SubtleCrypto-method-generateKey",
      "#SubtleCrypto-method-deriveBits",
      "#SubtleCrypto-method-deriveKey",
      "#SubtleCrypto-Exceptions"
    ]
  },
  {
    "url": "derive_bits_keys/test_hkdf.https.html",
    "checks": [
      "#hkdf",
      "#pbkdf2",
      "#SubtleCrypto-method-importKey",
      "#SubtleCrypto-method-exportKey",
      "#SubtleCrypto-method-generateKey",
      "#SubtleCrypto-method-deriveBits",
      "#SubtleCrypto-method-deriveKey",
      "#SubtleCrypto-Exceptions"
    ]
  },
  {
    "url": "derive_bits_keys/test_pbkdf2_empty_empty.https.html",
    "checks": [
      "#pbkdf2",
      "#ecdh",
      "#SubtleCrypto-method-importKey",
      "#SubtleCrypto-method-exportKey",
      "#SubtleCrypto-method-generateKey",
      "#SubtleCrypto-method-deriveBits",
      "#SubtleCrypto-method-deriveKey",
      "#SubtleCrypto-Exceptions"
    ]
  },
  {
    "url": "derive_bits_keys/test_pbkdf2_empty_long.https.html",
    "checks": [
      "#pbkdf2",
      "#ecdh",
      "#SubtleCrypto-method-importKey",
      "#SubtleCrypto-method-exportKey",
      "#SubtleCrypto-method-generateKey",
      "#SubtleCrypto-method-deriveBits",
      "#SubtleCrypto-method-deriveKey",
      "#SubtleCrypto-Exceptions"
    ]
  },
  {
    "url": "derive_bits_keys/test_pbkdf2_empty_short.https.html",
    "checks": [
      "#pbkdf2",
      "#ecdh",
      "#SubtleCrypto-method-importKey",
      "#SubtleCrypto-method-exportKey",
      "#SubtleCrypto-method-generateKey",
      "#SubtleCrypto-method-deriveBits",
      "#SubtleCrypto-method-deriveKey",
      "#SubtleCrypto-Exceptions"
    ]
  },
  {
    "url": "derive_bits_keys/test_pbkdf2_long_empty.https.html",
    "checks": [
      "#pbkdf2",
      "#ecdh",
      "#SubtleCrypto-method-importKey",
      "#SubtleCrypto-method-exportKey",
      "#SubtleCrypto-method-generateKey",
      "#SubtleCrypto-method-deriveBits",
      "#SubtleCrypto-method-deriveKey",
      "#SubtleCrypto-Exceptions"
    ]
  },
  {
    "url": "derive_bits_keys/test_pbkdf2_long_long.https.html",
    "checks": [
      "#pbkdf2",
      "#ecdh",
      "#SubtleCrypto-method-importKey",
      "#SubtleCrypto-method-exportKey",
      "#SubtleCrypto-method-generateKey",
      "#SubtleCrypto-method-deriveBits",
      "#SubtleCrypto-method-deriveKey",
      "#SubtleCrypto-Exceptions"
    ]
  },
  {
    "url": "derive_bits_keys/test_pbkdf2_long_short.https.html",
    "checks": [
      "#pbkdf2",
      "#ecdh",
      "#SubtleCrypto-method-importKey",
      "#SubtleCrypto-method-exportKey",
      "#SubtleCrypto-method-generateKey",
      "#SubtleCrypto-method-deriveBits",
      "#SubtleCrypto-method-deriveKey",
      "#SubtleCrypto-Exceptions"
    ]
  },
  {
    "url": "derive_bits_keys/test_pbkdf2_short_empty.https.html",
    "checks": [
      "#pbkdf2",
      "#ecdh",
      "#SubtleCrypto-method-importKey",
      "#SubtleCrypto-method-exportKey",
      "#SubtleCrypto-method-generateKey",
      "#SubtleCrypto-method-deriveBits",
      "#SubtleCrypto-method-deriveKey",
      "#SubtleCrypto-Exceptions"
    ]
  },
  {
    "url": "derive_bits_keys/test_pbkdf2_short_long.https.html",
    "checks": [
      "#pbkdf2",
      "#ecdh",
      "#SubtleCrypto-method-importKey",
      "#SubtleCrypto-method-exportKey",
      "#SubtleCrypto-method-generateKey",
      "#SubtleCrypto-method-deriveBits",
      "#SubtleCrypto-method-deriveKey",
      "#SubtleCrypto-Exceptions"
    ]
  },
  {
    "url": "derive_bits_keys/test_pbkdf2_short_short.https.html",
    "checks": [
      "#pbkdf2",
      "#ecdh",
      "#SubtleCrypto-method-importKey",
      "#SubtleCrypto-method-exportKey",
      "#SubtleCrypto-method-generateKey",
      "#SubtleCrypto-method-deriveBits",
      "#SubtleCrypto-method-deriveKey",
      "#SubtleCrypto-Exceptions"
    ]
  },
  {
    "url": "digest/test_digest.https.html",
    "checks": [
      "#sha",
      "#SubtleCrypto-method-digest",
      "#SubtleCrypto-Exceptions"
    ]
  },
  {
    "url": "import_export/test_ec_importKey.https.html",
    "checks": [
      "#ecdsa",
      "#ecdh",
      "#SubtleCrypto-method-importKey",
      "#SubtleCrypto-method-exportKey",
      "#SubtleCrypto-Exceptions"
    ]
  },
  {
    "url": "import_export/test_rsa_importKey.https.html",
    "checks": [
      "#sha",
      "#rsa-oaep",
      "#rsa-pss",
      "#rsassa-pkcs1",
      "#SubtleCrypto-method-importKey",
      "#SubtleCrypto-method-exportKey",
      "#SubtleCrypto-Exceptions"
    ]
  },
  {
    "url": "import_export/test_symmetric_importKey.https.html",
    "checks": [
      "#aes-ctr",
      "#aes-cbc",
      "#aes-gcm",
      "#aes-kw",
      "#sha",
      "#hmac",
      "#hkdf",
      "#pbkdf2",
      "#SubtleCrypto-method-importKey",
      "#SubtleCrypto-method-exportKey",
      "#SubtleCrypto-Exceptions"
    ]
  },
  {
    "url": "secure_context/crypto-subtle-non-secure-context-not-available.sub.html",
    "checks": [
      "#subtlecrypto-interface"
    ]
  },
  {
    "url": "secure_context/crypto-subtle-secure-context-available.https.sub.html",
    "checks": [
      "#subtlecrypto-interface"
    ]
  },
  {
    "url": "sign_verify/test_ecdsa.https.html",
    "checks": [
      "#ecdsa",
      "#sha",
      "#hmac",
      "#SubtleCrypto-method-sign",
      "#SubtleCrypto-method-verify",
      "#SubtleCrypto-method-importKey",
      "#SubtleCrypto-method-generateKey",
      "#SubtleCrypto-Exceptions"
    ]
  },
  {
    "url": "sign_verify/test_hmac.https.html",
    "checks": [
      "#ecdsa",
      "#sha",
      "#hmac",
      "#SubtleCrypto-method-sign",
      "#SubtleCrypto-method-verify",
      "#SubtleCrypto-method-importKey",
      "#SubtleCrypto-method-generateKey",
      "#SubtleCrypto-Exceptions"
    ]
  },
  {
    "url": "sign_verify/test_rsa_pkcs.https.html",
    "checks": [
      "#rsassa-pkcs1",
      "#ecdsa",
      "#sha",
      "#hmac",
      "#SubtleCrypto-method-sign",
      "#SubtleCrypto-method-verify",
      "#SubtleCrypto-method-importKey",
      "#SubtleCrypto-Exceptions"
    ]
  },
  {
    "url": "sign_verify/test_rsa_pss.https.html",
    "checks": [
      "#rsa-pss",
      "#ecdsa",
      "#sha",
      "#hmac",
      "#SubtleCrypto-method-sign",
      "#SubtleCrypto-method-verify",
      "#SubtleCrypto-method-importKey",
      "#SubtleCrypto-Exceptions"
    ]
  },
  {
    "url": "generateKey/test_aes-cbc.https.html",
    "checks": [
      "#aes-cbc",
      "#SubtleCrypto-method-generateKey"
    ]
  },
  {
    "url": "generateKey/test_aes-ctr.https.html",
    "checks": [
      "#aes-ctr",
      "#SubtleCrypto-method-generateKey"
    ]
  },
  {
    "url": "generateKey/test_failures_AES-CBC.https.html",
    "checks": [
      "#aes-cbc",
      "#SubtleCrypto-method-generateKey",
      "#SubtleCrypto-Exceptions"
    ]
  },
  {
    "url": "generateKey/test_failures_AES-CTR.https.html",
    "checks": [
      "#aes-ctr",
      "#SubtleCrypto-method-generateKey",
      "#SubtleCrypto-Exceptions"
    ]
  },
  {
    "url": "generateKey/test_failures_AES-GCM.https.html",
    "checks": [
      "#aes-gcm",
      "#SubtleCrypto-method-generateKey",
      "#SubtleCrypto-Exceptions"
    ]
  },
  {
    "url": "generateKey/test_failures_AES-KW.https.html",
    "checks": [
      "#aes-kw",
      "#SubtleCrypto-method-generateKey",
      "#SubtleCrypto-Exceptions"
    ]
  },
  {
    "url": "generateKey/test_failures_ECDH.https.html",
    "checks": [
      "#ecdh",
      "#SubtleCrypto-method-generateKey",
      "#SubtleCrypto-Exceptions"
    ]
  },
  {
    "url": "generateKey/test_failures_ECDSA.https.html",
    "checks": [
      "#ecdsa",
      "#SubtleCrypto-method-generateKey",
      "#SubtleCrypto-Exceptions"
    ]
  },
  {
    "url": "generateKey/test_failures_HMAC.https.html",
    "checks": [
      "#hmac",
      "#SubtleCrypto-method-generateKey",
      "#SubtleCrypto-Exceptions"
    ]
  },
  {
    "url": "generateKey/test_failures_RSA-OAEP.https.html",
    "checks": [
      "#rsa-oaep",
      "#SubtleCrypto-method-generateKey",
      "#SubtleCrypto-Exceptions"
    ]
  },
  {
    "url": "generateKey/test_failures_RSA-PSS.https.html",
    "checks": [
      "#rsa-pss",
      "#SubtleCrypto-method-generateKey",
      "#SubtleCrypto-Exceptions"
    ]
  },
  {
    "url": "generateKey/test_failures_RSASSA-PKCS1-v1_5.https.html",
    "checks": [
      "#rsassa-pkcs1",
      "#SubtleCrypto-method-generateKey",
      "#SubtleCrypto-Exceptions"
    ]
  },
  {
    "url": "generateKey/test_successes_AES-CBC.https.html",
    "checks": [
      "#aes-cbc",
      "#SubtleCrypto-method-generateKey"
    ]
  },
  {
    "url": "generateKey/test_successes_AES-CTR.https.html",
    "checks": [
      "#aes-ctr",
      "#SubtleCrypto-method-generateKey"
    ]
  },
  {
    "url": "generateKey/test_successes_AES-GCM.https.html",
    "checks": [
      "#aes-gcm",
      "#SubtleCrypto-method-generateKey"
    ]
  },
  {
    "url": "generateKey/test_successes_AES-KW.https.html",
    "checks": [
      "#aes-kw",
      "#SubtleCrypto-method-generateKey"
    ]
  },
  {
    "url": "generateKey/test_successes_ECDH.https.html",
    "checks": [
      "#ecdh",
      "#SubtleCrypto-method-generateKey"
    ]
  },
  {
    "url": "generateKey/test_successes_ECDSA.https.html",
    "checks": [
      "#ecdsa",
      "#SubtleCrypto-method-generateKey"
    ]
  },
  {
    "url": "generateKey/test_successes_HMAC.https.html",
    "checks": [
      "#hmac",
      "#SubtleCrypto-method-generateKey"
    ]
  },
  {
    "url": "generateKey/test_successes_RSA-OAEP.https.html",
    "checks": [
      "#rsa-oaep",
      "#SubtleCrypto-method-generateKey"
    ]
  },
  {
    "url": "generateKey/test_successes_RSA-PSS.https.html",
    "checks": [
      "#rsa-pss",
      "#SubtleCrypto-method-generateKey"
    ]
  },
  {
    "url": "generateKey/test_successes_RSASSA-PKCS1-v1_5.https.html",
    "checks": [
      "#rsassa-pkcs1",
      "#SubtleCrypto-method-generateKey"
    ]
  },
  {
    "url": "wrapKey_unwrapKey/test_wrapKey_unwrapKey.https.html",
    "checks": [
      "#aes-ctr",
      "#aes-cbc",
      "#aes-gcm",
      "#rsa-oaep",
      "#rsassa-pkcs1",
      "#rsa-pss",
      "#ecdsa",
      "#ecdh",
      "#hmac",
      "#aes-kw",
      "#sha",
      "#SubtleCrypto-method-generateKey",
      "#SubtleCrypto-method-importKey",
      "#SubtleCrypto-method-exportKey",
      "#SubtleCrypto-method-wrapKey",
      "#SubtleCrypto-method-unwrapKey",
      "#SubtleCrypto-method-encrypt",
      "#SubtleCrypto-method-decrypt",
      "#SubtleCrypto-method-sign",
      "#SubtleCrypto-method-verify",
      "#SubtleCrypto-method-deriveBits"
    ]
  }
]
