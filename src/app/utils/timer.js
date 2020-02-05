import { timeout } from '../../../config/general';

export default class Timer {
  constructor(callback) {
    this.timer = null;
    this.callback = callback;
    this.create = this.create.bind(this);
    this.remove = this.remove.bind(this);
    this.run = this.run.bind(this);
  }

  create() {
    this.timer = setTimeout(() => this.callback(), timeout * 1000);
  }

  remove() {
    clearTimeout(this.timer);
  }

  run(videoStatus) {
    if (this.timer) {
      this.remove();
    }
    if (videoStatus !== 'playing') {
      this.create();
    }
  }
}
