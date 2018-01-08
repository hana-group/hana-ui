/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 17/1/23
 */
export const containerWidth = 420;
export const containerHeight = 120;

export const enterTime = 500;
export const leaveTime = 300;

export {dateOrStringOrNull} from '../../utils';

export const nop = () => {};

export const normalizeTime = time => {
  if (time === undefined || time === '') {
    return null;
  }

  let newTime = null;
  // if string else Date or null
  if (typeof time === 'string') {
    let test = time;
    if (/^\d\d\d\d-\d\d-\d\d/.test(time)) {
      test = new Date(time.replace(/-/g, '/'));
    }
    if (/.+ \d\d:\d\d:\d\d/.test(test)) {
      test = new Date(test);
    } else {
      test = new Date(`1970-01-01 ${test}`);
    }
    if (!isNaN(test.getTime())) {
      newTime = test;
    }
  } else {
    // Date or null
    newTime = time;
  }
  if (newTime === null || isNaN(newTime.getTime())) {
    return null;
  }

  newTime = new Date(newTime);
  newTime.setYear(1970);
  newTime.setMonth(1);
  newTime.setDate(1);
  return newTime;
};

const ft = t => `${t < 10 ? '0' : ''}${t}`;

export const timeToString = time => {
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();
  return `${ft(hour)}:${ft(minute)}:${ft(second)}`;
};
