/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/3/5
 */
import {defaultSysVars} from './config';

class SystemVariables {
  _variables = {};

  constructor(defaultVars) {
    this.setVars(defaultVars);
  }

  getVar = name =>
    this._variables[name];

  setVar = (name, value) => {
    this._variables[name] = value;
  };

  setVars = pairs => {
    Object.keys(pairs).forEach(key => {
      this.setVar(key, pairs[key]);
    });
  };
}

export default new SystemVariables(defaultSysVars);
