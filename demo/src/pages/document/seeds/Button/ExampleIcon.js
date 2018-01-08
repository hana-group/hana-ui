import React, {Component} from 'react';
import {Button} from 'hana-ui';

export default class ExampleIcon extends Component {
  render() {
    const baseStyle = {marginRight: 10};

    return (
      <div>
        <Button
          style={baseStyle}
          icon={'hana'}
          iconColor={'black'}
        >
          wow
        </Button>
        <Button
          type={'primary'}
          style={baseStyle}
          icon={'hana'}
          iconColor={'white'}
        />
      </div>
    );
  }
}
