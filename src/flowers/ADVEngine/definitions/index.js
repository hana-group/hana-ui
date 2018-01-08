/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/3/4
 */
import * as defClasses from './definitions';

const definitions = {};

Object.keys(defClasses).forEach(key => {
  const obj = new defClasses[key]();
  definitions[obj.key] = obj;
});

export default definitions;

class ResourceLoader {
  _queue = [];

  get state() {
    const validQueue = this._queue.filter(item => item);
    if (validQueue.length === 0) {
      return {loaded: true, error: false};
    }
    for (let i = 0; i < validQueue.length; i++) {
      if (!validQueue[i].error) {
        return {loaded: false, error: false};
      }
    }
    return {loaded: true, error: true};
  }

  add = (defName, name, props) => {
    this._queue.push({defName, name, props, error: false});
  };

  load = () => {
    this._queue = this._queue.filter(item => item);
    this._queue.forEach((item, index) => {
      item.error = false;
      const {defName, name, props} = item;
      definitions[defName].define(name, props)
        .then(() => {
          this._queue[index] = null;
        })
        .catch(err => {
          item.error = err;
        });
    });
  };

  clear = () => {
    this._queue = [];
  }
}

export const resourceLoader = new ResourceLoader();
export {default as store} from './store';
