var tests = [
  {
    "url": "document-domain.html",
    "checks": [
      "#the-storageevent-interface",
      "#the-storage-interface",
      "#the-localstorage-attribute",
    ]
  },
  {
    "url": "event_basic.html",
    "checks": [
      "#the-storageevent-interface",
      "#the-storage-interface",
      "#the-sessionstorage-attribute",
      "#the-localstorage-attribute",
    ]
  },
  {
    "url": "event_body_attribute.html",
    "checks": [
      "#the-storageevent-interface",
      "#the-storage-interface",
      "#the-sessionstorage-attribute",
      "#the-localstorage-attribute",
    ]
  },
  {
    "url": "event_case_sensitive.html",
    "checks": [
      "#the-storageevent-interface",
      "#the-storage-interface",
      "#the-sessionstorage-attribute",
      "#the-localstorage-attribute",
    ]
  },
  {
    "url": "event_constructor.html",
    "checks": [
      "#the-storageevent-interface",
    ]
  },
  {
    "url": "event_constructor_eventinit.html",
    "checks": [
      "#the-storageevent-interface",
    ]
  },
  {
    "url": "event_local_key.html",
    "checks": [
      "#the-storageevent-interface",
      "#the-localstorage-attribute",
    ]
  },
  {
    "url": "event_local_newvalue.html",
    "checks": [
      "#the-storageevent-interface",
      "#the-localstorage-attribute",
    ]
  },
  {
    "url": "event_local_oldvalue.html",
    "checks": [
      "#the-storageevent-interface",
      "#the-localstorage-attribute",
    ]
  },
  {
    "url": "event_local_removeitem.html",
    "checks": [
      "#the-storageevent-interface",
      "#the-localstorage-attribute",
    ]
  },
  {
    "url": "event_local_storagearea.html",
    "checks": [
      "#the-storageevent-interface",
      "#the-localstorage-attribute",
    ]
  },
  {
    "url": "event_local_storageeventinit.html",
    "checks": [
      "#the-storageevent-interface",
      "#the-localstorage-attribute",
    ]
  },
  {
    "url": "event_local_url.html",
    "checks": [
      "#the-storageevent-interface",
      "#the-localstorage-attribute",
    ]
  },
  {
    "url": "event_no_duplicates.html",
    "checks": [
      "#the-storageevent-interface",
    ]
  },
  {
    "url": "event_session_key.html",
    "checks": [
      "#the-storageevent-interface",
      "#the-sessionstorage-attribute",
    ]
  },
  {
    "url": "event_session_newvalue.html",
    "checks": [
      "#the-storageevent-interface",
      "#the-sessionstorage-attribute",
    ]
  },
  {
    "url": "event_session_oldvalue.html",
    "checks": [
      "#the-storageevent-interface",
      "#the-sessionstorage-attribute",
    ]
  },
  {
    "url": "event_session_removeitem.html",
    "checks": [
      "#the-storageevent-interface",
      "#the-sessionstorage-attribute",
    ]
  },
  {
    "url": "event_session_storagearea.html",
    "checks": [
      "#the-storageevent-interface",
      "#the-sessionstorage-attribute",
    ]
  },
  {
    "url": "event_session_storageeventinit.html",
    "checks": [
      "#the-storageevent-interface",
      "#the-sessionstorage-attribute",
    ]
  },
  {
    "url": "event_session_url.html",
    "checks": [
      "#the-storageevent-interface",
      "#the-sessionstorage-attribute",
    ]
  },
  {
    "url": "event_setattribute.html",
    "checks": [
      "#the-storageevent-interface",
    ]
  },
  {
    "url": "idlharness.html",
    "checks": [
      "#the-storage-interface",
    ]
  },
  {
    "url": "missing_arguments.html",
    "checks": [
      "#the-storage-interface",
    ]
  },
  {
    "url": "storage_builtins.html",
    "checks": [
      "#the-storage-interface",
    ]
  },
  {
    "url": "storage_clear.html",
    "checks": [
      "#the-storage-interface",
    ]
  },
  {
    "url": "storage_enumerate.html",
    "checks": [
      "#the-storage-interface",
    ]
  },
  {
    "url": "storage_functions_not_overwritten.html",
    "checks": [
      "#the-storage-interface",
    ]
  },
  {
    "url": "storage_getitem.html",
    "checks": [
      "#the-storage-interface",
    ]
  },
  {
    "url": "storage_in.html",
    "checks": [
      "#the-storage-interface",
    ]
  },
  {
    "url": "storage_indexing.html",
    "checks": [
      "#the-storage-interface",
    ]
  },
  {
    "url": "storage_key.html",
    "checks": [
      "#the-storage-interface",
    ]
  },
  {
    "url": "storage_key_empty_string.html",
    "checks": [
      "#the-storage-interface",
    ]
  },
  {
    "url": "storage_length.html",
    "checks": [
      "#the-storage-interface",
    ]
  },
  {
    "url": "storage_local-manual.html",
    "checks": [
      "#the-storage-interface",
      "#the-localstorage-attribute",
    ]
  },
  {
    "url": "storage_local_setitem_quotaexceedederr.html",
    "checks": [
      "#the-storage-interface",
      "#the-localstorage-attribute",
    ]
  },
  {
    "url": "storage_local_window_open.html",
    "checks": [
      "#the-storage-interface",
      "#the-localstorage-attribute",
    ]
  },
  {
    "url": "storage_removeitem.html",
    "checks": [
      "#the-storage-interface",
      "#the-localstorage-attribute",
    ]
  },
  {
    "url": "storage_session-manual.html",
    "checks": [
      "#the-storage-interface",
      "#the-sessionstorage-attribute",
    ]
  },
  {
    "url": "storage_session_setitem_quotaexceedederr.html",
    "checks": [
      "#the-storage-interface",
      "#the-sessionstorage-attribute",
    ]
  },
  {
    "url": "storage_session_window_noopener.html",
    "checks": [
      "#the-storage-interface",
      "#the-sessionstorage-attribute",
    ]
  },
  {
    "url": "storage_session_window_open.html",
    "checks": [
      "#the-storage-interface",
      "#the-sessionstorage-attribute",
    ]
  },
  {
    "url": "storage_set_value_enumerate.html",
    "checks": [
      "#the-storage-interface",
    ]
  },
  {
    "url": "storage_setitem.html",
    "checks": [
      "#the-storage-interface",
    ]
  },
  {
    "url": "storage_string_conversion.html",
    "checks": [
      "#the-storage-interface",
    ]
  },
  {
    "url": "storage_supported_property_names.html",
    "checks": [
      "#the-storage-interface",
    ]
  }
]
