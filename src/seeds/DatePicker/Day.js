/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 17/1/15
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

import {arrayWith7Strings, dateOrStringOrNull, generateDays, nop, enterTime, leaveTime} from './utils';

export default class Day extends Component {
  static propTypes = {
    /** Current date. */
    date: dateOrStringOrNull,
    /** If the next date if before the previous one. */
    toPre: PropTypes.bool,
    /** Callback for date changing. */
    handleChange: PropTypes.func.isRequired,
    /** Short names of weekdays. */
    weekdayShortNames: arrayWith7Strings,
    /** The start year.  */
    yearStart: PropTypes.number.isRequired,
    /** The end year.  */
    yearEnd: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      days: []
    };
  }

  componentWillMount() {
    this.refreshDays(this.props.date);
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.date.getYear() !== nextProps.date.getYear() ||
      this.props.date.getMonth() !== nextProps.date.getMonth()
    ) {
      this.refreshDays(nextProps.date);
    }
  }

  refreshDays = date => {
    this.setState({
      days: generateDays(date)
    });
  };

  handleChangeDay = value => {
    const {date: oldDate, handleChange} = this.props;

    const date = new Date(oldDate.getTime());
    date.setDate(value);
    handleChange(date);
  };

  handleChangeDayPreMonth = value => {
    const {date: oldDate, handleChange} = this.props;

    const date = new Date(oldDate.getTime());
    date.setMonth(date.getMonth() - 1);
    date.setDate(value);
    handleChange(date);
  };

  handleChangeDayNextMonth = value => {
    const {date: oldDate, handleChange} = this.props;

    const date = new Date(oldDate.getTime());
    date.setMonth(date.getMonth() + 1);
    date.setDate(value);
    handleChange(date);
  };

  render() {
    return (
      <div>
        {this.renderWeekdays()}
        {this.renderDays()}
      </div>
    );
  }

  renderWeekdays() {
    const {weekdayShortNames} = this.props;

    return (
      <div className={cx('hana-date-picker-weekdays')}>
        {weekdayShortNames.map((day, index) => (
          <span key={index} className={cx('hana-date-picker-weekday')}>
            {day}
          </span>
        ))}
      </div>
    );
  }

  renderDays() {
    const {
      date, toPre, yearStart, yearEnd
    } = this.props;

    const {days} = this.state;

    const year = date.getFullYear();
    const month = date.getMonth();

    const preDisabled = year === yearStart && month === 0;
    const nextDisabled = year === yearEnd && month === 11;

    const currentDay = date.getDate();
    const rows = [0, 1, 2, 3, 4, 5];
    const cols = [0, 1, 2, 3, 4, 5, 6];
    let dayIndex = -1;

    return (
      <div className={cx('hana-date-picker-days')}>
        <TransitionGroup>
          <CSSTransition
            key={`${year}-${month}`}
            className={cx('hana-date-picker-days-container')}
            classNames={`hana-date-picker-days-${toPre ? 'pre' : 'next'}`}
            timeout={{enter: enterTime, exit: leaveTime}}
          >
            <div>
              {rows.map(row => (
                <div key={row} className={cx('hana-date-picker-days-row')}>
                  {cols.map(col => {
                    dayIndex++;
                    const [day, mode] = days[dayIndex];
                    switch (mode) {
                      case 'pre':
                        return this.renderDay(
                          col,
                          day,
                          ['hana-date-picker-days-day-pre'],
                          preDisabled ? nop : this.handleChangeDayPreMonth
                        );
                      case 'current':
                        return day === currentDay
                          ? this.renderDay(
                              col,
                              day,
                              ['hana-date-picker-days-day-current', 'hana-date-picker-days-day-active'],
                              () => {}
                            )
                          : this.renderDay(col, day, ['hana-date-picker-days-day-current'], this.handleChangeDay);
                      case 'next':
                        return this.renderDay(
                          col,
                          day,
                          ['hana-date-picker-days-day-next'],
                          nextDisabled ? nop : this.handleChangeDayNextMonth
                        );
                      default:
                        return null;
                    }
                  })}
                </div>
              ))}
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }

  renderDay(index, day, className, handleSelect) {
    return (
      <span
        key={index}
        className={cx('hana-date-picker-days-day', className.join(' '))}
        onClick={() => handleSelect(day)}
      >
        {day}
      </span>
    );
  }
}
