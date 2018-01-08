/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/2/6
 */
import React, {Component} from 'react';
import {DateTimePicker} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * @en
 * Base
 *
 * All properties' usage are as same as the DatePicker and TimePicker, please check their definitions.
 *
 * @cn
 * 基础
 *
 * 将时间选择器和日期选择器结合的组件，请从属性定义和`日期选择器的文档`以及`时间选择器的文档`中寻找使用方法。
 */
export default class ExampleBase extends Component {
  state = {
    dateString: ''
  };

  render() {
    const {
      dateString
    } = this.state;

    return (
      <div>
        <ExampleBlock>
          <DateTimePicker />
        </ExampleBlock>

        <ExampleBlock
          en={
            <p>Using string as value.</p>
          }
          cn={
            <p>使用字符串作为值。</p>
          }
        >
          <DateTimePicker
            value={dateString}
            onChange={(value, text) => {
              this.setState({dateString: text});
            }}
          />
        </ExampleBlock>
      </div>
    );
  }
}
