import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// TODO:
// - outside click auto hide
class Sidebar extends Component {
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
     * Custom component className
     *
     * @cn
     * 自定义组件class
     */
    className: PropTypes.string,
    /**
     * @en
     * Setting component position one of 'left','right'. default is placed left
     *
     * @cn
     * 设置组件展示位置，可选配置：'left','right'. 默认为'left'
     */
    position: PropTypes.oneOf(['left', 'right']),
    /**
     * @en
     * Control open or close component
     *
     * @cn
     * 控制显示、隐藏组件
     */
    open: PropTypes.bool,
    /**
     * @en
     * Setting component children element
     *
     * @cn
     * 设置组件的子组件
     */
    children: PropTypes.node
  }

  static defaultProps = {
    open: true,
    position: 'left'
  }

  render() {
    const {style, position, open, children, className} = this.props;
    const prefix = 'hana';

    return (
      <div
        className={
          cx(
            `${prefix}-sidebar`,
            `${prefix}-sidebar-${position}`, {
              [`${prefix}-sidebar-open`]: open,
              [`${prefix}-sidebar-close`]: !open
            },
            className
          )
        }
        style={style}
      >
        {children}
      </div>
    );
  }
}

export default Sidebar;
