/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/3/26
 */
import _ from 'lodash';
import definitions, {store} from '../definitions';
import {MissingKeyError, NoKeyError} from '../exceptions'
import {HShape, HText} from '../elements';
import systemVariables from '../systemVariables';
import {normalizeTransform} from '../utils';
const debug = systemVariables.getVar('debug');

export default class HScreen {
  _children = [];
  /**
   @param {string} children[].type
   @param {object} children[].props
   @param {object} children[].transform
   @param {object} children[].events
  */
  constructor(children, width, height) {
    this._width = width;
    this._height = height;
    this._children = children.map(child => {
      if (debug) {
        this._check(child.type, child.props, child.transform, child.events);
      }
      return this._define(child.type, child.props, child.transform, child.events);
    });
  }

  get drawable() {
    return true;
  }

  get children () {
    return this._children;
  }

  _check = (type, props, transform, events) => {
    if (!['image', 'shape', 'video', 'text'].includes(type)) {
      throw new NoKeyError("Screen's type", props.type, props);
    }
    if (type === 'image') {
      ['name', 'child'].forEach(prop => {
        if (props[prop] === undefined) {
          throw new MissingKeyError("Screen's definition", prop, props);
        }
      });
    } else if (type === 'video') {
      ['name'].forEach(prop => {
        if (props[prop] === undefined) {
          throw new MissingKeyError("Screen's definition", prop, props);
        }
      });
    } else {
      definitions[type].check(type, props);
    }
  };

  _define = (type, props, transform, events) => {
    let element;
    if (type === 'image') {
      element = store.get(props.name, props.child).element;
    } else if (type === 'video') {
      element = store.get(props.name, props.child).element;
    } else if (type === 'shape') {
      element = new HShape(props.params);
    } else if (type === 'text') {
      const {text, ...attrs} = props;
      element = new HText(text, attrs);
    }
    normalizeTransform(transform, element);
    transform.left = typeof transform.left !== 'number' ? 0 : transform.left;
    transform.top = typeof transform.left !== 'number' ? 0 : transform.top;
    return {element, transform, events};
  };

  width = () => (
    this._width
  );

  height = () => (
    this._height
  );

  hide = () => {};

  // position of transform has been convert to {left?: number, top? number}
  draw = (ctx, transform, name) => {
    const keys = Object.keys(transform);
    this._children.forEach(child => {
      const newTransform = _.cloneDeep(child.transform);
      keys.forEach(key => {
        if (['top', 'left'].includes(key)) {
          newTransform[key] = transform[key] + (newTransform[key] || 0);
        } else if (['scale', 'size', 'opacity'].includes(key)) {
          newTransform[key] = transform[key] * (newTransform[key] || 0);
        }
      });
      child.element.draw(ctx, newTransform, name);
    });
  };
}
