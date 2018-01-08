import React from 'react';

import MultiLangMarkdown from 'demo/MultiLangMarkdown';

import cn from './cn.md';
import en from './en.md';

const Guide = () => (
      <MultiLangMarkdown
        text={`
@cn
${cn}

@en
${en}
        `}
      />
);

export default Guide;
