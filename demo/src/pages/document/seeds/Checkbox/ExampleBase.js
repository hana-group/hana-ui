import React, {Component} from 'react';
import {Checkbox} from 'hana-ui';

/**
 * @en
 * Base
 *
 * Base example of the checkbox component. Using `checked` to control the statement.
 * When the state changed, it will trigger `onChange` event.
 *
 * @cn
 * 基础
 *
 * 基本的选择框，使用`checked`属性控制是否被选中；当选中状态改变时，会触发`onChange`事件。
 */

export default class ExampleBase extends Component {
  state = {
    isChecked: true
  }

  render() {
    return (
      <div>
        <Checkbox
          label={<p style={{color: '#6cf', display: 'inline-block'}}>I am{this.state.isChecked ? '' : ' not'} checked</p>}
          checked={this.state.isChecked}
          onChange={(event, isChecked) => this.setState({isChecked})}
        />
      </div>
    );
  }
}
