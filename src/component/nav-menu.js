import MenuSettings from '../config/menu-config';
import React, { Component } from 'react';
import { Icon, Menu } from 'antd';
import { Link } from 'react-router-dom';

const SubMenu = Menu.SubMenu;

class NavMenu extends Component {
  constructor(props) {
    super(props);
    let subMenus = [];
    for (let i in MenuSettings) {
      if (MenuSettings[i].type === 1) {
        subMenus.push(MenuSettings[i].link);
      }
    }
    this.state = {
      current: '',
      open: [],
      subMenus: subMenus,
    };
  }

  componentDidMount() {
    let curUrl = window.location.pathname;
    let home = '/console/dashboard/home';
    curUrl = curUrl === '/console/login' ? home : curUrl;
    this.setState({
      current: curUrl,
    });
    for (let i in this.state.subMenus) {
      if (curUrl.indexOf(this.state.subMenus[i]) >= 0) {
        let open = this.state.open;
        open.push(this.state.subMenus[i]);
        this.setState({ open });
      }
    }
  }

  handleSelectedKey(item, key, selectedKeys) {
    this.setState({
      current: item.key,
    });
  }

  handleOpenChanged(keys) {
    this.setState({
      open: keys,
    });
  }

  render() {
    return (
      <Menu theme={'dark'} mode="inline"
        // style={{width: 256}}
            defaultSelectedKeys={['/console/dashboard/home']}
        // defaultOpenKeys={['/console/dashboard']}
            selectedKeys={[this.state.current]}
            onSelect={this.handleSelectedKey.bind(this)}
            onOpenChange={this.handleOpenChanged.bind(this)}
            openKeys={[...this.state.open]}
      >
        {recMenu(MenuSettings, this)}
      </Menu>
    );
  }
}

function recMenu(datasource, comp) {
  return datasource.map((menu, i) => {
    if (menu.type === 0) {
      return (
        <Menu.Item key={menu.link}>
          <Link to={menu.link}><Icon type={menu.icon}/><span>{menu.name}</span></Link>
        </Menu.Item>);
    } else if (menu.type === 1) {
      return (
        <SubMenu key={menu.link} title={<span><Icon type={menu.icon}/><span>{menu.name}</span></span>}>
          {recMenu(menu.subs, comp)}
        </SubMenu>
      );
    } else {
      return (
        <Menu.Item key={menu.link}>
          <Link to={menu.link}>
            <span>{menu.name}</span>
          </Link>
        </Menu.Item>
      );
    }
  });
}

export default NavMenu;


