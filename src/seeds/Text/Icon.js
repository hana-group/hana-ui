/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 16/12/27
 */
import React, {Component, cloneElement} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class Icon extends Component {
  static propTypes = {
    /** Mode of icon. */
    mode: PropTypes.oneOf(['normal', 'disabled', 'error', 'warning', 'success', 'focus']),
    /** Mode of view, it could be 'underline' and 'box', defaults to 'underline'. */
    view: PropTypes.oneOf(['box', 'underline']),
    /** Position of the icon. */
    position: PropTypes.oneOf(['before', 'after']),
    /** Size of icon. */
    size: PropTypes.oneOf(['small', 'middle', 'large']),
    /** If the node is not null, it will replace the default icon. */
    node: PropTypes.node,
    /**
     * A handler for event 'submit', it will be targeted after pressing `enter` key or clicking icon,
     * (event) => {}.
     */
    handleSubmit: PropTypes.func,
    style: PropTypes.object
  };

  static defaultProps = {
    mode: 'error',
    view: 'underline',
    disabled: false,
    size: 'middle',
    node: null,
    onSubmit: () => {},
    style: {}
  };

  render() {
    const {
      mode,
      view,
      position,
      size,
      node,
      handleSubmit,
      style
    } = this.props;

    const icon = typeof node === 'string' ? <p>{node}</p> : node;

    return (
      <div
        className={cx(
          'hana-text-icon',
          `hana-text-icon-${mode}`,
          `hana-text-icon-${view}`,
          `hana-text-icon-${position}`,
          `hana-text-icon-${size}`,
        )}
        onClick={handleSubmit}
        style={style}
      >
        {
          icon
            ? cloneElement(icon, {style: {fontSize: 'inherit'}})
            : (
            <i
              className={cx(
                'hana-text-icon-default'
              )}
            />
          )
        }
      </div>
    );
  }
}
