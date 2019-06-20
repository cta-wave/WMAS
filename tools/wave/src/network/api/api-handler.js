class ApiHandler {
  sendJson(object, response) {
    response.set("Content-Type", "Application/JSON");
    response.send(JSON.stringify(object, null, 2));
  }

  parseQueryParameters(request) {
    let {
      token,
      path,
      types,
      timeout,
      hostname,
      tokens,
      api,
      reftoken,
      reftokens,
      resume,
      data
    } = request.query;
    token = token || null;
    path = path || null;
    types = types ? types.split(",") : null;
    timeout = timeout || null;
    hostname = hostname || null;
    api = api || null;
    tokens = tokens ? tokens.split(",") : null;
    reftoken = reftoken || "";
    reftokens = reftokens || "";
    resume = resume ? (resume !== "false" ? true : false) : false;
    data = data || "";
    return {
      token,
      path,
      types,
      testTimeout: timeout,
      hostname,
      api,
      tokens,
      reftoken,
      reftokens,
      resume,
      data
    };
  }

  parseUrl(request) {
    let url = request.url;
    if (url.indexOf("?") !== -1) {
      url = url.split("?")[0];
    }
    // remove /api prefix
    url = url.split("/");
    url = url.filter(part => part !== "");
    url.shift();
    return url;
  }

  sendFile({ response, blob, filePath, fileName }) {
    response.set(
      "Content-Disposition",
      'attachment;filename="' + fileName + '"'
    );
    if (blob) {
      response.send(blob);
      return;
    }
    response.sendFile(filePath);
  }

  sendZip(options) {
    options.response.set("Content-Type", "application/x-compressed");
    this.sendFile(options);
  }
}

module.exports = ApiHandler;
