/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/3/16
 */
import {NoKeyError} from '../exceptions';
import _ from 'lodash';

export default class Layers {
  _layerNames = [];
  _layers = {};

  clear = () => {
    this._layerNames = [];
    this._layers = {};
  };

  has = name =>
    !!this._layers[name];

  getAttr = (name, key) => (
    this._layers[name][key]
  );

  getIndex = name => (
    this._layerNames.indexOf(name)
  )

  _checkIn = name => {
    const index = this._layerNames.indexOf(name);
    if (index === -1) {
      throw new NoKeyError('Layers', name, this._layerNames);
    }
    return index;
  };

  // element: {element, transform...}
  update = (name, element, transform, backElementName) => {
    const eIndex = this._layerNames.indexOf(name);

    if (backElementName) {
      if (eIndex !== -1) {
        this._layerNames.splice(eIndex, 1);
      }

      const index = this._checkIn(backElementName);
      this._layerNames.splice(index, 0, name);
    } else {
      if (eIndex !== -1) {
        this._layerNames.splice(eIndex, 1);
      }

      this._layerNames.push(name);
    }

    let newTransform;
    if (!this._layers[name]) {
      newTransform = _.cloneDeep(transform);
    } else {
      this._layers[name].element = element;
      newTransform = Object.assign(this._layers[name].transform, transform);
    }
    newTransform.left = typeof newTransform.left !== 'number' ? 0 : newTransform.left;
    newTransform.top = typeof newTransform.top !== 'number' ? 0 : newTransform.top;
    this._layers[name] = {name, element, transform: newTransform};
  };

  remove = name => {
    const index = this._checkIn(name);
    delete this._layers[name];
    this._layerNames.splice(index, 1);
  };

  setAttr = (name, key, value) => {
    if (!this._layers[name]) {
      throw new NoKeyError('Layers', name, this._layerNames);
    }
    this._layers[name][key] = Object.assign(this._layers[name][key], value);
  };

  forceTop = name => {
    const index = this._checkIn(name);
    this._layerNames.splice(index, 1);
    this._layerNames.push(name);
  };

  forEach = (callback) => {
    this._layerNames.forEach(name => {
      callback(this._layers[name]);
    });
  }
}
