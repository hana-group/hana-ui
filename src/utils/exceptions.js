/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 17/1/16
 */
class BaseError extends Error {
  constructor(name = 'BaseError', message) {
    super();
    this.name = name;
    this.stack = (new Error()).stack;
    this.message = message;
  }
}

export class MissingPropertyError extends BaseError {
  constructor(componentName, property, description) {
    super(
      'MissingPropertyError',
      `Component ${componentName} requires property '${property}'${description ? `, ${description}` : '.'}`);
  }
}

export class PropertyTypeError extends BaseError {
  constructor(componentName, property, type, description) {
    super(
      'PropertyTypeError',
      `The type of property '${property}' of component ${componentName} is invalid, it should be '${type}'${description ? `, ${description}` : '.'}`); // eslint-disable-line
  }
}

export class MissingKeyError extends BaseError {
  constructor(objName, key, obj, description) {
    super(
      'MissingKeyTypeError',
      `Object ${objName} must have Key '${key}', its value is '${obj}'${description ? `, ${description}` : '.'}`); // eslint-disable-line
  }
}

export class NoKeyError extends BaseError {
  constructor(objName, key, obj, description) {
    super(
      'NoKeyError',
      `Object ${objName} does not have Key '${key}', its value is '${obj}'${description ? `, ${description}` : '.'}`); // eslint-disable-line
  }
}
