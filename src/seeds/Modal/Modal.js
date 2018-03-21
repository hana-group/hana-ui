import React from 'react';
import {findDOMNode} from 'react-dom';
import PropTypes from 'prop-types';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import cx from 'classnames';

import Divider from '../Divider';
import {Button} from '../Button';
import Icon from '../Icon';
import RenderToNode from '../../sprites/RenderToNode';

import getScrollbarWidth from '../../utils/getScrollbarWidth';

class Modal extends React.Component {
  static propTypes = {
    /**
     * @en
     * Custom component style
     *
     * @cn
     * 自定义组件按钮样式
     */
    style: PropTypes.object,
    /**
     * @en
     * Custom modal wrapper style
     *
     * @cn
     * 自定义组件主弹窗样式
     */
    wrapperStyle: PropTypes.object,
    /**
     * @en
     * Custom modal content style
     *
     * @cn
     * 自定义组件弹窗内容区域的样式
     */
    contentStyle: PropTypes.object,
    /**
     * @en
     * Show modal title
     *
     * @cn
     * 显示弹窗标题
     */
    title: PropTypes.string,
    /**
     * @en
     * Custom modal title style
     *
     * @cn
     * 自定义标题样式
     */
    titleStyle: PropTypes.object,
    /**
     * @en
     * Control whether show modal
     *
     * @cn
     * 是否显示弹窗
     */
    show: PropTypes.bool.isRequired,
    /**
     * @en
     * Control whether show modal close button
     *
     * @cn
     * 是否显示关闭按钮
     */
    showClose: PropTypes.bool,
    /**
     * @en
     * Custom modal close node
     *
     * @cn
     * 自定义弹窗关闭按钮
     */
    close: PropTypes.node,
    /**
     * @en
     * Show confirm button & custom confirm button on click event
     *
     * @cn
     * 显示确定按钮，并自定义确定按钮点击事件
     */
    confirm: PropTypes.func,
    /**
     * @en
     * Same as confirm props
     *
     * @cn
     * 同confirm 配置
     */
    cancel: PropTypes.func,
    /**
     * @en
     * Show custom modal action button
     *
     * @cn
     * 显示弹窗按钮组合
     */
    actions: PropTypes.node,
    /**
     * @en
     * Setting modal key value
     *
     * @cn
     * 设置弹窗key
     */
    id: PropTypes.string,
    /**
     * @en
     * Setting group component children element
     *
     * @cn
     * 设置组件的子组件
     */
    children: PropTypes.node
  };

  static defaultProps = {
    showClose: false
  };

  constructor() {
    super();
    this.emitToggleDisable = true;
    this.prefix = 'hana-modal';
  }

  componentDidMount() {
    const {show} = this.props;
    findDOMNode(this.container).style.display = show ? 'bloack' : 'none';
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show !== this.props.show) {
      this.emitToggleDisable = true;
    }
  }

  componentDidUpdate() {
    const {show} = this.props;
    if (this.emitToggleDisable) {
      this.timer && clearTimeout(this.timer);
      if (show) {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.borderRight = `${getScrollbarWidth()}px solid transparent`;
        findDOMNode(this.container).style.display = 'block';
      } else {
        document.documentElement.style.overflow = 'auto';
        document.body.style.borderRight = 0;
        this.timer = setTimeout(() => {
          findDOMNode(this.container).style.display = 'none';
        }, 350);
      }
      this.emitToggleDisable = false;
    }
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  setContainerRef = c => {
    this.container = c;
  };

  hideModal = () => {
    const {cancel} = this.props;
    cancel && cancel();
  };

  render() {
    const {id} = this.props;
    return (
      <RenderToNode>
        <TransitionGroup key={id} className={cx(this.prefix)} ref={this.setContainerRef}>
          {this.renderOverlay()}
          {this.renderModal()}
        </TransitionGroup>
      </RenderToNode>
    );
  }

  renderModal() {
    const {
      wrapperStyle, contentStyle, title, titleStyle, show, showClose, actions, children
    } = this.props;
    if (!show) return null;
    return (
      <CSSTransition
        classNames="hana-modal"
        timeout={{enter: 200, exit: 200}}
        className={`${this.prefix}-main`}
        style={wrapperStyle}
      >
        <div>
          {title && (
            <div className={`${this.prefix}-title-wrapper`} style={titleStyle}>
              <p className={`${this.prefix}-title`}>{title}</p>
              {showClose && this.renderCloseButton()}
            </div>
          )}
          {title && <Divider className={cx('hana-modal-divider')} />}
          <div className={`${this.prefix}-content`} style={contentStyle}>
            {showClose && !title && this.renderCloseButton()}
            {children}
          </div>
          <div className={`${this.prefix}-button`}>{actions || this.renderDefaultAction()}</div>
        </div>
      </CSSTransition>
    );
  }

  renderOverlay() {
    const {show} = this.props;
    if (!show) return null;
    return (
      <CSSTransition classNames="hana-overlay" timeout={{enter: 200, exit: 200}}>
        <div className={`${this.prefix}-overlay`} onClick={this.hideModal} />
      </CSSTransition>
    );
  }

  renderCloseButton() {
    const {close} = this.props;

    if (close) {
      return close;
    }

    return <Icon type="close" onClick={this.hideModal} />;
  }

  renderDefaultAction() {
    const {confirm, cancel} = this.props;
    return (
      <React.Fragment>
        {typeof confirm === 'function' && (
          <Button onClick={confirm} style={{border: 'none'}}>
            确认
          </Button>
        )}
        {typeof cancel === 'function' && (
          <Button onClick={cancel} style={{border: 'none'}}>
            关闭
          </Button>
        )}
      </React.Fragment>
    );
  }
}

export default Modal;
