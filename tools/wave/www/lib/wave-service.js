const WaveService = {
  setDefaultToken(token) {
    WaveService.defaultToken = token;
  },
  getDefaultToken() {
    return WaveService.defaultToken;
  },
  sendRequest(method, uri, callback) {
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
  getSession(token, callback, options) {
    if (typeof token !== "string") {
      callback = token;
      options = callback;
      token = WaveService.defaultToken;
    }
    const { detailsOnly } = options;
    let url = `/sessions/${token}`;
    if (detailsOnly) url = `${url}/details`;
    WaveService.sendRequest("GET", url, response =>
      callback(response ? JSON.parse(response) : null)
    );
  },
  getSessions(tokens, callback, options) {
    let requestsLeft = tokens.length;
    if (requestsLeft === 0) callback([]);
    const sessions = [];
    tokens.forEach(token =>
      WaveService.getSession(
        token,
        session => {
          requestsLeft--;
          sessions.push(session);
          if (requestsLeft === 0) callback(sessions);
        },
        options
      )
    );
  },
  getSessionDetails(token, callback) {
    if (!token) {
      return WaveService.getSession(callback, { detailsOnly: true });
    }
    if (token instanceof Array) {
      return WaveService.getSessions(token, callback, { detailsOnly: true });
    } else {
      return WaveService.getSession(token, callback, { detailsOnly: true });
    }
  },
  getPublicSessions(callback) {
    WaveService.sendRequest("GET", "/sessions/public", response => {
      callback(JSON.parse(response));
    });
  },
  getTestResults(token, callback) {
    if (typeof token !== "string") {
      callback = token;
      token = WaveService.defaultToken;
    }
    WaveService.sendRequest("GET", `/results/${token}`, response => {
      callback(JSON.parse(response));
    });
  },
  getFilteredTestResults: (tokens, refTokens, callback) => {
    WaveService.sendRequest(
      "GET",
      `/results/${tokens.join(",")}/compare?reftokens=${refTokens.join(",")}`,
      response => {
        callback(JSON.parse(response));
      }
    );
  },
  pauseSession(token, callback) {
    if (typeof token !== "string") {
      callback = token;
      token = WaveService.defaultToken;
    }
    WaveService.sendRequest("GET", `/sessions/${token}/pause`, callback);
  },
  resumeSession(token, callback) {
    if (typeof token !== "string") {
      callback = token;
      token = WaveService.defaultToken;
    }
    WaveService.sendRequest("GET", `/sessions/${token}/resume`, callback);
  },
  stopSession(token, callback) {
    if (typeof token !== "string") {
      callback = token;
      token = WaveService.defaultToken;
    }
    WaveService.sendRequest("GET", `/sessions/${token}/stop`, callback);
  },
  deleteSession(token, callback) {
    if (typeof token !== "string") {
      callback = token;
      token = WaveService.defaultToken;
    }
    WaveService.sendRequest("GET", `/sessions/${token}/delete`, callback);
  },
  findToken(fragment, callback) {
    WaveService.sendRequest("GET", `/sessions/${fragment}/token`, response => {
      response = JSON.parse(response);
      if (response.token) {
        callback(response.token);
      } else {
        callback(null);
      }
    });
  },
  downloadJson(token, api) {
    if (!api) {
      api = token;
      token = WaveService.defaultToken;
    }
    location.href = `/results/${token}/${api}/json`;
  },
  downloadJsons(token, apis) {
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
  downloadHtmlZip(token) {
    if (typeof token !== "string") token = WaveService.defaultToken;
    location.href = `/results/${token}/html`;
  },
  connect(token) {
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
  onMessage(callback) {
    WaveService.socket.onmessage = callback;
  },
  openHtmlReport(token, api, reftoken) {
    if (!api) {
      api = token;
      token = WaveService.defaultToken;
    }
    console.log(token);
    if (token instanceof Array) {
      const reportUrl = `/results/html?tokens=${token.join(",")}&api=${api}${
        reftoken ? `&token=${reftoken}` : ""
      }`;
      window.open(reportUrl, "_blank");
    } else {
      const reportUrl = `/results/${token}/${api}/all.html`;
      window.open(reportUrl, "_blank");
    }
  },
  openSession(token) {
    if (!token) return;
    const sessionUrl = `/results.html?token=${token}`;
    window.open(sessionUrl, "_blank");
  },
  getRecentSessions() {
    const state = WaveService.getState();
    if (!state || !state.recent_sessions) return [];
    return state.recent_sessions;
  },
  getPinnedSessions() {
    const state = WaveService.getState();
    if (!state || !state.pinned_sessions) return [];
    return state.pinned_sessions;
  },
  addPinnedSession(token) {
    if (!token) return;
    const state = WaveService.getState();
    if (!state.pinned_sessions) state.pinned_sessions = [];
    if (state.pinned_sessions.indexOf(token) !== -1) return;
    state.pinned_sessions.unshift(token);
    WaveService.setState(state);
  },
  addRecentSession(token) {
    if (!token) return;
    const state = WaveService.getState();
    if (!state.recent_sessions) state.recent_sessions = [];
    if (state.recent_sessions.indexOf(token) !== -1) return;
    state.recent_sessions.unshift(token);
    WaveService.setState(state);
  },
  addRecentSessions(tokens) {
    tokens.forEach(token => WaveService.addRecentSession(token));
  },
  setRecentSessions(sessionTokens) {
    const state = WaveService.getState();
    state.recent_sessions = sessionTokens;
    WaveService.setState(state);
  },
  removePinnedSession(token) {
    if (!token) return;
    const state = WaveService.getState();
    if (!state.pinned_sessions) return;
    const index = state.pinned_sessions.indexOf(token);
    if (index === -1) return;
    state.pinned_sessions.splice(index, 1);
    WaveService.setState(state);
  },
  removeRecentSession(token) {
    const state = WaveService.getState();
    if (!state.recent_sessions) return;
    const index = state.recent_sessions.indexOf(token);
    if (index === -1) return;
    state.recent_sessions.splice(index, 1);
    WaveService.setState(state);
  },
  getState() {
    if (!window.localStorage) return null;
    const storage = window.localStorage;
    const state = JSON.parse(storage.getItem("wave"));
    if (!state) return {};
    return state;
  },
  setState(state) {
    if (!window.localStorage) return null;
    const storage = window.localStorage;
    storage.setItem("wave", JSON.stringify(state));
  }
};
