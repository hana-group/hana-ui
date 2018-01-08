/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/2/27
 */
import {PropertyTypeError} from './exceptions';

export const arrayWithNStrings = (n, props, propName, componentName) => (
  props[propName] === undefined
  || (
    props[propName] instanceof Array
    && props[propName].length === n
    && props[propName].filter(item => (typeof item === 'string')).length === n
  )
    ? null
    : new PropertyTypeError(componentName, propName, `Array with ${n} strings`)
);

export const arrayWith7Strings = (props, propName, componentName) =>
  arrayWithNStrings(7, props, propName, componentName);

export const arrayWith12Strings = (props, propName, componentName) =>
  arrayWithNStrings(12, props, propName, componentName);

export const dateOrStringOrNull = (props, propName, componentName) => (
  props[propName] === undefined
  || props[propName] instanceof Date
  || typeof props[propName] === 'string'
  || props[propName] === null
    ? null
    : new PropertyTypeError(componentName, propName, 'Date, string or null')
);
