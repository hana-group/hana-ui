import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from '../Icon';

import getRestProps from '../../utils/getRestProps';

export default class Loading extends Component {
  static propTypes = {
    /**
     * @en
     * the loading's content
     *
     * @cn
     * `loading`的内容
     */
    content: PropTypes.node,

    /**
     * @en
     * the loading's icon
     *
     * @cn
     * `loading`的图标
     */
    icon: PropTypes.node,

    /**
     * @en
     * whether the icon is rotated
     *
     * @cn
     * 图标是否旋转
     */
    rotate: PropTypes.bool,

    /**
     * @en
     * the loading wrap's style
     *
     * @cn
     * `loading`的底部蒙版的`style`
     */
    wrapStyle: PropTypes.object,

    /**
     * @en
     * the loading's style
     *
     * @cn
     * `loading`的`style`
     */
    style: PropTypes.object,

    /**
     * @en
     * the loading's style
     *
     * @cn
     * `loading`的内容的`style`
     */
    contentStyle: PropTypes.object,

    /**
     * @en
     * the loading's class
     *
     * @cn
     * `loading`的`class`
     */
    className: PropTypes.string
  }

  static defaultProps = {
    content: 'loading...',
    icon: <Icon type="yukibana-o" />,
    rotate: true
  }

  render() {
    const {
      icon, rotate, wrapStyle, contentStyle, style, className
    } = this.props;
    const cls = cx('hana-loading', className, {
      'hana-loading-rotate': rotate
    });
    const restProps = getRestProps(Loading, this.props);
    return (
      <div className="hana-loading-wrap" style={wrapStyle}>
        <section className={cls} style={style} {...restProps}>
          {icon}
          <p className="hana-loading-content" style={contentStyle}>
            {this.props.content}
          </p>
        </section>
      </div>
    );
  }
}
