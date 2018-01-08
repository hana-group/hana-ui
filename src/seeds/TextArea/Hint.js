/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/2/7
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class Hint extends Component {
  static propTypes = {
    /** Mode of hint. */
    mode: PropTypes.oneOf(['normal', 'disabled', 'focus', 'error', 'warning', 'success']),
    /** Size of hint. */
    size: PropTypes.oneOf(['small', 'middle', 'large']),
    /** If the hint message will be showed. */
    message: PropTypes.string,
    /** Style of message. */
    style: PropTypes.object
  };

  static defaultProps = {
    mode: 'error',
    disabled: false,
    size: 'middle',
    show: false,
    message: '',
    style: {},
    focus: false
  };

  render() {
    const {
      mode,
      size,
      message,
      style
    } = this.props;

    return (
      <div
        className={cx(
          'hana-text-area-hint',
          `hana-text-area-hint-${mode}`,
          `hana-text-area-hint-${size}`
        )}
        style={style}
      >
        {message}
      </div>
    );
  }
}
