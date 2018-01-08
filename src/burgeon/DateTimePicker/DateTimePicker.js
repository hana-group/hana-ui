/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/2/6
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import DatePicker from '../../seeds/DatePicker';
import TimePicker from '../../seeds/TimePicker';
import Icon from '../../seeds/Icon';

import {
  arrayWith7Strings, arrayWith12Strings, dateOrStringOrNull,
  dateToString, timeToString,
  nop
} from './utils';

export default class DateTimePicker extends Component {
  static propTypes = {
    /**
     * @en
     * The value will set to date, if it is not provided, this component will work in auto mode.
     *
     * @cn
     * 日期值，如果未提供，此组件将会运行在自动模式。
     */
    value: dateOrStringOrNull,
    /**
     * @en
     * A callback called when date is selected successful.
     *
     * (date: Date, text: string) => void
     *
     * @cn
     * 日期被选中时将会被调用的回调函数。
     *
     * (date: Date, text: string) => void
     */
    onChange: PropTypes.func,
    /**
     * @en
     * A callback called when user canceled the selection.
     *
     * () => void
     *
     * @cn
     * 选择框被关闭时将会被调用的回调函数。
     *
     * () => void
     */
    onCancel: PropTypes.func,
    /**
     * @en
     * Your current language.
     *
     * @cn
     * 期望使用的语言。
     */
    lang: PropTypes.oneOf(['en', 'cn', 'jp']),
    /**
     * @en
     * Custom props will be set to view DOM of DatePicker.
     *
     * @cn
     * 此属性将会作为`props`被传递给DatePicker的`Text`组件。
     */
    dateViewProps: PropTypes.object,
    /**
     * @en
     * Custom props will be set to view DOM of TimePicker.
     *
     * @cn
     * 此属性将会作为`props`被传递给TimePicker的`Text`组件。
     */
    timeViewProps: PropTypes.object,
    /**
     * @en
     * A property to control whether the dialog of DatePicker will be visible.
     *
     * @cn
     * 直接控制DatePicker的选择框是否显示。
     */
    dateShow: PropTypes.bool,
    /**
     * @en
     * A property to control whether the dialog of TimePicker will be visible.
     *
     * @cn
     * 直接控制TimePicker的选择框是否显示。
     */
    timeShow: PropTypes.bool,
    /**
     * @en
     * If this property is true, dialog will be closed automatically after date selected.
     *
     * @cn
     * 是否在选择日期后，直接关闭选择框。
     */
    autoOk: PropTypes.bool,
    /**
     * @en
     * If this property is true, a button for clearing will be added.
     *
     * @cn
     * 是否要添加清空功能。
     */
    withClear: PropTypes.bool,
    /**
     * @en
     * A function for formatting date to string, this string will be passed to `onChange` as the second argument.
     *
     *  (date: Date) => string
     *
     * @cn
     * 一个用于格式化日期到字符串的自定义方法，将会影响到所有和该组件输出`text`相关的属性。
     *
     *  (date: Date) => string
     */
    dateFormat: PropTypes.func,
    /**
     * @en
     * A function for formatting time to string, this string will be passed to `onChange` as the second argument.
     *
     *  (time: Date) => string
     *
     * @cn
     * 一个用于格式化时间到字符串的自定义方法，将会影响到所有和该组件输出`text`相关的属性。
     *
     *  (time: Date) => string
     */
    timeFormat: PropTypes.func,
    /**
     * @en
     * ClassName will be set to root element.
     *
     * @cn
     * 根元素的class。
     */
    className: PropTypes.string,
    /**
     * @en
     * ClassName will be set to root element of DatePicker.
     *
     * @cn
     * DatePicker的class。
     */
    dateClassName: PropTypes.string,
    /**
     * @en
     * ClassName will be set to root element of TimePicker.
     *
     * @cn
     * TimePicker的class。
     */
    timeClassName: PropTypes.string,
    /**
     * @en
     * ClassName will be set to dialog of DatePicker.
     *
     * @cn
     * DatePicker的选择框的class。
     */
    dateDialogClassName: PropTypes.string,
    /**
     * @en
     * ClassName will be set to dialog of TimePicker.
     *
     * @cn
     * TimePicker的选择框的class。
     */
    timeDialogClassName: PropTypes.string,
    /**
     * @en
     * Style will be set to root element.
     *
     * @cn
     * 根元素的样式。
     */
    style: PropTypes.object,
    /**
     * @en
     * Style will be set to root element of DatePicker.
     *
     * @cn
     * DatePicker的样式。
     */
    dateStyle: PropTypes.object,
    /**
     * @en
     * Style will be set to root element of TimePicker.
     *
     * @cn
     * TimePicker的样式。
     */
    timeStyle: PropTypes.object,
    /**
     * @en
     * Style will be set to dialog of DatePicker.
     *
     * @cn
     * DatePicker的选择框的样式。
     */
    dateDialogStyle: PropTypes.object,
    /**
     * @en
     * Style will be set to dialog of TimePicker.
     *
     * @cn
     * TimePicker的选择框的样式。
     */
    timeDialogStyle: PropTypes.object,
    /**
     * @en
     * Custom names of weekdays.
     *
     * @cn
     * 用户自定义的周一~周日的名称。
     */
    weekdayNames: arrayWith7Strings,
    /**
     * @en
     * Custom short names of weekdays.
     *
     * @cn
     * 用户自定义的周一~周日的短名称。
     */
    weekdayShortNames: arrayWith7Strings,
    /**
     * @en
     * Custom short names of months.
     *
     * @cn
     * 用户自定义的每个月的名称。
     */
    monthNames: arrayWith12Strings,
    /**
     * @en
     * Custom short names of action buttons.
     *
     * @cn
     * 用户自定义的选择框操作按钮的名称。
     */
    actionNames: PropTypes.shape({
      ok: PropTypes.string,
      cancel: PropTypes.string
    }),
    /**
     * @en
     * The start year.
     *
     * @cn
     * 可选范围的起始年份。
     */
    yearStart: PropTypes.number,
    /**
     * @en
     * The end year.
     *
     * @cn
     * 可选范围的结束年份。
     */
    yearEnd: PropTypes.number
  };

  static defaultProps = {
    onChange: nop,
    onCancel: nop,
    lang: 'en',
    dateViewProps: {},
    timeViewProps: {},
    autoOk: false,
    withClear: false,
    dateFormat: date => dateToString(date),
    timeFormat: date => timeToString(date),
    style: {},
    dateStyle: {},
    timeStyle: {},
    dateDialogStyle: {},
    timeDialogStyle: {},
    yearStart: 1917,
    yearEnd: 2200
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value ? new Date(props.value) : null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== undefined) {
      this.setState({value: nextProps.value});
    }
  }

  format = value => {
    const {
      dateFormat,
      timeFormat
    } = this.props;

    return `${dateFormat(value)} ${timeFormat(value)}`;
  };

  setDate(d) {
    const {
      onChange
    } = this.props;

    const {
      value
    } = this.state;

    if (d === null) {
      onChange(null, '');
      return;
    }

    const date = new Date(value || '1970-01-01 00:00:00');
    date.setYear(d.getFullYear());
    date.setMonth(d.getMonth());
    date.setDate(d.getDate());
    onChange(date, this.format(date));
    this.setState({value: date});
  }

  setTime(time) {
    const {
      onChange
    } = this.props;

    const {
      value
    } = this.state;

    if (time === null) {
      onChange(null, '');
      return;
    }

    const date = new Date(value || '1970-01-01 00:00:00');
    date.setHours(time.getHours());
    date.setMinutes(time.getMinutes());
    date.setSeconds(time.getSeconds());
    onChange(date, this.format(date));
    this.setState({value: date});
  }

  render() {
    const {
      lang,
      onCancel,
      withClear,
      dateViewProps,
      timeViewProps,
      dateShow,
      timeShow,
      autoOk,
      dateFormat,
      timeFormat,
      className,
      dateClassName,
      timeClassName,
      dateDialogClassName,
      timeDialogClassName,
      style,
      dateStyle,
      timeStyle,
      dateDialogStyle,
      timeDialogStyle,
      weekdayNames,
      weekdayShortNames,
      monthNames,
      actionNames,
      yearStart,
      yearEnd
    } = this.props;

    const {
      value
    } = this.state;

    return (
      <div
        className={cx(
          'hana-date-time-picker',
          className
        )}
        style={style}
      >
        <DatePicker
          date={value}
          lang={lang}
          onChange={::this.setDate}
          onCancel={onCancel}
          show={dateShow}
          withClear={withClear}
          autoOk={autoOk}
          format={dateFormat}
          className={dateClassName}
          dialogClassName={dateDialogClassName}
          style={dateStyle}
          dialogStyle={dateDialogStyle}
          weekdayNames={weekdayNames}
          weekdayShortNames={weekdayShortNames}
          monthNames={monthNames}
          actionNames={actionNames}
          yearStart={yearStart}
          yearEnd={yearEnd}
          viewProps={Object.assign({icon: <Icon type={'date'} />}, dateViewProps)}
        />
        <TimePicker
          time={value}
          lang={lang}
          onChange={::this.setTime}
          onCancel={onCancel}
          show={timeShow}
          withClear={withClear}
          format={timeFormat}
          className={timeClassName}
          dialogClassName={timeDialogClassName}
          style={timeStyle}
          dialogStyle={timeDialogStyle}
          actionNames={actionNames}
          viewProps={Object.assign({icon: <Icon type={'time'} />}, timeViewProps)}
        />
      </div>
    );
  }

}
