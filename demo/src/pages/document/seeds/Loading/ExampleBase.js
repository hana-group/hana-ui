import React, {Component} from 'react';
import {Loading, Button} from 'hana-ui';

/**
 * @en
 * Base
 *
 * Press button to show `Loading`, it will hide in 3 seconds.
 *
 * @cn
 * 基础
 *
 * 点击按钮显示loading，3秒后停止loading。
 */
export default class ExampleBase extends Component {
  state = {
    show: false
  }

  startLoading = () => {
    this.setState({show: true});
    setTimeout(
      () => this.setState({show: false}),
      3000
    );
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.startLoading}>load</Button>
        {this.state.show && <Loading />}
      </div>
    );
  }
}
