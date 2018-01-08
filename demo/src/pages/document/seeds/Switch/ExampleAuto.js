import React, {Component} from 'react';
import {Switch} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * @en
 * auto
 *
 * Switch module controlled by itself, using prop `auto`
 *
 * @cn
 * 自控模式
 *
 * 开关可以添加属性`auto`来自行控制状态。
 */

export default class ExampleAuto extends Component {
  state = {
    checked: true
  }
  render() {
    return (
      <ExampleBlock
        en={<p>You changed the state, now it is<b className="sign"> {`${this.state.checked}`}</b></p>}
        cn={<p>现在的状态为<b className="sign"> {`${this.state.checked ? '开' : '关'}`}</b></p>}
      >
        <Switch
          auto
          defaultChecked={this.state.checked}
          onChange={checked => this.setState({checked})}
        />
      </ExampleBlock>
    );
  }
}
