import React, {Component} from 'react';
import {Table, Button} from 'hana-ui';

export default class ExampleBase extends Component {
  state = {
    data: [
      {one: 11, two: this.getRandomString(), three: this.getRandomString()},
      {one: 11, two: this.getRandomString(), three: this.getRandomString()},
      {one: 11, two: this.getRandomString(), three: this.getRandomString()}
    ]
  }

  getRandomString() {
    return Math.random().toString(36);
  }

  render() {
    const actions = <div><Button style={{marginRight: 10}}>b</Button><Button>d</Button></div>;

    return (
      <div>
        <Table
          tableHeader={['header1', 'header2', 'header3', 'header4']}
          tableData={this.state.data}
          colSequence={['two', {key: 'fifth', defaultValue: 'hahah'}, 'one', actions]}
        />
      </div>
    );
  }
}
