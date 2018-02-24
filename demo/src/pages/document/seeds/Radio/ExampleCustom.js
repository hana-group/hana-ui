import React, {Component} from 'react';
import {Radio, RadioGroup, Icon} from 'hana-ui';

/**
 * @en
 * Custom Icons
 *
 * The icon can be custom icon by using prop `checkedIcon` and `unCheckedIcon`
 *
 * The RadioGroup can also use prop `checkedIcon` and `unCheckedIcon`
 *
 * @cn
 * 自定义图标
 *
 * 可以使用属性`checkedIcon`和`unCheckedIcon`来自定义选中/未选中的图标，同样作用于图片组。
 */
export default class ExampleBase extends Component {
  state = {
    val: '1'
  }

  render() {
    return (
      <div>
        <Radio
          label="Custom Radio"
          auto
          checkedIcon={<Icon type="snowflake-o" color="#6cd4a4" />}
          unCheckedIcon={<Icon type="snowflake-o" color="#6cd4a4" />}
          style={{marginBottom: 20}}
        />
        <RadioGroup
          value={this.state.val}
          onChange={val => this.setState({val})}
          checkedIcon={<Icon type="snowflake-o" color="#6cd4a4" />}
          unCheckedIcon={<Icon type="snowflake-o" color="#ccc" />}
        >
          <Radio label="Spring" value="1" />
          <Radio label="Summer" value="2" />
          <Radio label="Autumn" value="3" />
          <Radio label="Winter" value="4" />
        </RadioGroup>
      </div>
    );
  }
}
