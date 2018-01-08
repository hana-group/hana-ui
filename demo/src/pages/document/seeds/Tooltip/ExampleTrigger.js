/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 17/1/4
 */
import React from 'react';
import {Tooltip, Text, Button} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * @en
 * Triggers
 *
 * Tooltip could be controlled by many triggers,
 * you can use the `trigger` to control tooltip with different event.
 *
 * @cn
 * 触发方式
 *
 * 触发方式也是可选的属性之一。
 * 通过属性`trigger`，你可以选择默认使用怎样的事件来触发弹提示框的开闭。
 */

export default () => (
  <div>
    <ExampleBlock
      en={(
        <p>Hover</p>
      )}
      cn={(
        <p>悬停</p>
      )}
    >
      <Tooltip
        trigger={'hover'}
        content={<p>Hover</p>}
      >
        <Button>Hover</Button>
      </Tooltip>
    </ExampleBlock>

    <ExampleBlock
      en={(
        <p>Focus</p>
      )}
      cn={(
        <p>聚焦</p>
      )}
    >
      <Tooltip
        trigger={'focus'}
        content={<p>Focus</p>}
      >
        <Text
          auto
          defaultValue={'Focus'}
        />
      </Tooltip>
    </ExampleBlock>

    <ExampleBlock
      en={(
        <p>Click</p>
      )}
      cn={(
        <p>点击</p>
      )}
    >
      <Tooltip
        trigger={'click'}
        content={<p>Click</p>}
      >
        <Button>Click</Button>
      </Tooltip>
    </ExampleBlock>
  </div>
);
