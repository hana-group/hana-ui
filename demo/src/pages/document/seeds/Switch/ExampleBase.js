import React, {Component} from 'react';
import {Switch} from 'hana-ui';

/**
 * @en
 * Base
 *
 * Switch module controlled by prop `checked`
 *
 * @cn
 * 基础
 *
 * 使用属性`checked`控制开关状态。
 */
export default class ExampleBase extends Component {
  state = {
    isChecked: true
  }

  render() {
    return (
      <Switch
        checked={this.state.isChecked}
        onChange={isChecked => this.setState({isChecked})}
      />
    );
  }
}
