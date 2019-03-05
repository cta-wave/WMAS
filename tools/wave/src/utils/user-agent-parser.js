const useragent = require("useragent");

class UserAgentParser {
  parse(ua) {
    const parsed = useragent.parse(ua);
    if (parsed.family === "Apple Mail") {
      parsed.family = "WebKit";
    }
    return {
      browser: {
        name: parsed.family || "unknown",
        version: parsed.major || "00"
      },
      os: {
        name: parsed.os.family
      },
      device: {
        name: parsed.device.family
      }
    };
  }

  abbreviateBrowserName(name) {
    const shortnames = {
      Chrome: "Ch",
      "Chrome Mobile WebView": "Ch",
      Chromium: "Cm",
      WebKit: "Wk", // WebKit build
      Safari: "Sf",
      Firefox: "FF",
      IE: "IE",
      Edge: "Ed",
      Opera: "Op"
    };
    let short = shortnames[name];
    return short || "Xx";
  }
}

const userAgentParser = new UserAgentParser();

module.exports = userAgentParser;
