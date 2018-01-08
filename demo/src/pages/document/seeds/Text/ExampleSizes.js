/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 16/12/30
 */
import React from 'react';
import {Text} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * @en
 * Size
 *
 * For different scenes, hana provides three preset sizes defined by property `size`:
 * `small`, `middle` and `large`.
 *
 * @cn
 * 尺寸
 *
 * 针对不同场景，hana提供了一个属性`size`来定义尺寸的大小，现在有`small`、`middle`和`large`三种。
 *
 */
export default () => (
  <div>
    <ExampleBlock>
      <Text
        auto
        size={'small'}
        defaultValue={'Small'}
      />
    </ExampleBlock>

    <ExampleBlock>
      <Text
        auto
        size={'middle'}
        defaultValue={'Middle'}
      />
    </ExampleBlock>

    <ExampleBlock>
      <Text
        auto
        size={'large'}
        defaultValue={'Large'}
      />
    </ExampleBlock>
  </div>
);
