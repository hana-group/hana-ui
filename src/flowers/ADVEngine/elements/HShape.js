import {upperFirst} from 'lodash';
import definitions, {store} from '../definitions';
import systemVariables from '../systemVariables';


// TODO
// merge draw funcs

export default class HShape {
  constructor(params) {
    this._params = Object.assign({
      fontSize: 40,
      color: '#000',
      fontFamily: 'Microsoft Yahei, Arial, serif'
    }, params);
  }

  get drawable() {
    return true;
  }

  width() {
    return this._params.width;
  }

  height() {
    return this._params.height;
  }

  hide = () => {};

  _drawPolygon = (ctx, transform, left, top) => {
    // scale the size
    const scaleFactor = systemVariables.getVar('scaleFactor');
    const {path, backgroundColor, borderColor, borderWidth, backgroundImage} = this._params;
    ctx.beginPath();
    path.forEach(
      (item, index) => {
        if (index === 0) ctx.moveTo(scaleFactor * item.x + left, scaleFactor * item.y + top);
        else ctx.lineTo(scaleFactor * item.x + left, scaleFactor * item.y + top);
      }
    );
    ctx.closePath();
    if (backgroundColor) {
      ctx.fillStyle = backgroundColor;
      ctx.fill();
    }

    if (borderColor && borderWidth) {
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = scaleFactor * borderWidth;
      ctx.stroke();
    }

    if (backgroundImage && definitions.image.has(backgroundImage.name)) {
      const imageData = store.get(backgroundImage.name, backgroundImage.child).element;
      ctx.save();
      ctx.clip();
      ctx.drawImage(imageData.image, left, top, scaleFactor * imageData.width(), scaleFactor * imageData.height());
      ctx.restore();
    }
  }

  _drawRect = (ctx, transform, left, top) => {
    const scaleFactor = systemVariables.getVar('scaleFactor');
    const width = this._params.width * scaleFactor;
    const height = this._params.height * scaleFactor;
    const {backgroundColor, borderColor, borderWidth, borderRadius,
      backgroundImage, text, fontSize, color, fontFamily} = this._params;

    ctx.beginPath();

    // build radius
    if (borderRadius) {
      const scaleRadius = scaleFactor * borderRadius;
      ctx.moveTo(left, top + scaleRadius);
      ctx.quadraticCurveTo(left, top, left + scaleRadius, top);
      ctx.lineTo(left + width - scaleRadius, top);
      ctx.quadraticCurveTo(left + width, top, left + width, top + scaleRadius);
      ctx.lineTo(left + width, top + height - scaleRadius);
      ctx.quadraticCurveTo(left + width, top + height, left + width - scaleRadius, top + height);
      ctx.lineTo(left + scaleRadius, top + height);
      ctx.quadraticCurveTo(left, top + height, left, top + height - scaleRadius);
    } else {
      ctx.moveTo(left, top);
      ctx.lineTo(left + width, top);
      ctx.lineTo(left + width, top + height);
      ctx.lineTo(left, top + height);
    }

    ctx.closePath();

    if (backgroundColor) {
      ctx.fillStyle = backgroundColor;
      ctx.fill();
    }

    if (borderColor && borderWidth) {
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = scaleFactor * borderWidth;
      ctx.stroke();
    }

    if (backgroundImage && definitions.image.has(backgroundImage.name)) {
      const imageData = store.get(backgroundImage.name, backgroundImage.child).element;
      ctx.save();
      ctx.clip();
      ctx.drawImage(imageData.image, left, top, scaleFactor * imageData.width(), scaleFactor * imageData.height());
      ctx.restore();
    }

    if (text) {
      ctx.fillStyle = color;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.font = `${fontSize * scaleFactor}px ${fontFamily}`;
      ctx.fillText(text, left + width / 2, top + height / 2);
    }
  }

  _drawCircle = (ctx, transform, left, top) => {
    const scaleFactor = systemVariables.getVar('scaleFactor');

    const {radius, backgroundColor, borderColor, borderWidth, backgroundImage} = this._params;

    ctx.beginPath();
    ctx.arc(scaleFactor * radius + left, scaleFactor * radius + top, scaleFactor * radius, 0, 2 * Math.PI);
    ctx.closePath();
    if (backgroundColor) {
      ctx.fillStyle = backgroundColor;
      ctx.fill();
    }

    if (borderColor && borderWidth) {
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = scaleFactor * borderWidth;
      ctx.stroke();
    }

    if (backgroundImage && definitions.image.has(backgroundImage.name)) {
      const imageData = store.get(backgroundImage.name, backgroundImage.child).element;
      ctx.save();
      ctx.clip();
      ctx.drawImage(imageData.image, left, top, scaleFactor * imageData.width(), scaleFactor * imageData.height());
      ctx.restore();
    }
  }

  // position of transform has been convert to {left?: number, top? number}
  draw = (ctx, transform) => {
    const screen = systemVariables.getVar('screen');

    const left = transform.left * screen.width + screen.left;
    const top = transform.top * screen.height + screen.top;

    ctx.globalAlpha = transform.opacity === undefined ? 1 : transform.opacity;

    const funcName = `_draw${upperFirst(this._params.type)}`;
    this[funcName](ctx, transform, left, top);
  }
}
