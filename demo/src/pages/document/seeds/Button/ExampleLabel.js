import React, {Component} from 'react';
import {Button} from 'hana-ui';

/**
 * @en
 * Label
 * 
 * Button component can set a label to show data after button.
 * 
 * @cn
 * 标记
 * 
 * 也可以将一些Label放在标记后面。
 * 
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
