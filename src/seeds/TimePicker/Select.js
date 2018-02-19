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
    this.refContainer = null;
    this.refCurrent = null;
  }

  componentDidMount() {
    document.addEventListener('click', this.handleCloseOutside, true);
  }

  componentDidUpdate(preProps, preState) {
    if (!preState.open && this.refCurrent) {
      this.refContainer.scrollTop = this.refCurrent.offsetTop;
    }
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
        <i
          className={cx(
            'hana-time-picker-select-icon',
            'hana-time-picker-select-pre'
          )}
          onClick={this.handleSelectPre}
        />
        <TransitionGroup className={cx('hana-time-picker-select-container')}>
          <CSSTransition
            key={current}
            timeout={{enter: enterTime, exit: leaveTime}}
            classNames={`hana-time-picker-select-close-${toPre ? 'pre' : 'next'}`}
            className={cx('hana-time-picker-select-content', 'hana-time-picker-select-close')}
          >
            <div
              className={cx('hana-time-picker-select-option')}
              onClick={() => this.handleSwitchOpen()}
            >
              {labels[values.indexOf(current)]}
            </div>
          </CSSTransition>
          {open && (
            <CSSTransition
              timeout={{enter: enterTime, exit: leaveTime}}
              classNames="hana-time-picker-select-open"
              className={cx('hana-time-picker-select-content', 'hana-time-picker-select-open')}
            >
              <div
                ref={ref => {
                  this.refContainer = ref;
                }}
              >
                {values.map((value, index) => this.renderOption(index, value, labels[index]))}
              </div>
            </CSSTransition>
          )}
        </TransitionGroup>
        <i
          className={cx(
            'hana-time-picker-select-icon',
            'hana-time-picker-select-next'
          )}
          onClick={this.handleSelectNext}
        />
      </div>
    );
  }

  renderOption(index, value, label) {
    const {
      current
    } = this.props;

    return (
      <div
        key={index}
        className={cx(
          'hana-time-picker-select-option',
          value === current && 'hana-time-picker-select-option-current'
        )}
        onClick={() => this.handleSelect(value)}
        ref={ref => {
          if (current === value) {
            this.refCurrent = ref;
          }
        }}
      >
        {label}
      </div>
    );
  }
}
