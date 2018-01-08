import React, {Component} from 'react';
import {Menu, SubMenu, MenuItem} from 'hana-ui';
import ExampleBlock from 'demo/ExampleBlock';

/**
 * @en
 * Base
 *
 * Just get value by props `onClick`.
 *
 * @cn
 * 基础
 *
 * 使用`onClick`获取菜单的值。
 */
export default class ExampleBase extends Component {
  state = {
    value: ''
  }

  render() {
    return (
      <ExampleBlock
        en={
          <p>You selected <b className="sign">{this.state.value}</b></p>
        }
        cn={
          <p>你选择了<b className="sign">{this.state.value}</b></p>
        }
      >
        <Menu auto onClick={(e, value) => this.setState({value})} style={{width: 200}}>
          <SubMenu title="Group1">
            <MenuItem value="Activities">Activities</MenuItem>
            <MenuItem value="Games">Games</MenuItem>
            <MenuItem value="Characters">Characters</MenuItem>
          </SubMenu>
          <SubMenu title="Group2">
            <MenuItem value="Start">Start</MenuItem>
            <MenuItem value="End">End</MenuItem>
            <MenuItem value="In The Journey">In The Journey</MenuItem>
          </SubMenu>
        </Menu>
      </ExampleBlock>
    );
  }
}
