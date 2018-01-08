/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/3/16
 */
import systemVariables from '../systemVariables';

export default class Renderer {
  constructor(canvas) {
    this._canvas = canvas;
    this._ctx = canvas.getContext('2d');
    this.reset();
  }

  reset = () => {
    this._ctx.restore();
    this._ctx.save();
    this.resize();
    this.clear();
  };

  clear = () => {
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
  };

  resize = () => {
    const canvasAspect = this._canvas.width / this._canvas.height;
    const aspect = systemVariables.getVar('aspect');

    let top = 0;
    let left = 0;
    let width = this._canvas.width;
    let height = this._canvas.height;

    if (canvasAspect < aspect) {
      height = this._canvas.width / aspect;
      top = (this._canvas.height - height) / 2;
      systemVariables.setVar('scaleFactor', this._canvas.width / systemVariables.getVar('screenWidth'));
    } else {
      width = this._canvas.height * aspect;
      left = (this._canvas.width - width) / 2;
      systemVariables.setVar('scaleFactor', this._canvas.height / systemVariables.getVar('screenHeight'));
    }

    systemVariables.setVar('screen', {left, top, width, height});

    this._ctx.restore();
    this._ctx.save();
    this._ctx.rect(left, top, width, height);
    this._ctx.clip();
  };

  /**
  * @param {number} transform.top
  * @param {number} transform.bottom
  * @param {number} transform.left
  * @param {number} transform.right
  * @param {number} transform.zoom
  */
  draw = (element, transform, name) => {
    element.draw(this._ctx, transform, name);
  };
}
