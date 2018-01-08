/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 17/1/18
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import {Button} from '../Button';

import {nop} from './utils';

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
    withClear: false,
    actionNames: {},
    handleConfirm: nop,
    handleCancel: nop,
    handleClear: nop,
    children: null,
    style: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      position: {}
    };
  }

  render() {
    const {
      show,
      withClear,
      position,
      actionNames,
      handleConfirm,
      handleCancel,
      handleClear,
      children,
      style
    } = this.props;

    return (
      <div className={cx('hana-date-picker-container')}>
        <TransitionGroup>
          {show && (
            <CSSTransition
              classNames="hana-date-picker-container"
              className={cx('hana-date-picker-container-container')}
              style={Object.assign({}, position, style)}
              timeout={{enter: 500, exit: 500}}
            >
              <div>
                {children}
                <div className={cx('hana-date-picker-action-buttons')}>
                  {withClear && (
                    <Button className={cx('hana-date-picker-clear-button')} onClick={handleClear}>
                      {actionNames.clear}
                    </Button>
                  )}
                  <Button className={cx('hana-date-picker-confirm-button')} onClick={handleConfirm}>
                    {actionNames.ok}
                  </Button>
                  <Button className={cx('hana-date-picker-cancel-button')} onClick={handleCancel}>
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
