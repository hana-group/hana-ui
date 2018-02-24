import React from 'react';
import cx from 'classnames';

import MarkdownElement from 'demo/MarkdownElement';

import song from './hana-song.md';

import './base.scss';

const HanaSong = () => (
  <MarkdownElement
    className={cx('demo-song', 'demo-with-fade-head-tail')}
    text={song}
  />
);

export default HanaSong;
