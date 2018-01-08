class SoundTrack {
  _track = {
    music: null
    // sound: null,
    // voice: null
  };

  play = (audio, trackName, params = {}) => {
    this.clear(trackName, params);
    this._track[trackName] = audio;
    audio.start(params);
  }

  stop = (trackName, params = {}) => {
    const audio = this._track[trackName];
    if (audio) audio.stop(params);
  }

  clear = (trackName, params) => {
    this.stop(trackName, params);
    this._track[trackName] = null;
  }
}

export default new SoundTrack();
