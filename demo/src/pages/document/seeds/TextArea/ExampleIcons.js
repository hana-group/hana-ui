/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/2/8
 */
import React from 'react';
import {TextArea, Icon} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * @en
 * Icon
 *
 * Icon is a important part of this component to make it more nijigen-style,
 * you can customize it with property `withIcon` and `icon``,
 * there is also a way to show different icons with states' properties.
 *
 * @cn
 * 图标
 *
 * Icon对于组件的风格化非常重要，你可以使用`withIcon`和`icon`属性来对其进行控制，
 * 如果你想在不同的状态（详见上个例子）显示不同图标，可以在那些状态对应的属性中进行修改。
 */
export default () => (
  <div>
    <ExampleBlock>
      <TextArea
        auto
        withIcon={false}
        defaultValue={'without icon'}
      />
    </ExampleBlock>

    <ExampleBlock>
      <TextArea
        auto
        icon={<Icon type={'himawari'} />}
        defaultValue={'Custom icon: default'}
      />
    </ExampleBlock>

    <ExampleBlock>
      <TextArea
        auto
        success={{
          show: true,
          icon: <Icon type={'smile'} />
        }}
        defaultValue={'Custom icon: success'}
      />
    </ExampleBlock>

    <ExampleBlock>
      <TextArea
        auto
        warning={{
          show: true,
          icon: <Icon type={'warn'} />
        }}
        defaultValue={'Custom icon: waring'}
      />
    </ExampleBlock>

    <ExampleBlock>
      <TextArea
        auto
        error={{
          show: true,
          icon: <Icon type={'sad'} />
        }}
        defaultValue={'Custom icon: error'}
      />
    </ExampleBlock>

    <ExampleBlock>
      <TextArea
        auto
        icon={<p>TextArea</p>}
        defaultValue={'Custom icon: tag p'}
      />
    </ExampleBlock>
  </div>
);

