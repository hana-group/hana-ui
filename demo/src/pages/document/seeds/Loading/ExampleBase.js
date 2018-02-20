import React, {Component} from 'react';
import {Loading, Button} from 'hana-ui';

/**
 * @en
 * Base
 *
 * hana provide three mode to show the loading.  
 * Press button to show `Loading`, it will hide in 5 seconds.
 *
 * @cn
 * 基础
 *
 * hana 提供了三种模式去显示加载器。  
 * 点击按钮显示loading，5秒后停止loading。
 */
export default class ExampleBase extends Component {
  state = {
    show: false,
    mode: 'queue'
  }

  startLoading = (mode) => {
    this.setState({show: true, mode});
    setTimeout(
      () => this.setState({show: false}),
      5000
    );
  }

  render() {
    return (
      <div>
        <Button
          type="primary"
          onClick={() => this.startLoading('queue')}
        >
          queue
        </Button>
        <br />
        <br />
        <Button
          type="primary"
          onClick={() => this.startLoading('rotate')}
        >
          rotate
        </Button>
        <br />
        <br />
        <Button
          type="primary"
          onClick={() => this.startLoading('image')}
        >
          image
        </Button>
        {this.state.show && <Loading mode={this.state.mode} image={'/demo/static/images/himawari.png'} />}
      </div>
    );
  }
}
