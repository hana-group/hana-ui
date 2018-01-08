import React, {Component} from 'react';
import {Menu, MenuItem} from 'hana-ui';

/**
 * @en
 * Tab-like
 *
 * Using prop `horizonal` to make a tab-like menu.
 *
 * @cn
 * 标签页
 *
 * 使用属性`horizonal`来创建一个标签页菜单。
 */
export default class ExampleBase extends Component {

  render() {
    return (
      <div>
        <Menu auto horizonal value="Activities">
          <MenuItem value="Activities">Activities</MenuItem>
          <MenuItem value="Games">Games</MenuItem>
          <MenuItem value="Characters">Characters</MenuItem>
        </Menu>

        <div style={{margin: '15px 0'}} />

        <Menu auto horizonal type="linear" value="Activities">
          <MenuItem value="Activities">Activities</MenuItem>
          <MenuItem value="Games">Games</MenuItem>
          <MenuItem value="Characters">Characters</MenuItem>
        </Menu>
      </div>
    );
  }
}
