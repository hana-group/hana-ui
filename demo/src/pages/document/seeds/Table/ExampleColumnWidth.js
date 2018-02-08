import React, {Component} from 'react';
import {Table} from 'hana-ui';

function getRandomString () {
  return Math.random().toString(36);
}


/**
 * @en
 * Base Example
 *
 * Example of how to custom column's width for each
 *
 * We can use `columnWidth` props to set width of each column.
 *
 * If pass <b>'auto'</b> as columnWidth value it will set column's width as average for each.
 * Or pass an object array to define specific column's width, like:
 *
 * `[{index: 1, column: 2}]`
 *
 * it will make first column take 2 column of the grid.
 *
 * Or pass a column number for each column and pass an object like: `{index: 3, column: 4}` as second argument to define specific column,
 * so the final props value should like: `[2, {index: 3, column: 4}]`
 *
 * @cn
 * 自定义列宽
 *
 * 表单支持使用`columnWidth` 来自定义列宽，传入值如下：
 *
 * `[{index: 1, column: 2}]`, 表示第一列占1/12，第二列占1/6
 *
 * 当然也可传入`auto` 来实现自适应
 */

export default class ExampleColumnWidth extends Component {
  state = {
    data: [
      {
        zero: getRandomString(),
        one: 11,
        two: getRandomString(),
        three: getRandomString()
      },
      {
        zero: getRandomString(),
        one: 11,
        two: getRandomString(),
        three: getRandomString()
      },
      {
        zero: getRandomString(),
        one: 11,
        two: getRandomString(),
        three: getRandomString()
      }
    ]
  }

  render() {
    return (
      <div>
        <Table
          tableHeader={['header0', 'header1', 'header2', 'header3']}
          tableData={this.state.data}
          columnWidth={'auto'}
        />
      </div>
    );
  }
}
