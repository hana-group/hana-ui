import React, {Component} from 'react';
import {Menu, SubMenu, MenuItem} from 'hana-ui';

/**
 * @en
 * Nested
 *
 * A nested menu, `SubMenu` can be nested in a `SubMenu` component.
 *
 * @cn
 * 嵌套
 *
 * 一个嵌套的菜单，`SubMenu`之间可以相互嵌套。
 */
export default class ExampleBase extends Component {
  render() {
    return (
      <div>
        <Menu auto style={{width: 200}} type="linear">
          <SubMenu title="Group1" icon="yukibana-o">
            <MenuItem value="Activities" icon="hana">Activities</MenuItem>
            <MenuItem value="Games">Games</MenuItem>
            <MenuItem value="Characters">Characters</MenuItem>
            <SubMenu title="Nested1" active>
              <MenuItem value="Dreams">Dreams</MenuItem>
              <MenuItem value="Yume">Yume</MenuItem>
            </SubMenu>
            <SubMenu title="Nested2">
              <MenuItem value="Ako">Ako</MenuItem>
              <MenuItem value="Momo">Momo</MenuItem>
            </SubMenu>
          </SubMenu>
          <SubMenu title="Group2">
            <MenuItem value="Mission">Mission</MenuItem>
            <MenuItem value="Quest">Quest</MenuItem>
            <MenuItem value="Random">Random</MenuItem>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}
