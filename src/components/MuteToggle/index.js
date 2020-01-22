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

  // Add video players to our observer
  videos.forEach(video => {
    observer.observe(video);
  });

  // This is done when element observed
  function callback(entries, observer) {
    entries.forEach(entry => {
      // Don't fire on load
      if (entry.intersectionRatio === 0) return;

      if (entry.isIntersecting) {
        // Get the actual video element
        const entryVid = entry.target.querySelector("video");

        // If we're already fading out, then stop
        clearInterval(entryVid.fadeOutIntervalId);

        if (entryVid.volume < 1.0) {
          // entryVid.volume = 1.0;
          let vol = entryVid.volume;
          let interval = 200;

          entryVid.fadeInIntervalId = setInterval(function() {
            // Reduce volume by 0.05 as long as it is above 0
            // This works as long as you start with a multiple of 0.05!
            if (vol < 1.0) {
              vol += 0.4;
              // limit to 2 decimal places
              // also converts to string, works ok
              entryVid.volume = vol.toFixed(2);
            } else {
              // Stop the setInterval when 0 is reached
              clearInterval(entryVid.fadeInIntervalId);
            }
          }, interval);
        }

        //

        // Play the video
        entry.target.api.play();
      } else {
        const entryVid = entry.target.querySelector("video");

        // If we're already fading in, then stop
        clearInterval(entryVid.fadeInIntervalId);

        let vol = entryVid.volume;
        let interval = 200;

        entryVid.fadeOutIntervalId = setInterval(function() {
          // Reduce volume by 0.05 as long as it is above 0
          // This works as long as you start with a multiple of 0.05!
          if (vol > 0) {
            vol -= 0.1;
            // limit to 2 decimal places
            // also converts to string, works ok
            entryVid.volume = vol.toFixed(2);
          } else {
            // Stop the setInterval when 0 is reached
            entry.target.api.pause();
            clearInterval(entryVid.fadeOutIntervalId);
          }
        }, interval);
      }
    });
  }
}
