/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 16/12/26
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';
import cx from 'classnames';
import {getRestProps} from '../../utils';
import Hint from './Hint';
import Icon from './Icon';

const valueType = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

const hintType = PropTypes.shape({
  show: PropTypes.bool,
  message: PropTypes.string,
  style: PropTypes.object,
  icon: PropTypes.node
});

const hintDefaultValue = {
  show: false,
  message: '',
  style: {},
  icon: null,
  color: null
};

export default class Text extends Component {
  static propTypes = {
    /**
     * @en
     * Working mode of this component, if true, component will manage state by itself.
     *
     * @cn
     * 是否工作在自动模式，如果是，组件将会自动管理它的状态。
     */
    auto: PropTypes.bool,
    /**
     * @en
     * Mode of input, text or password.
     *
     * @cn
     * 组件的应用场景。
     */
    mode: PropTypes.oneOf(['text', 'password']),
    /**
     * @en
     * Type of value, string, int or float.
     *
     * @cn
     * 文本类型。
     */
    type: PropTypes.oneOf(['string', 'int', 'float']),
    /**
     * @en
     * Type of view.
     *
     * @cn
     * 组件的显示类型。
     */
    view: PropTypes.oneOf(['box', 'underline']),
    /**
     * @en
     * Disable input.
     *
     * @cn
     * 禁用输入。
     */
    disabled: PropTypes.bool,
    /**
     * @en
     * Only in the auto mode, this value will be the initial value.
     *
     * @cn
     * 在自动模式下，该值将作为组件内容的初始值。
     */
    defaultValue: valueType,
    /**
     * @en
     * Only in the normal mode, component will be controlled by this value.
     *
     * @cn
     * 在普通模式下，用于控制组件内容的值。
     */
    value: valueType,
    /**
     * @en
     * Size of component.
     *
     * @cn
     * 组件显示的尺寸。
     */
    size: PropTypes.oneOf(['small', 'middle', 'large']),
    /**
     * @en
     * If the component has a icon before or after.
     *
     * @cn
     * 是否要显示图标。
     */
    withIcon: PropTypes.bool,
    /**
     * @en
     * Your custom icon to replace the default icon.
     *
     * @cn
     * 用于替代默认图标。
     */
    icon: PropTypes.node,
    /**
     * @en
     * Your default theme color.
     *
     * @cn
     * 默认的主题颜色。
     */
    color: PropTypes.string,
    /**
     * @en
     * Your default hint message.
     *
     * @cn
     * 默认的提示信息。
     */
    message: PropTypes.string,
    /**
     * @en
     * Position of the icon.
     *
     * @cn
     * 图标的位置。
     */
    iconPosition: PropTypes.oneOf(['before', 'after']),
    /**
     * @en
     * Should the component will be focused.
     *
     * @cn
     * 组件是否被focus。
     */
    focus: PropTypes.bool,
    /**
     * @en
     * A callback for event 'change'.
     *
     * (event: Event, value: valueType) => void
     *
     * @cn
     * 当输入的值发生变化时，将会被调用的回调。
     *
     * (event: Event, value: valueType) => void
     */
    onChange: PropTypes.func,
    /**
     * @en
     * A callback for event 'submit', it will be targeted after pressing `enter` key or clicking icon,
     *
     * (event: Event, value: valueType) => void
     *
     * @cn
     * 当输入的值被提交时，将会被调用的回调。"提交"，是指在输入时按下回车键或者点击图标。
     *
     * (event: Event, value: valueType) => void
     */
    onSubmit: PropTypes.func,
    /**
     * @en
     * A callback for event 'blur'.
     *
     * (event: Event, value: valueType) => void
     *
     * @cn
     * 当组件被blur时，将会被调用的回调。
     *
     * (event: Event, value: valueType) => void
     */
    onBlur: PropTypes.func,
    /**
     * @en
     * A callback for event 'focus'.
     *
     * (event: Event, value: valueType) => void
     *
     * @cn
     * 当组件被focus时，将会被调用的回调。
     *
     * (event: Event, value: valueType) => void
     */
    onFocus: PropTypes.func,
    /**
     * @en
     * ClassName of root element.
     *
     * @cn
     * 根元素的class。
     */
    className: PropTypes.string,
    /**
     * @en
     * Style of root element.
     *
     * @cn
     * 根元素的样式。
     */
    style: PropTypes.object,
    /**
     * @en
     * Style of input.
     *
     * @cn
     * 输入框的样式。
     */
    inputStyle: PropTypes.object,
    /**
     * @en
     * This property is used for controlling the active message.
     *
     * {message: string, color: string, style: style, icon: node to replace the default icon while in this condition}
     *
     * @cn
     * 用于指定**活动状态（主要是focus时）**下的一些组件属性，包括样式、提示信息等。
     *
     * {message: string, color: string, style: style, icon: node}
     */
    active: hintType,
    /**
     * @en
     * This property is used for controlling the error message.
     *
     * {show: bool, message: string, color: string, style: style, icon: node to replace the default icon while in this condition}
     *
     * @cn
     * 用于指定**错误状态**下的一些组件属性，这些属性将会替换掉默认属性。
     *
     * {show: bool, message: string, color: string, style: style, icon: node to replace the default icon while in this condition}
     */
    error: hintType,
    /**
     * @en
     * This property is used for controlling the waring message.
     *
     * {show: bool, message: string, color: string, style: style, icon: node to replace the default icon while in this condition}
     *
     * @cn
     * 用于指定**警告状态**下的一些组件属性，这些属性将会替换掉默认属性。
     *
     * {show: bool, message: string, color: string, style: style}
     */
    warning: hintType,
    /**
     * @en
     * This property is used for controlling the success message.
     *
     * {show: bool, message: string, color: string, style: style, icon: node}
     *
     * @cn
     * 用于指定**成功状态**下的一些组件属性，这些属性将会替换掉默认属性。
     *
     * {show: bool, message: string, color: string, style: style, icon: node}
     */
    success: hintType
  };

  static defaultProps = {
    auto: false,
    mode: 'text',
    type: 'string',
    view: 'underline',
    disabled: false,
    defaultValue: '',
    value: '',
    size: 'middle',
    withIcon: true,
    icon: null,
    iconPosition: 'before',
//     focus: false,
    onChange: () => {},
    onBlur: () => {},
    onFocus: () => {},
    onSubmit: () => {},
    style: {},
    inputStyle: {},
    active: hintDefaultValue,
    error: hintDefaultValue,
    warning: hintDefaultValue,
    success: hintDefaultValue
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.auto ? props.defaultValue : props.value,
      focus: !!props.focus
    };
  }

  componentDidMount() {
    const dom = findDOMNode(this.refs.input);
    dom.addEventListener('keyup', this.handlePressKey, true);
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (!nextProps.auto) {
      this.setState({
        value: nextProps.value,
        focus: nextProps.focus === undefined ? nextState.focus : nextProps.focus
      });
    }
  }

  componentWillUnmount() {
    const dom = findDOMNode(this.refs.input);
    dom.removeEventListener('keyup', this.handlePressKey, true);
  }

  focus = () => {
    this.refs.input.focus();
  };

  blur = () => {
    this.refs.input.blur();
  };

  calcHintAttrs = () => {
    const {
      disabled,
      icon,
      message,
      color,
      error,
      warning,
      active,
      success
    } = this.props;

    const {
      focus
    } = this.state;

    const hintAttrs = Object.assign({}, hintDefaultValue);
    hintAttrs.show = message || error.show || warning.show || success.show;
    hintAttrs.mode = 'normal';
    hintAttrs.icon = icon;
    hintAttrs.message = message;

    if (disabled) {
      hintAttrs.mode = 'disabled';
      return hintAttrs;
    }
    if (error.show) {
      hintAttrs.mode = 'error';
      const i = error.icon || icon;
      return Object.assign(hintAttrs, error, {icon: i});
    }
    if (warning.show) {
      hintAttrs.mode = 'warning';
      const i = warning.icon || icon;
      return Object.assign(hintAttrs, warning, {icon: i});
    }
    if (success.show) {
      hintAttrs.mode = 'success';
      const i = success.icon || icon;
      return Object.assign(hintAttrs, success, {icon: i});
    }
    if (focus) {
      hintAttrs.mode = 'focus';
      const msg = active.message || message;
      const i = active.icon || icon;
      return Object.assign(hintAttrs, active, {show: !!msg, message: msg, icon: i});
    }
    return Object.assign(hintAttrs, {show: !!message, message, color});
  };

  handlePressKey = e => {
    if (e.key === 'Enter') {
      this.handleSubmit(e);
    }
  };

  handleChange = event => {
    const {
      auto,
      onChange,
      type
    } = this.props;

    let value = event.target.value;
    if (value === '') {
      if (auto) {
        this.setState({value});
      }
      onChange(event);
      return;
    }
    if (type === 'int') {
      value = /^[-\d]?\d*$/.test(value) ? value : '';
    } else if (type === 'float') {
      value = /^[-\d]?\d*\.?\d*$/.test(value) ? value : '';
    }
    if (value === '' && type !== 'string') {
      return;
    }
    if (type === 'int') {
      value = parseInt(value === '-' ? 0 : value, 10);
    } else if (type === 'float') {
      value = parseFloat(value === '-' ? 0 : value);
    }
    if (auto) {
      this.setState({value: event.target.value});
    }
    onChange(event, value);
  };

  handleBlur = event => {
    const {
      onBlur,
      focus
    } = this.props;

    if (focus === undefined) {
      this.setState({focus: false});
    }
    onBlur(event, event.target.value);
  };

  handleFocus = event => {
    const {
      onFocus,
      focus
    } = this.props;

    if (focus === undefined) {
      this.setState({focus: true});
    }
    onFocus(event, event.target.value);
  };

  handleSubmit = event => {
    const {
      onSubmit
    } = this.props;

    const {
      value
    } = this.state;

    this.blur();
    onSubmit(event, value);
  };

  render() {
    const {
      mode,
      view,
      disabled,
      style,
      inputStyle,
      className,
      size,
      withIcon,
      iconPosition
    } = this.props;

    const {
      value,
      focus
    } = this.state;

    const hintAttrs = this.calcHintAttrs();

    const otherProps = getRestProps(Text, this.props);

    return (
      <div
        className={cx(
          'hana-text',
          `hana-text-${view}`,
          `hana-text-${size}`,
          withIcon && 'hana-text-with-icon',
          `hana-text-${hintAttrs.mode}`,
          className
        )}
        style={style}
      >
        {
          withIcon && iconPosition === 'before' && (
            <Icon
              mode={hintAttrs.mode}
              view={view}
              position={iconPosition}
              size={size}
              node={hintAttrs.icon}
              handleSubmit={this.handleSubmit}
              style={Object.assign({}, hintAttrs.color && {color: hintAttrs.color})}
            />
          )
        }
        <div
          className={cx(
            'hana-text-content'
          )}
        >
          <input
            className={cx(
              'hana-text-input',
              `hana-text-input-${view}`,
              `hana-text-input-${size}`,
              withIcon && `hana-text-input-with-icon-${iconPosition}`,
              `hana-text-input-${hintAttrs.mode}`
            )}
            ref="input"
            type={mode}
            disabled={disabled}
            value={value}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            autoComplete="off"
            style={Object.assign(
              {}, hintAttrs.color && {borderColor: hintAttrs.color}, inputStyle
            )}
            {...otherProps}
          />
          {
            hintAttrs.show && (
              <Hint
                mode={hintAttrs.mode}
                disabled={disabled}
                size={size}
                message={hintAttrs.message}
                style={Object.assign({}, hintAttrs.color && {color: hintAttrs.color}, hintAttrs.style)}
                focus={focus}
              />
            )
          }
        </div>
        {
          withIcon && iconPosition === 'after' && (
            <Icon
              mode={hintAttrs.mode}
              view={view}
              position={iconPosition}
              size={size}
              node={hintAttrs.icon}
              handleSubmit={this.handleSubmit}
              style={Object.assign({}, hintAttrs.color && {color: hintAttrs.color})}
            />
          )
        }
      </div>
    );
  }
}
