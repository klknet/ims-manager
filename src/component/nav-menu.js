import MenuSettings from '../config/menu-config';
import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';
import { Route, BrowserRouter as Router, Link, Redirect, Switch } from 'react-router-dom';

const SubMenu = Menu.SubMenu

class NavMenu extends Component {
  render() {
    return (
      <Menu theme={'dark'} mode="inline" defaultSelectedKeys={['home']}>
        {recMenu(MenuSettings)}
      </Menu>
    );
  }
}

function recMenu(datasource) {
  return datasource.map((menu, i) => {
    if (menu.type == 0) {
      return (
        <Menu.Item key={menu.key}>
          <Link to={menu.link}><Icon type={menu.icon}/><span>{menu.name}</span></Link>
        </Menu.Item>);
    }else if(menu.type == 1) {
      return (
        <SubMenu key={menu.key} title={<span><Icon type={menu.icon}/><span>{menu.name}</span></span>}>
          {recMenu(menu.subs)}
        </SubMenu>
      )
    }else {
      return (
        <Menu.Item key={menu.key}>
          <Link to={menu.link}>
            <span>{menu.name}</span>
          </Link>
        </Menu.Item>
      )
    }
  })
}

export default NavMenu


