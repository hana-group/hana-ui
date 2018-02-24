import React, {Component} from 'react';
import {Tag} from 'hana-ui';

/**
 * @en
 * Colorful
 *
 * Using prop `color` to change the tag's color
 *
 * @cn
 * 溢彩
 *
 * 使用`color`来改变标签的颜色。
 */
export default class ExampleBase extends Component {

  render() {
    return (
      <div>
        <Tag color="#6cd4a4">#6cd4a4</Tag>
        <Tag hasClose color="#f60">#f40</Tag>
      </div>
    );
  }
}
