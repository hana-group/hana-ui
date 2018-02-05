import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from '../Icon';

import './button.scss';

class Button extends Component {
  static propTypes = {
    /**
     * @en
     * Custom component style
     *
     * @cn
     * 自定义组件样式
     */
    style: PropTypes.object,

    /**
     * @en
     * Setting button size one of 'large','middle','small'
     *
     * @cn
     * 设置按钮大小，可选配置为： 'large','middle','small'
     */
    size: PropTypes.oneOf(['large', 'middle', 'small']),

    /**
     * @en
     * Setting button type one of 'primary','error','default','disabled'
     *
     * @cn
     * 设置按钮类型，可选配置：'primary','error','default','disabled'
     */
    type: PropTypes.oneOf(['primary', 'error', 'default', 'disabled']),

    /**
     * @en
     * Button HTML type attribute
     *
     * @cn
     * 按钮type 类型
     */
    htmlType: PropTypes.string,

    /**
     * @en
     * Show button label, default is placed in button's left
     *
     * @cn
     * 按钮label，默认显示在按钮左边
     */
    label: PropTypes.string,

    /**
     * @en
     * Setting button label, default value is 'left'
     *
     * @cn
     * 指定按钮label 位置，默认值为'left'
     */
    labelPosition: PropTypes.oneOf(['left', 'right']),

    /**
     * @en
     * Show button icon
     *
     * @cn
     * 按钮图标
     */
    icon: PropTypes.string,

    /**
     * @en
     * Setting button icon color
     *
     * @cn
     * 设置按钮图标颜色
     */
    iconColor: PropTypes.string,

    /**
     * @en
     * Custom button icon style
     *
     * @cn
     * 自定义按钮图标的样式
     */
    iconStyle: PropTypes.object,

    /**
     * @en
     * Setting icon size
     *
     * @cn
     * 设置按钮图标大小
     */
    iconSize: PropTypes.string,

    /**
     * @en
     * Custom button component class name
     *
     * @cn
     * 设置组件class name
     */
    className: PropTypes.string,

    /**
     * @en
     * Custom button click event
     *
     * @cn
     * 自定义按钮点击事件
     */
    onClick: PropTypes.func,

    /**
     * @en
     * Setting button children element
     *
     * @cn
     * 设置按钮组件的子组件
     */
    children: PropTypes.node
  }

  static defaultProps = {
    size: 'middle',
    type: 'default',
    htmlType: 'button'
  }

  handleClick = (e) => {
    const {type, onClick} = this.props;

    if (type === 'disabled') {
      e.preventDefault();
      return false;
    }

    if (typeof onClick === 'function') {
      return onClick(e);
    }
  }

  render() {
    const {
      size, label, labelPosition, icon, iconColor, iconStyle,
      iconSize, type, htmlType, className, children, ...other
    } = this.props;
    const prefix = 'hana';

    if (labelPosition && !label) {
      throw new Error('missing label props of Button comonent');
    }

    if (label) {
      return (
        <div className={cx(`${prefix}-button-label`)} {...other}>
          <div
            className={cx(
              'button-label',
              `button-label-${type}`,
              labelPosition === 'right'
                ? 'label-right'
                : 'label-left'
            )}
          >
            {icon ? <Icon type={icon} color={iconColor} style={iconStyle} size={iconSize} />
              : null}{children}
          </div>
          <a
            href={'javascript: void(0)'}
            className={cx(
              labelPosition === 'right'
                ? 'label-right'
                : 'label-left'
            )}
          >
            {label}
          </a>
        </div>
      );
    }

    return (
      <button
        className={cx(
          `${prefix}-button`,
          `${prefix}-button-${type}`,
          `${prefix}-button-${size}`,
          className
        )}
        onClick={this.handleClick}
        {...htmlType ? {type: htmlType} : {}}
        {...other}
      >
        {icon ? <Icon
          type={icon}
          color={iconColor}
          style={Object.assign({}, iconStyle, {marginRight: 3})}
          size={iconSize}
        />
        : null}{children}
      </button>
    );
  }
}

export default Button;
