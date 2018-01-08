import React, {Component} from 'react';
import {Tag} from 'hana-ui';

/**
 * @en
 * Size
 *
 * Using prop `size` to modify the tag's size
 *
 * @cn
 * 尺寸
 *
 * 使用`size`来改变标签的尺寸。
 */
export default class ExampleBase extends Component {

  state = {
    label: ''
  }

  render() {
    return (
      <div>
        <Tag size="small">small</Tag>
        <Tag size="large">large</Tag>
      </div>
    );
  }
}
