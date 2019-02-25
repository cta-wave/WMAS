const UI = {
  createElement: config => {
    const type = config.type || "div";
    const element = document.createElement(type);

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
    if (type === "input") {
      if (config.hasOwnProperty("inputType"))
        element.setAttribute("type", config.inputType);
    }
    if (config.children) {
      config.children.forEach(child =>
        element.appendChild(UI.createElement(child))
      );
    }
    if (config.hasOwnProperty("disabled") && config.disabled) {
      element.setAttribute("disabled", true);
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
