import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import getRestProps from '../../utils/getRestProps';

/**
 * TODO - click to reverse
 *      - a whole background
 */

export default class Postcard extends Component {
  static propTypes = {
    /**
     * @en
     * the postcard's style
     *
     * @cn
     * 明信片的`style`
     */
    style: PropTypes.object,

    /**
     * @en
     * the postcard's children node
     *
     * @cn
     * 子节点
     */
    children: PropTypes.node,

    /**
     * @en
     * the postcard's title
     *
     * @cn
     * 明信片的标题
     */
    title: PropTypes.node,

    /**
     * @en
     * the postcard's subtitle
     *
     * @cn
     * 明信片的副标题
     */
    subtitle: PropTypes.node,

    /**
     * @en
     * the postcard's title-style
     *
     * @cn
     * 明信片的标题样式
     */
    titleStyle: PropTypes.object,

    /**
     * @en
     * the postcard's subtitle-style
     *
     * @cn
     * 明信片的副标题样式
     */
    subtitleStyle: PropTypes.object
  }

  render() {
    const {children, style, title, subtitle, titleStyle, subtitleStyle} = this.props;
    const cls = cx('hana-postcard');
    // const computedStyle = Object.assign({}, style, {color});
    const restProps = getRestProps(Postcard, this.props);
    return (
      <div className={cls} {...restProps} style={style}>
        {!!title &&
          <div className="hana-postcard-title" style={titleStyle}>
            {title}
            <span className="hana-postcard-subtitle" style={subtitleStyle}>{subtitle}</span>
          </div>
        }
        <div className="hana-postcard-content">{children}</div>
      </div>
    );
  }
}
