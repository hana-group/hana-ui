import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from '../Icon';

import getRestProps from '../../utils/getRestProps';

const noop = () => {};

export default class Tag extends Component {
  static propTypes = {
    /**
     * @en
     * the tag's label
     *
     * @cn
     * 标签的子节点
     */
    children: PropTypes.node,

    /**
     * @en
     * the tag's color
     *
     * @cn
     * 标签的颜色
     */
    color: PropTypes.string,

    /**
     * @en
     * the icon's style
     *
     * @cn
     * 标签的样式
     */
    style: PropTypes.object,

    /**
     * @en
     * whether the tag has close button
     *
     * @cn
     * 是否有关闭按钮
     */
    hasClose: PropTypes.bool,

    /**
     * @en
     * callback when the tag's close button is clicked
     *
     * (Event event, String label) => void
     *
     * @cn
     * 关闭时的回调函数
     *
     * (Event event, String label) => void
     */
    onClose: PropTypes.func,

    /**
     * @en
     * callback when the tag(not the close button) is clicked
     *
     * @cn
     * 点击时的回调
     */
    onClick: PropTypes.func,

    /**
     * @en
     * the tag's size
     *
     * @cn
     * 标签的大小
     */
    size: PropTypes.oneOf(['small', 'middle', 'large']),

    /**
     * @en
     * the tag's class
     *
     * @cn
     * 标签的`class`
     */
    className: PropTypes.string
  }

  static defaultProps = {
    size: 'middle',
    hasClose: false,
    onClose: noop,
    onClick: noop
  }

  handleClick = (e) => {
    e.stopPropagation();
    const {onClick, children} = this.props;
    onClick(e, children);
  }

  render() {
    const {children, color, style, hasClose, onClose, size, className} = this.props;
    const cls = cx('hana-tag', `hana-tag-${size}`, className);
    const restProps = getRestProps(Tag, this.props);
    const computedStyle = Object.assign({}, style, {
      backgroundColor: color,
      borderColor: color,
      color: color ? '#fff' : false
    });
    return (
      <div className={cls} style={computedStyle} onClick={this.handleClick} {...restProps}>
        <span>{children}</span>
        {hasClose &&
          <Icon
            type="close"
            style={{verticalAlign: 'top'}}
            onClick={e => onClose(e, children)}
          />
        }
      </div>
    );
  }
}
