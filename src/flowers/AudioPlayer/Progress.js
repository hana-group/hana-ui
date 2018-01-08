import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';
import cx from 'classnames';

export default class Progress extends Component {
  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    value: PropTypes.number,
    vertical: PropTypes.bool,
    buffer: PropTypes.number,
    onChange: PropTypes.func
  }

  static defaultProps = {
    min: 0,
    value: 0,
    vertical: false
  }

  constructor(props) {
    super(props);
    this.changing = false;
    this.state = {
      value: props.value
    };
  }

  componentDidMount = () => {
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  componentWillReceiveProps = props => {
    if (!this.changing) {
      this.setState({value: props.value});
    }
  }

  handleMouseMove = e => {
    const {
      onChange,
      max,
      min
    } = this.props;

    if (this.changing) {
      const delta = e.pageX - this.dragPosition;

      let value = Math.round(this.startCurrent + delta / this.width * (max - min));

      if (value > max) {
        value = max;
      }
      if (value < min) {
        value = min;
      }
      this.setState({value});
    }
  }

  handleMouseUp = () => {
    const {
      onChange
    } = this.props;

    if (this.changing) {
      this.changing = false;
      onChange(this.state.value);
    }
  }

  handleDragStart = () => {
    const {
      value
    } = this.state;

    this.changing = true;
    this.startCurrent = value;
    this.dragPosition = findDOMNode(this.refs.inner).getBoundingClientRect().right;
    this.width = findDOMNode(this.refs.container).clientWidth;
  }

  handleClickBar = e => {
    const {
      onChange, max, min
    } = this.props;

    if (this.changing) {
      return;
    }

    const value = e.pageX - findDOMNode(this.refs.inner).getBoundingClientRect().left;
    this.width = findDOMNode(this.refs.container).clientWidth;

    const jumpedValue = (value / this.width * (max - min));
    // this.setState({current});
    onChange(jumpedValue);
  }

  render() {
    const {vertical, buffer, max, min} = this.props;
    const {value} = this.state;
    const cls = cx('hana-audio-progress', {
      'hana-audio-progress-vertical': vertical
    });
    const activeStyle = {
      width: max === 0 ? '0%' : `${value * 100 / (max - min)}%`,
      height: '100%'
    };
    return (
      <div className={cls} ref='container' onClick={this.handleClickBar}>
        <div className='hana-audio-progress-active' style={activeStyle} ref='inner'>
          <i className='hana-audio-progress-cube' onMouseDown={this.handleDragStart} />
        </div>
        {buffer && <div className='hana-audio-progress-buffer'></div>}
      </div>
    );
  }
}
