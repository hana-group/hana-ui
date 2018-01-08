/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/3/16
 */
import {NoKeyError} from '../exceptions';
export {default as HVoid} from './HVoid';
export {default as HImage} from './HImage';
export {default as HAudio} from './HAudio';
export {default as HAnimation} from './HAnimation';
export {default as HText} from './HText';
export {default as HVideo} from './HVideo';
export {default as HScene} from './HScene';
export {default as HShape} from './HShape';
export {default as HScreen} from './HScreen';

import * as transitionClasses from './HTransitions';
const transitions = {};
Object.keys(transitionClasses).forEach(key => {
  const obj = new transitionClasses[key]({});
  transitions[obj.key] = obj;
});

export const createHTransition = (type, params) => {
  if (!transitions[type]) {
    throw new NoKeyError('HTransitions', type, params);
  }
  return transitions[type].create(params);
};
