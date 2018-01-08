/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 2017/2/10
 */
import React, {Component} from 'react';
import {Pagination} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * @en
 * Size
 *
 * For different scenes, hana provides three preset sizes defined by property `size`:
 * `small`, `middle` and `large`.
 *
 * @cn
 * 尺寸
 *
 * 针对不同场景，hana提供了一个属性`size`来定义尺寸的大小，现在有`small`、`middle`和`large`三种。
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
            <p>Small, page: {current}</p>
          )}
          cn={(
            <p>小尺寸，页码：{current}</p>
          )}
        >
          <Pagination
            total={100}
            pageSize={10}
            length={7}
            current={current}
            size={'small'}
            onSelect={page => this.setState({current: page})}
            withBorderJumper
            withQuickJumper
          />
        </ExampleBlock>

        <ExampleBlock
          en={(
            <p>Middle, page: {current1}</p>
          )}
          cn={(
            <p>中尺寸，页码：{current1}</p>
          )}
        >
          <Pagination
            total={100}
            pageSize={10}
            length={7}
            current={current1}
            size={'middle'}
            onSelect={page => this.setState({current1: page})}
            withBorderJumper
            withQuickJumper
          />
        </ExampleBlock>

        <ExampleBlock
          en={(
            <p>Large, page: {current2}</p>
          )}
          cn={(
            <p>大尺寸，页码：{current2}</p>
          )}
        >
          <Pagination
            total={1000000}
            pageSize={10}
            length={7}
            current={current2}
            size={'large'}
            onSelect={page => this.setState({current2: page})}
            withBorderJumper
            withQuickJumper
          />
        </ExampleBlock>
      </div>
    );
  }
}
