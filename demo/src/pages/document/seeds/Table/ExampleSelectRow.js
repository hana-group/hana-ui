import React, {Component} from 'react';
import {Table, Button} from 'hana-ui';
import xor from 'lodash/xor';

function getRandomString() {
  return Math.random().toString(36);
}

/**
 * @en
 * Custom row operation
 *
 * Pass an Array to property selectedRow and handle it's changes by onRowClick property
 *
 * Set `selectable` & `hoverable` props to true can make table support seleted & hover effect for each row
 *
 * `selectedRow` accept a function which will return seleted row's list, each list item include
 * element & its index,also `selectedRow` accept an Array to specific each row's Selected state
 *
 * @cn
 * 自定义行操作
 *
 * `selectable` 和 `hoverable` 可控制表单行是否可被选择及是否开启`hover` 态
 *
 * `selectedRow` 接受一个函数，返回已被选择的行。或者传入一个行数索引为元素的数组来自动设置已选行
 */

export default class ExampleBase extends Component {
  state = {
    data: [
      {one: 11, two: getRandomString(), three: getRandomString()},
      {one: 11, two: getRandomString(), three: getRandomString()},
      {one: 11, two: getRandomString(), three: getRandomString()}
    ],
    selectedRow: []
  };

  handleClick = () => {
    this.setState({
      selectedRow: [1, 2]
    });
  };

  handleRowClick = (event, index) => {
    event.stopPropagation();
    if (Array.isArray(index)) {
      this.setState({
        selectedRow: index.map(Number)
      });
    } else {
      this.setState({
        selectedRow: xor(this.state.selectedRow, [Number(index)])
      });
    }
  };

  handleButtonClick = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  render() {
    const {data, selectedRow} = this.state;
    console.log(selectedRow); // eslint-disable-line
    const actions = (
      <div>
        <Button style={{marginRight: 10}} onClick={this.handleButtonClick}>
          foo
        </Button>
        <Button onClick={this.handleButtonClick}>bar</Button>
      </div>
    );
    return (
      <div>
        <Button onClick={this.handleClick}>setSelectedRow</Button>
        <Table
          showRowIndex
          showCheckbox
          showAllCheckbox
          tableHeader={['header1', 'header2', 'header3', 'header4']}
          tableData={data}
          onRowClick={this.handleRowClick}
          colSequence={[
            () => <a href="//www.bing.com" target="_blank" rel="noopener noreferrer">baidu</a>,
            {key: 'fifth', defaultValue: 'hahah'},
            'one',
            actions
          ]}
          selectable
          hoverable
          selectedRow={selectedRow}
        />
      </div>
    );
  }
}
