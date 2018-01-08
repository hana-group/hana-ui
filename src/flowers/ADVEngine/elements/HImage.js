/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/3/16
 */
import systemVariables from '../systemVariables';

export default class HImage {
  constructor(image) {
    this._image = image;
  }

  get drawable() {
    return true;
  }

  width = () => (
    this._image.width
  );

  height = () => (
    this._image.height
  );

  get image () {
    return this._image;
  }

  hide = () => {};

  // position of transform has been convert to {left?: number, top? number}
  draw = (ctx, transform) => {
    const screen = systemVariables.getVar('screen');
    const scaleFactor = systemVariables.getVar('scaleFactor');

    const width = this._image.width * scaleFactor;
    const height = this._image.height * scaleFactor;
    const left = transform.left * screen.width;
    const top = transform.top * screen.height;

    ctx.globalAlpha = transform.opacity === undefined ? 1 : transform.opacity;

    ctx.drawImage(
      this._image,
      left + screen.left, top + screen.top, width, height
    );
  }
}
