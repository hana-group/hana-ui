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
 * Text type
 *
 * `type` property is a constraint on the input value, it is useful when you need to disable some value.
 * There are three preset types in Text component: `string`, `int` and `float`.
 *
 * Otherwise, if you want to use the text as a password, please set the property `mode` to `password`.
 *
 * @cn
 * 文本类型
 *
 * `type`属性用于对输入内容进行约束，当你需要禁用某些输入时，她非常有用，目前已支持`string`, `int` and `float`三种类型，
 *
 * 另外，如果你需要加密输入内容呢，请直接将`mode`属性设置为`password`.
 */
export default () => (
  <div>
    <ExampleBlock
      en={(
        <p>String</p>
      )}
      cn={(
        <p>字符串</p>
      )}
    >
      <Text
        auto
        defaultValue={'string'}
      />
    </ExampleBlock>

    <ExampleBlock
      en={(
        <p>Int</p>
      )}
      cn={(
        <p>整数</p>
      )}
    >
      <Text
        auto
        type={'int'}
        defaultValue={'0'}
      />
    </ExampleBlock>

    <ExampleBlock
      en={(
        <p>Float</p>
      )}
      cn={(
        <p>浮点数</p>
      )}
    >
      <Text
        auto
        type={'float'}
        defaultValue={'0.0'}
      />
    </ExampleBlock>

    <ExampleBlock
      en={(
        <p>Password</p>
      )}
      cn={(
        <p>密码</p>
      )}
    >
      <Text
        auto
        mode={'password'}
        defaultValue={'password'}
      />
    </ExampleBlock>
  </div>
);
