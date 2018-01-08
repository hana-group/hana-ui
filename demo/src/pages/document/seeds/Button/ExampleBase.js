import React, {Component} from 'react';
import {Button} from 'hana-ui';

export default class ExampleBase extends Component {
  render() {
    const baseStyle = {marginRight: 10};

    return (
      <div>
        <Button style={baseStyle} size={'large'}>(ง •̀_•́)</Button>
        <Button style={baseStyle} type={'primary'}>(ง •̀_•́)</Button>
        <Button style={baseStyle} size={'small'} type={'error'}>(ง •̀_•́)</Button>
      </div>
    );
  }
}
