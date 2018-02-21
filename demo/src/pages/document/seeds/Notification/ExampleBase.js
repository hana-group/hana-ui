import React, {Component} from 'react';
import {Button, Notifications} from 'hana-ui';

const style = {
  margin: '5px 5px 5px 0'
};

/**
 * @en
 * Base Example
 *
 * Normal notification will auto hide after 2.5s
 *
 * @cn
 * 基础示例
 *
 * 默认显示时长为2.5秒.可传入`type` 来控制提示类型
 */

export default class ExampleBase extends Component {
  state = {
    notification: {}
  }

  openNotification(type, content) {
    const notification = {
      type,
      content: content || 'Example long long long long long long long content',
      showClose: true,
      duration: Math.floor(Math.random() * 6) + 1
    };

    this.setState({notification});
  }

  render() {
    return (
      <div>
        <Button
          style={style}
          onClick={() => this.openNotification('info')}
        >
          normal
        </Button>
        <Button
          style={style}
          type={'primary'}
          onClick={() => this.openNotification('success')}
        >
          success
        </Button>
        <Button
          style={style}
          type={'error'}
          onClick={() => this.openNotification('error')}
        >
          error
        </Button>
        <Button
          style={style}
          type={'warning'}
          onClick={() => this.openNotification('warning')}
        >
          warning
        </Button>
        <br />
        <Button
          style={style}
          onClick={() => this.openNotification(
            'info',
            <img src={'http://oekm6wrcq.bkt.clouddn.com/3b7250b30b0e56fe354f6759694009d5.gif'} alt={'custom'} />
          )}
        >
          custom
        </Button>
        <Notifications
          notification={this.state.notification}
        />
      </div>
    );
  }
}
