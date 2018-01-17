/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 16/12/28
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Route, Switch, Redirect} from 'react-router-dom';
import cx from 'classnames';

import '../../src/styles/base.scss';

import './base.scss';
import {langManager, languages} from './languages';
import Topbar from './pages/topbar';
import Footer from './pages/footer';
import Overview from './pages/overview';
import Guide from './pages/guide';
import Document from './pages/document';
import Contribution from './pages/contribution';

export default class App extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  handleChangeLang = lang => {
    const path = this.context.router.route.location.pathname.split(/\//g);
    path[1] = lang;

    this.context.router.history.push(path.join('/'));
  };

  render() {
    return (
      <Switch>
        {
          languages.map(({value: lang}) => (
            <Route key={lang} path={`/${lang}`} render={this.renderLang} />
          ))
        }
        <Route render={() => (<Redirect to={languages[0].value} />)} />
      </Switch>
    );
  }

  renderLang = ({match}) => {
    langManager.set(match.url.substr(1));

    return (
      <React.Fragment>
        <div className={cx('demo-bg')} />
        <Topbar onChangeLang={this.handleChangeLang} />
        <div className={cx('demo-content')}>
          <Switch>
            <Route path={`${match.url}/overview`} component={Overview} />
            <Route path={`${match.url}/guide`} component={Guide} />
            <Route path={`${match.url}/document`} component={Document} />
            <Route path={`${match.url}/contribution`} component={Contribution} />
            <Route render={() => (<Redirect to={`${match.url}/overview`} />)} />
          </Switch>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}
