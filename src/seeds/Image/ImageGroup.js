import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {childrenToArray, getRestProps} from '../../utils';

export default class ImageGroup extends Component {
  static propTypes = {
    /**
     * @en
     * the ImageGroup's style
     *
     * @cn
     * 图片组的`style`
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
     * the images
     *
     * @cn
     * 子节点
     */
    children: PropTypes.node
  }

  static defaultProps = {
    size: 'middle',
    circular: false
  }

  render() {
    const {style, size, circular, children} = this.props;
    const cls = cx('hana-imagegroup');
    const computedChildren = childrenToArray(children).map(
      (item, index) => React.cloneElement(item, {
        key: index,
        size,
        circular
      })
    );
    const restProps = getRestProps(ImageGroup, this.props);
    return (
      <div className={cls} style={style} {...restProps}>
        {computedChildren}
      </div>
    );
  }
}
