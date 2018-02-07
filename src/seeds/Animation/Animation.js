import {Component} from 'react';
import PropTypes from 'prop-types';
import {interpolate} from 'd3-interpolate';
import * as ease from 'd3-ease';
import isEqual from 'lodash/isEqual';

const noop = () => {};

export default class Animation extends Component {
  static propTypes = {
    /**
     * @en
     * children
     *
     * @cn
     * 子节点
     */
    children: PropTypes.func,

    /**
     * @en
     * animation's duration
     *
     * @cn
     * 动画持续时间
     */
    duration: PropTypes.number,

    /**
     * @en
     * the animation
     *
     * @cn
     * 动画内容
     */
    animation: PropTypes.any,

    /**
     * @en
     * the callback when the animation start
     *
     * @cn
     * 动画开始时的回调函数
     */
    onStart: PropTypes.func,

    /**
     * @en
     * the callback when the animation end
     *
     * @cn
     * 动画结束时的回调函数
     */
    onEnd: PropTypes.func,

    /**
     * @en
     * ease func, [see more](https://github.com/d3/d3-ease)
     *
     * @cn
     * 缓动函数, [查看更多](https://github.com/d3/d3-ease)
     */
    easing: PropTypes.oneOf([
      'easeCubicInOut',
      'easeLinear',
      'easePolyInOut',
      'easeQuadInOut',
      'easeSinInOut',
      'easeExpInOut',
      'easeCircleInOut'
    ])
  }

  static defaultProps = {
    duration: 1000,
    onStart: noop,
    onEnd: noop,
    easing: 'easeCubicInOut'
  }

  state = {
    value: this.props.animation
  }

  constructor (props) {
    super(props);
    this.hasPerformance = 'performance' in window;
  }

  componentWillReceiveProps(nextProps) {
    const {animation} = this.props;
    // if animation changed
    if (!isEqual(animation, nextProps.animation)) {
      // reset tween & timer
      this.tween = interpolate(this.state.value, nextProps.animation);
      this.startTimer();
    }
  }

  getCurrentTime = () => { // eslint-disable-line
    return this.hasPerformance ? performance.now() : Date.now();
  }

  update = () => {
    const releaseTime = this.getCurrentTime() - this.startTime;
    const {duration, onEnd, easing} = this.props;
    if (releaseTime > duration) {
      this.setState({
        value: this.tween(1)
      }, () => onEnd(this.state.value, this.props));
    } else {
      this.setState({
        value: this.tween(ease[easing](releaseTime / duration))
      });
      requestAnimationFrame(this.update);
    }
  }

  startTimer = () => {
    this.startTime = this.getCurrentTime();
    const {onStart} = this.props;
    onStart(this.state.value, this.props);
    this.update();
  }

  render() {
    const {children} = this.props;
    return children(this.state.value, this.props.animation);
  }
}
