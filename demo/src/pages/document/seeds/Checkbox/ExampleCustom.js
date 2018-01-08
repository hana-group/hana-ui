import React, {Component} from 'react';
import {Checkbox, CheckboxGroup, Icon} from 'hana-ui';

/**
 * @en
 * Custom Icons
 *
 * Using prop `checkedIcon` and `unCheckedIcon` to have custom icons.
 *
 * The CheckboxGroup can also use prop `checkedIcon` and `unCheckedIcon`.
 *
 * @cn
 * 自定义图标
 *
 * 可以使用`checkedIcon`和`unCheckedIcon`来设置勾选/未勾选的复选框样式。
 */
export default class ExampleBase extends Component {
  state = {
    val: ['1', '3']
  }

  render() {
    return (
      <div>
        <Checkbox
          auto
          label="Custom icon"
          checkedIcon={<Icon type="snowflake-o" color="#6cf" />}
          unCheckedIcon={<Icon type="snowflake-o" color="#ccc" />}
        />

        <CheckboxGroup
          value={this.state.val}
          onChange={val => this.setState({val})}
          checkedIcon={<Icon type="snowflake-o" color="#6cf" />}
          unCheckedIcon={<Icon type="snowflake-o" color="#ccc" />}
        >
          <Checkbox label="Spring" value="1" />
          <Checkbox label="Summer" value="2" />
          <Checkbox label="Autumn" value="3" />
          <Checkbox label="Winter" value="4" />
        </CheckboxGroup>
      </div>
    );
  }
}
