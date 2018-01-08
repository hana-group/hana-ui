/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/2/8
 */
import React from 'react';
import {TextArea} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * Styles
 *
 * hana also provide properties to cover default style and css, check the definitions.
 *
 * hana also provide a property `backgroundColor` to set the background-color of desc quickly.
 *
 * @cn
 * 样式
 *
 * hana也预留了样式和CSS类的接口，详情请查看属性定义。
 *
 * 除了基本样式之外，由于此组件Hint信息的实现方式，你可能需要使用`backgroundColor`属性指定一个当前背景环境的主题颜色。
 *
 */
export default () => (
  <div
    style={{
      backgroundColor: '#fff',
      padding: 8
    }}
  >
    <ExampleBlock>
      <TextArea
        auto
        style={{
          height: 40
        }}
        defaultValue={'style={{height: 40}}'}
      />
    </ExampleBlock>

    <ExampleBlock>
      <TextArea
        auto
        inputStyle={{
          width: 320
        }}
        defaultValue={'inputStyle={{width: 320}}'}
      />
    </ExampleBlock>

    <ExampleBlock>
      <TextArea
        auto
        active={{
          message: 'active style',
          descStyle: {
            color: '#52c5bb'
          }
        }}
        defaultValue={'Custom style: active'}
      />
    </ExampleBlock>

    <ExampleBlock>
      <TextArea
        auto
        success={{
          show: true,
          message: 'successful style',
          descStyle: {
            color: '#d56767'
          }
        }}
        defaultValue={'Custom style: success'}
      />
    </ExampleBlock>

    <ExampleBlock>
      <TextArea
        auto
        warning={{
          show: true,
          message: 'warning style',
          descStyle: {
            color: '#4fc478'
          }
        }}
        defaultValue={'Custom style: waring'}
      />
    </ExampleBlock>

    <ExampleBlock>
      <TextArea
        auto
        error={{
          show: true,
          message: 'error style',
          descStyle: {
            color: '#e8964a'
          }
        }}
        defaultValue={'Custom style: error'}
      />
    </ExampleBlock>
  </div>
);
