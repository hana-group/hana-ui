import React, {Component} from 'react';
import {Select, Option} from 'hana-ui';

/**
 * @en
 * Multiple
 * Select can be multiple by using prop `multiple`.
 *
 * @cn
 * 多选
 * 使用属性`multiple`获得一个多选选择器。
 *
 */
export default class ExampleBase extends Component {
  state = {
    value: ['1', '2', '3', '4']
  }

  render() {
    return (
      <div>
        <p style={{padding: '20px 0 5px'}}>middle:</p>
        <Select
          style={{width: 450, display: 'block'}}
          value={this.state.value}
          orientation='up'
          onChange={v => this.setState({value: v})}
          multiple
        >
          <Option label="Haru is yasashii.." value="1" />
          <Option label="Natsu is atsui" value="2" />
          <Option label="Aki is suzui" value="3" />
          <Option label="Fuyu is yuki no seikai" value="4" />
        </Select>

        <p style={{padding: '20px 0 5px'}}>small:</p>
        <Select
          style={{width: 450, display: 'block'}}
          value={this.state.value}
          onChange={v => this.setState({value: v})}
          multiple
          size='small'
        >
          <Option label="Haru is yasashii.." value="1" />
          <Option label="Natsu is atsui" value="2" />
          <Option label="Aki is suzui" value="3" />
          <Option label="Fuyu is yuki no seikai" value="4" />
        </Select>

        <p style={{padding: '20px 0 5px'}}>large:</p>
        <Select
          style={{width: 450, display: 'block'}}
          value={this.state.value}
          onChange={v => this.setState({value: v})}
          multiple
          size='large'
        >
          <Option label="Haru is yasashii.." value="1" />
          <Option label="Natsu is atsui" value="2" />
          <Option label="Aki is suzui" value="3" />
          <Option label="Fuyu is yuki no seikai" value="4" />
        </Select>
      </div>
    );
  }
}
