/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/3/15
 */
import React, {Component} from 'react';
import {ADVEngine} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * @en
 * Base
 *
 * Base example with tow predefined view type and mode.
 *
 * @cn
 * 基础
 *
 * 基础例子，展示了两种不同的显示类型以及几种模式。
 *
 */
export default class ExampleBase extends Component {
  render() {
    return (
      <div>
        <ExampleBlock>
          <ADVEngine />
        </ExampleBlock>
      </div>
    );
  }
}
