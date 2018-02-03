import React, {Component} from 'react';
import {Button} from 'hana-ui';

/**
 * @en
 * Group
 *
 * Button could has an icon at the front.
 *
 * @cn
 * 成组
 *
 * 可以在按钮的开头放一个图标。
 */
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
