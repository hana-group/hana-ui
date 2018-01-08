import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import App from './App';

const Router = () => (
  <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
    <App />
  </BrowserRouter>
);

export default Router;
