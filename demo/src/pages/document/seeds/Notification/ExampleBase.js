import React, {Component} from 'react';
import {Button, Notifications} from 'hana-ui';

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
          onClick={() => this.openNotification('info')}
        >
          normal
        </Button>
        <Button
          type={'primary'}
          onClick={() => this.openNotification('success')}
        >
          success
        </Button>
        <Button
          type={'error'}
          onClick={() => this.openNotification('error')}
        >
          error
        </Button>
        <br />
        <Button
          onClick={() => this.openNotification(
            'info',
            React.createElement('img', {
              src: 'https://i0.hdslb.com/icon/3b7250b30b0e56fe354f6759694009d5.gif'
            })
          )}
        >
          Custom content
        </Button>
        <Notifications
          notification={this.state.notification}
        />
      </div>
    );
  }
}
