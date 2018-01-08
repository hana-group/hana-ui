/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/2/6
 */
export {
  arrayWith7Strings, arrayWith12Strings, dateOrStringOrNull
} from '../../utils';

export const nop = () => {};

export const dateToString = date => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${year}-${month < 9 ? '0' : ''}${month + 1}-${day < 10 ? '0' : ''}${day}`;
};

const ft = t => `${t < 10 ? '0' : ''}${t}`;

export const timeToString = time => {
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();
  return `${ft(hour)}:${ft(minute)}:${ft(second)}`;
};

