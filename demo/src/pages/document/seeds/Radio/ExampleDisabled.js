import React, {Component} from 'react';
import {Switch, Radio} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * @en
 * Disabled Example
 *
 * Use prop `disabled` to disable the radio.
 *
 * @cn
 * 禁用示例
 *
 * 使用属性`disabled`来禁用单选框。
 */
export default class ExampleDisabled extends Component {
  state = {
    disabled: true
  }

  render() {
    return (
      <ExampleBlock
        en={
          <div>
            {'am I disabled ?'}
            <Switch
              auto
              checked={this.state.disabled}
              onChange={isChecked => this.setState({disabled: isChecked})}
            />
          </div>
        }
        cn={
          <div>
            {'点我禁用>_<'}
            <Switch
              auto
              checked={this.state.disabled}
              onChange={isChecked => this.setState({disabled: isChecked})}
            />
          </div>
        }
      >

        <Radio
          label={`I am${this.state.disabled ? '' : ' not'} disabled`}
          disabled={this.state.disabled}
          auto
        />
      </ExampleBlock>
    );
  }
}
