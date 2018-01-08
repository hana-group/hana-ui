/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 3 Dec 2017
 * Description:
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import {langManager} from '../languages';

const MultiLang = (props) => {
  const desc = props[langManager.lang];

  return (
    <div
      className={props.className}
      style={props.style}
    >
      {props.childrenAtPre && props.children}
      {desc}
      {!props.childrenAtPre && props.children}
    </div>
  );
};

MultiLang.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  childrenAtPre: PropTypes.bool,
  cn: PropTypes.node,
  en: PropTypes.node
};

export default MultiLang;
