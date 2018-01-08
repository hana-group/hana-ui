/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/3/19
 */
import _ from 'lodash';
import * as d3Interpolate from 'd3-interpolate';
import * as d3Ease from 'd3-ease';

import systemVariables from '../systemVariables';
import {MissingKeyError, NoKeyError} from '../exceptions';

class TransitionBase {
  _reqParams = [
    'duration',
    'curve'
  ];
  _startTime = 0;
  _duration = 0;
  _attrs = {};
  _preTransform = {};
  _nextTransform = {};
  _key = 'base';

  constructor(params, check = false) {
    if (check && !systemVariables.getVar('debug')) {
      this._checkParams(params, this._reqParams);
    }
    this._create(params);
  }

  get key() {
    return this._key;
  }

  create = params => (
    new this.constructor(params, true)
  );

  isEnd = () => (
    this._duration >= this._attrs.duration
  );

  start = (preTransform, nextTransform) => {
    this._preTransform = _.cloneDeep(preTransform);
    this._nextTransform = _.cloneDeep(nextTransform);
    this._startTime = Date.now();
    this._duration = 0;
    this._start();
    return {pre: this._preTransform, next: this._nextTransform};
  };

  next = () => {
    // milliseconds
    this._duration = (Date.now() - this._startTime);
    if (this.isEnd()) {
      return this.end();
    }
    this._next(this._duration);
    return {pre: this._preTransform, next: this._nextTransform};
  };

  end = () => {
    this._end();
    return {pre: this._preTransform, next: this._nextTransform};
  };

  _checkParams = (params, reqParams) => {
    reqParams.forEach(param => {
      if (params[param] === undefined) {
        throw new MissingKeyError(`Transition ${this._key}`, param, params);
      }
    });
  };

  _create = params => {
    this._attrs = params;
  };

  _start = () => {}; // eslint-disable-line

  _next = () => {}; // eslint-disable-line

  _end = () => {}; // eslint-disable-line
}

export class DissolveTransition extends TransitionBase {
  _interpolators = {};
  _timeFunction = null;
  _nextEndOpacity = 1;
  _key = 'dissolve';

  _start = () => {
    const preOpacity = this._preTransform.opacity === undefined ? 1 : this._preTransform.opacity;
    const nextOpacity = this._nextTransform.opacity === undefined ? 1 : this._nextTransform.opacity;
    this._nextEndOpacity = nextOpacity;

    this._interpolators.pre = d3Interpolate.interpolate(preOpacity, 0);
    this._interpolators.next = d3Interpolate.interpolate(0, nextOpacity);
    let type = this._attrs.curve;
    type = `${type[0].toUpperCase()}${type.substr(1)}`;
    this._timeFunction = d3Ease[`ease${type}`];
  };

  _next = duration => {
    const step = duration / this._attrs.duration;
    const overHalf = duration > this._attrs.duration / 2;
    const preStep = !overHalf ? 0 : 2 * step - 1;
    const nextStep = overHalf ? 1 : step * 2;
    this._preTransform.opacity = this._interpolators.pre(preStep);
    this._nextTransform.opacity = this._interpolators.next(nextStep);
  };

  _end = () => {
    this._preTransform.opacity = 0;
    this._nextTransform.opacity = this._nextEndOpacity;
  };
}

// todo: a param to use with dissolve
export class MoveTransition extends TransitionBase {
  _reqParams = [
    'duration',
    'direction',
    'curve'
  ];
  _interpolator = null;
  _timeFunction = null;
  _preStart = 0;
  _nextStart = 0;
  _endDiff = 0;
  _diffKey = 'left';
  _key = 'move';

  _start = () => {
    let diff = 0;
    if (this._attrs.direction === 'left') {
      this._preStart = this._preTransform.left;
      this._nextStart = this._preTransform.left + this._preTransform.width;
      this._diffKey = 'left';
      this._nextTransform.left = this._nextStart;
      diff = -this._preTransform.width;
    } else if (this._attrs.direction === 'right') {
      this._preStart = this._preTransform.left;
      this._nextStart = this._preTransform.left - this._nextStart.width;
      this._diffKey = 'left';
      this._nextTransform.left = this._nextStart;
      diff = this._preTransform.width;
    } else if (this._attrs.direction === 'top') {
      this._preStart = this._preTransform.top;
      this._nextStart = this._preTransform.top + this._preTransform.height;
      this._diffKey = 'top';
      this._nextTransform.top = this._nextStart;
      diff = -this._preTransform.height;
    } else if (this._attrs.direction === 'bottom') {
      this._preStart = this._preTransform.top;
      this._nextStart = this._preTransform.top - this._nextTransform.width;
      this._diffKey = 'top';
      diff = this._preTransform.height;
      this._nextTransform.top = this._nextStart;
    } else {
      throw new NoKeyError("Transition move's direction", this._attrs.direction);
    }
    this._endDiff = diff;

    this._interpolator = d3Interpolate.interpolate(0, diff);
    let type = this._attrs.curve;
    type = `${type[0].toUpperCase()}${type.substr(1)}`;
    this._timeFunction = d3Ease[`ease${type}`];
  };

  _next = duration => {
    const step = duration / this._attrs.duration;
    const diff = this._interpolator(step);
    this._preTransform[this._diffKey] = this._preStart + diff;
    this._nextTransform[this._diffKey] = this._nextStart + diff;
  };

  _end = () => {
    this._preTransform[this._diffKey] = this._preStart + this._endDiff;
    this._nextTransform[this._diffKey] = this._nextStart + this._endDiff;
  };
}

// todo: a param to use with dissolve
export class CoverTransition extends MoveTransition {
  _key = 'cover';

  _next = duration => {
    const step = duration / this._attrs.duration;
    const diff = this._interpolator(step);
    this._nextTransform[this._diffKey] = this._nextStart + diff;
  };

  _end = () => {
    this._nextTransform[this._diffKey] = this._nextStart + this._endDiff;
  };
}
