import App from "./components/App";
import MuteToggle from "./components/MuteToggle";

const PROJECT_NAME = "audio-unmute";
const root = document.querySelector(`[data-${PROJECT_NAME}-root]`);

function init() {
  console.log(":)");
  root.appendChild(new App({ projectName: PROJECT_NAME }).el);

  MuteToggle();
}

// Wait for Odyssey before init
if (window.__ODYSSEY__) {
  init(window.__ODYSSEY__);
} else {
  window.addEventListener("odyssey:api", e => {
    init(e.detail);
  });
}

if (module.hot) {
  module.hot.accept("./components/App", () => {
    root.removeChild(root.firstChild);

    try {
      init();
    } catch (err) {
      import("./components/ErrorBox").then(exports => {
        const ErrorBox = exports.default;
        root.appendChild(new ErrorBox({ error: err }).el);
      });
    }
  });
}

if (process.env.NODE_ENV === "development") {
  console.debug(`[${PROJECT_NAME}] public path: ${__webpack_public_path__}`);
}
