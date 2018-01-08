import React, {Component} from 'react';
import {Radio} from 'hana-ui';

/**
 * @en
 * Base
 *
 * A base radio component.
 *
 * @cn
 * 基础
 *
 * 基础的单选框组件。
 */

export default class ExampleBase extends Component {
  state = {
    isChecked: false
  }

  render() {
    return (
      <div>
        <Radio
          label={<span style={{color: 'red'}}>I am{this.state.isChecked ? '' : ' not'} checked</span>}
          checked={this.state.isChecked}
          onChange={(event, isChecked) => this.setState({isChecked})}
        />
      </div>
    );
  }
}
