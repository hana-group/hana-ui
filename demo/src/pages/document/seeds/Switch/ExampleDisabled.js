import React, {Component} from 'react';
import {Switch, Checkbox} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * @en
 * Disabled
 *
 * Use prop `disabled` to disable the `Switch`.
 *
 * @cn
 * 禁用
 *
 * 使用属性`disabled`来禁用开关。
 */
export default class ExampleBase extends Component {
  state = {
    disabled: true
  }

  render() {
    return (
      <ExampleBlock
        en={<Checkbox
          label={`I am${this.state.disabled ? '' : ' not'} disabled`}
          checked={this.state.disabled}
          onChange={(event, isChecked) => this.setState({disabled: isChecked})}
        />}
        cn={<Checkbox
          label={`我现在${this.state.disabled ? '' : '没有'}被禁用`}
          checked={this.state.disabled}
          onChange={(event, isChecked) => this.setState({disabled: isChecked})}
        />}
      >
        <Switch
          auto
          disabled={this.state.disabled}
        />
      </ExampleBlock>
    );
  }
}
