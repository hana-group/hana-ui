/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 17/1/3
 */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {getRestProps} from '../../utils';

const Divider = (props) => {
  const {
    className,
    style
  } = props;

  const otherProps = getRestProps(Divider, props);

  return (
    <div
      className={cx(
        'hana-divider',
        className
      )}
      style={style}
      {...otherProps}
    />
  );
};

Divider.propTypes = {
  /**
   * @en
   * Custom className of root element.
   *
   * @cn
   * 根元素的class.
   */
  className: PropTypes.string,
  /**
   * @en
   * Custom style of of root element.
   *
   * @cn
   * 根元素的Style.
   */
  style: PropTypes.object
};

export default Divider;
