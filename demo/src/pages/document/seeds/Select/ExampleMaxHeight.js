import React, {Component} from 'react';
import {Select, Option} from 'hana-ui';

/**
 * @en
 * Max-height
 * options can set max-height by using prop `maxHeight`.
 *
 * @cn
 * 最大高度
 * 选项列表可以使用属性`maxHeight`设置最大高度。
 */
export default class ExampleMaxHeight extends Component {
  render() {
    return (
      <div>
        <Select
          style={{width: 250}}
          defaultLabel="Please select"
          orientation="up"
          auto
          maxHeight={200}
        >
          <Option label="Once" value="1" />
          <Option label="upon" value="2" />
          <Option label="a" value="3" />
          <Option label="time" value="4" />
          <Option label="there" value="5" />
          <Option label="is" value="6" />
          <Option label="a" value="7" />
          <Option label="white" value="8" />
          <Option label="rabbit" value="9" />
        </Select>
      </div>
    );
  }
}
