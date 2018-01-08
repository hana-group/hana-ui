/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 17/1/15
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

import {arrayWith7Strings, arrayWith12Strings, dateOrStringOrNull, enterTime, leaveTime} from './utils';

export default class Display extends Component {
  static propTypes = {
    /** Current date. */
    date: dateOrStringOrNull,
    /** If the next date if before the previous one. */
    toPre: PropTypes.bool,
    /** Names of weekdays. */
    weekdayNames: arrayWith7Strings,
    /** Names of months. */
    monthNames: arrayWith12Strings
  };

  render() {
    const {
      date, toPre, weekdayNames, monthNames
    } = this.props;

    return (
      <div className={cx('hana-date-picker-display')}>
        <TransitionGroup>
          <CSSTransition
            key={date.valueOf()}
            className={cx('hana-date-picker-display-container')}
            timeout={{enter: enterTime, exit: leaveTime}}
            classNames={`hana-date-picker-display-${toPre ? 'pre' : 'next'}`}
          >
            <div>
              <p className={cx('hana-date-picker-display-date')}>
                {`${date.getDate() < 10 ? '0' : ''}${date.getDate()}`}
              </p>
              <div className={cx('hana-date-picker-display-ymd')}>
                <p className={cx('hana-date-picker-display-day')}>{weekdayNames[date.getDay()]}</p>
                <div className={cx('hana-date-picker-display-year-month')}>
                  <p className={cx('hana-date-picker-display-month')}>{monthNames[date.getMonth()]}</p>
                  <i className={cx(`hana-date-picker-display-icon-${date.getMonth() + 1}`)} />
                  <p className={cx('hana-date-picker-display-year')}>{date.getFullYear()}</p>
                </div>
              </div>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }
}
