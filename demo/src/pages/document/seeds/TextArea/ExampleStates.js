/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/2/8
 */
import React from 'react';
import {TextArea} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * @en
 * State
 *
 * hana feels the real world is very complicated, there must be rich states to adapted different scenes,
 * so, following properties are provided to manage theme:
 *
 * Property `focus` and `disable` could focus or disable component,
 * `active`, `success`, `warning` and `error` properties could define messages, styles...... in different states,
 * check the definitions for mor information,
 * their order is from `error` to `default`.
 *
 * @cn
 * 状态
 *
 * hana觉得现实世界非常复杂，需要有丰富的状态来适应各种环境，所以提供了以下几种属性来管理这些状态：
 *
 * `focus`和`disable`属性可以聚焦或者禁用组件，
 * 而`active`、`success`、`warning`和`error`几个属性则可以定义在不同状态下的提示信息、样式等，详见属性定义，
 * 她们的优先级按照以上列举顺序的倒序排列。
 *
 */
export default () => (
  <div>
    <ExampleBlock>
      <TextArea
        auto
        disabled
        defaultValue={'Disabled'}
      />
    </ExampleBlock>

    <ExampleBlock>
      <TextArea
        auto
        focus
        defaultValue={'Focus'}
      />
    </ExampleBlock>

    <ExampleBlock>
      <TextArea
        auto
        message={'Default state!'}
        color={'#888'}
        defaultValue={'Default'}
      />
    </ExampleBlock>

    <ExampleBlock>
      <TextArea
        auto
        focus
        active={{
          message: 'Activity!',
          color: '#52c5bb'
        }}
        defaultValue={'Active'}
      />
    </ExampleBlock>

    <ExampleBlock>
      <TextArea
        auto
        warning={{
          show: true,
          message: 'Option causes warning!'
        }}
        defaultValue={'Warning'}
      />
    </ExampleBlock>

    <ExampleBlock>
      <TextArea
        auto
        success={{
          show: true,
          message: 'Option is successful!'
        }}
        defaultValue={'Success'}
      />
    </ExampleBlock>

    <ExampleBlock>
      <TextArea
        auto
        error={{
          show: true,
          message: 'Option causes error!'
        }}
        defaultValue={'Error'}
      />
    </ExampleBlock>
  </div>
);
