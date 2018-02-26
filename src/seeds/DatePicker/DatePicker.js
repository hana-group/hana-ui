/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 17/1/15
 */
import React, {Component, cloneElement} from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import cx from 'classnames';
import {getRestProps, MissingPropertyError} from '../../utils';
import language from '../../language';
import Text from '../Text';
import Icon from '../../seeds/Icon';
import RenderToNode from '../../sprites/RenderToNode';

import {
  arrayWith7Strings, arrayWith12Strings, dateOrStringOrNull,
  normalizeDate, dateToString,
  containerWidth, containerHeight,
  nop
} from './utils';

import Container from './Container';
import Display from './Display';
import YearMonth from './YearMonth';
import Day from './Day';

export default class DatePicker extends Component {
  static propTypes = {
    /**
     * @en
     * A value will set to date, if not provided, this component will work in auto mode.
     *
     * @cn
     * 日期值，如果未提供，此组件将会运行在自动模式。
     */
    date: dateOrStringOrNull,
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
     * The mode of DOM will be placed.
     *
     * @cn
     * 放置在DOM上显示元素的类型。
     */
    view: PropTypes.oneOf(['text']),
    /**
     * @en
     * Custom props will be set to view DOM if the 'view' property is 'text'.
     *
     * @cn
     * 当`view`为`text`模式时，此属性将会作为`props`被传递给`Text`组件。
     */
    viewProps: PropTypes.object,
    /**
     * @en
     * A property to control whether the dialog will be visible.
     *
     * @cn
     * 直接控制选择框是否显示。
     */
    show: PropTypes.bool,
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
     * If this property is true, dialog will be closed automatically after date selected.
     *
     * @cn
     * 是否在选择日期后，直接关闭选择框。
     */
    autoOk: PropTypes.bool,
    /**
     * @en
     * A function for formatting date to string, this string will be passed to `onChange` as the second argument.
     *
     * (date: Date) => string
     *
     * @cn
     * 一个用于格式化日期到字符串的自定义方法，将会影响到所有和该组件输出`text`相关的属性。
     *
     * (date: Date) => string
     */
    format: PropTypes.func,
    /**
     * @en
     * ClassName will be set to root element.
     *
     * @cn
     * 根组件的class。
     */
    className: PropTypes.string,
    /**
     * @en
     * ClassName will be set to dialog.
     *
     * @cn
     * 选择框的class。
     */
    dialogClassName: PropTypes.string,
    /**
     * @en
     * Style will be set to root element.
     *
     * @cn
     * 根组件的样式。
     */
    style: PropTypes.object,
    /**
     * @en
     * Style will be set to dialog.
     *
     * @cn
     * 选择框的样式。
     */
    dialogStyle: PropTypes.object,
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
    yearEnd: PropTypes.number,
    /**
     * @en
     * Your view DOM to replace the default one defined by `view`.
     *
     * @cn
     * 默认放置在页面上的组件，用于替换`view`定义的组件。
     */
    children: PropTypes.node
  };

  static defaultProps = {
    onChange: nop,
    onCancel: nop,
    lang: 'en',
    view: 'text',
    viewProps: {},
    autoOk: false,
    withClear: false,
    format: date => dateToString(date),
    style: {},
    dialogStyle: {},
    yearStart: 1917,
    yearEnd: 2200,
    children: null
  };

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      date: normalizeDate(props.date),
      innerDate: normalizeDate(props.date) || normalizeDate(new Date())
    };
    this.position = {};
    this.preDate = this.state.date;
    this.refView = null;
    this.refCalender = null;
  }

  componentDidMount() {
    document.addEventListener('click', this.handleCloseDialog, true);
    document.addEventListener('scroll', this.handleScroll, true);
    window.addEventListener('resize', this.handleScroll, true);
    document.addEventListener('keydown', this.handlePressKey, true);
    this.position = this.positionIncubator(ReactDom.findDOMNode(this.refView));
  }

  componentWillReceiveProps(nextProps) {
    const state = {};
    const {
      date,
      show
    } = nextProps;

    if (show !== undefined) {
      state.show = show;
    }

    if (date !== undefined) {
      state.date = normalizeDate(date);
    }
    if (state.date) {
      state.innerDate = new Date(state.date);
    }
    this.setState(state);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!this.state.show && nextState.show) {
      this.position = this.positionIncubator(ReactDom.findDOMNode(this.refView));
    }
    return true;
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleCloseDialog, true);
    document.removeEventListener('scroll', this.handleScroll, true);
    window.removeEventListener('resize', this.handleScroll, true);
    document.removeEventListener('keydown', this.handlePressKey, true);
  }

  positionIncubator = node => {
    if (!node) return null;
    const rect = node.getBoundingClientRect();
    const position = {};
    if (rect.left + containerWidth >= window.innerWidth) {
      position.right = 0;
    } else {
      position.left = rect.left;
    }
    if (rect.bottom + containerHeight >= window.innerHeight) {
      position.top = rect.bottom - containerHeight;
    } else {
      position.top = rect.bottom;
    }
    return position;
  };

  addDate = (type, value) => {
    const {
      innerDate: d
    } = this.state;

    const date = new Date(d);

    switch (type) {
      case 'year':
        date.setYear(date.getFullYear() + value);
        break;
      case 'month':
        date.setMonth(date.getMonth() + value);
        break;
      case 'date':
        date.setDate(date.getDate() + value);
        break;
      default:
        break;
    }
    this.handleChangeDate(date);
  };

  handleScroll = e => {
    const {
      show
    } = this.state;

    if (!show) {
      return;
    }

    const dom = e.target;
    if (/select-container/g.test(dom.className)) {
      return;
    }

    this.position = this.positionIncubator(ReactDom.findDOMNode(this.refView));
    this.forceUpdate();
  };

  handlePressKey = e => {
    const {
      show,
      innerDate: date
    } = this.state;

    if (!show) {
      return;
    }

    e.preventDefault();

    switch (e.key) {
      case 'ArrowLeft':
        if (e.altKey && e.shiftKey) {
          this.addDate('year', -1);
        } else if (e.shiftKey) {
          this.addDate('month', -1);
        } else {
          this.addDate('date', -1);
        }
        return;
      case 'ArrowRight':
        if (e.altKey && e.shiftKey) {
          this.addDate('year', 1);
        } else if (e.shiftKey) {
          this.addDate('month', 1);
        } else {
          this.addDate('date', 1);
        }
        return;
      case 'ArrowUp':
        if (e.altKey && e.shiftKey) {
          this.addDate('year', -1);
        } else if (e.shiftKey) {
          this.addDate('month', -1);
        } else {
          this.addDate('date', -7);
        }
        return;
      case 'ArrowDown':
        if (e.altKey && e.shiftKey) {
          this.addDate('year', 1);
        } else if (e.shiftKey) {
          this.addDate('month', 1);
        } else {
          this.addDate('date', 7);
        }
        return;
      case 'Enter':
        this.handleConfirm(date);
        return;
      case 'Escape':
        this.handleCancel();
        break;
      default:
        break;
    }
  };

  handleOpenDialog = () => {
    const {
      show: outerShow
    } = this.props;

    const {
      show
    } = this.state;

    if (outerShow !== undefined) {
      return;
    }
    !show && this.setState({show: true});
  };

  handleCloseDialog = e => {
    const {
      show: outerShow
    } = this.props;

    const {
      show
    } = this.state;

    if (outerShow !== undefined) {
      return;
    }

    if (!show) {
      return;
    }

    const domNode = ReactDom.findDOMNode(this.refCalender);
    const domNodeView = ReactDom.findDOMNode(this.refView);
    if (
      (!domNode || !domNode.contains(e.target) &&
      (!domNodeView || !domNodeView.contains(e.target)))
    ) {
      this.handleCancel();
    }
  };

  getWithLang = name => {
    const {
      lang
    } = this.props;

    return this.props[name]
      ? this.props[name]
      : language[lang][name];
  };

  handleChangeDate = (d, ok = false) => {
    if (ok) {
      this.handleConfirm(d);
    } else {
      this.setState({innerDate: normalizeDate(d)});
    }
  };

  handleConfirm = d => {
    const {
      show,
      onChange,
      format,
      children,
      view
    } = this.props;

    const date = new Date(d);

    onChange(date, format(date));
    this.setState({
      date,
      innerDate: date,
      show: show === undefined ? false : show
    });
    if (!children && view === 'text') {
      this.refView.blur();
    }
  };

  handleCancel = () => {
    const {
      onCancel,
      show,
      children,
      view
    } = this.props;

    const {
      date,
      innerDate
    } = this.state;

    onCancel();
    this.setState({
      innerDate: date ? new Date(date) : innerDate,
      show: show === undefined ? false : show
    });

    if (!children && view === 'text') {
      this.refView.blur();
    }
  };

  handleClear = () => {
    const {
      show,
      onChange,
      children,
      view
    } = this.props;

    onChange(null, '');
    this.setState({
      date: null,
      show: show === undefined ? false : show
    });
    if (!children && view === 'text') {
      this.refView.blur();
    }
  };

  render() {
    const {
      style,
      className
    } = this.props;
    const otherProps = getRestProps(DatePicker, this.props);

    return (
      <div
        className={cx(
          'hana-date-picker',
          className
        )}
        style={style}
        {...otherProps}
      >
        {this.renderView()}
        {/* {this.renderWarp()} */}
        <RenderToNode>
          {this.renderCalender()}
        </RenderToNode>
      </div>
    );
  }

  renderView = () => {
    const {
      view,
      viewProps,
      format,
      children
    } = this.props;

    const {
      date,
      show
    } = this.state;

    if (view === 'none') {
      return null;
    }

    if (view === 'custom' && children === null) {
      throw new MissingPropertyError(
        'DatePicker',
        'children',
        'it must be provided while the property "view" is "custom" !'
      );
    }

    if (children) {
      return children && cloneElement(children, {
        ref: ref => {
          this.refView = ref;
        },
        onClick: e => {
          children.onClick && children.onClick(e);
          if (show) {
            this.handleCloseDialog(e);
          } else {
            this.handleOpenDialog(e);
          }
        }
      });
    }

    if (view === 'text') {
      return (
        <Text
          ref={ref => {
            this.refView = ref;
          }}
          value={date ? format(date) : ''}
          onFocus={this.handleOpenDialog}
          icon={<Icon type={'date'} />}
          {...viewProps}
        />
      );
    }

    return null;
  };

  renderWarp = () => {
    const {
      show
    } = this.state;

    return show
      ? (
        <div
          className={cx(
            'hana-date-picker-warp'
          )}
          onClick={this.handleCancel}
        />
      )
      : null;
  };

  renderCalender = () => {
    const {
      withClear,
      autoOk,
      yearStart,
      yearEnd,
      dialogStyle,
      dialogClassName
    } = this.props;

    const {
      innerDate: date,
      show
    } = this.state;

    const toPre = this.preDate > date;
    this.preDate = date;

    return (
      <Container
        ref={ref => {
          this.refCalender = ref;
        }}
        className={cx(
          dialogClassName
        )}
        style={dialogStyle}
        show={show}
        withClear={withClear}
        position={this.position}
        actionNames={this.getWithLang('actionNames')}
        handleConfirm={() => this.handleConfirm(date)}
        handleClear={this.handleClear}
        handleCancel={this.handleCancel}
      >
        <div
          className={cx(
            'hana-date-picker-content'
          )}
        >
          <Display
            date={date}
            toPre={toPre}
            weekdayNames={this.getWithLang('weekdayNames')}
            monthNames={this.getWithLang('monthNames')}
          />
          <YearMonth
            date={date}
            toPre={toPre}
            handleChange={this.handleChangeDate}
            yearStart={yearStart}
            yearEnd={yearEnd}
          />
          <Day
            date={date}
            toPre={toPre}
            handleChange={d => this.handleChangeDate(d, autoOk)}
            weekdayShortNames={this.getWithLang('weekdayShortNames')}
            yearStart={yearStart}
            yearEnd={yearEnd}
          />
        </div>
      </Container>
    );
  }
}
