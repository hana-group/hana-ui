/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/3/3
 */
import React from 'react';
import {TimePicker} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * @en
 * Multi-Languages
 *
 * Hana provides property `lang` to support many languages,
 * 'en', 'cn' and 'jp' are currently supported.
 *
 * @cn
 * 多语言
 *
 * hana提供了`lang`属性用于配置组件的语言，现在支持英文`en`、中文`cn`和日文`jp`。
 *
 */
export default () => (
  <div>
    <ExampleBlock
      en={(
        <p>English, lang = 'en'</p>
      )}
      cn={(
        <p>英文，lang = 'en'</p>
      )}
    >
      <TimePicker
        lang={'en'}
      />
    </ExampleBlock>

    <ExampleBlock
      en={(
        <p>Chinese, lang = 'cn'</p>
      )}
      cn={(
        <p>中文，lang = 'cn'</p>
      )}
    >
      <TimePicker
        lang={'cn'}
      />
    </ExampleBlock>

    <ExampleBlock
      en={(
        <p>Japanese, lang = 'jp'</p>
      )}
      cn={(
        <p>日文，lang = 'jp'</p>
      )}
    >
      <TimePicker
        lang={'jp'}
      />
    </ExampleBlock>
  </div>
);
