/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/3/2
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {langManager} from '../languages';

export default class ExampleBlock extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  static defaultProps = {
    children: null
  };

  render() {
    const {
      children
    } = this.props;

    const desc = this.props[langManager.current];

    return (
      <div className={cx('example-block')}>
        {
          desc && (
            <div className={cx('example-block-desc')}>
              {desc}
            </div>
          )
        }
        <div className={cx('example-block-content')}>
          {children}
        </div>
      </div>
    );
  }
}
