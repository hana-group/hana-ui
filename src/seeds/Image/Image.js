import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import getRestProps from '../../utils/getRestProps';

export default class Image extends Component {
  static propTypes = {
    /**
     * @en
     * the image's src
     *
     * @cn
     * 图片的`src`
     */
    src: PropTypes.string.isRequired,

    /**
     * @en
     * the image's alt
     *
     * @cn
     * 图片的`alt`
     */
    alt: PropTypes.string,

    /**
     * @en
     * the image's style
     *
     * @cn
     * 图片的`style`
     */
    style: PropTypes.object,

    /**
     * @en
     * the image's size
     *
     * @cn
     * 图片的大小
     */
    size: PropTypes.oneOf(['tiny', 'small', 'middle', 'large', 'huge']),

    /**
     * @en
     * whether image is circular
     *
     * @cn
     * 图片是否为圆形
     */
    circular: PropTypes.bool,

    /**
     * @en
     * whether image is full-width
     *
     * @cn
     * 图片是否全宽
     */
    fullWidth: PropTypes.bool,

    /**
     * @en
     * the image's class
     *
     * @cn
     * 图片的`class`
     */
    className: PropTypes.string
  }

  static defaultProps = {
    size: 'middle',
    alt: '',
    circular: false,
    fullWidth: false
  }

  render() {
    const {style, size, src, alt, circular, fullWidth, className} = this.props;
    const cls = cx('hana-image', `hana-image-${size}`, className, {
      'hana-image-circular': circular
    });
    const computedStyle = Object.assign({}, {
      width: fullWidth ? '100%' : false
    }, style);
    const restProps = getRestProps(Image, this.props);
    return (
      <img className={cls} src={src} alt={alt} style={computedStyle} {...restProps} />
    );
  }
}
