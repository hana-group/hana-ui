/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/2/9
 */
import React, {Component} from 'react';
import {Pagination} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * @en
 * Base
 *
 * Use the pagination to enhance your list view.
 *
 * Like lots of pagination, hana provides some base properties to make sure this component work normally:
 * `total`, `pageSize`, `length`, `offset` and `current`,
 * and a callback `onSelect` will be called when a new page is selected.
 *
 * In addition, this pagination could be configured to enable more functions:
 * working with a quick-jumper with property `withQuickJumper`, she allows you to jump to any page quickly;
 * working with a border-jumper with property `withBorderJumper`, she allows you to jump to the first or last page quickly.
 *
 * @cn
 * 基础
 *
 * 使用分页器来使你的列表展示更加合理。
 *
 * 与大多分页器一样，hana提供了一些基本的属性来维持组件基础的运转：`total`、`pageSize`、`length`、`offset` 和 `current`。
 * 而当页面被选择时，一个回调函数`onSelect`将会被调用，其参数是被选择的页码。
 *
 * 除此之外，hana还提供了几种常用的模式。
 * 使用`withQuickJumper`属性可以调出一个快速跳转器，用于跳转到指定的页码；
 * 使用`withBorderJumper`属性可以调出一个边界跳转器，用于快速跳转到首页或者尾页。
 */
export default class ExampleBase extends Component {
  state = {
    current: 1,
    current1: 4,
    current2: 0,
    current3: 1
  };

  render() {
    const {
      current,
      current1,
      current2,
      current3
    } = this.state;

    return (
      <div>
        <ExampleBlock
          en={
            <p>Normal mode, page: {current}</p>
          }
          cn={
            <p>普通模式，页码：{current}</p>
          }
        >
          <Pagination
            total={100000}
            pageSize={10}
            length={7}
            offset={1}
            current={current}
            onSelect={page => this.setState({current: page})}
            withBorderJumper
            withQuickJumper
          />
        </ExampleBlock>
        <ExampleBlock
          en={
            <p>With border-jumper mode, page: {current1}</p>
          }
          cn={
            <p>带有边界跳转器，页码：{current1}</p>
          }
        >
          <Pagination
            total={1200000}
            pageSize={9}
            length={8}
            offset={0}
            current={current1}
            onSelect={page => this.setState({current1: page})}
            withBorderJumper
          />
        </ExampleBlock>
        <ExampleBlock
          en={
            <p>With quick-jumper mode, page: {current2}</p>
          }
          cn={
            <p>带有快速跳转器，页码：{current2}</p>
          }
        >
          <Pagination
            total={900000}
            pageSize={8}
            length={6}
            offset={0}
            current={current2}
            onSelect={page => this.setState({current2: page})}
            withQuickJumper
          />
        </ExampleBlock>
        <ExampleBlock
          en={
            <p>With quick-jumper and last-jumper mode, page: {current3}</p>
          }
          cn={
            <p>带有边界跳转器和快速跳转器，页码：{current3}</p>
          }
        >
          <Pagination
            total={100}
            pageSize={10}
            length={7}
            offset={1}
            current={current3}
            onSelect={page => this.setState({current3: page})}
            withBorderJumper
            withQuickJumper
          />
        </ExampleBlock>
      </div>
    );
  }
}
