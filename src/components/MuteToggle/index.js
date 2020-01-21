import styles from "./styles.scss";

export default function MuteToggle() {
  const unmuteButton = document.getElementById("unmute-button");
  const videos = document.querySelectorAll(".VideoPlayer");

  unmuteButton.onclick = () => {
    videos.forEach(video => {
      if (video.api.isMuted()) video.api.setMuted(false);
      else if (!video.api.isMuted()) video.api.setMuted(true);
    });
  };

  let observer = new IntersectionObserver(callback, {
    root: null,
    rootMargin: "0px",
    threshold: 0.6
  });

  observer.observe(videos[0]);
  observer.observe(videos[1]);

  function callback(entries, observer) {
    entries.forEach(entry => {
      if (entry.intersectionRatio === 0) return;
      if (entry.isIntersecting) {
        // Show loading animation.
        entry.target.api.play();
      } else {
        entry.target.api.pause();
      }
      // if (entry.intersectionRatio > 0) {
      //   console.log("Intersected!");
      // } else {
      //   console.log("Non-intersected!!!!");
      // }

      // Each entry describes an intersection change for one observed
      // target element:
      //   entry.boundingClientRect
      //   entry.intersectionRatio
      //   entry.intersectionRect
      //   entry.isIntersecting
      //   entry.rootBounds
      //   entry.target
      //   entry.time
    });
  }
}
