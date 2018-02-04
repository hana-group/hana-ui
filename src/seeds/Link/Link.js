/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 3 Feb 2018
 * Description:
 */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import getRestProps from '../../utils/getRestProps';
import Icon from '../Icon';

const Link = (props) => (
  <a
    className={cx(
      'hana-link',
      `hana-link-${props.size}`,
      props.className
    )}
    href={props.href}
    style={props.style}
    target={'_blank'}
    {...getRestProps(Link, props)}
  >
    <Icon
      type={props.icon}
      size={props.size}
    />
    {props.children}
  </a>
);

Link.propTypes = {
  /**
   * @en
   * ClassName will be set to root element.
   *
   * @cn
   * 根组件的class。
   */
  className: PropTypes.string,
  /**
   * @en
   * Style will be set to root element.
   *
   * @cn
   * 根组件的样式。
   */
  style: PropTypes.object,
  /**
   * @en
   * Address for link.
   *
   * @cn
   * 链接的地址。
   */
  href: PropTypes.string.isRequired,
  /**
   * @en
   * Icon's name.
   *
   * @cn
   * 图标名称。
   */
  icon: PropTypes.string,
  /**
   * @en
   * Size of this component.
   *
   * @cn
   * 组件的尺寸。
   */
  size: PropTypes.oneOf(['small', 'middle', 'large']),
  /**
   * @en
   * Content in this link, default to empty.
   *
   * @cn
   * 链接的内容，默认为空。
   */
  children: PropTypes.node
};

Link.defaultProps = {
  icon: 'hana',
  size: 'middle'
};

export default Link;
