/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 17/1/15
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

import {dateOrStringOrNull, enterTime, leaveTime} from './utils';

import Select from './Select';

export default class YearMonth extends Component {
  static propTypes = {
    /** Current date. */
    date: dateOrStringOrNull,
    /** If the next date if before the previous one. */
    toPre: PropTypes.bool,
    /** Callback for date changing. */
    handleChange: PropTypes.func.isRequired,
    /** The start year.  */
    yearStart: PropTypes.number.isRequired,
    /** The end year.  */
    yearEnd: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    const {yearStart, yearEnd} = props;

    const length = yearEnd - yearStart + 1;
    this.years = new Array(length);
    for (let i = 0; i < length; i++) {
      this.years[i] = i + yearStart;
    }
    this.months = new Array(12);
    this.monthsLabels = new Array(12);
    for (let i = 0; i < 12; i++) {
      this.months[i] = i;
      this.monthsLabels[i] = `${i < 9 ? '0' : ''}${i + 1}`;
    }
  }

  changeDate = (method, value) => {
    const {date: oldDate, handleChange} = this.props;

    const date = new Date(oldDate.getTime());
    date.setDate(1);
    date[method](value);
    handleChange(date);
  };

  handleChangeMonth = value => {
    this.changeDate('setMonth', value);
  };

  handleChangeYear = value => {
    this.changeDate('setYear', value);
  };

  handleChangeToPre = (year, month) => {
    this.changeDate('setMonth', month - 1);
  };

  handleChangeToNext = (year, month) => {
    this.changeDate('setMonth', month + 1);
  };

  render() {
    const {
      date, toPre, yearStart, yearEnd
    } = this.props;

    const year = date.getFullYear();
    const month = date.getMonth();

    const preDisabled = year === yearStart && month === 0;
    const nextDisabled = year === yearEnd && month === 11;

    return (
      <div className={cx('hana-date-picker-year-month')}>
        <i
          className={cx('hana-date-picker-year-month-pre', preDisabled && 'hana-date-picker-year-month-disabled')}
          onClick={preDisabled ? () => {} : () => this.handleChangeToPre(year, month)}
        />
        <div className={cx('hana-date-picker-year-month-select')}>
          <TransitionGroup>
            <CSSTransition
              classNames={`hana-date-picker-year-month-select-${toPre ? 'pre' : 'next'}`}
              key={`${year}-${month}`}
              className={cx('hana-date-picker-year-month-select-container')}
              timeout={{enter: enterTime, exit: leaveTime}}
            >
              <div>
                <div className={cx('hana-date-picker-year-month-year')}>
                  <Select
                    values={this.years}
                    labels={this.years}
                    current={year}
                    handleChange={this.handleChangeYear}
                  />
                </div>
                <span className={cx('hana-date-picker-year-month-v-line')} />
                <div className={cx('hana-date-picker-year-month-month')}>
                  <Select
                    values={this.months}
                    labels={this.monthsLabels}
                    current={month}
                    handleChange={this.handleChangeMonth}
                  />
                </div>
              </div>
            </CSSTransition>
          </TransitionGroup>
        </div>
        <i
          className={cx(
            'hana-date-picker-year-month-next',
            nextDisabled && 'hana-date-picker-year-month-disabled'
          )}
          onClick={nextDisabled ? () => {} : () => this.handleChangeToNext(year, month)}
        />
      </div>
    );
  }
}
