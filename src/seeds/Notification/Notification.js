import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Icon from '../Icon';

class Notification extends Component {
  static propTypes = {
    /**
     * @en
     * Custom component style
     *
     * @cn
     * 自定义组件样式
     */
    style: PropTypes.object,
    /**
     * @en
     * Setting notification type one of 'info','success','error', 'warning'
     *
     * @cn
     * 设置通知弹窗类型，可选配置：'info','success','error', 'warning'
     */
    type: PropTypes.oneOf(['info', 'success', 'error', 'warning']),
    /**
     * @en
     * Setting component main content
     *
     * @cn
     * 设置通知内容
     */
    content: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ]).isRequired,
    /**
     * @en
     * Component exit time duration, unit is second
     *
     * @cn
     * 组件展示持续时间, 以秒为单位
     */
    duration: PropTypes.number,
    /**
     * @en
     * Whether show close button
     *
     * @cn
     * 是否显示关闭按钮
     */
    showClose: PropTypes.bool,
    /**
     * @en
     * Custom button component class name
     *
     * @cn
     * 设置组件class name
     */
    className: PropTypes.string,
    /**
     * @en
     * Custom close click event
     *
     * @cn
     * 自定义关闭按钮点击事件
     */
    handleClose: PropTypes.func,
    /**
     * @en
     * Custom function when notification closed
     *
     * @cn
     * 自定义通知弹窗关闭后回调
     */
    onRequestClose: PropTypes.func
  }

  static defaultProps = {
    duration: 2.5,
    type: 'info',
    showClose: true
  }

  componentDidMount() {
    const {duration} = this.props;

    if (!isNaN(duration)) {
      this.timer = setTimeout(() => {
        this.close();
      }, duration * 1000);
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  close = () => {
    const {handleClose, onRequestClose} = this.props;

    handleClose();

    if (onRequestClose) {
      onRequestClose();
    }

    clearTimeout(this.timer);
  }

  render() {
    const {style, className, type, content, showClose} = this.props;
    const prefix = 'hana';

    return (
      <div
        className={cx(
          className,
          `${prefix}-notification-item`,
          `${prefix}-notification-${type}`
        )}
        style={style}
      >
        <div className={'notification-icon'} onClick={this.close}>
          {showClose && <Icon type={'close'} color={'black'} />}
        </div>
        {content
          ? <div className={'notification-content'}>{content}</div>
          : null
        }
      </div>
    );
  }
}

export default Notification;
