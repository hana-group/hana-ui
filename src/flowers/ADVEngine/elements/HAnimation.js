/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/3/19
 */
import _ from 'lodash';
import * as d3Interpolate from 'd3-interpolate';
import * as d3Ease from 'd3-ease';

export default class HAnimation {
  _startTime = 0;
  _duration = 0;
  _attrs = {};
  _currentTransform = {};
  _startTransform = {};
  _endTransform = {};
  _interpolators = {};
  _timeFunctions = {};

  constructor(duration, types) {
    this._attrs = {
      duration,
      types
    };
  }

  current = () => (
    this._currentTransform
  );

  isEnd = () => (
    this._duration >= this._attrs.duration
  );

  start = (startTransform, endTransform) => {
    this._startTransform = _.cloneDeep(startTransform);
    this._endTransform = _.cloneDeep(endTransform);
    this._currentTransform = {};
    this._interpolators = {};
    this._timeFunctions = {};
    this._startTime = Date.now();
    this._duration = 0;

    if (!startTransform.left) {
      this._startTransform.left = 0;
    }
    if (!startTransform.top) {
      this._startTransform.top = 0;
    }

    Object.keys(this._startTransform).forEach(key => {
      // deep clone
      this._currentTransform[key] = this._startTransform[key];
      if (this._endTransform[key] === undefined) {
        this._endTransform[key] = this._startTransform[key];
      }
    });
    Object.keys(this._endTransform).forEach(key => {
      if (this._startTransform[key] === undefined) {
        this._startTransform[key] = this._endTransform[key];
      }
    });

    // only add transform which is different between start and end
    Object.keys(this._startTransform).forEach(key => {
      if (this._endTransform[key] !== this._startTransform[key]) {
        this._interpolators[key] = d3Interpolate.interpolate(
          this._startTransform[key], this._endTransform[key]
        );
        let type = this._attrs.types[key];
        type = type ? `${type[0].toUpperCase()}${type.substr(1)}` : 'Linear';
        this._timeFunctions[key] = d3Ease[`ease${type}`];
      }
    });
    return this._currentTransform;
  };

  next = () => {
    // milliseconds
    this._duration = (Date.now() - this._startTime);
    if (this.isEnd()) {
      return this.end();
    }
    Object.keys(this._interpolators).forEach(key => {
      this._currentTransform[key] = this._interpolators[key](
        this._timeFunctions[key](this._duration / this._attrs.duration)
      );
    });
    return this._currentTransform;
  };

  end = () => {
    this._duration = this._attrs.duration;
    this._currentTransform = _.cloneDeep(this._endTransform);
    return this._currentTransform;
  };
}
