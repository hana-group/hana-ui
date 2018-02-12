import React, {Component} from 'react';
import {Slider} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * @en
 * Base
 *
 * Use props `value` and `defaultValue` to control slider's value.
 *
 * Use `onChange` to handle the change event.
 *
 * @cn
 * 基础
 *
 * 使用属性`value`和`defaultValue`来控制滑动条的值。
 *
 * 使用`onChange`来获取滑动条的状态。
 */
export default class ExampleBase extends Component {
  state = {
    val: 140
  }

  render() {
    return (
      <ExampleBlock
        en={<p>The currentValue is<b className="sign">{this.state.val}</b></p>}
        cn={<p>当前值为 <b className="sign">{this.state.val}</b></p>}
      >
        <Slider
          defaultValue={140}
          min={100}
          max={150}
          onChange={val => this.setState({val})}
        />

        <Slider
          style={{marginTop: 40}}
          defaultValue={140}
          min={100}
          max={150}
          size='small'
          onChange={val => this.setState({val})}
        />

        <Slider
          style={{marginTop: 40}}
          defaultValue={140}
          min={100}
          max={150}
          size='large'
          onChange={val => this.setState({val})}
        />
      </ExampleBlock>
    );
  }
}
