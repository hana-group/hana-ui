import {getVolumes} from '../media/utils';

export default class HAudio {
  constructor(buffer, context) {
    this._buffer = buffer;
    this._context = context;
    this._isPlay = false;
  }

  get playable() {
    return true;
  }

  get buffer() {
    return this._buffer;
  }

  get source() {
    return this._source;
  }

  get context() {
    return this._context;
  }

  get isPlay() {
    return this._isPlay;
  }

  createSource = () => {
    this._source = this._context.createBufferSource();
    this._source.buffer = this._buffer;
  }

  setVolume = (volume) => {
    this._volume = volume;
    if (this._gainNode) {
      this._gainNode.gain.setValueAtTime(volume, this._context.currentTime);
    }
  }

  // TODO change to event emit
  isVolumeChanged = () => {
    const volume = getVolumes(this._audioType);
    if (volume !== this._volume) {
      this.setVolume(volume);
    }
    this.rid = setTimeout(
      this.isVolumeChanged, 200
    );
  }

  start = ({
    audioType = 'sound',
    loop = false,
    delay = 0,
    transitionDuration = 2,
    offset,
    duration,
    transition
  }) => {
    // every time should create new buffer source.
    this.createSource();

    this._audioType = audioType;
    this._volume = getVolumes(this._audioType);

    this._source.loop = loop;
    this._gainNode = this._context.createGain();
    this._source.connect(this._gainNode);

    // modify the volume
    this._gainNode.connect(this._context.destination);

    this._isPlay = true;
    this._source.start(this._context.currentTime + delay, offset, duration);

    if (transition === 'fade') {
      // setValueAtTime 1st param can't be 0.
      this._gainNode.gain.setValueAtTime(0.001, this._context.currentTime);
      this._gainNode.gain.exponentialRampToValueAtTime(
        this._volume,
        this._context.currentTime + transitionDuration
      );
    } else {
      this._gainNode.gain.value = this._volume;
    }

    this.isVolumeChanged();
  }

  stop = ({
    transition,
    transitionDuration = 2,
    delay = 0
  }) => {
    if (transition === 'fade') {
      this._gainNode.gain.exponentialRampToValueAtTime(0.001, this._context.currentTime + transitionDuration);
      this._source.stop(this._context.currentTime + transitionDuration);
    } else {
      this._source.stop(this._context.currentTime + delay);
    }
    this._isPlay = false;
    clearTimeout(this.rid);
  }

}
