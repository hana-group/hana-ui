/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 30 Nov 2017
 * Description:
 */
import React from 'react';
import cx from 'classnames';
import {withRouter} from 'react-router-dom';

import MultiLang from 'demo/MultiLang';
import './base.scss';

const Footer = ({location}) => {
  const root = location.pathname.split('/')[2];

  if (root === 'overview') {
    return null;
  }

  return (
    <div className={cx('demo-footer')}>
      <MultiLang
        className={cx('demo-community')}
        cn={
          <div className={cx('demo-community')}>
            <a href={''}>Github工程</a>
            <a href={''}>提交问题</a>
            <a href={''}>参与讨论</a>
          </div>
        }
        en={
          <div className={cx('demo-community')}>
            <a href={''}>Github Repo</a>
            <a href={''}>Submit Issues</a>
            <a href={''}>Join our Chat</a>
          </div>
        }
      />
      <MultiLang
        className={cx('demo-community')}
        cn={
          <div className={cx('demo-license')}>
            <img src={''} alt={'hana-group'}/>
            <p>hana-ui是一个开源项目，使用<a href={'https://opensource.org/licenses/MIT'}>MIT</a>许可协议，由<a href={''}>hana-group</a>开发并维护。</p>
            <p>欢迎加入我们！</p>
          </div>
        }
        en={
          <div className={cx('demo-license')}>
            <img src={''} alt={'hana-group'}/>
            <p>hana-ui is an open-source project with <a href={'https://opensource.org/licenses/MIT'}>MIT</a> license by <a href={'https://github.com/hana-group'}>hana-group</a>.</p>
            <p>Welcome to join us !</p>
          </div>
        }
      />
    </div>
  );
};

export default withRouter(Footer);
