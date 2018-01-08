import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Animation from '../../seeds/Animation';
import CarouselItem from './CarouselItem';
import {childrenToArray, getRestProps} from '../../utils';

export default class Carousel extends Component {
  static propTypes = {
    /**
     * @en
     * the carousel's style
     *
     * @cn
     * 旋转木马的样式
     */
    style: PropTypes.object,

    /**
     * @en
     * the carousel's currentIndex
     *
     * @cn
     * 旋转木马的当前索引
     */
    currentIndex: PropTypes.number,

    /**
     * @en
     * the carousel's children
     *
     * @cn
     * 旋转木马的子节点
     */
    children: PropTypes.node,

    /**
     * @en
     * the carousel's className
     *
     * @cn
     * 旋转木马的`class`
     */
    className: PropTypes.string,

    /**
     * @en
     * the carousel's height
     *
     * @cn
     * 旋转木马的高度
     */
    height: PropTypes.number,

    /**
     * @en
     * the carousel's width
     *
     * @cn
     * 旋转木马的宽度
     */
    width: PropTypes.number,

    /**
     * @en
     * the carousel's mode
     *
     * @cn
     * 旋转木马的模式
     */
    mode: PropTypes.oneOf(['fade', 'slide']),

    /**
     * @en
     * whether the carousel is vertical
     *
     * @cn
     * 旋转木马是否为垂直方向
     */
    vertical: PropTypes.bool,

    /**
     * @en
     * the carousel's transition time
     *
     * @cn
     * 旋转木马切换时的动画时间
     */
    transitionTime: PropTypes.number,

    /**
     * @en
     * the carousel's change event
     *
     * @cn
     * 旋转木马切换时的事件
     */
    onChange: PropTypes.func,

    /**
     * @en
     * whether autoplay
     *
     * @cn
     * 是否自动播放
     */
    autoplay: PropTypes.bool,

    /**
     * @en
     * autoplay time
     *
     * @cn
     * 自动播放间隔时间
     */
    autoplayTime: PropTypes.number
  }

  static defaultProps = {
    currentIndex: 0,
    height: 200,
    width: 400,
    mode: 'fade',
    vertical: false,
    transitionTime: 400,
    onChange: () => {},
    autoplay: false,
    autoplayTime: 3000
  }

  state = {
    currentIndex: this.props.currentIndex || 0
  }

  constructor(props) {
    super(props);
    this.isAnimating = false;
  }

  componentDidMount() {
    if (this.props.autoplay) {
      this.play = setTimeout(this.autoplay, this.autoplayTime);
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.currentIndex !== undefined) {
      this.setState({currentIndex: nextProps.currentIndex});
    }
  }

  autoplay = () => {
    const {autoplayTime} = this.props;
    this.moveNext();
    this.play = setTimeout(this.autoplay, autoplayTime);
  }

  movePrev = () => {
    const {currentIndex} = this.state;
    this.moveTo(currentIndex - 1);
  }

  moveNext = () => {
    const {currentIndex} = this.state;
    this.moveTo(currentIndex + 1);
  }

  moveTo = (index) => {
    if (this.isAnimating) return;
    const {children, onChange} = this.props;
    const {currentIndex} = this.state;
    const len = childrenToArray(children).length;
    const maxIndex = len - 1;

    let i = index;
    if (index > maxIndex) i = 0;
    else if (index < 0) i = maxIndex;

    if (currentIndex === 0 && i === maxIndex) {
      this.lo = true;
    } else {
      this.lo = false;
    }

    if (currentIndex === maxIndex && i === 0) {
      this.ro = true;
    } else {
      this.ro = false;
    }

    this.setState({
      currentIndex: i
    });
    onChange(i);
  }

  slideStart = () => {
    this.isAnimating = true;
  }

  slideEnd = () => {
    this.isAnimating = false;
  }

  calcIndex = (trans, index, arr) => {
    const length = arr.length;
    if (trans === 0 && index === 0 && this.ro) {
      return 0;
    }
    if (this.ro) {
      return length - (trans / (length - 1));
    }
    if (trans === length - 1 && index === length - 1 && this.lo) {
      return length - 1;
    }
    if (this.lo) {
      return - (trans / (length - 1));
    }
    return trans;
  }

  render () {
    const {children, className, height, width, style, mode, vertical} = this.props;
    const cls = cx('hana-carousel', `hana-carousel-${mode}`, className, {
      'hana-carousel-vertical': vertical,
      'hana-carousel-horizontal': !vertical
    });
    const restProps = getRestProps(Carousel, this.props);
    const childrenArray = childrenToArray(children);
    const computedStyle = Object.assign({height, width}, style);

    return (
      <div className={cls} {...restProps} style={computedStyle}>
        {
          mode === 'slide' ?
            this.renderSlide(childrenArray) :
            <ul className="hana-carousel-list">
              {this.renderItems(childrenArray)}
            </ul>
        }
        <i
          className="hana-carousel-option-control hana-carousel-option-prev"
          onClick={this.movePrev}
        />
        <i
          className="hana-carousel-option-control hana-carousel-option-next"
          onClick={this.moveNext}
        />
        {this.renderDots(childrenArray)}
      </div>
    );
  }

  renderSlide = (arr) => {
    const {currentIndex} = this.state;
    const {width, height, vertical} = this.props;
    const listStyle = {
      width: vertical ? false : (arr.length + 2) * width
    };
    return (
      <Animation
        animation={currentIndex}
        onStart={this.slideStart}
        onEnd={this.slideEnd}
      >
        {
          (trans) => {
            const transformIndex = this.calcIndex(trans, currentIndex, arr);
            const transformType = `translate${vertical ? 'Y' : 'X'}`;
            const transformValue = - (transformIndex + 1) * (vertical ? height : width);
            const style = Object.assign({
              WebkitTransform: `${transformType}(${transformValue}px)`,
              transform: `${transformType}(${transformValue}px)`
            }, listStyle);
            return (
              <ul className="hana-carousel-list" style={style}>
                {this.renderItems(arr)}
              </ul>
            );
          }
        }
      </Animation>
    );
  }

  renderDots = (arr) => {
    const {currentIndex} = this.state;
    const dots = arr.map(
      (item, index) => {
        const cls = cx('hana-carousel-dot', {
          'hana-carousel-dot-active': index === currentIndex
        });
        return <i className={cls} key={index} onClick={() => this.moveTo(index)}></i>;
      }
    );
    return (
      <div className="hana-carousel-dot-group">
        {dots}
      </div>
    );
  }

  renderItems = (arr) => {
    const {width, height, mode} = this.props;
    const {currentIndex} = this.state;
    const items = arr.map((item, index) => (
      <CarouselItem
        index={index}
        key={index}
        width={width}
        height={height}
        active={index === currentIndex}
      >
        {item}
      </CarouselItem>
    ));

    // infinite when slide
    if (mode === 'slide' && arr.length > 1) {
      const length = arr.length;
      items.unshift(
        <CarouselItem index={-1} key={-1} width={width} height={height}>{arr[length - 1]}</CarouselItem>
      );
      items.push(
        <CarouselItem index={length} key={length} width={width} height={height}>{arr[0]}</CarouselItem>
      );
    }
    return items;
  }
}
