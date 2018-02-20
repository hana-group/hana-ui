/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 16/12/29
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {Icon} from 'hana-ui';

export default class CodeViewTitle extends Component {
  static propTypes = {
    title: PropTypes.string,
    tooltip: PropTypes.string,
    active: PropTypes.bool
  };

  render() {
    return (
      <div className={cx('example-title')}>
        {this.props.title || 'Example'}
        <Icon
          className={cx(
            'example-title-icon',
            this.props.active && 'example-title-icon-active'
          )}
          type="yukibana-o"
        />
      </div>
    );
  }
}
