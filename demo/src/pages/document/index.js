/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 25 Nov 2017
 * Description:
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, Redirect} from 'react-router-dom';

import components from './config';
import SideBar from './SideBar';

const genCategory = (key) => ({match}) => (
  <Switch>
    {
      components[key].map(item => (
        <Route
          key={item.path}
          path={`${match.url}/${item.path}`}
          component={item.component}
        />
      ))
    }
    <Route render={() => (<Redirect to={`${match.url}/${components[key][0].path}`} />)} />
  </Switch>
);

const Document = ({match}) => (
  <div
    style={{
      padding: '100px 20px 20px 20px',
      width: 1180,
      margin: '0 auto',
      position: 'relative'
    }}
  >
    <div
      style={{
        borderRadius: 5,
        padding: 20,
        position: 'relative'
      }}
    >
      <SideBar match={match} />
      <div
        style={{
          width: 900,
          paddingLeft: 240
        }}
      >
        <Switch>
          {
            components.categories.map(({key, path}) => (
              <Route key={key} path={`${match.url}/${path}`} render={genCategory(key)} />
            ))
          }
          <Route render={() => (<Redirect to={`${match.url}/${components.categories[0].path}`} />)} />
        </Switch>
      </div>
    </div>
  </div>
);

Document.propTypes = {
  match: PropTypes.object.isRequired
};

export default Document;
