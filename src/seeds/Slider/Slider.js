import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Icon from '../Icon';
import getRestProps from '../../utils/getRestProps';

const noop = () => {};

export default class Slider extends Component {
  static propTypes = {

    /**
     * @en
     * the default value of the slider
     *
     * @cn
     * 滑动条的默认值
     */
    defaultValue: PropTypes.number,

    /**
     * @en
     * the value of the slider
     *
     * @cn
     * 滑动条的值
     */
    value: PropTypes.number,

    /**
     * @en
     * the slider's color
     *
     * @cn
     * 滑动条的颜色
     */
    color: PropTypes.string,

    /**
     * @en
     * the change event of the slider
     *
     * @cn
     * 滑动条值改变时的回调函数
     */
    onChange: PropTypes.func,

    /**
     * @en
     * the dragStart event of the slider
     *
     * @cn
     * 滑动条被开始拖动时的回调函数
     */
    onDragStart: PropTypes.func,

    /**
     * @en
     * the dragEnd event of the slider
     *
     * @cn
     * 滑动条拖动完成时的回调函数
     */
    onDragEnd: PropTypes.func,

    /**
     * @en
     * the slider's custom icon
     *
     * @cn
     * 滑动条的自定义icon
     */
    icon: PropTypes.node,

    /**
     * @en
     * the min value of the slider
     *
     * @cn
     * 滑动条的最小值
     */
    min: PropTypes.number,

    /**
     * @en
     * the max value of the slider
     *
     * @cn
     * 滑动条的最大值
     */
    max: PropTypes.number,

    /**
     * @en
     * show value text or not
     *
     * @cn
     * 是否要显示值。
     */
    showValue: PropTypes.bool,

    /**
     * @en
     * the classname of the slider
     *
     * @cn
     * 滑动条的`class`
     */
    className: PropTypes.string,

    /**
     * @en
     * the size of the slider
     *
     * @cn
     * 滑动条的尺寸
     */
    size: PropTypes.oneOf(['small', 'middle', 'large'])
  }

  static defaultProps = {
    min: 0,
    max: 100,
    onChange: noop,
    onDragStart: noop,
    onDragEnd: noop,
    showValue: true,
    icon: <Icon type={'himawari'} />,
    size: 'middle'
  }

  state = {
    value: this.props.defaultValue || this.props.value || this.props.min
  }

  constructor(props) {
    super(props);
    this.isDragging = false;
    this.refSlider = null;
    this.refInner = null;
  }

  componentDidMount() {
    this.inner = this.refInner;
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('mouseleave', this.handleMouseUp);
    document.addEventListener('touchmove', this.handleMouseMove, {passive: false});
    document.addEventListener('touchend', this.handleMouseUp, {passive: false});
    document.addEventListener('touchcancel', this.handleMouseUp, {passive: false});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== undefined) this.setState({value: nextProps.value});
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('mouseleave', this.handleMouseUp);
    document.removeEventListener('touchmove', this.handleMouseMove, {passive: false});
    document.removeEventListener('touchend', this.handleMouseUp, {passive: false});
    document.removeEventListener('touchcancel', this.handleMouseUp, {passive: false});
  }

  getWidth = value => {
    const {min, max} = this.props;
    if (value > max) return '100%';
    else if (value < min) return '0%';
    return `${(value - min) * 100 / (max - min)}%`;
  }

  dragStart = e => {
    if (e.touches) {
      e = e.touches[0];
    }
    this.isDragging = true;
    this.dragPosition = this.inner.getBoundingClientRect().right;
    this.currentValue = this.state.value;
    this.props.onDragStart(e);
  }

  handleMouseMove = e => {
    if (this.isDragging) {
      if (e.touches) {
        e.preventDefault();
        e = e.touches[0];
      }
      const {min, max} = this.props;
      const delta = e.clientX - this.dragPosition;

      let value = Math.round(this.currentValue + delta * (max - min) / this.refSlider.clientWidth);
      if (value > max) value = max;
      if (value < min) value = min;
      this.setState({
        value
      });
      this.props.onChange(value);
    }
  }

  handleMouseUp = e => {
    if (this.isDragging) {
      if (e.touches) {
        e.preventDefault();
        e = e.touches[0];
      }
      this.isDragging = false;
      this.props.onDragEnd(e);
    }
  }

  handleClick = e => {
    const {min, max} = this.props;
    const {left: startPosition, width} = this.refSlider.getBoundingClientRect();
    const delta = e.clientX - startPosition;
    const value = Math.round((delta / width) * (max - min) + min);
    this.setState({
      value
    });
    this.props.onChange(value);
  }

  render() {
    const {color, className, icon, size, showValue} = this.props;
    const {value} = this.state;
    const cls = cx('hana-slider', `hana-slider-${size}`, className);
    const computedWidth = this.getWidth(value);
    const restProps = getRestProps(Slider, this.props);
    return (
      <div
        className={cls}
        {...restProps}
        ref={ref => { this.refSlider = ref; }}
        onClick={this.handleClick}
      >
        <div
          className="hana-slider-inner"
          style={{width: computedWidth, backgroundColor: color}}
          ref={ref => { this.refInner = ref; }}
        >
          {showValue && <p className="hana-slider-value">{value}</p>}
          {icon ?
            <div
              className="hana-slider-icon-wrap"
              onMouseDown={this.dragStart}
              onTouchStart={this.dragStart}
            >
              {icon}
            </div>
            :
            <i
              className="hana-slider-button"
              onMouseDown={this.dragStart}
              onTouchStart={this.dragStart}
            />
          }
        </div>
      </div>
    );
  }
}
