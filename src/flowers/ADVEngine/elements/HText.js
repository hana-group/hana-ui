/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/3/21
 */
import systemVariables from '../systemVariables';
import display from '../display';
const localCtx = document.createElement('canvas').getContext('2d');

export default class HText {
  constructor(text, attrs) {
    this._textLength = text.length;
    this._totalDuration = 1000 / attrs.cps * this._textLength;
    this._text = [];
    this._outText = [];
    this._lineNumbers = [];
    this._attrs = attrs;
    localCtx.font = `${this._attrs.size}px serif`;
    this._animationState = 'start';
    this._animate = () => {};
    this._endAnimate = () => {};
    this._initText(text);
  }

  get drawable() {
    return true;
  }

  width = () => (
    this._width
  );

  height = () => (
    this._height
  );

  _initText = text => {
    this._attrs.lineTop = (this._attrs.lineHeight - this._attrs.size) / 2;

    if (this._attrs.width === null) {
      this._text = [text];
      this._lineNumbers = [text.length];
      this._width = localCtx.measureText(text).width;
      this._height = this._attrs.size;
      return;
    }

    this._text = [''];
    this._lineNumbers = [0];
    this._width = this._attrs.width;
    let line = 0;
    let lineWidth = 0;
    for (let i = 0, len = text.length; i < len; i++) {
      const char = text[i];
      const charWidth = localCtx.measureText(char).width;
      lineWidth += charWidth;
      if (lineWidth <= this._width) {
        this._text[line] += char;
        this._lineNumbers[line] += 1;
      } else {
        this._text.push(char);
        this._lineNumbers.push(this._lineNumbers[line]);
        lineWidth = charWidth;
        line += 1;
      }
    }
    this._height = (line + 1) * this._attrs.lineHeight;
  };

  hide = () => {
    this._endAnimate();
  };

  skip = () => {
    this._endAnimate();
  };

  _createAnimate = () => {
    const length = this._textLength;
    const start = Date.now();
    let id = 0;
    let preIndex = 0;
    this._animationState = 'pending';

    this._animate = () => {
      const duration = Date.now() - start;
      if ((duration > this._totalDuration && preIndex === length) || this._animationState === 'end') {
        this._endAnimate = () => {};
        this._animate = () => {};
        this._outText = this._text;
        this._animationState = 'end';
        display.refresh();
        return;
      }

      let currentIndex = ~~(duration * this._attrs.cps / 1000);
      if (currentIndex !== preIndex) {
        currentIndex = currentIndex > length ? length : currentIndex;
        this._outText = [];

        this._lineNumbers.forEach((num, line) => {
          if (currentIndex < num) {
            this._outText.push(this._text[line].substring(
              0, line ? currentIndex - this._lineNumbers[line - 1] : currentIndex
            ));
          } else {
            this._outText.push(this._text[line]);
          }
        });

        display.refresh();
        preIndex = currentIndex;
      }
      id = requestAnimationFrame(this._animate);
    };

    this._animate();
    return () => {
      cancelAnimationFrame(id);
      this._endAnimate = () => {};
      this._animate = () => {};
      this._outText = this._text;
      this._animationState = 'end';
      display.refresh();
    };
  };

  // position of transform has been convert to {left?: number, top? number}
  draw = (ctx, transform) => {
    const screen = systemVariables.getVar('screen');
    const scaleFactor = systemVariables.getVar('scaleFactor');

    ctx.font = `${(transform.size || this._attrs.size) * scaleFactor}px serif`;
    ctx.fillStyle = transform.color || this._attrs.color;

    const left = transform.left * screen.width;
    const top = transform.top * screen.height;

    ctx.globalAlpha = transform.opacity === undefined ? 1 : transform.opacity;

    if (this._attrs.cps !== 0 && this._animationState === 'start') {
      this._endAnimate = this._createAnimate(ctx, left, top);
      return;
    }

    this._outText.forEach((text, line) => {
      ctx.fillText(
        text,
        left + screen.left,
        top + (line * this._attrs.lineHeight + this._attrs.lineTop) * scaleFactor + screen.top
      );
    });
  }
}
