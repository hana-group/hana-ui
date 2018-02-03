/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 30 Nov 2017
 * Description:
 */
import React from 'react';
import cx from 'classnames';
import {withRouter} from 'react-router-dom';

import MultiLang from 'demo/MultiLang';
import {Link} from 'hana-ui';
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
            <Link href={'https://github.com/hana-group/hana-ui'} icon={'github'}>Github工程</Link>
            <Link href={'https://github.com/hana-group/hana-ui/issues'} icon={'issue'}>提交问题</Link>
            <Link href={'https://gitter.im/hana-group/Lobby'} icon={'chat'}>参与讨论</Link>
          </React.Fragment>
        }
        en={
          <React.Fragment>
            <Link size={'large'} href={'https://github.com/hana-group/hana-ui'} icon={'github'}>Github Repo</Link>
            <Link size={'large'} href={'https://github.com/hana-group/hana-ui/issues'} icon={'issue'}>Submit Issues</Link>
            <Link size={'large'} href={'https://gitter.im/hana-group/Lobby'} icon={'chat'}>Join our Chat</Link>
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
              <p>hana-ui是一个开源项目，使用
                <Link href={'https://opensource.org/licenses/MIT'} icon={'log'}>MIT</Link>
                许可协议，由
                <Link href={'https://github.com/hana-group'} icon={'clover'}>hana-group</Link
                >开发并维护。
              </p>
              <p>欢迎加入我们！</p>
            </div>
          </React.Fragment>
        }
        en={
          <React.Fragment>
            <a href={'https://github.com/hana-group'} target={'_blank'}>
              <img src={'/demo/static/images/hana-icon.jpg'} alt={'hana-group'} />
            </a>
            <div>
              <p>
                hana-ui is an open-source project with
                <Link href={'https://opensource.org/licenses/MIT'} icon={'log'}>MIT</Link>
                license by
                <Link href={'https://github.com/hana-group'} icon={'clover'}>hana-group</Link>.
              </p>
              <p>Welcome to join us !</p>
            </div>
          </React.Fragment>
        }
      />
    </div>
  );
};

export default withRouter(Footer);
