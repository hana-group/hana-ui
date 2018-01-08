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
 * Styles
 *
 * hana also provide properties to cover default style and css, check the definitions.
 *
 * @cn
 * 样式
 *
 * hana也预留了样式和CSS类的接口，详情请查看属性定义。
 */
export default () => (
  <div>
    <ExampleBlock>
      <Text
        auto
        style={{
          height: 40
        }}
        defaultValue={'style={{height: 40}}'}
      />
    </ExampleBlock>

    <ExampleBlock>
      <Text
        auto
        inputStyle={{
          width: 320
        }}
        defaultValue={'inputStyle={{width: 320}}'}
      />
    </ExampleBlock>

    <ExampleBlock>
      <Text
        auto
        active={{
          message: 'active style',
          style: {
            color: '#52c5bb'
          }
        }}
        defaultValue={'Custom style: active'}
      />
    </ExampleBlock>

    <ExampleBlock>
      <Text
        auto
        success={{
          show: true,
          message: 'successful style',
          style: {
            color: '#d56767'
          }
        }}
        defaultValue={'Custom style: success'}
      />
    </ExampleBlock>

    <ExampleBlock>
      <Text
        auto
        warning={{
          show: true,
          message: 'warning style',
          style: {
            color: '#4fc478'
          }
        }}
        defaultValue={'Custom style: waring'}
      />
    </ExampleBlock>

    <ExampleBlock>
      <Text
        auto
        error={{
          show: true,
          message: 'error style',
          style: {
            color: '#e8964a'
          }
        }}
        defaultValue={'Custom style: error'}
      />
    </ExampleBlock>
  </div>
);
