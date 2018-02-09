import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {childrenToArray} from '../../utils';

export default class RadioGroup extends Component {
  static propTypes = {
    /**
     * @en
     * name
     *
     * @cn
     * radio的name
     */
    name: PropTypes.string,

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
     * `RadioGroup`'s currentValue
     *
     * @cn
     * `RadioGroup`的当前值
     */
    value: PropTypes.any,

    /**
     * @en
     * callback when value changed
     *
     * (Any value) => void
     *
     * @cn
     * 值改变时的回调函数
     *
     * (Any value) => void
     */
    onChange: PropTypes.func,

    /**
     * @en
     * whether disabled
     *
     * @cn
     * 是否被禁用
     */
    disabled: PropTypes.bool,

    /**
     * @en
     * radio's icon when checked
     *
     * @cn
     * `Radio`选中状态的图标
     */
    checkedIcon: PropTypes.node,

    /**
     * @en
     * radio's icon when unchecked
     *
     * @cn
     * `Radio`未选中状态的图标
     */
    unCheckedIcon: PropTypes.node,

    /**
     * @en
     * `RadioGroup`'s style
     *
     * @cn
     * `RadioGroup`的样式
     */
    style: PropTypes.object
  }

  static defaultProps = {
    disabled: false
  }

  constructor(props) {
    super(props);
    this.id = `hana-radio-group-${Math.random()}`;
  }

  handleChange = (event, value) => {
    this.props.onChange(value);
  }

  render() {
    const {
      value, disabled, children, checkedIcon, unCheckedIcon, style, name
    } = this.props;
    const groupName = name || this.id;
    const computedChildren = childrenToArray(children).map(
      (item) => React.cloneElement(item, {
        key: item.key || item.props.value,
        name: groupName,
        checked: value === item.props.value,
        onChange: e => this.handleChange(e, item.props.value),
        disabled: disabled || item.props.disabled,
        checkedIcon,
        unCheckedIcon
      })
    );
    return (
      <section className="hana-radio-group" style={style}>
        {computedChildren}
      </section>
    );
  }
}
