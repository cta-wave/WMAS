const UI = {
  createElement: config => {
    if (!config) return document.createElement("div");
    const elementType = config.element || "div";
    const element = document.createElement(elementType);

    if (config.hasOwnProperty("className"))
      element.setAttribute("class", config.className);
    if (config.hasOwnProperty("id")) element.setAttribute("id", config.id);
    if (config.hasOwnProperty("text")) element.innerText = config.text;
    if (config.hasOwnProperty("html")) element.innerHTML = config.html;
    if (config.hasOwnProperty("style"))
      element.setAttribute("style", config.style);
    if (config.hasOwnProperty("onclick"))
      element.onclick = config.onclick.bind(element);
    if (config.hasOwnProperty("onchange"))
      element.onchange = config.onchange.bind(element);
    if (config.hasOwnProperty("src")) element.setAttribute("src", config.src);
    if (elementType === "input") {
      if (config.hasOwnProperty("type"))
        element.setAttribute("type", config.type);
    }
    if (config.children) {
      config.children.forEach(child =>
        element.appendChild(UI.createElement(child))
      );
    }
    if (config.hasOwnProperty("disabled") && config.disabled) {
      element.setAttribute("disabled", true);
    }
    if (config.hasOwnProperty("placeholder")) {
      element.setAttribute("placeholder", config.placeholder);
    }
    if (config.hasOwnProperty("title")) {
      element.setAttribute("title", config.title);
    }
    return element;
  },
  getElement: id => {
    return document.getElementById(id);
  },
  getRoot: () => {
    return document.getElementsByTagName("body")[0];
  }
};
