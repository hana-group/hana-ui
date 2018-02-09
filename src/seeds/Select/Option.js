import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import getRestProps from '../../utils/getRestProps';

const noop = () => {};

export default class Option extends Component {
  static propTypes = {
    /**
     * @en
     * the label of option
     *
     * @cn
     * 选项的标签
     */
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * @en
     * whether the option is disabled
     *
     * @cn
     * 是否禁用
     */
    disabled: PropTypes.bool,

    /**
     * @en
     * whether the option is selected
     *
     * @cn
     * 选中状态
     */
    selected: PropTypes.bool,

    /**
     * @en
     * the option's value
     *
     * @cn
     * 选项的值
     */
    value: PropTypes.any,

    /**
     * @en
     * the option's callback when clicked
     *
     * @cn
     * 选项被点击时的回调函数
     */
    onClick: PropTypes.func,

    /**
     * @en
     * the option's class
     *
     * @cn
     * 选项的`class`
     */
    className: PropTypes.string
  }

  static defaultProps = {
    label: '',
    selected: false,
    disabled: false,
    onClick: noop,
    className: ''
  }

  handleClick = () => {
    const {
      onClick, value, disabled, label, selected
    } = this.props;
    if (!disabled) onClick(value, label, selected);
  }

  render() {
    const {
      label, selected, disabled, className
    } = this.props;
    const cls = cx('hana-select-option', className, {
      'hana-select-option-selected': selected,
      'hana-select-option-disabled': disabled
    });
    const restProps = getRestProps(Option, this.props);
    return (
      <div
        className={cls}
        onClick={this.handleClick}
        {...restProps}
      >
        {label}
      </div>
    );
  }
}
