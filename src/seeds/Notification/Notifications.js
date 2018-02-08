import React, {Component} from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';

import {TransitionGroup, CSSTransition} from 'react-transition-group';
import Notification from './Notification';

class Notifications extends Component {
  static propTypes = {
    /**
     * @en
     * notification instance
     *
     * @cn
     * <Notification /> 组件实例
     */
    notification: PropTypes.object,
    /**
     * @en
     * Custom function when notification closed
     *
     * @cn
     * 自定义通知弹窗关闭后回调
     */
    onRequestClose: PropTypes.func
  };

  state = {
    notifications: []
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.notification !== this.props.notification) {
      this.setState({
        notifications: update(this.state.notifications, {$push: [nextProps.notification]})
      });
    }
  }

  add = notice => {
    if (!notice.key) {
      notice.key = Math.random().toString(32);
    }
    this.setState(previousState => {
      const notifications = previousState.notifications;
      if (!notifications.filter(v => v.key === notice.key).length) {
        return {
          notifications: notifications.concat(notice)
        };
      }
    });
  };

  handleClose(notification) {
    const notifications = this.state.notifications.filter(n => n.key !== notification.key);
    this.setState({notifications});
  }

  render() {
    const state = this.state;

    return (
      <div className="hana-notification">
        <TransitionGroup>
          {state.notifications.length > 0
            ? state.notifications.map(notification => {
                notification.key = notification.key || `hana-notification-${new Date().getTime()}`;
                return (
                  notification.content && (
                    <CSSTransition
                      key={notification.key}
                      classNames="hana-notification"
                      timeout={{enter: 300, exit: 300}}
                    >
                      <Notification
                        onRequestClose={this.props.onRequestClose}
                        handleClose={() => this.handleClose(notification)}
                        {...notification}
                      />
                    </CSSTransition>
                  )
                );
              })
            : null}
        </TransitionGroup>
      </div>
    );
  }
}

export default Notifications;
