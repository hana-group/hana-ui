/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/2/7
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';
import cx from 'classnames';
import {getRestProps} from '../../utils';
import Hint from './Hint';
import Icon from './Icon';

const hintType = PropTypes.shape({
  show: PropTypes.bool,
  message: PropTypes.string,
  style: PropTypes.object,
  descStyle: PropTypes.object,
  icon: PropTypes.node,
  color: PropTypes.string
});

const hintDefaultValue = {
  show: false,
  message: '',
  style: {},
  descStyle: {},
  icon: null,
  color: null
};

export default class TextArea extends Component {
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
     * If the size could be automatic computed,
     * it should be {minLines, maxLines}
     *
     * @cn
     * 是否允许输入框自动根据文本调整高度,
     * 需要提供 {最小行数, 最大行数}
     */
    autoSize: PropTypes.shape({
      minLines: PropTypes.number,
      maxLines: PropTypes.number
    }),
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
    defaultValue: PropTypes.string,
    /**
     * @en
     * Only in the normal mode, component will be controlled by this value.
     *
     * @cn
     * 在普通模式下，用于控制组件内容的值。
     */
    value: PropTypes.string,
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
     * The height of this component.
     *
     * @cn
     * 组件高度。
     */
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * @en
     * Background color of main environment under this component.
     *
     * @cn
     * 应用环境的主要背景色。
     */
    backgroundColor: PropTypes.string,
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
     * (event, value) => void.
     *
     * @cn
     * 当输入的值发生变化时，将会被调用的回调。
     *
     * (event, value) => void.
     */
    onChange: PropTypes.func,
    /**
     * @en
     * A callback for event 'blur'.
     *
     * (event, value) => void.
     *
     * @cn
     * 当组件被blur时，将会被调用的回调。
     *
     * (event, value) => void.
     */
    onBlur: PropTypes.func,
    /**
     * @en
     * A callback for event 'focus'.
     *
     * (event, value) => void.
     *
     * @cn
     * 当组件被focus时，将会被调用的回调。
     *
     * (event, value) => void.
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
     * Style of top description.
     *
     * @cn
     * 顶部解释条的样式。
     */
    descStyle: PropTypes.object,
    /**
     * @en
     * This property is used for controlling the active message.
     *
     * {message: string, color: string, style: style, icon: node to replace the default icon while in this condition}
     *
     * @cn
     * 用于指定**活动状态（主要是focus时）**下的一些组件属性，包括样式、提示信息等。
     *
     * {message: string, color: string, style: style, icon}
     */
    active: hintType,
    /**
     * @en
     * This property is used for controlling the error message.
     *
     * {show: bool, message: string, color: string, style: style, icon: node}
     *
     * @cn
     * 用于指定**错误状态**下的一些组件属性，这些属性将会替换掉默认属性。
     *
     * {show: bool, message: string, color: string, style: style, icon: node}
     */
    error: hintType,
    /**
     * @en
     * This property is used for controlling the waring message.
     *
     * {show: bool, message: string, color: string, style: style, icon: node}
     *
     * @cn
     * 用于指定**警告状态**下的一些组件属性，这些属性将会替换掉默认属性。
     *
     * {show: bool, message: string, color: string, style: style, icon: node}
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
    disabled: false,
    defaultValue: '',
    value: '',
    size: 'middle',
    backgroundColor: '#fff',
    withIcon: true,
    icon: null,
//     focus: false,
    onChange: () => {},
    onBlur: () => {},
    onFocus: () => {},
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
    this.updateStyles();
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (!nextProps.auto) {
      this.setState({
        value: nextProps.value,
        focus: nextProps.focus === undefined ? nextState.focus : nextProps.focus
      });
    }
  }

  componentDidUpdate() {
    this.updateStyles();
  }

  focus = () => {
    this.refs.input.focus();
  };

  blur = () => {
    this.refs.input.blur();
  };

  updateStyles = () => {
    const {
      autoSize
    } = this.props;

    if (!autoSize) {
      return;
    }

    const {
      value
    } = this.state;

    const lines = value.split('\n').length;
    const {maxLines: max, minLines: min} = autoSize;

    const element = findDOMNode(this.refs.input);
    let height = element.scrollHeight;

    if (lines <= max && lines >= min) {
      element.style.height = `${height}px`;
      return;
    }

    const styles = window.getComputedStyle(element, null);
    const lineHeight = parseFloat(styles.getPropertyValue('line-height'));
    const padding = parseFloat(styles.getPropertyValue('padding-top'))
      + parseFloat(styles.getPropertyValue('padding-bottom'))
      + parseFloat(styles.getPropertyValue('border-top'))
      + parseFloat(styles.getPropertyValue('border-bottom'));

//    console.log(height, lineHeight * min + padding);

    if (lines < min && height < lineHeight * min + padding) {
      height = lineHeight * min + padding;
    } else if (lines > max && height < lineHeight * max + padding) {
      height = lineHeight * max + padding;
    }

    element.style.height = `${height}px`;
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

  handleChange = event => {
    const {
      auto,
      onChange
    } = this.props;

    const value = event.target.value;
    if (auto) {
      this.setState({value});
    }
    onChange(event, value);
  };

  handleBlur = event => {
    const {
      onBlur
    } = this.props;

    if (this.props.focus === undefined) {
      this.setState({focus: false});
    }
    onBlur(event, event.target.value);
  };

  handleFocus = event => {
    const {
      onFocus
    } = this.props;

    if (this.props.focus === undefined) {
      this.setState({focus: true});
    }
    onFocus(event, event.target.value);
  };

  render() {
    const {
      autoSize,
      disabled,
      className,
      style,
      inputStyle,
      descStyle,
      size,
      height,
      backgroundColor,
      withIcon
    } = this.props;

    const {
      value,
      focus
    } = this.state;

    const containerHeight = !autoSize && height;
    const hintAttrs = this.calcHintAttrs();

    const otherProps = getRestProps(TextArea, this.props);

    return (
      <div
        className={cx(
          'hana-text-area',
          `hana-text-area-${size}`,
          withIcon && 'hana-text-area-with-icon',
          `hana-text-area-${hintAttrs.mode}`,
          className
        )}
        style={Object.assign({}, containerHeight && {height: containerHeight}, style)}
      >
        <div
          className={cx(
            'hana-text-area-desc',
            `hana-text-area-desc-${size}`,
            `hana-text-area-desc-${hintAttrs.mode}`
          )}
          style={Object.assign(
            {}, {backgroundColor}, hintAttrs.color && {color: hintAttrs.color}, descStyle, hintAttrs.descStyle
          )}
        >
          {
            withIcon && (
              <Icon
                mode={hintAttrs.mode}
                size={size}
                node={hintAttrs.icon}
                focus={focus}
              />
            )
          }
          {
            hintAttrs.show && hintAttrs.message && (
              <Hint
                mode={hintAttrs.mode}
                disabled={disabled}
                size={size}
                show={hintAttrs.show}
                message={hintAttrs.message}
                style={hintAttrs.style}
              />
            )
          }
        </div>
        <div
          className={cx(
            'hana-text-area-content'
          )}
        >
          <textarea
            className={cx(
              'hana-text-area-input',
              `hana-text-area-input-${size}`,
              `hana-text-area-input-${hintAttrs.mode}`
            )}
            ref="input"
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
        </div>
      </div>
    );
  }
}
