import React, {Component} from 'react';
import {Checkbox} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * @en
 * Auto
 *
 * Using prop `auto` to let it controlled by itself.
 *
 * @cn
 * 自控模式
 *
 * 使用`auto`属性使其自行控制选中状态。
 */
export default class ExampleAuto extends Component {
  state = {
    checked: true
  }

  render() {
    return (
      <div>
        <ExampleBlock
          en={
            <p>
              You changed the state, now it is
              <b className="sign"> {`${this.state.checked}`}</b>
              .
            </p>
          }

          cn={
            <p>
              你改变了状态，现在是
              <b className="sign"> {`${this.state.checked}`}</b>
              。
            </p>
          }
        >
          <Checkbox
            auto
            defaultChecked={this.state.checked}
            label="click to change state"
            onChange={(event, checked) => this.setState({checked})}
          />
        </ExampleBlock>
      </div>
    );
  }
}
