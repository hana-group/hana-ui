/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 2017/3/28
 * Description:
 */
import _ from 'lodash';
import {NoKeyError} from '../exceptions';

class Store {
  _store = {};
  _vars = {};
  _keysNeedDeepClone = ['transform'];
  has = (name, child) => {
    if (!this._store[name]) {
      return false;
    }
    if (child) {
      return !!this._store[name][child];
    }
    return true;
  };

  set = ({name, child, type, element}) => {
    if (child) {
      this._store[name] = this._store[name] || {};
      this._store[name][child] = {type, element};
    } else {
      this._store[name] = {type, element};
    }
  };

  get = (name, child) => {
    let value = this._store[name];
    if (!value) {
      throw new NoKeyError('Store of definitions', name, this._store);
    }
    if (!child) {
      if (this._keysNeedDeepClone.includes(value.type)) {
        return _.cloneDeep(value);
      }
      return value;
    }
    value = value[child];
    if (!value) {
      throw new NoKeyError('Store of definitions', `child ${child} in ${name}`, this._store);
    }
    if (this._keysNeedDeepClone.includes(value.type)) {
      return _.cloneDeep(value);
    }
    return value;
  };

  setVar = (key, value) => {
    this._vars[key] = value;
  }

  getVar = (key) => (
    this._vars[key]
  )
}

export default new Store();
