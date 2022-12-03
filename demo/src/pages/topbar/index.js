/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 26 Nov 2017
 * Description:
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import cx from 'classnames';
import {Select, Option, Icon} from 'hana-ui';

import config from '../../config';
import {langManager, languages} from '../../languages';
import './base.scss';

const navs = [
  {
    path: 'overview',
    en: 'Overview',
    cn: '概览',
    icon: 'himawari'
  },
  {
    path: 'guide',
    en: 'Guide',
    cn: '开始',
    icon: 'snowflake-o'
  },
  {
    path: 'document',
    en: 'Document',
    cn: '文档',
    icon: 'clover'
  },
  {
    path: 'contribution',
    en: 'Contribution',
    cn: '贡献',
    icon: 'mum'
  },
  {
    path: 'https://github.com/hana-group/hana-ui',
    en: 'Github',
    cn: 'Github',
    icon: 'github',
    useATag: true
  }
];

const NavItem = ({icon, lang, path, useATag, ...name}) => (
  <li className={cx('demo-topbar-item')}>
    <Icon type={icon} className={cx('demo-topbar-item-icon')} />
    {
      !useATag ? (
        <Link
          className={cx('demo-topbar-item-link')}
          to={`/${lang}/${path}`}
        >
          {name[lang]}
        </Link>
      ) : (
        <a
          className={cx('demo-topbar-item-link')}
          href={path}
          target={'_blank'}
        >
          {name[lang]}
        </a>
      )
    }
  </li>
);

NavItem.propTypes = {
  icon: PropTypes.string,
  lang: PropTypes.string,
  path: PropTypes.string,
  useATag: PropTypes.bool,
  en: PropTypes.string,
  cn: PropTypes.string
};

const Topbar = ({onChangeLang, location}) => {
  const lang = langManager.lang;
  const root = location.pathname.split('/')[2];

  return (
    <header
      className={cx(
        'demo-topbar',
        `demo-topbar-${lang}`,
        `demo-topbar-${root}`
      )}
    >
      <div className={cx('demo-topbar-container')}>
        <div className={cx('demo-topbar-left')}>
          <Link to={`/${lang}/hana-song`}>
            <img
              className={cx('demo-topbar-logo')}
              src={config.logo}
              alt={'hana-logo'}
            />
          </Link>
          <Select
            className={cx('demo-topbar-lang')}
            value={lang}
            onChange={onChangeLang}
          >
            {
              languages.map(({value, label}) =>
                <Option value={value} label={label} key={value} />
              )
            }
          </Select>
        </div>
        <nav className={cx('demo-topbar-right')}>
          {
            navs.map(conf => (
              <NavItem key={conf.path} {...conf} lang={lang} />
            ))
          }
        </nav>
      </div>
    </header>
  );
};

Topbar.propTypes = {
  onChangeLang: PropTypes.func.isRequired
};

export default withRouter(Topbar);
