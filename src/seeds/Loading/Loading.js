import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from '../Icon';

import getRestProps from '../../utils/getRestProps';

export default class Loading extends Component {
  static propTypes = {
    /**
     * @en
     * the loading's mode
     *
     * @cn
     * 加载器的三种模式
     */
    mode: PropTypes.oneOf(['rotate', 'queue', 'image']),
    /**
     * @en
     * the loading's content
     *
     * @cn
     * 加载器的内容
     */
    content: PropTypes.node,

    /**
     * @en
     * the loading's icon in mode 'rotate'
     *
     * @cn
     * 当`mode`为“rotate”时，加载器的图标
     */
    icon: PropTypes.node,

    /**
     * @en
     * the loading's icons in mode 'queue'
     *
     * @cn
     * 当`mode`为“queue”时，加载器的图标们
     */
    icons: PropTypes.arrayOf(PropTypes.node),

    /**
     * @en
     * the loading's image in mode 'image'
     *
     * @cn
     * 当`mode`为“image”时，加载器使用的图片
     */
    image: PropTypes.string,

    /**
     * @en
     * the loading wrap's style
     *
     * @cn
     * 加载器的底部蒙版的`style`
     */
    wrapStyle: PropTypes.object,

    /**
     * @en
     * the loading's style
     *
     * @cn
     * 加载器的`style`
     */
    style: PropTypes.object,

    /**
     * @en
     * the loading's style
     *
     * @cn
     * 加载器的内容的`style`
     */
    contentStyle: PropTypes.object,

    /**
     * @en
     * the loading's class
     *
     * @cn
     * 加载器的`class`
     */
    className: PropTypes.string
  }

  static defaultProps = {
    mode: 'queue',
    content: 'loading...',
    icon: <Icon type="yukibana-o" />,
    icons: [
      <Icon type="flower" />,
      <Icon type="clover" />,
      <Icon type="mum" />,
      <Icon type="yukibana-o" />
    ],
    image: ''
  }

  render() {
    const {
      icon,
      icons,
      image,
      mode,
      wrapStyle,
      contentStyle,
      style,
      className,
      content
    } = this.props;

    const restProps = getRestProps(Loading, this.props);

    if (mode === 'rotate') {
      return (
        <div className="hana-loading-wrap" style={wrapStyle}>
          <section
            className={cx(
              'hana-loading',
              'hana-loading-rotate',
              className
            )}
            style={style}
            {...restProps}
          >
            {icon}
            <p className={cx('hana-loading-content')} style={contentStyle}>
              {content}
            </p>
          </section>
        </div>
      );
    }

    if (mode === 'queue') {
      return (
        <div className={cx('hana-loading-wrap')} style={wrapStyle}>
          <section
            className={cx(
              'hana-loading',
              'hana-loading-queue',
              className
            )}
            style={style}
            {...restProps}
          >
            <div className={cx('hana-loading-icons')}>
              {
                icons.map((i, index) => React.cloneElement(i, {key: index}))
              }
            </div>
            <p className={cx('hana-loading-content')} style={contentStyle}>
              {content}
            </p>
          </section>
        </div>
      );
    }

    return (
      <div className={cx('hana-loading-wrap')} style={wrapStyle}>
        <section
          className={cx(
            'hana-loading',
            'hana-loading-image',
            className
          )}
          style={style}
          {...restProps}
        >
          <img src={image} alt={'loading'} />
          <p className={cx('hana-loading-content')} style={contentStyle}>
            {content}
          </p>
        </section>
      </div>
    );
  }
}
