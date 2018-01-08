import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {getRestProps} from '../../utils';

export default class Carousel extends Component {
  static propTypes = {
    style: PropTypes.object,
    currentIndex: PropTypes.number,
    children: PropTypes.node,
    className: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    index: PropTypes.number,
    active: PropTypes.bool,

    transitionTime: PropTypes.string
  }

  static defaultProps = {
    currentIndex: 0,
    active: false
  }

  state = {
    currentIndex: this.props.currentIndex || 0
  }

  componentDidMount() {
    // this.init();
    // this.draw();
  }

  componentWillReceiveProps (nextProps) {
    if (!this.ctx) return;
    this.draw(nextProps);
  }

  render () {
    const {children, className, width, height, style, active} = this.props;
    const cls = cx('hana-carousel-item', className, {
      'hana-carousel-item-active': active
    });
    const restProps = getRestProps(Carousel, this.props);
    const computedStyle = Object.assign({
      width,
      height
      // transitionDuration: transitionTime
    }, style);
    return (
      <li className={cls} {...restProps} style={computedStyle}>
        {children}
      </li>
    );
  }
}
