import React, {Component} from 'react';
import {Menu, SubMenu, MenuItem} from 'hana-ui';

/**
 * @en
 * Disabled
 *
 * A nested menu with several disabled items.
 *
 * @cn
 * 禁用
 *
 * 一个有着部分被禁用元素的菜单。
 */
export default class ExampleBase extends Component {
  render() {
    return (
      <div>
        <Menu auto style={{width: 200}}>
          <SubMenu title="Group1" active>
            <MenuItem value="Activities">Activities</MenuItem>
            <MenuItem value="Games" disabled>Games</MenuItem>
            <MenuItem value="Characters">Characters</MenuItem>
            <SubMenu title="Nested1">
              <MenuItem value="Dreams">Dreams</MenuItem>
              <MenuItem value="Yume">Yume</MenuItem>
            </SubMenu>
            <SubMenu title="Nested2" disabled>
              <MenuItem value="Ako">Ako</MenuItem>
              <MenuItem value="Momo">Momo</MenuItem>
            </SubMenu>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}
