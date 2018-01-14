/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 30 Nov 2017
 * Description:
 */
import React from 'react';
import cx from 'classnames';
import {withRouter} from 'react-router-dom';

import MultiLang from 'demo/MultiLang';
import Link from 'demo/Link';
import './base.scss';

const Footer = ({location}) => {
  const root = location.pathname.split('/')[2];

  if (root === 'overview') {
    return null;
  }

  return (
    <div className={cx('demo-footer')}>
      <MultiLang
        className={cx('demo-footer-links')}
        cn={
          <React.Fragment>
            <Link href={''} icon={'hana'}>Github工程</Link>
            <Link href={''} icon={'hana'}>提交问题</Link>
            <Link href={''} icon={'hana'}>参与讨论</Link>
          </React.Fragment>
        }
        en={
          <React.Fragment>
            <Link href={''} icon={'hana'}>Github Repo</Link>
            <Link href={''} icon={'hana'}>Submit Issues</Link>
            <Link href={''} icon={'hana'}>Join our Chat</Link>
          </React.Fragment>
        }
      />
      <MultiLang
        className={cx('demo-footer-license')}
        cn={
          <React.Fragment>
            <a href={'https://github.com/hana-group'} targer={'_blank'}>
              <img src={'/demo/static/images/hana-icon.jpg'} alt={'hana-group'} />
            </a>
            <div>
              <p>hana-ui是一个开源项目，使用<Link href={'https://opensource.org/licenses/MIT'}>MIT</Link>许可协议，由<Link href={''}>hana-group</Link>开发并维护。</p>
              <p>欢迎加入我们！</p>
            </div>
          </React.Fragment>
        }
        en={
          <React.Fragment>
            <a href={'https://github.com/hana-group'} targer={'_blank'}>
              <img src={'/demo/static/images/hana-icon.jpg'} alt={'hana-group'} />
            </a>
            <div>
              <p>hana-ui is an open-source project with <Link href={'https://opensource.org/licenses/MIT'}>MIT</Link> license by <Link href={'https://github.com/hana-group'}>hana-group</Link>.</p>
              <p>Welcome to join us !</p>
            </div>
          </React.Fragment>
        }
      />
    </div>
  );
};

export default withRouter(Footer);
