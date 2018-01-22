import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import {Icon} from '../../index';

import {getRestProps, childrenToArray} from '../../utils';

const noop = () => {};

export default class SubMenu extends Component {
  static propTypes = {
    /**
     * @en
     * the title of submenu
     *
     * @cn
     * `SubMenu`的标题
     */
    title: PropTypes.string,

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
     * the submenu's style
     *
     * @cn
     * `SubMenu`的`style`
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
     * 点击事件
     */
    onClick: PropTypes.func,

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
     * the icon of sub menu
     *
     * @cn
     * 图标
     */
    icon: PropTypes.string,

    /**
     * @en
     * the submenu's class
     *
     * @cn
     * `SubMenu`的`class`
     */
    className: PropTypes.object
  };

  static contextTypes = {
    value: PropTypes.any
  };

  static defaultProps = {
    disabled: false
  };

  constructor(props) {
    super(props);
    this.state = {
      active: props.active || false
    };
  }

  handleToggle = () => {
    const {disabled} = this.props;
    if (!disabled) {
      this.setState({
        active: !this.state.active
      });
    }
  };

  render() {
    const {
      title, children, disabled, icon, className
    } = this.props;
    const {active} = this.state;
    const cls = cx('hana-submenu', className, {
      'hana-submenu-active': active,
      'hana-submenu-disabled': disabled
    });
    // const computedStyle = Object.assign({}, style, {color});
    const restProps = getRestProps(SubMenu, this.props);
    return (
      <div className={cls} {...restProps}>
        <span className="hana-submenu-title" onClick={this.handleToggle}>
          {!!icon && <Icon type={icon} />}
          {title}
        </span>
        <TransitionGroup>
          {active &&
            <CSSTransition classNames="hana-submenu-transition" timeout={300}>
              <div className={cx({'hana-submenu-elements': active})}>
                {
                  childrenToArray(children).map((item, index) => (
                    React.cloneElement(item, {
                      // level item >> parent >> noop
                      onClick: item.props.onClick || this.props.onClick || noop,
                      key: item.props.value || index,
                      disabled: disabled || item.props.disabled,
                      // level isItemActive >> has context value && context value ==item value
                      active: item.props.active || (!!this.context.value && this.context.value === item.props.value)
                    })
                  ))
                }
              </div>
            </CSSTransition>
          }
        </TransitionGroup>
      </div>
    );
  }
}
