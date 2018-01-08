/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 16/12/29
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Icon} from 'hana-ui';

const style = {
  padding: 20,
  fontSize: 20,
  borderBottom: '1px solid #ddd'
};

export default class CodeViewTitle extends Component {
  static propTypes = {
    title: PropTypes.string,
    tooltip: PropTypes.string,
    active: PropTypes.bool
  };

  render() {
    return (
      <div style={style}>
        {this.props.title || 'Example'}
        <Icon
          type="yukibana-o"
          color={this.props.active ? '#6cf' : '#ccc'}
          style={{
            transform: this.props.active ? false : 'rotate(180deg)',
            fontSize: 20,
            float: 'right',
            marginRight: 10,
            transition: 'all .8s ease-in-out'
          }}
        />
      </div>
    );
  }
}
