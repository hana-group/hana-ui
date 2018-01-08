import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Icon, Tooltip} from '../../index';

import getRestProps from '../../utils/getRestProps';

export default class IconButton extends Component {
  static propTypes = {
    /**
     * @en
     * the icon type
     *
     * @cn
     * 图标类型
     */
    type: PropTypes.string.isRequired,

    /**
     * @en
     * the icon's color
     *
     * @cn
     * 图标颜色
     */
    color: PropTypes.string,

    /**
     * @en
     * the wrap's style
     *
     * @cn
     * 图标按钮的外层样式
     */
    style: PropTypes.object,

    /**
     * @en
     * the icon's size
     *
     * @cn
     * 图标尺寸
     */
    size: PropTypes.oneOf(['small', 'middle', 'large']),

    /**
     * @en
     * the icon's style
     *
     * @cn
     * 图标的样式
     */
    iconStyle: PropTypes.object,

    /**
     * @en
     * tooltip's content
     *
     * @cn
     * `Tooltip`的内容
     */
    tipContent: PropTypes.node,

    /**
     * @en
     * tooltip's style
     *
     * @cn
     * `Tooltip`的样式
     */
    tipStyle: PropTypes.object,

    /**
     * @en
     * tooltip's color
     *
     * @cn
     * `Tooltip`的颜色
     */
    tipColor: PropTypes.string,

    /**
     * @en
     * tooltip's position
     *
     * @cn
     * `Tooltip`的位置
     */
    tipPosition: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),

    /**
     * @en
     * whether it is disabled
     *
     * @cn
     * 是否禁用
     */
    disabled: PropTypes.bool,

    /**
     * @en
     * onClick handler
     *
     * @cn
     * 点击时的回调函数
     */
    onClick: PropTypes.func
  }

  static defaultProps = {
    disabled: false
  }

  clickHandle = e => {
    const {disabled, onClick} = this.props;
    if (disabled) return;
    if (onClick) onClick(e);
  }

  render() {
    const {type, color, style, size, tipContent, tipStyle,
      iconStyle, tipPosition, tipColor, disabled} = this.props;
    const restProps = getRestProps(IconButton, this.props);
    const hasTooltip = Boolean(tipContent);
    const computedTipStyle = Object.assign({whiteSpace: 'nowrap'}, tipStyle);
    const computedIconStyle = Object.assign({
      cursor: disabled ? 'not-allowed' : 'pointer'
    }, iconStyle);
    const computedColor = disabled ? '#999' : color;
    const icon = (<Icon
      type={type}
      color={computedColor}
      style={computedIconStyle}
      size={size}
      {...restProps}
      onClick={this.clickHandle}
    />);
    return (
      hasTooltip ?
        <Tooltip
          containerStyle={style}
          style={computedTipStyle}
          content={tipContent}
          color={tipColor}
          position={tipPosition}
        >
          {icon}
        </Tooltip>
      :
        icon
    );
  }
}
