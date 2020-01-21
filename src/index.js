import App from "./components/App";

const PROJECT_NAME = "audio-unmute";
const root = document.querySelector(`[data-${PROJECT_NAME}-root]`);

function init() {
  console.log(":)");
  root.appendChild(new App({ projectName: PROJECT_NAME }).el);

  const unmuteButton = document.getElementById("unmute-button");

  unmuteButton.onclick = () => {
    const videos = document.querySelectorAll(".VideoPlayer");

    videos.forEach(video => {
      console.log(video);
      console.log(video.api.isMuted());

      if (video.api.isMuted()) video.api.setMuted(false);
      else if (!video.api.isMuted()) video.api.setMuted(true);
    });
  };
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
