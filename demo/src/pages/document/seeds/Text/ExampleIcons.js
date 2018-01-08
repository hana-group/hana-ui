/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 16/12/30
 */
import React from 'react';
import {Text, Icon} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * @en
 * Icon
 *
 * Icon is a important part of this component to make it more nijigen-style,
 * you can customize it with property `withIcon`, `icon` and `iconPosition`,
 * there is also a way to show different icons with states' properties.
 *
 * @cn
 * 图标
 *
 * Icon对于组件的风格化非常重要，你可以使用`withIcon`、`icon`和`iconPosition`属性来对其进行控制，
 * 如果你想在不同的状态（详见上个例子）显示不同图标，可以在那些状态对应的属性中进行修改。
 */
export default () => (
  <div>
    <ExampleBlock>
      <Text
        auto
        withIcon={false}
        defaultValue={'without icon'}
      />
    </ExampleBlock>

    <ExampleBlock>
      <Text
        auto
        iconPosition={'before'}
        defaultValue={'Position: before'}
      />
    </ExampleBlock>

    <ExampleBlock>
      <Text
        auto
        iconPosition={'after'}
        defaultValue={'Position: after'}
      />
    </ExampleBlock>

    <ExampleBlock>
      <Text
        auto
        icon={<Icon type={'himawari'} />}
        defaultValue={'Custom icon: default'}
      />
    </ExampleBlock>

    <ExampleBlock>
      <Text
        auto
        success={{
          show: true,
          icon: <Icon type={'smile'} />
        }}
        defaultValue={'Custom icon: success'}
      />
    </ExampleBlock>

    <ExampleBlock>
      <Text
        auto
        warning={{
          show: true,
          icon: <Icon type={'warn'} />
        }}
        defaultValue={'Custom icon: waring'}
      />
    </ExampleBlock>

    <ExampleBlock>
      <Text
        auto
        error={{
          show: true,
          icon: <Icon type={'sad'} />
        }}
        defaultValue={'Custom icon: error'}
      />
    </ExampleBlock>

    <ExampleBlock>
      <Text
        auto
        icon={<p>Text</p>}
        defaultValue={'Custom icon: tag p'}
      />
    </ExampleBlock>

    <ExampleBlock>
      <Text
        auto
        view={'box'}
        icon={<p>Text</p>}
        defaultValue={'Custom icon: tag p, box'}
      />
    </ExampleBlock>
  </div>
);
