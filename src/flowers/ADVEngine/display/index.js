/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/3/5
 */
import _ from 'lodash';
import definitions from '../definitions';
import {HScene, HVoid} from '../elements';
import Renderer from './renderer';
import Layers from './layers';

class Display {
  constructor() {
    this._canvas = document.createElement('canvas');
    this._layers = new Layers();
    this._renderer = new Renderer(this._canvas);
    this._endAnimation = () => {};
    this._endTransition = () => {};
    this.refresh = _.throttle(this._draw, 10);
  }

  get canvas() {
    return this._canvas;
  }

  get layers() {
    return this._layers;
  }

  init = dom => {
    this.resize(dom.offsetWidth, dom.offsetHeight);
    dom.appendChild(this._canvas);
  };

  resize = (width, height) => {
    this._canvas.width = width;
    this._canvas.height = height;
    this._renderer.resize();
  };

  show = (name, element, transform, animation, transition, behind, newScene = false) => {
    // todo: if we need to cancel
    this._endAnimation();
    this._endTransition();

    if (newScene) {
      // must have a transition
      this._layers.clear();
      this._layers.update(name, new HScene(this._canvas), definitions.transform.default);
    }

    if (!this._layers.has(name) || (!animation && !transition) || (animation && !transform)) {
      this._layers.update(name, element, transform, behind);
      this._draw();
      return;
    }

    if (transition) {
      const preTransform = this._layers.getAttr(name, 'transform');
      const preElement = this._layers.getAttr(name, 'element');
      const {pre, next} = transition.start(preTransform, transform || {});
      this._layers.update(name, element, next, behind);
      this._layers.update(`${name}@pre`, preElement, pre, name);
      this._endTransition = this._createTransition(name, transition);
      return;
    }

    this._layers.update(
      name, element, this._layers.getAttr(name, 'transform'), behind
    );
    animation.start(this._layers.getAttr(name, 'transform'), transform);
    this._endAnimation = this._createAnimation(name, animation);
  };

  hide = (name, transform, animation, transition) => {
    if (!this._layers.has(name)) {
      return;
    }
    // todo: if we need to cancel
    this._endAnimation();
    this._endTransition();

    if ((!animation && !transition) || (animation && !transform)) {
      this._layers.remove(name);
      this._draw();
      return;
    }

    if (transition) {
      const preTransform = this._layers.getAttr(name, 'transform');
      const preElement = this._layers.getAttr(name, 'element');
      const {pre, next} = transition.start(preTransform, definitions.transform.default);
      this._layers.update(name, new HVoid(), next);
      this._layers.update(`${name}@pre`, preElement, pre, name);
      this._endTransition = this._createTransition(name, transition, true);
      return;
    }

    animation.start(this._layers.getAttr(name, 'transform'), transform);
    this._endAnimation = this._createAnimation(name, animation, true);
  };

  _createAnimation = (name, animation, hide = false) => {
    const end = () => {
      if (hide) {
        this._layers.remove(name);
      } else {
        this._layers.setAttr(name, 'transform', animation.end());
      }
      this._endAnimation = () => {};
      this._draw();
    };

    let id = 0;
    const animate = () => {
      if (animation.isEnd()) {
        end();
        return;
      }
      this._layers.setAttr(name, 'transform', animation.next());
      this.refresh();
      id = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(id);
      end();
    };
  };

  _createTransition = (name, transition, hide = false) => {
    const end = () => {
      this._layers.remove(`${name}@pre`);
      if (hide) {
        this._layers.remove(name);
      } else {
        const {next} = transition.end();
        this._layers.setAttr(name, 'transform', next);
      }
      this._endTransition = () => {};
      this._draw();
    };

    let id = 0;
    const animate = () => {
      if (transition.isEnd()) {
        end();
        return;
      }
      const {pre, next} = transition.next();
      this._layers.setAttr(`${name}@pre`, 'transform', pre);
      this._layers.setAttr(name, 'transform', next);
      this.refresh();
      id = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(id);
      end();
    };
  };

  _draw = () => {
    this._renderer.clear();
    this._layers.forEach(layer => {
      this._renderer.draw(layer.element, layer.transform, layer.name);
    });
  }
}

export default new Display();
