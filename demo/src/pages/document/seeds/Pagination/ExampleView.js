/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/2/10
 */
import React, {Component} from 'react';
import {Pagination} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 *
 * @en
 * View
 *
 * Property `view` decides the type of component will be showed,
 * it could be `simple`, `box` and `circle`.
 *
 * @cn
 * 显示类型
 *
 * `view`属性用于决定组件显示的基本样式，有`simple`、`box`和`circle`三种。
 */
export default class ExampleView extends Component {
  state = {
    current: 1,
    current1: 0,
    current2: 0
  };

  render() {
    const {
      current,
      current1,
      current2
    } = this.state;

    return (
      <div>
        <ExampleBlock
          en={(
            <p>Box, page: {current}</p>
          )}
          cn={(
            <p>Box，页数：{current}</p>
          )}
        >
          <Pagination
            total={100}
            pageSize={10}
            length={7}
            current={current}
            view={'box'}
            onSelect={page => this.setState({current: page})}
          />
        </ExampleBlock>

        <ExampleBlock
          en={(
            <p>Circle, page: {current1}</p>
          )}
          cn={(
            <p>Circle，页数：{current1}</p>
          )}
        >
          <Pagination
            total={100}
            pageSize={10}
            length={7}
            current={current1}
            view={'circle'}
            onSelect={page => this.setState({current1: page})}
            withBorderJumper
            withQuickJumper
          />
        </ExampleBlock>

        <ExampleBlock
          en={(
            <p>Simple, page: {current2}</p>
          )}
          cn={(
            <p>Simple，页数：{current2}</p>
          )}
        >
          <Pagination
            total={100}
            pageSize={10}
            length={7}
            current={current2}
            view={'simple'}
            onSelect={page => this.setState({current2: page})}
            withBorderJumper
            withQuickJumper
          />
        </ExampleBlock>
      </div>
    );
  }
}
