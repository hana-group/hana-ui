/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/3/16
 */
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

export class MissingKeyError extends BaseError {
  constructor(objName, key, obj, description) {
    super(
      'MissingKeyTypeError',
      `Object ${objName} must have Key '${key}', its value is '${JSON.stringify(obj)}'${description ? `, ${description}` : '.'}`); // eslint-disable-line
  }
}

export class NoKeyError extends BaseError {
  constructor(objName, key, obj, description) {
    super(
      'NoKeyError',
      `Object ${objName} does not have Key '${key}', its value is '${JSON.stringify(obj)}'${description ? `, ${description}` : '.'}`); // eslint-disable-line
  }
}

export class SourceLoadError extends BaseError {
  constructor(type, name, url, description) {
    super(
      'SourceLoadError',
      `${type} source ${name} loaded failed, url '${url}'${description ? `, ${description}` : '.'}`); // eslint-disable-line
  }
}
