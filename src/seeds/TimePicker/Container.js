/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 17/1/23
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import {Button} from '../Button';

export default class Container extends Component {
  static propTypes = {
    /** A property to control whether the dialog will be visible. */
    show: PropTypes.bool,
    /** If this property is true, a button for clearing will be added. */
    withClear: PropTypes.bool,
    /** Action buttons' names. */
    actionNames: PropTypes.object,
    /** Position of container. */
    position: PropTypes.object,
    /** Callback for confirming. */
    handleConfirm: PropTypes.func,
    /** Callback for canceling. */
    handleCancel: PropTypes.func,
    /** Callback for clearing. */
    handleClear: PropTypes.func,
    /** Children. */
    children: PropTypes.node,
    /** Style will be set to dialog. */
    style: PropTypes.object
  };

  static defaultProps = {
    show: false,
    actionNames: {},
    handleConfirm: () => {},
    handleCancel: () => {},
    handleClear: () => {},
    children: null,
    style: {}
  };

  render() {
    const {
      show,
      position,
      actionNames,
      withClear,
      handleConfirm,
      handleCancel,
      handleClear,
      children,
      style
    } = this.props;

    return (
      <div className={cx('hana-time-picker-container')}>
        <TransitionGroup>
          {show && (
            <CSSTransition
              classNames="hana-time-picker-container"
              timeout={{enter: 500, exit: 500}}
              className={cx('hana-time-picker-container-container')}
              style={Object.assign({}, style, position)}
            >
              <div>
                {children}
                <div className={cx('hana-time-picker-action-buttons')}>
                  {withClear && (
                    <Button className={cx('hana-time-picker-clear-button')} onClick={handleClear}>
                      {actionNames.clear}
                    </Button>
                  )}
                  <Button className={cx('hana-time-picker-confirm-button')} onClick={handleConfirm}>
                    {actionNames.ok}
                  </Button>
                  <Button className={cx('hana-time-picker-cancel-button')} onClick={handleCancel}>
                    {actionNames.cancel}
                  </Button>
                </div>
              </div>
            </CSSTransition>
          )}
        </TransitionGroup>
      </div>
    );
  }
}
