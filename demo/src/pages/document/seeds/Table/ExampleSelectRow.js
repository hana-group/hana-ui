import React, {Component} from 'react';
import {Table, Button} from 'hana-ui';
import xor from 'lodash/xor';

function getRandomString() {
  return Math.random().toString(36);
}

/**
 * Pass an Array to property selectedRow and handle it's changes by onRowClick property
 *
 * `selectedRow` accept an Array to specific each row's Selected state
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
    console.log('clicked');
  };

  render() {
    const {data, selectedRow} = this.state;
    console.log(selectedRow);
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
            () => <a href="//www.baidu.com" target="_blank" rel="noopener noreferrer">baidu</a>,
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
