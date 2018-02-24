/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/3/6
 */
import React from 'react';
import {Tooltip, Button} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * @en
 * View
 * hana use `view` property to define the view type of popover.
 *
 * @cn
 * 显示类型
 *
 * 提示框有两种显示类型，hana用`view`属性来定义她。
 *
 */
export default () => (
  <div>
    <ExampleBlock
      en={(
        <p>Rich text with view `fill`</p>
      )}
      cn={(
        <p>富文本，显示类型为`fill`</p>
      )}
    >
      <Tooltip
        content={(
          <div>
            <p>Hey, give me your photo with dressing lolita !</p>
            <img src="http://oekm6wrcq.bkt.clouddn.com/hana-ui/tooltip.png" alt="rich text" />
          </div>
        )}
      >
        <Button>Hover me!</Button>
      </Tooltip>
    </ExampleBlock>

    <ExampleBlock
      en={(
        <p>Rich text with view `border`</p>
      )}
      cn={(
        <p>富文本，显示类型为`border`</p>
      )}
    >
      <Tooltip
        view={'border'}
        content={(
          <div>
            <p>Hey, give me your photo with dressing lolita !</p>
            <img src="http://oekm6wrcq.bkt.clouddn.com/hana-ui/tooltip.png" alt="rich text" />
          </div>
        )}
      >
        <Button>Hover me!</Button>
      </Tooltip>
    </ExampleBlock>
  </div>
);
