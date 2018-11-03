import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {Icon} from '../../index';

import getRestProps from '../../utils/getRestProps';

export default class MenuItem extends Component {
  static propTypes = {
    /**
     * @en
     * whether it is active
     *
     * @cn
     * 是否被选中
     */
    active: PropTypes.bool,

    /**
     * @en
     * whether it is disabled
     *
     * @cn
     * 是否禁用
     */
    disabled: PropTypes.bool,

    /**
     * @en
     * the menuitem's style
     *
     * @cn
     * 菜单元素的`style`
     */
    style: PropTypes.object,

    /**
     * @en
     * children
     *
     * @cn
     * 子节点
     */
    children: PropTypes.node,

    /**
     * @en
     * callback when clicked
     *
     * @cn
     * 被点击时的回调函数
     */
    onClick: PropTypes.func,

    /**
     * @en
     * value of the menu item
     *
     * @cn
     * 菜单元素的`value`
     */
    value: PropTypes.any,

    /**
     * @en
     * icon for the meun item
     *
     * @cn
     * 菜单元素的图标
     */
    icon: PropTypes.string,

    /**
     * @en
     * menuitem's class
     *
     * @cn
     * 菜单元素的`class`
     */
    className: PropTypes.string
  }

  static contextTypes = {
    value: PropTypes.any
  }

  static defaultProps = {
    disabled: false
  }

  handleClick = (e) => {
    const {value, onClick, disabled} = this.props;
    if (!disabled && onClick) onClick(e, value);
  }

  render() {
    const {
      children, active, disabled, icon, value, className
    } = this.props;
    const cls = cx('hana-menuitem', className, {
      'hana-menuitem-active': active || this.context.value === value,
      'hana-menuitem-disabled': disabled
    });
    const restProps = getRestProps(MenuItem, this.props);
    return (
      <div className={cls} {...restProps} onClick={this.handleClick}>
        {!!icon && <Icon type={icon} />}
        {children}
      </div>
    );
  }
}
