/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/2/7
 */
import React, {Component, cloneElement} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class Icon extends Component {
  static propTypes = {
    /** Mode of icon. */
    mode: PropTypes.oneOf(['normal', 'disabled', 'focus', 'error', 'warning', 'success']),
    /** Size of icon. */
    size: PropTypes.oneOf(['small', 'middle', 'large']),
    /** If the node is not null, it will replace the default icon. */
    node: PropTypes.node
  };

  static defaultProps = {
    mode: 'error',
    disabled: false,
    size: 'middle',
    node: null,
    focus: false
  };

  render() {
    const {
      mode,
      size,
      node
    } = this.props;

    const icon = typeof node === 'string' ? <p>{node}</p> : node;

    return (
      <div
        className={cx(
          'hana-text-area-icon',
          `hana-text-area-icon-${mode}`,
          `hana-text-area-icon-${size}`
        )}
      >
        {
          icon
            ? cloneElement(icon)
            : (
            <i
              className={cx(
                'hana-text-area-icon-default'
              )}
            />
            )
        }
      </div>
    );
  }
}
