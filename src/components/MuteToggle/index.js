import styles from './styles.scss';

export default function MuteToggle() {
  this.el = document.createElement('div');
  this.el.className = styles.root;
  this.el.innerHTML = `Find me in <strong>src/components/MuteToggle/index.js</strong>`;
}
