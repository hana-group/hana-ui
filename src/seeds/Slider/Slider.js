import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';
import cx from 'classnames';
// import {Icon} from '../../index';

import getRestProps from '../../utils/getRestProps';


// TODO add a icon
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
     * the icon's size
     *
     * @cn
     * the icon's size
     */
    // icon: PropTypes.node,

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
     * the classname of the slider
     *
     * @cn
     * 滑动条的`class`
     */
    className: PropTypes.string
  }

  static defaultProps = {
    min: 0,
    max: 100,
    onChange: noop,
    onDragStart: noop,
    onDragEnd: noop
    // icon: <Icon type="yukibana-o" />
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

  componentWillMount() {
    document.addEventListener('mousemove', this.handleMouseMove, false);
    document.addEventListener('mouseup', this.handleMouseUp, false);
  }

  componentDidMount() {
    this.width = findDOMNode(this.refSlider).clientWidth;
    this.inner = findDOMNode(this.refInner);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== undefined) this.setState({value: nextProps.value});
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove, false);
    document.removeEventListener('mouseup', this.handleMouseUp, false);
  }

  getWidth = value => {
    const {min, max} = this.props;
    if (value > max) return '100%';
    else if (value < min) return '0%';
    return `${(value - min) * 100 / (max - min)}%`;
  }

  dragStart = e => {
    this.isDragging = true;
    this.dragPosition = this.inner.getBoundingClientRect().right;
    this.currentValue = this.state.value;
    this.props.onDragStart(e);
  }

  handleMouseMove = e => {
    if (this.isDragging) {
      const {min, max} = this.props;
      const delta = e.pageX - this.dragPosition;

      // TODO improve....
      let value = Math.round(this.currentValue + delta * (max - min) / this.width);
      if (value > max) value = max;
      if (value < min) value = min;
      this.setState({
        value
      });
    }
  }

  handleMouseUp = e => {
    if (this.isDragging) {
      this.isDragging = false;
      this.props.onChange(this.state.value);
      this.props.onDragEnd(e);
    }
  }

  render() {
    const {color, className} = this.props;
    const {value} = this.state;
    const cls = cx('hana-slider', className);
    const computedWidth = this.getWidth(value);
    const restProps = getRestProps(Slider, this.props);
    return (
      <div className={cls} {...restProps} ref={ref => { this.refSlider = ref; }}>
        <div className="hana-slider-inner" style={{width: computedWidth, backgroundColor: color}} ref={ref => { this.refInner = ref; }}>
          <p className="hana-slider-value">{value}</p>
          <i
            className="hana-slider-button"
            onMouseDown={this.dragStart}
          />
        </div>
      </div>
    );
  }
}
