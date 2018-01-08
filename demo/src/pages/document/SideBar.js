/**
 * Author: ひまわり(dtysky<dtysky@outlook.com>)
 * Github: https://github.com/dtysky
 * Created: 16/12/28
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import {Menu, SubMenu, MenuItem} from 'hana-ui';

import components from './config';
import {langManager} from '../../languages';

const SideBar = ({match, location}) => {
  const lang = langManager.current;

  return (
    <Menu
      value={location.pathname}
      style={{
        backgroundColor: 'rgba(255, 255, 255, .8)',
        width: 200,
        position: 'absolute',
        left: 20,
        top: 20
      }}
    >
      {
        components.categories.map(({label, path, key}) => (
          <SubMenu
            title={label[lang]}
            active
            key={key}
          >
            {
              components[key].map(item => (
                <MenuItem
                  value={`${match.url}/${path}/${item.path}`}
                  key={item.path}
                >
                  <Link to={`${match.url}/${path}/${item.path}`}>{item.label[lang]}</Link>
                </MenuItem>
              ))
            }
          </SubMenu>
        ))
      }
    </Menu>
  );
};

SideBar.propTypes = {
  match: PropTypes.object.isRequired
};

export default withRouter(SideBar);
