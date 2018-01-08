/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/3/23
 */
import systemVariables from '../systemVariables';

export default class HScene {
  constructor(canvas) {
    this._canvas = document.createElement('canvas');
    this._canvas.width = systemVariables.getVar('screenWidth');
    this._canvas.height = systemVariables.getVar('screenHeight');
    this._ctx = this._canvas.getContext('2d');

    const screen = systemVariables.getVar('screen');
    this._ctx.drawImage(
      canvas, screen.left, screen.top, screen.width, screen.height,
      0, 0, this._canvas.width, this._canvas.height
    );
  }

  get drawable() {
    return true;
  }

  width = () => (
    this._canvas.width
  );

  height = () => (
    this._canvas.height
  );

  hide = () => {};

  // position of transform has been convert to {left?: number, top? number}
  draw = (ctx, transform) => {
    const screen = systemVariables.getVar('screen');
    const scaleFactor = systemVariables.getVar('scaleFactor');

    const width = this._canvas.width * scaleFactor;
    const height = this._canvas.height * scaleFactor;
    const left = transform.left * screen.width;
    const top = transform.top * screen.height;

    ctx.globalAlpha = transform.opacity === undefined ? 1 : transform.opacity;

    ctx.drawImage(
      this._canvas,
      left + screen.left, top + screen.top, width, height
    );
  }
}
