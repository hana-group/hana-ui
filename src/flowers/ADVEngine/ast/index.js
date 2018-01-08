/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/3/4
 */

import * as astClasses from './ast';

const ast = {};

Object.keys(astClasses).forEach(key => {
  const obj = new astClasses[key]();
  ast[obj.key] = obj;
});

export default ast;
