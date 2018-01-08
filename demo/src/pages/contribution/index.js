/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 25 Nov 2017
 * Description:
 */
import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import MultiLangMarkdown from 'demo/MultiLangMarkdown';
import './base.scss';

import cn from './cn.md';
import en from './en.md';

const Contribution = () => (
  <MultiLangMarkdown
    className={cx('demo-contribution')}
    text={`
@cn
${cn}

@en
${en}
    `}
  >
    <ul className={'author-list'}>
      {
        [
          {name: 'dtysky（H光）', avater: '', email: 'dtysky@outlook.com', github: 'https://github.com/dtysky', blog: 'http://dtysky.moe'},
          {name: 'rhyme', avater: '', email: 'lovelyrhyme@gmail.com', github: 'https://github.com/missrhyme'},
          {name: 'lanz', avater: '', email: 'lanz@bilibili.com', github: 'https://github.com/hanaarena'}
        ].map(({name, avater, email, github, blog}) => (
          <li
            key={name}
            className={'author-item'}
          >
            <a
              className={'author-avater'}
              href={blog || github}
              target={'_blank'}
            >
              <img src={avater} alt={name} />
            </a>
            <div className={'author-info'}>
              <p>{name}</p>
              {blog && <p><a href={blog} target={'_blank'}>{blog}</a></p>}
              <p><a href={github} target={'_blank'}>{github}</a></p>
              <p><a href={email} target={'_blank'}>{email}</a></p>
            </div>
          </li>
        ))
      }
    </ul>
  </MultiLangMarkdown>
);

Contribution.propTypes = {
  match: PropTypes.object
};

export default Contribution;
