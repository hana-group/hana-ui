/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/3/4
 */
import systemVariables from './systemVariables';
import {MissingKeyError} from './exceptions';
import {store} from './definitions';

export const checkAllNotUndefined = (reqProps, props) => {
  reqProps.forEach(prop => {
    if (props[prop] === undefined) {
      throw new MissingKeyError(`${this._key}'s ast`, prop, JSON.stringify(props));
    }
  });
};

export const normalizeTransform = (transform, element) => {
  const screenWidth = systemVariables.getVar('screenWidth');
  const screenHeight = systemVariables.getVar('screenHeight');

  transform.width = element.width() / screenWidth;
  transform.height = element.height() / screenHeight;
  if (transform.right !== undefined) {
    transform.left = (1 - transform.right - transform.width);
    delete transform.right;
  }
  if (transform.bottom !== undefined) {
    transform.top = (1 - transform.bottom - transform.height);
    delete transform.bottom;
  }
  return transform;
};

export const checkType = (pairs) => {
  pairs.forEach(pair => {
    if (!store.has(pair.name, pair.child)) {
      return;
    }
    const type = store.get(pair.name, pair.child).type;
    if (type !== pair.type) {
      throw new Error(`Definition ${pair.name}'s type is error, expect ${pairs.name} but is ${type}!`);
    }
  });
};
