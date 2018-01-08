import React, {Component} from 'react';
import {Checkbox, CheckboxGroup} from 'hana-ui';

/**
 * @en
 * Checkbox Group
 *
 * Using `CheckboxGroup` to control multiple Checkboxes.
 *
 * @cn
 * 复选框组
 *
 * 使用`CheckboxGroup`来控制多个复选框
 */
export default class ExampleGroup extends Component {
  state = {
    val: ['1', '3']
  }

  render() {
    return (
      <div>
        <CheckboxGroup value={this.state.val} onChange={val => this.setState({val})}>
          <Checkbox label="Spring" value="1" key='1000' />
          <Checkbox label="Summer" value="2" />
          <Checkbox label="Autumn" value="3" />
          <Checkbox label="Winter" value="4" />
        </CheckboxGroup>
      </div>
    );
  }
}
