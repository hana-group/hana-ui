import systemVariables from '../systemVariables';
import {getVolumes} from '../media/utils';
import display from '../display';

// TODO volume control / volume

export default class HVideo {
  constructor(videoElement) {
    this._element = videoElement;
    this._context = null;
  }

  get drawable() {
    return true;
  }

  get playable() {
    return true;
  }

  get element() {
    return this._element;
  }

  width = () => this._element.videoWidth

  height = () => this._element.videoHeight

  show = () => {
    this._context.drawImage(
      this._element,
      this._left,
      this._top,
      this._width,
      this._height
    );
  }

  // TODO event emit;

  isVolumeChanged = () => {
    const volume = getVolumes('music');
    if (volume !== this._element.volume) {
      this._element.volume = volume;
    }
    this.vid = setTimeout(
      this.isVolumeChanged, 200
    );
  }

  loop = () => {
    display.refresh();
    this.rid = requestAnimationFrame(this.loop);
  }


  draw = (ctx, transform) => {
    const screen = systemVariables.getVar('screen');
    const scaleFactor = systemVariables.getVar('scaleFactor');

    this._context = ctx;
    this._transform = transform;

    this._left = transform.left * screen.width + screen.left;
    this._top = transform.top * screen.height + screen.top;

    this._width = this._element.videoWidth * scaleFactor;
    this._height = this._element.videoHeight * scaleFactor;

    this.show();
  }

  play = () => {
    if (this._context) {
      this._element.play();
      this._element.volume = getVolumes('music');
      this.loop();
      this.isVolumeChanged();
    }
  }

  hide = () => {
    this._element.pause();
    this._element.currentTime = 0;
    cancelAnimationFrame(this.rid);
    clearTimeout(this.vid);
  }

}
