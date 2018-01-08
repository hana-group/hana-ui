export {default as getRestProps} from './getRestProps';
export {default as childrenToArray} from './childrenToArray';
export {
  MissingPropertyError, PropertyTypeError, MissingKeyError, NoKeyError
} from './exceptions';
export {
  arrayWithNStrings, arrayWith7Strings, arrayWith12Strings, dateOrStringOrNull
} from './types';

const keyTable = {
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

export const getKeyFromCode = code => keyTable[code];
