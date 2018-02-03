/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 17/1/3
 */
import React from 'react';
import {Link} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * @en
 * Base
 *
 * Use `icon` to choose your favorite icon, `size` to define size, `className` and `style` to cover the defaults.
 *
 * @cn
 * 基础
 *
 * 使用`icon`选择你喜欢的icon、`size`去定义大小，并用`className`和`style`来覆盖默认值。
 */
export default () => (
  <div>
    <ExampleBlock>
      <Link
        id={'link1'}
        href={'#link1'}
      >
        Link1
      </Link>
      <br />
      <Link
        id={'link2'}
        href={'#link2'}
        style={{
          display: 'block',
          margin: 32
        }}
      >
        Link2
      </Link>
    </ExampleBlock>
  </div>
);
