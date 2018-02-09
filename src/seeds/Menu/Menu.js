import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {getRestProps, childrenToArray} from '../../utils';

const noop = () => {};

export default class Menu extends Component {
  static propTypes = {

    /**
     * @en
     * the current value of menu
     *
     * @cn
     * 菜单的当前值
     */
    value: PropTypes.any,

    /**
     * @en
     * the style of the menu
     *
     * @cn
     * 菜单的`style`
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
     * 点击时的回调函数
     */
    onClick: PropTypes.func,

    /**
     * @en
     * auto mode
     *
     * @cn
     * 是否为自控模式
     */
    auto: PropTypes.bool,

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
     * whether the orient is horizonal
     *
     * @cn
     * 菜单是否水平
     */
    horizonal: PropTypes.bool,

    /**
     * @en
     * menu style type
     *
     * @cn
     * 菜单的类别（默认或线性）
     */
    type: PropTypes.oneOf(['default', 'linear']),

    /**
     * @en
     * menu's class
     *
     * @cn
     * 菜单的`class`
     */
    className: PropTypes.string
  }

  static childContextTypes = {
    value: PropTypes.any
  }

  static defaultProps = {
    auto: false,
    disabled: false,
    horizonal: false,
    type: 'default'
  }

  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  getChildContext() {
    return {
      value: this.state.value
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) this.setState({value: nextProps.value});
  }

  handleClick = (e, value, callback) => {
    if (this.props.auto) this.setState({value}, () => callback(e, value));
    else callback(e, value);
  }

  render() {
    const {
      style, children, disabled, horizonal, type, className
    } = this.props;
    const cls = cx('hana-menu', `hana-menu-${type}`, className, {
      'hana-menu-horizonal': horizonal,
      'hana-menu-vertical': !horizonal
    });
    const restProps = getRestProps(Menu, this.props);
    return (
      <div className={cls} style={style} {...restProps}>
        {
          childrenToArray(children).map((item, index) => React.cloneElement(item, {
            // level item >> parents >> noop
            onClick: (e, val) => this.handleClick(e, val, item.props.onClick || this.props.onClick || noop),
            key: item.props.value || index,
            disabled: disabled || item.props.disabled
          }))
        }
      </div>
    );
  }
}
