/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 16/12/28
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import Router from './routes';

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Router />
    </AppContainer>,
    document.getElementById('container')
  );
};

render();

if (module.hot) {
  module.hot.accept();
  render();
}
