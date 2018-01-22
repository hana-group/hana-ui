import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import getRestProps from '../../utils/getRestProps';

const noop = () => {};

export default class Checkbox extends PureComponent {
  static propTypes = {
    /**
     * @en
     * checkbox's value
     *
     * @cn
     * 复选框的值
     */
    value: PropTypes.any,

    /**
     * @en
     * whether the switch is checked
     *
     * @cn
     * 是否被选中
     */
    checked: PropTypes.bool,

    /**
     * @en
     * initial value of checked
     *
     * @cn
     * 默认是否选中
     */
    defaultChecked: PropTypes.bool,

    /**
     * @en
     * whether the switch is disabled
     *
     * @cn
     * 是否禁用
     */
    disabled: PropTypes.bool,

    /**
     * @en
     * callback when the switch changed
     *
     * (Event event, Boolean isChecked) => void
     *
     * @cn
     * 选中状态改变时的回调函数
     *
     * (Event event, Boolean isChecked) => void
     */
    onChange: PropTypes.func,

    /**
     * @en
     * whether set state by itself when changed
     *
     * @cn
     * 是否启用自控模式
     */
    auto: PropTypes.bool,

    /**
     * @en
     * the wrap styles
     *
     * @cn
     * 复选框的`style`
     */
    style: PropTypes.object,

    /**
     * @en
     * checkbox's label
     *
     * @cn
     * 标签
     */
    label: PropTypes.node,

    /**
     * @en
     * checkbox's icon when checked
     *
     * @cn
     * 选中时的图标
     */
    checkedIcon: PropTypes.node,

    /**
     * @en
     * checkbox's icon when unchecked
     *
     * @cn
     * 未选中时的图标
     */
    unCheckedIcon: PropTypes.node,

    /**
     * @en
     * checkbox's class
     *
     * @cn
     * 复选框的`class`
     */
    className: PropTypes.string
  };

  static defaultProps = {
    defaultChecked: false,
    disabled: false,
    auto: false,
    onChange: noop,
    label: '',
    checkedIcon: null,
    unCheckedIcon: null
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked || props.defaultChecked
    };
    this.id = (Math.random() * Date.now() * 100).toString(36);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auto === false && nextProps.checked !== this.state.checked) {
      this.setState({checked: nextProps.checked});
    }
  }

  handleClick = e => {
    e.stopPropagation();
  };

  handleChange = e => {
    e.stopPropagation();
    const {disabled, onChange, auto} = this.props;
    const {checked} = this.state;
    if (disabled) return;
    const nextChecked = !checked;
    if (auto) {
      this.setState({checked: nextChecked}, () => onChange(e, nextChecked));
    } else {
      onChange(e, nextChecked);
    }
  };

  render() {
    const {
      disabled, style, label, checkedIcon, unCheckedIcon, value, className
    } = this.props;
    const {checked} = this.state;
    const cls = cx('hana-checkbox', className, {
      'hana-checkbox-checked': checked,
      'hana-checkbox-disabled': disabled
    });
    const innerClass = checkedIcon && unCheckedIcon ? 'hana-checkbox-custom' : 'hana-checkbox-inner';
    const restProps = getRestProps(Checkbox, this.props);
    return (
      <div style={{...style, display: 'inline-block'}}>
        <label className={cls} htmlFor={this.id} onClick={this.handleClick}>
          <div className={innerClass}>
            {checked && checkedIcon}
            {!checked && unCheckedIcon}
          </div>
          <span>{label}</span>
        </label>
        <input
          id={this.id}
          type="checkbox"
          onClick={this.handleClick}
          onChange={this.handleChange}
          {...restProps}
          style={{display: 'none'}}
          value={value}
        />
      </div>
    );
  }
}
