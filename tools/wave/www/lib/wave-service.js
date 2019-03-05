const WaveService = {
  setDefaultToken: token => {
    WaveService.defaultToken = token;
  },
  getDefaultToken: () => {
    return WaveService.defaultToken;
  },
  sendRequest: (method, uri, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      let headers = {};
      let rawHeaders = xhr.getAllResponseHeaders();
      rawHeaders = rawHeaders.split("\r\n");
      rawHeaders.forEach(rawHeader => {
        const split = rawHeader.split(": ");
        headers[split.shift().toLowerCase()] = split.shift();
      });
      callback(xhr.response, headers);
    });
    xhr.open(method, uri, true);
    xhr.send();
  },
  getSessionDetails: (token, callback) => {
    if (token instanceof Array) {
      let requestsLeft = token.length;
      let responses = [];
      token.forEach(token =>
        WaveService.sendRequest("GET", `/sessions/${token}`, response => {
          requestsLeft--;
          responses.push(response ? JSON.parse(response) : null);
          if (requestsLeft === 0) callback(responses);
        })
      );
    } else {
      if (typeof token !== "string") {
        callback = token;
        token = WaveService.defaultToken;
      }
      WaveService.sendRequest("GET", `/sessions/${token}`, response =>
        callback(response ? JSON.parse(response) : null)
      );
    }
  },
  getOfficialSessions: callback => {
    WaveService.sendRequest("GET", "/sessions/official", response => {
      callback(JSON.parse(response));
    });
  },
  getTestResults: (token, callback) => {
    if (typeof token !== "string") {
      callback = token;
      token = WaveService.defaultToken;
    }
    WaveService.sendRequest("GET", `/results/${token}`, response => {
      callback(JSON.parse(response));
    });
  },
  pauseSession: (token, callback) => {
    if (typeof token !== "string") {
      callback = token;
      token = WaveService.defaultToken;
    }
    WaveService.sendRequest("GET", `/sessions/${token}/pause`, callback);
  },
  resumeSession: (token, callback) => {
    if (typeof token !== "string") {
      callback = token;
      token = WaveService.defaultToken;
    }
    WaveService.sendRequest("GET", `/sessions/${token}/resume`, callback);
  },
  stopSession: (token, callback) => {
    if (typeof token !== "string") {
      callback = token;
      token = WaveService.defaultToken;
    }
    WaveService.sendRequest("GET", `/sessions/${token}/stop`, callback);
  },
  deleteSession: (token, callback) => {
    if (typeof token !== "string") {
      callback = token;
      token = WaveService.defaultToken;
    }
    WaveService.sendRequest("GET", `/sessions/${token}/delete`, callback);
  },
  findToken: (fragment, callback) => {
    WaveService.sendRequest("GET", `/sessions/${fragment}/token`, response => {
      response = JSON.parse(response);
      if (response.token) {
        callback(response.token);
      } else {
        callback(null);
      }
    });
  },
  downloadJson: (token, api) => {
    if (!api) {
      api = token;
      token = WaveService.defaultToken;
    }
    location.href = `/results/${token}/${api}/json`;
  },
  downloadJsons: (token, apis) => {
    if (typeof token !== "string") {
      apis = token;
      token = WaveService.defaultToken;
    }
    const shortToken = token.split("-").shift();
    let zipFileName = shortToken + ".zip";
    const createZip = jsons => {
      const zip = new JSZip();
      Object.keys(jsons).forEach(api =>
        zip.file(jsons[api].fileName, jsons[api].value)
      );
      return zip;
    };
    const jsons = {};
    apis.forEach(api => {
      WaveService.sendRequest(
        "GET",
        `/results/${token}/${api}/json`,
        (response, headers) => {
          let fileName = "";
          try {
            fileName = headers["content-disposition"]
              .split(";")
              .find(value => value.startsWith("filename"))
              .split("=")[1]
              .replace(/"/g, "");
            zipFileName = fileName
              .split("-")
              .filter((part, index) => index !== 1)
              .join("-")
              .replace(/json$/, "zip");
          } catch (ignored) {
            fileName = shortToken + "-" + api + ".json";
          }
          jsons[api] = { value: response, fileName };
          if (Object.keys(jsons).length === apis.length) {
            const zip = createZip(jsons);
            zip
              .generateAsync({ type: "blob" })
              .then(blob => utils.saveBlobAsFile(blob, zipFileName));
          }
        }
      );
    });
  },
  connect: token => {
    if (typeof token !== "string") token = WaveService.defaultToken;
    if (!WaveService.socket) {
      const url = `ws://${location.host}`;
      console.log(`Connecting to ${url}`);
      WaveService.socket = new WebSocket(url);
      WaveService.socket.onopen = () => {
        WaveService.socket.send(JSON.stringify({ token }));
      };
    }
  },
  onMessage: callback => (WaveService.socket.onmessage = callback),
  openHtmlReport: (token, api) => {
    if (!api) {
      api = token;
      token = WaveService.defaultToken;
    }
    const reportUrl = `/results/${token}/${api}/all.html`;
    window.open(reportUrl, "_blank");
  },
  getRecentSessions: () => {
    if (!window.localStorage) return [];
    const storage = window.localStorage;
    const state = JSON.parse(storage.getItem("wave"));
    if (!state) return [];
    return state.recent_sessions.filter(session => typeof session === "string");
  },
  getPinnedSessions: () => {
    if (!window.localStorage) return [];
    const storage = window.localStorage;
    const state = JSON.parse(storage.getItem("wave"));
    if (!state) return [];
    if (!state.pinned_sessions) return [];
    return state.pinned_sessions.filter(session => typeof session === "string");
  },
  addPinnedSession: token => {
    if (!window.localStorage) return;
    const storage = window.localStorage;
    let state = JSON.parse(storage.getItem("wave"));
    if (!state) state = {};
    if (!state.pinned_sessions) state.pinned_sessions = [];
    if (state.pinned_sessions.indexOf(token) !== -1) return;
    state.pinned_sessions.unshift(token);
    storage.setItem("wave", JSON.stringify(state));
  },
  addRecentSession: token => {
    if (!window.localStorage) return;
    const storage = window.localStorage;
    let state = JSON.parse(storage.getItem("wave"));
    if (!state) state = {};
    if (!state.recent_sessions) state.recent_sessions = [];
    if (state.recent_sessions.indexOf(token) !== -1) return;
    state.recent_sessions.unshift(token);
    storage.setItem("wave", JSON.stringify(state));
  },
  removePinnedSession: token => {
    if (!window.localStorage) return;
    const storage = window.localStorage;
    const state = JSON.parse(storage.getItem("wave"));
    if (!state) return;
    if (!state.pinned_sessions) return;
    state.pinned_sessions.splice(state.pinned_sessions.indexOf(token), 1);
    storage.setItem("wave", JSON.stringify(state));
  },
  removeRecentSession: token => {
    if (!window.localStorage) return;
    const storage = window.localStorage;
    const state = JSON.parse(storage.getItem("wave"));
    if (!state) return;
    if (!state.recent_sessions) return;
    state.recent_sessions.splice(state.recent_sessions.indexOf(token), 1);
    storage.setItem("wave", JSON.stringify(state));
    WaveService.removePinnedSession(token);
  }
};
