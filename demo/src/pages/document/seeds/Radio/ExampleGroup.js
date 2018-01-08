import React, {Component} from 'react';
import {Radio, RadioGroup} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * @en
 * Group
 *
 * Use `RadioGroup` to control multiple Radios.
 *
 * @cn
 * 单选框组
 *
 * 使用`RadioGroup`来管理多个单选框组件，仅需在`RadioGroup`上使用`value`及`onChange`属性。
 */
export default class ExampleGroup extends Component {
  state = {
    val: '1'
  }

  render() {
    return (
      <ExampleBlock
        en={
          <p>The current value is <b className="sign">{this.state.val}</b></p>
        }
        cn={
          <p>现在的值为 <b className="sign">{this.state.val}</b></p>
        }

      >
        <RadioGroup value={this.state.val} onChange={val => this.setState({val})}>
          <Radio label="Spring" value="1" />
          <Radio label="Summer" value="2" />
          <Radio label="Autumn" value="3" />
          <Radio label="Winter" value="4" />
        </RadioGroup>

      </ExampleBlock>
    );
  }
}
