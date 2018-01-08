/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 17/1/18
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
    /** Callback for date changing. */
    handleChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleCloseOutside, true);
  }

  componentWillUnmount() {
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

  handleSwitchOpen = () => {
    const {open} = this.state;

    this.setState({open: !open});
  };

  render() {
    const {values, labels, current} = this.props;

    const {open} = this.state;

    return (
      <div className={cx('hana-date-picker-select')}>
        <TransitionGroup>
          {open && (
            <CSSTransition
              classNames="hana-date-picker-select-open"
              className={cx('hana-date-picker-select-container', 'hana-date-picker-select-open')}
              timeout={{enter: enterTime, exit: leaveTime}}
            >
              <div>{values.map((value, index) => this.renderOption(index, value, labels[index]))}</div>
            </CSSTransition>
          )}
        </TransitionGroup>
        {!open && (
          <div className={cx('hana-date-picker-select-container', 'hana-date-picker-select-close')}>
            {
              <div className={cx('hana-date-picker-select-option')} onClick={() => this.handleSwitchOpen()}>
                {labels[values.indexOf(current)]}
              </div>
            }
          </div>
        )}
      </div>
    );
  }

  renderOption(index, value, label) {
    return (
      <div key={index} className={cx('hana-date-picker-select-option')} onClick={() => this.handleSelect(value)}>
        {label}
      </div>
    );
  }
}
