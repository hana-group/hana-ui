import React, {Component} from 'react';
import PropTypes from 'prop-types';
import remove from 'lodash/remove';
import cx from 'classnames';

import {childrenToArray} from '../../utils';

export default class CheckboxGroup extends Component {
  static propTypes = {
    /**
     * @en
     * children
     *
     * @cn
     * 子节点
     */
    children: PropTypes.node.isRequired,

    /**
     * @en
     * currentValue
     *
     * @cn
     * 复选框组的值
     */
    value: PropTypes.array,

    /**
     * @en
     * callback when the switch group changed
     *
     * (Array value) => void
     *
     * @cn
     * 复选框组状态改变时的回调，返回一个数组
     *
     * (Array value) => void
     */
    onChange: PropTypes.func,

    /**
     * @en
     * whether disabled
     *
     * @cn
     * 复选框组是否禁用
     */
    disabled: PropTypes.bool,

    /**
     * @en
     * checkbox's icon when checked
     *
     * @cn
     * 复选框组被选中的图标
     */
    checkedIcon: PropTypes.node,

    /**
     * @en
     * checkbox's icon when unchecked
     *
     * @cn
     * 复选框组未被选中的图标
     */
    unCheckedIcon: PropTypes.node,

    /**
     * @en
     * CheckboxGroup's class
     *
     * @cn
     * 复选框组的`class`
     */
    className: PropTypes.string
  }

  static defaultProps = {
    disabled: false
  }

  handleChange = (event, nextChecked, itemValue) => {
    const {value} = this.props;
    const arr = value.slice(0);
    if (nextChecked) arr.push(itemValue);
    else remove(arr, i => i === itemValue);
    this.props.onChange(arr);
  }

  render() {
    const {value, disabled, children, checkedIcon, unCheckedIcon, className} = this.props;
    const cls = cx('hana-checkbox-group', className);
    const computedChildren = childrenToArray(children).map(
      (item) => React.cloneElement(item, {
        key: item.key || item.props.value,
        checked: value.indexOf(item.props.value) > -1,
        onChange: (e, nextChecked) => this.handleChange(e, nextChecked, item.props.value),
        disabled: disabled || item.props.disabled,
        checkedIcon,
        unCheckedIcon
      })
    );
    return (
      <section className={cls}>
        {computedChildren}
      </section>
    );
  }
}
