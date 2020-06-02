The `screenenumeration-helpers.js` requires an implementation of the
`ScreenEnumerationTest` interfaces, which should emulate screen enumeration
backends.

The `ScreenEnumerationTest` interface is defined as:

```
  class ScreenEnumerationTestChromium {
    initialize();  // Sets up the testing environment.
    async reset(); // Frees the resources.
    getMockScreenEnumeration(); // Returns `MockScreenEnumeration` interface.
  };

  class MockScreenEnumeration {
    reset(); Empties data of created mock displays.
    setId(internalId, primaryId); // Set primary screen and internal screen IDs.
    setSuccess(success); // Set boolean to validate getDisplays() returned values.
    addDisplay(display); // Push display to the display vector.
    async getDisplays(); // Interceptor of getDisplays (screen_enumeration.mojom).
  };
```

Other helper-functions are located in screenenumeration-helpers.js
```
makeDisplay(id, bounds, work_area, scale_factor); // Create display object.
```

The Chromium implementation of the `ScreenEnumerationTest` interface is located
in [mock-screenenumeration.js](../resources/chromium/mock-screenenumeration.js).

Other browser vendors should provide their own implementations of
the `ScreenEnumerationTest` interfaces.
