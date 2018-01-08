import React, {Component} from 'react';
import {Title} from 'hana-ui';

export default class ExampleBase extends Component {
  render() {
    return (
      <div>
        <Title>(ง •̀_•́)</Title>
        <br />
        <Title
          style={{
            padding: 10,
            backgroundColor: '#199ed8',
            color: 'white'
          }}
        >
          Title
        </Title>
      </div>
    );
  }
}
