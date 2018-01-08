import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import getRestProps from '../../utils/getRestProps';

/**
 * TODO svg icon improve
 */

const noop = () => {};

export default class Switch extends Component {
  static propTypes = {
    /**
     * @en
     * whether the switch is checked
     *
     * @cn
     * 开关是否开启
     */
    checked: PropTypes.bool,

    /**
     * @en
     * initial value of checked
     *
     * @cn
     * 默认是否开启
     */
    defaultChecked: PropTypes.bool,

    /**
     * @en
     * whether the switch is disabled
     *
     * @cn
     * 是否被禁用
     */
    disabled: PropTypes.bool,

    /**
     * @en
     * callback when the switch changed
     *
     * (Boolean isChecked) => void
     *
     * @cn
     * 开关状态改变时触发的回调函数
     *
     * (Boolean isChecked) => void
     */
    onChange: PropTypes.func,

    /**
     * @en
     * whether use auto mode
     *
     * @cn
     * 是否启用自控模式
     */
    auto: PropTypes.bool,

    /**
     * @en
     * the switch's class
     *
     * @cn
     * 开关的`class`
     */
    className: PropTypes.string
  }

  static defaultProps = {
    defaultChecked: false,
    disabled: false,
    auto: false,
    onChange: noop
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

  handleChange = () => {
    const {disabled, onChange, auto} = this.props;
    const {checked} = this.state;
    if (disabled) return;
    const nextChecked = !checked;
    if (auto) {
      this.setState({checked: nextChecked}, () => onChange(nextChecked));
    } else {
      onChange(nextChecked);
    }
  }

  render() {
    const {checked} = this.state;
    const {disabled, className} = this.props;
    const cls = cx('hana-switch', className, {
      'hana-switch-active': checked,
      'hana-switch-disabled': disabled
    });
    const restProps = getRestProps(Switch, this.props);
    return (
      <span
        className={cls}
        onClick={this.handleChange}
        {...restProps}
      />
    );
  }
}
