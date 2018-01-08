import React, {Component} from 'react';
import {Button} from 'hana-ui';

/**
 * Button component can set a label to show data after button
 */
export default class ExampleLabel extends Component {
  render() {
    return (
      <div>
        <Button
          label={'( /) V (\\ )'}
          icon={'hana'}
          iconColor={'white'}
          style={{marginRight: 10}}
        />
        <Button
          label={'( /) V (\\ )'}
          labelPosition={'right'}
          icon={'hana'}
          iconColor={'white'}
        />
      </div>
    );
  }
}
