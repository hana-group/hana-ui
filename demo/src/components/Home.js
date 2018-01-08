/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 16/12/28
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class HomePage extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  render() {
    return (
      <div>
        Hana-ui
      </div>
    );
  }
}

export default HomePage;
