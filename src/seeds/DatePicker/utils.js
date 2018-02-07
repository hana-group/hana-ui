/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 17/1/16
 */
export const containerWidth = 340;
export const containerHeight = 400;

export const enterTime = 500;
export const leaveTime = 300;

export {
  arrayWith7Strings, arrayWith12Strings, dateOrStringOrNull
} from '../../utils';

export const nop = () => {};

export const normalizeDate = date => {
  if (date === undefined) {
    return null;
  }

  let newDate = null;
  // if string else Date or null
  if (typeof date === 'string') {
    let test;
    if (/^\d\d\d\d-\d\d-\d\d/.test(date)) {
      test = new Date(date.replace(/-/g, '/'));
    } else {
      test = new Date(date);
    }
    if (!isNaN(test.getTime())) {
      newDate = test;
    }
  } else {
    // Date or null
    newDate = date;
  }
  if (newDate === null || isNaN(newDate.getTime())) {
    return null;
  }
  newDate = new Date(newDate);
  newDate.setHours(0);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  return newDate;
};

export const dateToString = date => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${year}-${month < 9 ? '0' : ''}${month + 1}-${day < 10 ? '0' : ''}${day}`;
};

export const generateDays = date => {
  const month = date.getMonth();
  const year = date.getFullYear();
  const d0 = new Date(year, month - 1, 1);
  const d1 = new Date(year, month, 1);
  const d2 = new Date(year, month + 1, 1);

  const monthLengthPre = ~~((d1 - d0) / (1000 * 60 * 60 * 24));
  const monthLengthCurrent = ~~((d2 - d1) / (1000 * 60 * 60 * 24));

  const firstWeekday = d1.getDay() === 0 ? 7 : d1.getDay();

  const days = new Array(42);
  let day = monthLengthPre - firstWeekday + 1;

  for (let i = 0; i < 42; i += 1) {
    if (i === firstWeekday || i === monthLengthCurrent + firstWeekday) {
      day = 1;
    }

    if (i < firstWeekday) {
      days[i] = [day, 'pre'];
    } else if (i < monthLengthCurrent + firstWeekday) {
      days[i] = [day, 'current'];
    } else {
      days[i] = [day, 'next'];
    }

    day += 1;
  }
  return days;
};
