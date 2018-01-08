/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 17/1/2
 */
import React from 'react';
import {Text} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * @en
 * View
 *
 * hana provides property `view` to decides how the component will be shown,
 * it could be `underline` and `box`.
 *
 * @cn
 * 显示类型
 *
 * hana提供了属性`view`来控制组件显示的方式，目前提供`underline`和`box`两种模式。
 */
export default () => (
  <div>
    <ExampleBlock>
      <Text
        auto
        defaultValue={'underline'}
      />
    </ExampleBlock>

    <ExampleBlock>
      <Text
        auto
        view={'box'}
        defaultValue={'box'}
      />
    </ExampleBlock>

    <ExampleBlock>
      <div className="flex">
        <Text
          auto
          view={'underline'}
          defaultValue={'underline'}
        />
        <Text
          auto
          view={'box'}
          defaultValue={'box'}
        />
        <Text
          auto
          view={'underline'}
          defaultValue={'underline'}
        />
      </div>
    </ExampleBlock>
  </div>
);
