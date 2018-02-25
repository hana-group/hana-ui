import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop'

import App from './App';

const Router = () => (
  <BrowserRouter>
    <ScrollToTop>
      <App />
    </ScrollToTop>
  </BrowserRouter>
);

export default Router;
