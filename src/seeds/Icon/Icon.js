import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import getRestProps from '../../utils/getRestProps';

export default class Icon extends Component {
  static propTypes = {
    /**
     * @en
     * the icon type
     *
     * @cn
     * 图标的种类
     */
    type: PropTypes.string.isRequired,

    /**
     * @en
     * the icon's color
     *
     * @cn
     * 图标的颜色
     */
    color: PropTypes.string,

    /**
     * @en
     * the icon's style
     *
     * @cn
     * 图标的`style`
     */
    style: PropTypes.object,

    /**
     * @en
     * the icon's size
     *
     * @cn
     * 图标的尺寸
     */
    size: PropTypes.oneOf(['small', 'middle', 'large']),

    /**
     * @en
     * the icon's classnames
     *
     * @cn
     * 图标的`class`
     */
    className: PropTypes.string
  }

  static defaultProps = {
    size: 'middle'
  }

  render() {
    const {type, color, style, size, className} = this.props;
    const cls = cx('hanaicon', `icon-${type}`, `hanaicon-${size}`, className);
    const computedStyle = Object.assign({}, {color}, style);
    const restProps = getRestProps(Icon, this.props);
    return (
      <i className={cls} style={computedStyle} {...restProps} />
    );
  }
}
