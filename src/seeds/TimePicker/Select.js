/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 17/1/23
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import cx from 'classnames';

import {enterTime, leaveTime} from './utils';

const stringOrNumber = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

export default class Select extends Component {
  static propTypes = {
    /** Options' values. */
    values: PropTypes.arrayOf(stringOrNumber),
    /** Options' labels. */
    labels: PropTypes.arrayOf(stringOrNumber),
    /** Current option's value. */
    current: stringOrNumber,
    /** Callback for time changing. */
    handleChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.preValue = props.current;
  }

  componentDidMount() {
    document.addEventListener('click', this.handleCloseOutside, true);
  }

  compoentWillUnmount() {
    document.removeEventListener('click', this.handleCloseOutside, true);
  }

  handleCloseOutside = e => {
    const {open} = this.state;

    if (!open) {
      return;
    }
    const domNode = ReactDOM.findDOMNode(this);
    if (!domNode || !domNode.contains(e.target)) {
      this.setState({open: false});
    }
  };

  handleSelect = value => {
    const {handleChange} = this.props;

    handleChange(value);
    this.setState({open: false});
  };

  handleSelectPre = () => {
    const {handleChange, current} = this.props;

    handleChange(current - 1);
    this.setState({open: false});
  };

  handleSelectNext = () => {
    const {handleChange, current} = this.props;

    handleChange(current + 1);
    this.setState({open: false});
  };

  handleSwitchOpen = () => {
    const {open} = this.state;

    this.setState({open: !open});
  };

  render() {
    const {values, labels, current} = this.props;

    const {open} = this.state;

    let toPre;
    if (this.preValue === values[0] && current === values[values.length - 1]) {
      toPre = true;
    } else if (current === values[0] && this.preValue === values[values.length - 1]) {
      toPre = false;
    } else {
      toPre = this.preValue > current;
    }

    this.preValue = current;

    return (
      <div className={cx('hana-time-picker-select')}>
        <div className={cx('hana-time-picker-select-icon', 'hana-time-picker-select-pre')}>
          <i className={cx('hana-time-picker-select-pre-icon')} onClick={this.handleSelectPre} />
        </div>
        <TransitionGroup>
          <CSSTransition
            timeout={{enter: enterTime, exit: leaveTime}}
            classNames={`hana-time-picker-select-close-${toPre ? 'pre' : 'next'}`}
            key={current}
            className={cx('hana-time-picker-select-content', 'hana-time-picker-select-close')}
          >
            {
              <div className={cx('hana-time-picker-select-option')} onClick={() => this.handleSwitchOpen()}>
                {labels[values.indexOf(current)]}
              </div>
            }
          </CSSTransition>
        </TransitionGroup>
        <TransitionGroup>
          {open && (
            <CSSTransition
              timeout={{enter: enterTime, exit: leaveTime}}
              classNames="hana-time-picker-select-open"
              className={cx('hana-time-picker-select-content', 'hana-time-picker-select-open')}
            >
              {values.map((value, index) => this.renderOption(index, value, labels[index]))}
            </CSSTransition>
          )}
        </TransitionGroup>
        <div className={cx('hana-time-picker-select-icon', 'hana-time-picker-select-next')}>
          <i className={cx('hana-time-picker-select-next-icon')} onClick={this.handleSelectNext} />
        </div>
      </div>
    );
  }

  renderOption(index, value, label) {
    return (
      <div key={index} className={cx('hana-time-picker-select-option')} onClick={() => this.handleSelect(value)}>
        {label}
      </div>
    );
  }
}
