import React from 'react';
import cx from 'classnames';

import MultiLangMarkdown from 'demo/MultiLangMarkdown';

import cn from './cn.md';
import en from './en.md';

import './base.scss';

const Guide = () => (
      <MultiLangMarkdown
        className={cx('demo-guide')}
        text={`
@cn
${cn}

@en
${en}
        `}
      />
);

export default Guide;
