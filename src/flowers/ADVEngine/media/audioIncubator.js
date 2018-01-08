class AudioIncubator {
  constructor() {
    if (this.checkSupport()) {
      this._context = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  get context() {
    return this._context;
  }

  checkSupport = () => {
    if (window.AudioContext || window.webkitAudioContext) {
      return true;
    }
    throw new Error('Your browser does not support Web Audio.');
  };

  decodeAudioData = (arrayBuffer, callback) => {
    this._context.decodeAudioData(arrayBuffer, callback);
  }

}

export default new AudioIncubator();
