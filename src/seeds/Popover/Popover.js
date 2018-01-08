/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/2/20
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {getRestProps} from '../../utils';
import Tooltip from '../Tooltip';
import IconButton from '../../burgeon/IconButton';

export default class Popover extends Component {
  static propTypes = {
    /**
     * @en
     * Mode of view.
     *
     * @cn
     * 弹出框的显示类型。
     */
    view: PropTypes.oneOf(['border', 'fill']),
    /**
     * @en
     * Popover's title.
     *
     * @cn
     * 弹出框的标题。
     */
    title: PropTypes.node,
    /**
     * @en
     * Popover's sub-title.
     *
     * @cn
     * 弹出框的副标题。
     */
    subTitle: PropTypes.node,
    /**
     * @en
     * Popover's content.
     *
     * @cn
     * 弹出框的内容。
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
     * Use this property to control popover by yourself.
     *
     * @cn
     * 用于自行控制弹出框的显示与关闭。
     */
    show: PropTypes.bool,
    /**
     * @en
     * If the popover will be disabled.
     *
     * @cn
     * 禁用弹出框
     */
    disabled: PropTypes.bool,
    /**
     * @en
     * A callback will be called when popover showing or hiding.
     *
     * show => void
     *
     * @cn
     * 当弹出框被打开或者关闭时，将会触发这个回调。
     *
     * show => void
     */
    onChange: PropTypes.func,
    /**
     * @en
     * The operation could control popover.
     *
     * @cn
     * 触发打开弹出框这个行为的方式。
     */
    trigger: PropTypes.oneOf(['hover', 'focus', 'click']),
    /**
     * @en
     * Color of popover's theme color.
     *
     * @cn
     * 弹出框的主题颜色。
     */
    color: PropTypes.string,
    /**
     * @en
     * Popover's style.
     *
     * @cn
     * 弹出框的样式。
     */
    style: PropTypes.object,
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
     * Content's style.
     *
     * @cn
     * 内容的样式。
     */
    contentStyle: PropTypes.object,
    /**
     * @en
     * Popover's className.
     *
     * @cn
     * 弹出框根元素的class。
     */
    className: PropTypes.string,
    /**
     * @en
     * Your component which uses popover.
     *
     * @cn
     * 想要绑定弹出框的组件。
     */
    children: PropTypes.node
  };

  static defaultProps = {
    view: 'border',
    content: null,
    position: 'bottom',
//    show: false,
    disabled: false,
    onChange: () => {},
    trigger: 'click',
//    color: '',
    containerStyle: {},
    contentStyle: {},
    style: {},
    children: null
  };

  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show !== undefined ? this.props.show : false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show !== undefined) {
      this.setState({
        show: nextProps.show
      });
    }
  }

  handleClose = () => {
    const {onChange} = this.props;
    this.setState({
      show: false
    });
    onChange(false);
  };

  handleChange = show => {
    const {
      onChange
    } = this.props;

    if (this.state.show !== show) {
      this.setState({show});
      onChange(show);
    }
  };

  render() {
    const {
      children,
      className,
      contentStyle, // eslint-disable-line
      title, // eslint-disable-line
      subTitle, // eslint-disable-line
      content, // eslint-disable-line
      onChange, // eslint-disable-line
      ...otherProps
    } = this.props;

    const {
      show
    } = this.state;

    const restProps = getRestProps(Popover, this.props);

    return (
      <Tooltip
        className={cx(
          'hana-popover',
          className
        )}
        content={this.renderContent()}
        show={show}
        onChange={this.handleChange}
        {...otherProps}
        {...restProps}
      >
        {children}
      </Tooltip>
    );
  }

  renderContent() {
    const {
      title,
      subTitle,
      content,
      view,
      contentStyle
    } = this.props;

    return (
      <div
        className={cx(
          'hana-popover-container',
          `hana-popover-${view}`
        )}
      >
        <div
          className={cx(
            'hana-popover-top'
          )}
        >
          <div
            className={cx(
              'hana-popover-title'
            )}
          >
            {title}
            <div
              className={cx(
                'hana-popover-sub-title'
              )}
            >
              {subTitle}
            </div>
          </div>
          <div
            className={cx(
              'hana-popover-close'
            )}
          >
            <IconButton
              type={'himawari'}
              className={'hana-popover-close-icon'}
              onClick={this.handleClose}
            />
          </div>
        </div>
        <div
          className={cx(
            'hana-popover-hr'
          )}
        >
        </div>
        <div
          className={cx(
            'hana-popover-content'
          )}
          style={contentStyle}
        >
          {content}
        </div>
      </div>
    );
  }
}
