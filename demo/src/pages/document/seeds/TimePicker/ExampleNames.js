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
 * Names
 *
 * This world is colorful, so sometimes you may want to use your favorite names to define something.
 * hana allows you to do this, you could use the `actionNames` properties.
 *
 * @cn
 * 命名
 *
 * 这是一个多彩的世界，所以在某些时候，你一定会想按照自己的喜好来对事物命名。
 * 这里，hana提供了一种方法来使得你可以对`操作名`命名，你只需要将对应的参数传入即可：
 * `actionNames`
 *
 */
export default () => (
  <div>
    <ExampleBlock>
      <TimePicker
        actionNames={{
          ok: '种下种子',
          cancel: '我再想想'
        }}
      />
    </ExampleBlock>
  </div>
);
