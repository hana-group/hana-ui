/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 17/1/3
 */
import React from 'react';
import {Divider, Text} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * @en
 * Base
 *
 * Use `className` and `style` to cover the defaults.
 *
 * @cn
 * 基础
 *
 * 使用`className`和`style`来覆盖默认值。
 */
export default () => (
  <div>
    <ExampleBlock>
      <Text
        auto
        view={'box'}
        size={'small'}
        defaultValue={'Default'}
      />
      <Divider />
      <Text
        auto
        view={'box'}
        size={'small'}
        defaultValue={'Style `margin: 16`'}
      />
      <Divider
        style={{
          margin: 16
        }}
      />
      <Text
        auto
        view={'box'}
        size={'small'}
        defaultValue={'Text'}
      />
    </ExampleBlock>
  </div>
);
