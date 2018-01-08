import React, {Component} from 'react';
import {Switch, Checkbox} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * @en
 * Disabled
 *
 * Checkbox can be disabled by prop `disabled`.
 *
 * @cn
 * 禁用状态
 *
 * 使用`disabled`属性来禁用复选框。
 */
export default class ExampleDisabled extends Component {
  state = {
    disabled: true
  }

  render() {
    return (
      <div>
        <ExampleBlock
          en={
            <div>
              <span style={{marginRight: 10}}>{'am I disabled 0v0?'}</span>
              <Switch
                auto
                checked={this.state.disabled}
                onChange={isChecked => this.setState({disabled: isChecked})}
              />
            </div>
          }

          cn={
            <div>
              <span style={{marginRight: 10}}>{'点我改变禁用状态>._.>'}</span>
              <Switch
                auto
                checked={this.state.disabled}
                onChange={isChecked => this.setState({disabled: isChecked})}
              />
            </div>
          }
        >
          <Checkbox
            label={`I am${this.state.disabled ? '' : ' not'} disabled`}
            disabled={this.state.disabled}
            auto
          />
        </ExampleBlock>
      </div>
    );
  }
}
