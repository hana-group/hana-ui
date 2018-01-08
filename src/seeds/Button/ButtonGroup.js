import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class ButtonGroup extends Component {
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
     * Custom button component class name
     *
     * @cn
     * 自定义组件class name
     */
    className: PropTypes.string,

    /**
     * @en
     * Setting group component children element
     *
     * @cn
     * 设置组件的子组件
     */
    children: PropTypes.node
  }

  render() {
    const {className, children, ...other} = this.props;
    const prefix = 'hana';

    return (
      <div
        className={cx(`${prefix}-button-group`, className)}
        {...other}
      >
        {children}
      </div>
    );
  }
}

export default ButtonGroup;
