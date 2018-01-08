/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/6/3
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';
import cx from 'classnames';

export default class Progress extends Component {
  static propTypes = {
    theme: PropTypes.string,
    className: PropTypes.string,
    current: PropTypes.number,
    buffered: PropTypes.number,
    onChange: PropTypes.func,
    realTimeChange: PropTypes.bool
  };

  static defaultProps = {
    current: 0,
    buffered: 0,
    realTimeChange: false
  };

  constructor(props) {
    super(props);
    this.state = {current: props.current};
    this.startCurrent = props.current;
    this.changing = false;
  }

  componentDidMount = () => {
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  componentWillReceiveProps = props => {
    const {
      realTimeChange
    } = this.props;

    if (!this.changing || realTimeChange) {
      this.setState({current: props.current});
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseMove = e => {
    const {
      onChange,
      realTimeChange
    } = this.props;

    if (this.changing) {
      const delta = e.pageX - this.dragPosition;

      let value = Math.round(this.startCurrent + delta * 100 / this.width);
      if (value > 100) {
        value = 100;
      }
      if (value < 0) {
        value = 0;
      }
      if (realTimeChange) {
        onChange(value);
      } else {
        this.setState({current: value});
      }
    }
  }

  handleMouseUp = () => {
    const {
      onChange
    } = this.props;

    if (this.changing) {
      this.changing = false;
      onChange(this.state.current);
    }
  }

  handleDragStart = () => {
    const {
      current
    } = this.state;

    this.changing = true;
    this.startCurrent = current;
    this.dragPosition = findDOMNode(this.refs.inner).getBoundingClientRect().right;
    this.width = findDOMNode(this.refs.container).clientWidth;
  }

  handleClickBar = e => {
    const {
      onChange
    } = this.props;

    if (this.changing) {
      return;
    }

    const value = e.pageX - findDOMNode(this.refs.inner).getBoundingClientRect().left;
    this.width = findDOMNode(this.refs.container).clientWidth;
    const current = (value / this.width * 100);
    this.setState({current});
    onChange(current, this.handleDragStart);
  }

  render() {
    const {
      className,
      buffered
    } = this.props;

    const {
      current
    } = this.state;

    return (
      <div
        ref={'container'}
        className={cx(
          'hana-video-player-progress',
          this.changing && 'hana-video-player-progress-changing',
          className
        )}
        onMouseDown={this.handleClickBar}
      >
        <div
          style={{width: `${buffered}%`}}
          className={cx('hana-video-player-progress-bf')}
        />
        <div
          ref={'inner'}
          style={{width: `${current}%`}}
          className={cx('hana-video-player-progress-bar')}
        />
        <i
          className={cx('hana-video-player-progress-current')}
          style={{left: `${current}%`}}
          onMouseDown={this.handleDragStart}
        />
      </div>
    );
  }
}
