import {remove} from 'lodash';

export const keyCode = {
  32: 'SPACE',
  13: 'ENTER',
  9: 'TAB',
  8: 'BACKSPACE',
  16: 'SHIFT',
  17: 'CTRL',
  18: 'ALT',
  20: 'CAPS_LOCK',
  144: 'NUM_LOCK',
  145: 'SCROLL_LOCK',
  37: 'LEFT',
  38: 'UP',
  39: 'RIGHT',
  40: 'DOWN',
  33: 'PAGE_UP',
  34: 'PAGE_DOWN',
  36: 'HOME',
  35: 'END',
  45: 'INSERT',
  46: 'DELETE',
  27: 'ESCAPE',
  19: 'PAUSE',
  222: "'"
};

export default class KeyEvent {
  constructor({
    trigger
  }) {
    this._eventList = [];
    this._trigger = trigger;
    document.addEventListener('keyup', this._handle);
  }

  register = (item) => {
    this._eventList.push(item);
  }

  _handle = e => {
    if (this._eventList.length) {
      this._eventList.forEach(
        item => {
          if (keyCode[e.keyCode] === item.code) {
            // trigger
            this._trigger(item);
          }
        }
      );
    }
  }

  remove = name => {
    remove(
      this._eventList,
      item => item.name === name
    );
  }

  clear = () => {
    this._eventList = [];
  }
}
