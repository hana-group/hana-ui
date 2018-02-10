/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 10 Feb 2018
 * Description:
 */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

function randomInt(start, end) {
  let num;
  if (window.crypto) {
    num = window.crypto.getRandomValues(new Uint8Array([1]))[0] / 255;
  } else {
    num = Math.random();
  }

  num = ~~(num * (end - start) + start);
  return num > end ? end : num;
}

class FireFly {
  static genTemplate(color, size) {
    const canvas = document.createElement('canvas');
    FireFly.modifyTemplate(canvas, color, size);
    return canvas;
  }

  static modifyTemplate(canvas, color, size) {
    canvas.width = size;
    canvas.height = size;
    const radius = size / 2;
    const ctx = canvas.getContext('2d');

    ctx.globalCompositeOperation = 'lighter';
    const gradient = ctx.createRadialGradient(radius, radius, 0, radius, radius, radius);
    // gradient.addColorStop(0, 'rgba(255, 255, 255, .7)');
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.arc(radius, radius, radius, 0, Math.PI * 2, false);
    ctx.fill();
  }

  constructor(image, size, life, ctx) {
    this.ctx = ctx;
    this.originSize = size;
    this.size = size;
    this.life = life;
    this.image = image;
    this.x = 0;
    this.y = 0;
    this.duration = 0;
    this.nextX = randomInt(-200, 200);
    this.alive = true;
  }

  reset(x, y = 0) {
    this.size = this.originSize;
    this.duration = 0;
    this.x = x || this.x;
    this.y = y;
    this.nextX = randomInt(-200, 200);
    this.alive = true;
  }

  update(escape) {
    if (!this.alive) {
      return;
    }

    const percent = escape / this.life;
    this.size -= this.originSize * percent;

    if (this.size <= 0) {
      this.size = 0.01;
      this.alive = false;
      return;
    }

    this.duration += escape;
    if (this.duration > 4) {
      this.duration = 0;
      this.nextX = randomInt(-200, 200);
    }

    this.x += this.nextX * (escape / 4);
  }

  draw(escape) {
    this.update(escape);
    const {ctx, x, y, size} = this;
    ctx.globalCompositeOperation = 'lighter';

    ctx.drawImage(this.image, x, y, size, size);
  }
}

class FireFlies {
  constructor(canvas, size) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.image = FireFly.genTemplate('#fff', size);
    this.size = size;
    window.addEventListener('resize', this.resize);
  }

  init() {
    this.resize();
    this.flies = [];
    for (let i = 0; i < 5; i += 1) {
      this.born();
    }
  }

  start() {
    this.init();
    this.ts = performance.now();
    this.bornEscape = 0;
    this.draw();
  }

  stop() {
    cancelAnimationFrame(this.animateId);
  }

  changeColor(color) {
    FireFly.modifyTemplate(this.image, color, this.size);
  }

  born() {
    const [x, y, w, h] = this.rect;

    const fireFly = new FireFly(this.image, this.size, 16, this.ctx);
    fireFly.x = randomInt(0, w);
    fireFly.y = h;
    this.flies.push(fireFly);
  }

  resize = () => {
    const {canvas} = this;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    this.rect = [0, 0, canvas.width, canvas.height];
  }

  draw = () => {
    const {ctx} = this;
    const [x, y, w, h] = this.rect;

    ctx.clearRect(x, y, w, h);

    const ts = performance.now();
    const escape = (ts - this.ts) / 1000;
    this.bornEscape += escape;

    if (this.bornEscape > 1 && this.flies.length < 50) {
      this.born();
      this.bornEscape = 0;
    }

    this.flies.forEach((fireFly) => {
      if (fireFly.alive) {
        fireFly.y -= escape / 16 * h * 1.3;
        fireFly.draw(escape);
      } else {
        fireFly.reset();
        fireFly.y = h + 32;
      }
    });

    this.ts = ts;
    this.animateId = requestAnimationFrame(this.draw);
  }
}

export default class FireFliesContainer extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    color: PropTypes.string.isRequired,
    size: PropTypes.number
  };

  static defaultProps = {
    size: 96
  };

  componentDidMount() {
    this.fireFlies = new FireFlies(this.canvas, this.props.size);
    this.fireFlies.changeColor(this.props.color);
    this.fireFlies.start();
  }

  componentWillReceiveProps({color}) {
    this.fireFlies.changeColor(color);
  }

  componentWillUnmount() {
    this.fireFlies.stop();
  }

  render() {
    return (
      <canvas
        className={cx(this.props.className)}
        ref={ref => {
          this.canvas = ref;
        }}
      />
    );
  }
}
