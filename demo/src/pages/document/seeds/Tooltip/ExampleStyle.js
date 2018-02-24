/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 17/1/5
 */
import React from 'react';
import {Tooltip, Button} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * @en
 * Style
 *
 * You can use the property 'style' and `containerStyle` to custom style,
 * otherwise, hana allow you to define the theme color with property `color` quickly.
 *
 * @cn
 * 样式
 *
 * 你可以通过`style`和`containerStyle`来自定义样式，
 * 除此之外，hana还提供了一个`color`属性来快速改变提示框的主题颜色。
 */

export default () => (
  <div>
    <ExampleBlock
      en={(
        <p>property: color='black'</p>
      )}
      cn={(
        <p>property: color='black'</p>
      )}
    >
      <Tooltip
        content={(
          <div>
            <p>I dressed it !</p>
            <img src="//oekm6wrcq.bkt.clouddn.com/hana-ui/tooltip.png" alt="rich text" />
          </div>
        )}
        color={'black'}
      >
        <Button>Dress</Button>
      </Tooltip>
    </ExampleBlock>

    <ExampleBlock
      en={(
        <p>property: style='width: 200'</p>
      )}
      cn={(
        <p>property: style='width: 200'</p>
      )}
    >
      <Tooltip
        position={'bottom'}
        content={<p>Bottom</p>}
        style={{
          width: 200
        }}
      >
        <Button>Bottom</Button>
      </Tooltip>
    </ExampleBlock>

    <ExampleBlock
      en={(
        <p>property: containerStyle="position: 'absolute'; right: 0"</p>
      )}
      cn={(
        <p>property: containerStyle="position: 'absolute'; right: 0"</p>
      )}
    >
      <Tooltip
        position={'bottom'}
        content={<p>Bottom</p>}
        containerStyle={{
          position: 'absolute',
          right: 48
        }}
      >
        <Button>Bottom</Button>
      </Tooltip>
    </ExampleBlock>
  </div>
);
