import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from '../../seeds/Icon';

import getRestProps from '../../utils/getRestProps';

export default class Card extends Component {
  static propTypes = {
    /**
     * @en
     * the card's children
     *
     * @cn
     * 子节点
     */
    children: PropTypes.node,

    /**
     * @en
     * the card's title
     *
     * @cn
     * 卡片的标题
     */
    title: PropTypes.string,

    /**
     * @en
     * the card's subtitle
     *
     * @cn
     * 卡片的副标题
     */
    subtitle: PropTypes.string,

    /**
     * @en
     * the card title's style
     *
     * @cn
     * 卡片标题的`style`
     */
    titleStyle: PropTypes.object,

    /**
     * @en
     * the card content's style
     *
     * @cn
     * 卡片内容的`style`
     */
    containerStyle: PropTypes.object,

    /**
     * @en
     * the card's title icon
     *
     * @cn
     * 卡片标题的icon
     */
    icon: PropTypes.node,

    /**
     * @en
     * whether the card is expanded
     *
     * @cn
     * 卡片是否可以伸缩
     */
    expand: PropTypes.bool,

    /**
     * @en
     * expandIcon
     *
     * @cn
     * 伸缩的图标
     */
    expandIcon: PropTypes.node,

    /**
     * @en
     * whether the card is open
     *
     * @cn
     * 卡片的伸缩状态
     */
    open: PropTypes.bool,

    /**
     * @en
     * whether the card is open firstTime
     *
     * @cn
     * 是否默认打开
     */
    defaultOpen: PropTypes.bool,

    /**
     * @en
     * className
     *
     * @cn
     * 卡片的`class`
     */
    className: PropTypes.string,
    /**
     * @en
     * onClick
     *
     * @cn
     * onClick
     */
    onClick: PropTypes.func
  }

  static defaultProps = {
    icon: <Icon type="yukibana-o" color="#01b5fd" />,
    expand: false,
    expandIcon: null,
    defaultOpen: false
  };

  state = {
    open: this.props.open || this.props.defaultOpen
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== undefined) this.setState({open: nextProps.open});
  }

  handleExpand = () => {
    this.setState({open: !this.state.open});
  };

  handleClick = e => {
    const {onClick} = this.props;
    if (!onClick) return;
    e.stopPropagation();
    onClick(e);
  }

  render() {
    const {children, title, subtitle, icon, titleStyle, expand, expandIcon, className} = this.props;
    const {open} = this.state;
    const cls = cx({
      'hana-card': !expand,
      'hana-card-expand': expand,
      'hana-card-expand-open': open
    }, className);
    const restProps = getRestProps(Card, this.props);
    return (
      <div className={cls} onClick={this.handleClick} {...restProps}>
        <div className="hana-card-title" style={titleStyle}>
          {icon}
          {title}
          <span className="hana-card-subtitle">{subtitle}</span>
          {expand &&
            <div className="hana-card-expand-icon-wrap">
              {expandIcon || <Icon type="leaf" className="hana-card-expand-icon" onClick={this.handleExpand} />}
            </div>
          }
        </div>
        <div className="hana-card-container">
          <div className="hana-card-container-wrap">
            {children}
          </div>
        </div>
      </div>
    );
  }
}
