import React, {Component} from 'react';
import {Button, Sidebar, Menu, SubMenu, MenuItem} from 'hana-ui';

export default class ExampleBase extends Component {
  state = {
    open: false,
    openRight: false
  }

  toggleSidebar(key) {
    this.setState({[key]: !this.state[key]});
  }

  render() {
    return (
      <div>
        <Button style={{marginRight: 10}} onClick={() => this.toggleSidebar('open')}>
          open Sidebar
        </Button>
        <Button onClick={() => this.toggleSidebar('openRight')}>
          open Sidebar on the right
        </Button>
        <Sidebar open={this.state.open} style={{width: 200}}>
          <Menu auto type="linear">
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
        </Sidebar>
        <Sidebar open={this.state.openRight} position={'right'} style={{width: 200}}>
          <Menu auto type="linear">
            <SubMenu title="Group2">
              <MenuItem value="Mission">Mission</MenuItem>
              <MenuItem value="Quest">Quest</MenuItem>
              <MenuItem value="Random">Random</MenuItem>
            </SubMenu>
          </Menu>
        </Sidebar>
      </div>
    );
  }
}
