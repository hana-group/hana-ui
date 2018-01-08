import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import getRestProps from '../../utils/getRestProps';

const noop = () => {};

export default class Radio extends Component {
  static propTypes = {
    /**
     * @en
     * the radio's name
     *
     * @cn
     * 单选框的name
     */
    name: PropTypes.string,

    /**
     * @en
     * radio's value
     *
     * @cn
     * 单选框的值
     */
    value: PropTypes.any,

    /**
     * @en
     * whether the radio is checked
     *
     * @cn
     * 单选框的选中状态
     */
    checked: PropTypes.bool,

    /**
     * @en
     * initial value of checked
     *
     * @cn
     * 单选框的默认选中状态
     */
    defaultChecked: PropTypes.bool,

    /**
     * @en
     * whether the radio is disabled
     *
     * @cn
     * 是否被禁用
     */
    disabled: PropTypes.bool,

    /**
     * @en
     * callback when the radio changed
     *
     * (Event event, Boolean isChecked) => void
     *
     * @cn
     * 状态改变时的回调函数
     *
     * (Event event, Boolean isChecked) => void
     */
    onChange: PropTypes.func,

    /**
     * @en
     * whether set state by itself when changed
     *
     * @cn
     * 是否为自控模式
     */
    auto: PropTypes.bool,

    /**
     * @en
     * the wrap styles
     *
     * @cn
     * 单选框的`style`
     */
    style: PropTypes.object,

    /**
     * @en
     * radio's label
     *
     * @cn
     * 单选框的标签
     */
    label: PropTypes.node,

    /**
     * @en
     * radio's icon when checked
     *
     * @cn
     * 选中状态时的图标
     */
    checkedIcon: PropTypes.node,

    /**
     * @en
     * radio's icon when unchecked
     *
     * @cn
     * 未选中状态时的图标
     */
    unCheckedIcon: PropTypes.node
  }

  static defaultProps = {
    defaultChecked: false,
    disabled: false,
    auto: false,
    onChange: noop,
    label: '',
    checkedIcon: null,
    unCheckedIcon: null
  }

  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked || props.defaultChecked
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== undefined) this.setState({checked: nextProps.checked});
  }

  handleChange = e => {
    const {disabled, onChange, auto} = this.props;
    const {checked} = this.state;
    if (disabled || checked) return;
    const nextChecked = !checked;
    if (auto) {
      this.setState({checked: nextChecked}, () => onChange(e, nextChecked));
    } else {
      onChange(e, nextChecked);
    }
  }

  render() {
    const {disabled, style, label, checkedIcon, unCheckedIcon, value, name} = this.props;
    const {checked} = this.state;
    const cls = cx('hana-radio', {
      'hana-radio-checked': checked,
      'hana-radio-disabled': disabled
    });
    const innerClass = checkedIcon && unCheckedIcon ? 'hana-radio-custom' : 'hana-radio-inner';
    const restProps = getRestProps(Radio, this.props);
    return (
      <label className={cls} style={style}>
        <div className={innerClass}>
          {checked && checkedIcon}
          {!checked && unCheckedIcon}
        </div>
        <input
          type="radio"
          checked={checked}
          onChange={this.handleChange}
          {...restProps}
          style={{display: 'none'}}
          value={value}
          name={name}
        />
        <span>{label}</span>
      </label>
    );
  }
}
