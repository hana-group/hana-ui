/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/3/2
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
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
      <div
        style={{
          padding: '18px 0'
        }}
      >
        {
          desc && (
            <div
              style={{
                fontSize: 14,
                paddingBottom: 16
              }}
            >
              {desc}
            </div>
          )
        }
        <div>
          {children}
        </div>
      </div>
    );
  }
}
