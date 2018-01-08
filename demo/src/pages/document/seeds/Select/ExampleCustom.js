import React, {Component} from 'react';
import {Select, Option} from 'hana-ui';

const optionList = [
  {label: 'Haru', value: '1'},
  {label: 'Natsu', value: '2'},
  {label: 'Aki', value: '3'},
  {label: 'Fuyu', value: '4'}
];

/**
 * @en
 * Custom
 *
 * Use `selectionStyle` and `optionStyle` to control styles.
 *
 * Use `arrowIcon` to control the arrow icon.
 *
 * @cn
 * 自定义
 *
 * 使用`selectionStyle`和`optionStyle`来更改样式。
 *
 * 使用`arrowIcon`来设置自定义的图标。
 */

export default class ExampleBase extends Component {
  state = {
    value: '1'
  }

  render() {
    const options = optionList.map(i => <Option {...i} key={i.value} />);
    return (
      <div>
        <Select
          style={{width: 450}}
          value={this.state.value}
          onChange={v => this.setState({value: v})}
          selectionStyle={{borderColor: '#fff'}}
          optionWrapStyle={{borderColor: '#fff'}}
          arrowIcon={null}
        >
          {options}
        </Select>
      </div>
    );
  }
}
