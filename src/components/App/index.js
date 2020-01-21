import styles from "./styles.scss";

export default function App({ projectName }) {
  this.el = document.createElement("div");
  this.el.className = styles.root;
  this.el.innerHTML = `
    <button id="unmute-button">Toggle mute</button>
  `;
}
