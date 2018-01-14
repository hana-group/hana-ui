/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 14 Jan 2018
 * Description:
 */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {Icon} from 'hana-ui';

import './link.scss';

const Link = (props) => (
  <a
    className={cx('hana-link')}
    href={props.href}
    target={'_blank'}
  >
    <Icon type={props.icon} />
    {props.children}
  </a>
);

Link.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.node
};

Link.defaultProps = {
  href: '',
  icon: 'hana'
};

export default Link;
