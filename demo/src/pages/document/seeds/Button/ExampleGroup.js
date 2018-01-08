import React, {Component} from 'react';
import {ButtonGroup, Button} from 'hana-ui';

export default class ExampleGroup extends Component {
  render() {
    return (
      <ButtonGroup>
        <Button>
          Group 1
        </Button>
        <Button
          htmlType={'submit'}
          type={'primary'}
          icon={'hana'}
          iconColor={'white'}
        />
        <Button
          type={'disabled'}
          icon={'hana'}
          iconColor={'white'}
        >
          Group 3
        </Button>
        <Button>
          Group 4
        </Button>
      </ButtonGroup>
    );
  }
}
