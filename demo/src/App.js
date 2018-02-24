/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 16/12/28
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Route, Switch, Redirect} from 'react-router-dom';
import cx from 'classnames';
import 'hana-ui/styles/base.scss';

import {langManager, languages} from './languages';
import genMeta from './genMeta';
import FireFlies from 'demo/FireFlies';
import Topbar from './pages/topbar';
import Footer from './pages/footer';
import HanaSong from './pages/hana-song';
import Overview from './pages/overview';
import Guide from './pages/guide';
import Document from './pages/document';
import Contribution from './pages/contribution';

import './base.scss';

export default class App extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  componentDidUpdate() {
    this.refreshMeta();
  }

  refreshMeta() {
    const {title, description} = genMeta(this.context.router.route.location.pathname);
    document.querySelector('title').text = title;
    document.querySelector('meta[name="description"]').content = description;
  }

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
    const path = this.context.router.route.location.pathname.split(/\//g);

    return (
      <React.Fragment>
        <div className={cx('demo-bg')} />
        {
          path[2] !== 'overview' && (
            <FireFlies
              className={cx('demo-bg-flies')}
              color={'#fff'}
              size={128}
            />
          )
        }
        <Topbar onChangeLang={this.handleChangeLang} />
        <div className={cx('demo-content')}>
          <Switch>
            <Route path={`${match.url}/hana-song`} component={HanaSong} />
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
