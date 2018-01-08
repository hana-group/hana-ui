/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 17/1/4
 */
import React, {Component, cloneElement} from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import cx from 'classnames';
import RenderToNode from '../../sprites/RenderToNode';
import {getRestProps} from '../../utils';

const noop = () => {};

// TODO 外框样式配置

export default class Tooltip extends Component {
  static propTypes = {
    /**
     * @en
     * Mode of view.
     *
     * @cn
     * 提示框的显示类型。
     */
    view: PropTypes.oneOf(['border', 'fill']),
    /**
     * @en
     * Tooltip content.
     *
     * @cn
     * 提示框的内容。
     */
    content: PropTypes.node,
    /**
     * @en
     * Position to show.
     *
     * @cn
     * 默认相对于children显示的位置。
     */
    position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    /**
     * @en
     * Use this property to control tooltip by yourself.
     *
     * @cn
     * 用于自行控制提示框的显示与关闭。
     */
    show: PropTypes.bool,
    /**
     * @en
     * If the tooltip will be disabled.
     *
     * @cn
     * 禁用提示框。
     */
    disabled: PropTypes.bool,
    /**
     * @en
     * A callback will be called when tooltip showing or hiding.
     *
     * show => void
     *
     * @cn
     * 当提示框被打开或者关闭时，将会触发这个回调。
     *
     * show => void
     */
    onChange: PropTypes.func,
    /**
     * @en
     * The operation could control tooltip.
     *
     * @cn
     * 触发打开提示框这个行为的方式。
     */
    trigger: PropTypes.oneOf(['hover', 'focus', 'click']),
    /**
     * @en
     * Color of tooltip's theme color.
     *
     * @cn
     * 提示框的主题颜色。
     */
    color: PropTypes.string,
    /**
     * @en
     * Root's style.
     *
     * @cn
     * 根元素的样式。
     */
    containerStyle: PropTypes.object,
    /**
     * @en
     * Tooltip's style.
     *
     * @cn
     * 提示框的样式。
     */
    style: PropTypes.object,
    /**
     * @en
     * Tooltip's className.
     *
     * @cn
     * 提示框根元素的class。
     */
    className: PropTypes.string,
    /**
     * @en
     * Your component which uses tooltip.
     *
     * @cn
     * 想要绑定提示框的组件。
     */
    children: PropTypes.node
  };

  static defaultProps = {
    view: 'fill',
    content: null,
    position: 'bottom',
    //    show: false,
    onChange: () => {},
    trigger: 'hover',
    //    color: '',
    containerStyle: {},
    style: {},
    children: null
  };

  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show !== undefined ? this.props.show : false
    };
    this.contentStyle = {};
    this.nodePreRect = {};
  }

  componentDidMount() {
    document.addEventListener('scroll', this.updateContentStyle, true);
    window.addEventListener('resize', this.updateContentStyle, true);
    this.forceUpdate();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show !== undefined && this.props.show !== nextProps.show && this.state.show !== nextProps.show) {
      this.setState({
        show: nextProps.show
      });
    }
  }

  componentDidUpdate() {
    this.updateContentStyle();
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.updateContentStyle, true);
    window.removeEventListener('resize', this.updateContentStyle, true);
  }

  updateContentStyle = () => {
    const {position: pos, style} = this.props;

    if (!this.state.show) {
      return;
    }

    const node = findDOMNode(this.node);

    if (!node) {
      return;
    }

    const nRect = node.getBoundingClientRect();

    const {
      left, right, top, bottom
    } = this.nodePreRect;

    if (nRect.left === left && nRect.right === right && nRect.top === top && nRect.bottom === bottom) {
      return;
    }

    this.nodePreRect = nRect;

    const position = {};

    switch (pos) {
      case 'top':
        position.left = (nRect.left + nRect.right) / 2;
        position.top = nRect.top;
        break;
      case 'bottom':
        position.left = (nRect.left + nRect.right) / 2;
        position.top = nRect.bottom;
        break;
      case 'left':
        position.left = nRect.left;
        position.top = (nRect.top + nRect.bottom) / 2;
        break;
      case 'right':
        position.left = nRect.right;
        position.top = (nRect.top + nRect.bottom) / 2;
        break;
      default:
        break;
    }

    const result = {};

    if (!(style.left || style.right)) {
      result.left = position.left;
    }

    if (!(style.top || style.bottom)) {
      result.top = position.top;
    }

    this.contentStyle = result;

    this.forceUpdate();
  };

  handleOpen = () => {
    const {onChange, disabled} = this.props;

    if (disabled) {
      return;
    }

    this.setState({
      show: true
    });
    onChange(true);
  };

  handleClose = () => {
    const {onChange, disabled} = this.props;

    if (disabled) {
      return;
    }

    this.setState({
      show: false
    });
    onChange(false);
  };

  handleOpenWithChildren = (eventName, children, event) => {
    if (children.props[eventName]) {
      children.props[eventName](event);
    }
    this.handleOpen();
  };

  handleCloseWithChildren = (eventName, children, event) => {
    if (children.props[eventName]) {
      children.props[eventName](event);
    }
    this.handleClose();
  };

  render() {
    const {
      view, content, containerStyle, className, trigger, color, style, position, children
    } = this.props;

    const {show} = this.state;

    // controlled by itself
    const useHover = trigger === 'hover';
    const useFocus = trigger === 'focus';
    const useClick = trigger === 'click';

    const otherProps = getRestProps(Tooltip, this.props);

    return (
      <div className={cx('hana-tooltip')} style={containerStyle}>
        {typeof children === 'string' || children instanceof Array ? (
          <span
            ref={c => {
              this.node = c;
            }}
            className={cx('hana-tooltip-node')}
            {...Object.assign(
              {},
              useHover && {onMouseEnter: this.handleOpen},
              useHover && {onMouseLeave: this.handleClose},
              useFocus && {onFocus: this.handleOpen},
              useFocus && {onBlur: this.handleClose},
              useClick && {onClick: show ? this.handleClose : this.handleOpen}
            )}
          >
            <i>{children}</i>
          </span>
        ) : (
          <span
            ref={c => {
              this.node = c;
            }}
            className={cx('hana-tooltip-node')}
          >
            {cloneElement(
              children,
              Object.assign(
                {},
                useHover && {
                  onMouseEnter: event => this.handleOpenWithChildren('onMouseEnter', children, event)
                },
                useHover && {
                  onMouseLeave: event => this.handleCloseWithChildren('onMouseLeave', children, event)
                },
                useFocus && {
                  onFocus: event => this.handleOpenWithChildren('onFocus', children, event)
                },
                useFocus && {
                  onBlur: event => this.handleCloseWithChildren('onBlur', children, event)
                },
                useClick && {
                  onClick: show
                    ? event => this.handleCloseWithChildren('onClick', children, event)
                    : event => this.handleOpenWithChildren('onClick', children, event)
                }
              )
            )}
          </span>
        )}
        {show && (
          <RenderToNode>
            <TransitionGroup>
              <CSSTransition
                timeout={{enter: 500, exit: 500}}
                classNames="hana-tooltip-content"
                className={cx(
                  'hana-tooltip-content',
                  `hana-tooltip-content-${position}`,
                  `hana-tooltip-content-${view}`,
                  className
                )}
                style={Object.assign(
                  {},
                  color && {backgroundColor: color},
                  color && position === 'left' && {borderLeftColor: color},
                  color && position === 'right' && {borderRightColor: color},
                  color && position === 'top' && {borderTopColor: color},
                  color && position === 'bottom' && {borderBottomColor: color},
                  this.contentStyle,
                  style
                )}
                onMouseEnter={useHover ? event => this.handleOpenWithChildren('onMouseEnter', this, event) : noop}
                onMouseLeave={useHover ? event => this.handleCloseWithChildren('onMouseLeave', this, event) : noop}
              >
                <div>
                  {content}
                </div>
              </CSSTransition>
            </TransitionGroup>
          </RenderToNode>
        )}
      </div>
    );
  }
}
