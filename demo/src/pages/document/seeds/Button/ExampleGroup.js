import React, {Component} from 'react';
import {ButtonGroup, Button} from 'hana-ui';

/**
 * @en
 * Group
 *
 * Multiple buttons could be added to a group.
 *
 * @cn
 * 成组
 *
 * 多个按钮可以归于一组。
 */
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
