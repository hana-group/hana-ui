import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './title.scss';

class Title extends Component {
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
     * Show component sub title
     *
     * @cn
     * 显示子标题
     */
    subTitle: PropTypes.string,
    /**
     * @en
     * Show title icon
     *
     * @cn
     * 显示标题图标
     */
    icon: PropTypes.node,
    /**
     * @en
     * Placed icon on the right of title
     *
     * @cn
     * 最右侧显示标题图标
     */
    iconRight: PropTypes.node,
    /**
     * @en
     * Custom left icon click event
     *
     * @cn
     * 自定义标题左侧按钮点击事件
     */
    leftIconClick: PropTypes.func,
    /**
     * @en
     * Setting component children element
     *
     * @cn
     * 设置组件的子组件
     */
    children: PropTypes.node
  };

  checkPropType(prop, type) {
    return typeof prop === type;
  }

  render() {
    const {
      style, subTitle, icon, iconRight, children, ...rest
    } = this.props;
    const prefix = 'hana';

    if (this.checkPropType(subTitle, 'string')) {
      return (
        <div className={`${prefix}-title`} style={style}>
          {this.renderIcon(icon)}
          {this.renderIcon(iconRight, true)}
          <div style={{display: 'inline-block'}}>
            <div className={`${prefix}-title-content`}>{children}</div>
            <div className={`${prefix}-title-sub`}>{subTitle}</div>
          </div>
        </div>
      );
    }

    return (
      <div className={`${prefix}-title`} style={style}>
        {this.renderIcon(icon)}
        {this.renderIcon(iconRight, true)}
        <div className={`${prefix}-title-content`}>{children}</div>
      </div>
    );
  }

  handleLeftIconClick = () => {
    const {leftIconClick} = this.props;
    leftIconClick && leftIconClick();
  };

  renderIcon(node, isPlacedRight) {
    if (!node) return;

    if (isPlacedRight) {
      return <div className="icon-right">{node}</div>;
    }

    return (
      <div className="icon-left" onClick={this.handleLeftIconClick}>
        {node}
      </div>
    );
  }
}

export default Title;
