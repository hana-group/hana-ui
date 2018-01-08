/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 17/1/23
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
  dateOrStringOrNull,
  timeToString, normalizeTime,
  containerWidth, containerHeight,
  nop
} from './utils';

import Select from './Select';

import Container from './Container';

export default class TimePicker extends Component {
  static propTypes = {
    /**
     * @en
     * A value will set to date, if not provided, this component will work in auto mode.
     *
     * @cn
     * 时间值，如果未提供，此组件将会运行在自动模式。
     */
    time: dateOrStringOrNull,
    /**
     * @en
     * A callback called when time is selected successful.
     *
     * (time: Time, text: string) => void
     *
     * @cn
     * 时间被选中时将会被调用的回调函数。
     *
     * (time: Time, text: string) => void
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
     * Custom props will be set to view DOM when the 'view' property is 'text'.
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
     * A function for formatting time to string, this string will be passed to `onChange` as the date argument.
     *
     *  (time: Time) => string
     *
     * @cn
     * 一个用于格式化时间到字符串的自定义方法，将会影响到所有和该组件输出`text`相关的属性。
     *
     *  (time: Time) => string
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
    format: time => timeToString(time),
    style: {},
    dialogStyle: {},
    children: null
  };

  constructor(props) {
    super(props);

    this.state = {
      show: false,
      time: normalizeTime(props.time),
      innerTime: normalizeTime(props.time) || normalizeTime(new Date())
    };
    this.position = {};

    this.initArray('hours', 24);
    this.initArray('minutes', 60);
    this.initArray('seconds', 60);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleCloseDialog, true);
    document.addEventListener('scroll', this.handleScroll, true);
    window.addEventListener('resize', this.handleScroll, true);
    document.addEventListener('keydown', this.handlePressKey, true);
    this.position = this.positionIncubator(ReactDom.findDOMNode(this.refs.view));
  }

  componentWillReceiveProps(nextProps) {
    const state = {};
    if (nextProps.show !== undefined) {
      state.show = nextProps.show;
    }
    if (nextProps.time !== undefined) {
      state.time = normalizeTime(nextProps.time);
    }
    if (state.time) {
      state.innerTime = new Date(state.time);
    }
    this.setState(state);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!this.state.show && nextState.show) {
      this.position = this.positionIncubator(ReactDom.findDOMNode(this.refs.view));
    }
    return true;
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleCloseDialog, true);
    document.removeEventListener('scroll', this.handleScroll, true);
    window.removeEventListener('resize', this.handleScroll, true);
    document.removeEventListener('keydown', this.handlePressKey, true);
  }

  initArray = (name, n) => {
    this[name] = new Array(n);
    this[`${name}Labels`] = new Array(n);
    for (let i = 0; i < n; i ++) {
      this[name][i] = i;
      this[`${name}Labels`][i] = `${i < 10 ? '0' : ''}${i}`;
    }
  };

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

  addTime = (type, value) => {
    const {
      innerTime: d
    } = this.state;

    const date = new Date(d);

    switch (type) {
      case 'hour':
        date.setHours(date.getHours() + value);
        break;
      case 'minute':
        date.setMinutes(date.getMinutes() + value);
        break;
      case 'second':
        date.setSeconds(date.getSeconds() + value);
        break;
      default:
        break;
    }
    this.handleChangeTime(date);
  };

  handleScroll = e => {
    const {
      show
    } = this.state;

    if (!show) {
      return;
    }

    const dom = e.target;
    if (/select-content/g.test(dom.className)) {
      return;
    }

    this.position = this.positionIncubator(ReactDom.findDOMNode(this.refs.view));
    this.forceUpdate();
  };

  handlePressKey = e => {
    const {
      show,
      innerTime: time
    } = this.state;

    if (!show) {
      return;
    }

    switch (e.key) {
      case 'ArrowLeft':
        if (event.altKey && event.shiftKey) {
          this.addTime('hour', -1);
        } else if (event.shiftKey) {
          this.addTime('minute', -1);
        } else {
          this.addTime('second', -1);
        }
        return;
      case 'ArrowRight':
        if (event.altKey && event.shiftKey) {
          this.addTime('hour', 1);
        } else if (event.shiftKey) {
          this.addTime('minute', 1);
        } else {
          this.addTime('second', 1);
        }
        return;
      case 'ArrowUp':
        if (event.altKey && event.shiftKey) {
          this.addTime('hour', -1);
        } else if (event.shiftKey) {
          this.addTime('minute', -10);
        } else {
          this.addTime('second', -10);
        }
        return;
      case 'ArrowDown':
        if (event.altKey && event.shiftKey) {
          this.addTime('hour', 1);
        } else if (event.shiftKey) {
          this.addTime('minute', 10);
        } else {
          this.addTime('second', 10);
        }
        return;
      case 'Enter':
        this.handleConfirm(time);
        return;
      case 'Escape':
        this.handleCancel();
        return;
      default:
        return;
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

    const domNode = ReactDom.findDOMNode(this.refs.calender);
    const domNodeView = ReactDom.findDOMNode(this.refs.view);
    if (
      (!domNode || !domNode.contains(e.target)
      && (!domNodeView || !domNodeView.contains(e.target)))
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

  changeTime = time => {
    this.setState({
      innerTime: normalizeTime(time)
    });
  };

  handleChangeTime = t => {
    this.changeTime(t);
  };

  handleChangeHour = hour => {
    const {
      innerTime
    } = this.state;
    innerTime.setHours(hour);
    this.changeTime(innerTime);
  };

  handleChangeMinute = minute => {
    const {
      innerTime
    } = this.state;
    innerTime.setMinutes(minute);
    this.changeTime(innerTime);
  };

  handleChangeSecond = date => {
    const {
      innerTime
    } = this.state;
    innerTime.setSeconds(date);
    this.changeTime(innerTime);
  };

  handleConfirm = t => {
    const {
      show,
      onChange,
      format,
      view,
      children
    } = this.props;

    const time = new Date(t);

    onChange(time, format(time));
    this.setState({
      time,
      innerTime: time,
      show: show === undefined ? false : show
    });
    if (!children && view === 'text') {
      this.refs.view.blur();
    }
  };

  handleCancel = () => {
    const {
      onCancel,
      show,
      view,
      children
    } = this.props;

    const {
      time,
      innerTime
    } = this.state;

    onCancel();
    this.setState({
      innerTime: time ? new Date(time) : innerTime,
      show: show === undefined ? false : show
    });

    if (!children && view === 'text') {
      this.refs.view.blur();
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
      time: null,
      show: show === undefined ? false : show
    });
    if (!children && view === 'text') {
      this.refs.view.blur();
    }
  };

  render() {
    const {
      style,
      className
    } = this.props;

    const {
      show
    } = this.state;
    const otherProps = getRestProps(TimePicker, this.props);

    return (
      <div
        className={cx(
          'hana-time-picker',
          className
        )}
        style={style}
        {...otherProps}
      >
        {this.renderView()}
        {this.renderCalender()}
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
      time,
      show
    } = this.state;

    if (view === 'none') {
      return null;
    }

    if (view === 'custom' && children === null) {
      throw new MissingPropertyError(
        'TimePicker',
        'children',
        'it must be provided while the property "view" is "custom" !'
      );
    }

    if (children) {
      return children && cloneElement(children, {
        ref: 'view',
        onClick: e => {
          children.onClick && children.onClick(e);
          if (show) {
            this.handleCloseDialog(event);
          } else {
            this.handleOpenDialog(event);
          }
        }
      });
    }

    if (view === 'text') {
      return (
        <Text
          ref="view"
          value={time ? format(time) : ''}
          onFocus={this.handleOpenDialog}
          icon={<Icon type={'time'} />}
          {...viewProps}
        />
      );
    }
  };

  renderWarp = () => {
    const {
      show
    } = this.state;

    return show
      ? (
      <div
        className={cx(
          'hana-time-picker-warp'
        )}
        onClick={this.handleCancel}
      >
      </div>
      )
      : null;
  };

  renderCalender = () => {
    const {
      dialogStyle,
      dialogClassName,
      withClear
    } = this.props;

    const {
      innerTime: time,
      show
    } = this.state;

    const hour = time.getHours();
    const minute = time.getMinutes();
    const date = time.getSeconds();

    return (
      <Container
        ref="calender"
        className={cx(
          dialogClassName
        )}
        style={dialogStyle}
        show={show}
        withClear={withClear}
        position={this.position}
        actionNames={this.getWithLang('actionNames')}
        handleConfirm={() => this.handleConfirm(time)}
        handleCancel={this.handleCancel}
        handleClear={this.handleClear}
      >
        <div
          className={cx(
            'hana-time-picker-content'
          )}
        >
          <div
            className={cx(
              'hana-time-picker-hour'
            )}
          >
            <Select
              values={this.hours}
              labels={this.hoursLabels}
              current={hour}
              handleChange={this.handleChangeHour}
            />
          </div>
          <p
            className="hana-time-picker-v-line"
          >
            :
          </p>
          <div
            className={cx(
              'hana-time-picker-minute'
            )}
          >
            <Select
              values={this.minutes}
              labels={this.minutesLabels}
              current={minute}
              handleChange={this.handleChangeMinute}
            />
          </div>
          <p
            className="hana-time-picker-v-line"
          >
            :
          </p>
          <div
            className={cx(
              'hana-time-picker-second'
            )}
          >
            <Select
              values={this.seconds}
              labels={this.secondsLabels}
              current={date}
              handleChange={this.handleChangeSecond}
            />
          </div>
        </div>
      </Container>
    );
  }
}
