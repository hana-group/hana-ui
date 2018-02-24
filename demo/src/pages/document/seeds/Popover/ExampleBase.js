/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/2/20
 */
import React, {Component} from 'react';
import {Popover, Button} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * @en
 * Base
 *
 * This component is based on `Tooltip`,
 * but it provides `title`, `subTitle` and `content` properties.
 *
 * @cn
 * 基础
 *
 * 此组件基于`Tooltip`组件，但提供了`title`、`subTitle`和`content`属性来实现基本功能。
 */
export default class ExampleBase extends Component {
  render() {
    return (
      <div>
        <ExampleBlock>
          <Popover
            position={'bottom'}
            title={'The last flower'}
            subTitle={'for everyone in the world'}
            content={(
              <div>
                <img src="//oekm6wrcq.bkt.clouddn.com/hana-ui/himawari.png" alt="rich text" />
              </div>
            )}
          >
            <Button>Click me!</Button>
          </Popover>
        </ExampleBlock>
      </div>
    );
  }
}
