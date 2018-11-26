import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import logo from './asserts/logo.svg';
import './App.css';
import { Layout, Avatar, Icon, Dropdown, Menu } from 'antd';
import 'antd/dist/antd.css';
import NavMenu from './component/nav-menu';
import ImsRoutes from './component/ims-routes';
import NormalLoginForm from './pages/login/login';
import axios from './utils/request';
import persist from './utils/persist';

const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: persist.getToken() != null,
    };
  }

  componentDidMount() {

  }

  callback() {
    this.setState({
      login: true,
    });
  }

  render() {
    console.log(this.state.login);
    if (this.state.login) {
      return (
        <Router>
          <Index/>
        </Router>
      );
    }
    return (
      <Router>
        <Switch>
          <Route path={'/console/login'} component={
            props => {
              return <NormalLoginForm callback={this.callback.bind(this)}/>;
            }
          }/>
          <Redirect to={'/console/login'}/>
        </Switch>
      </Router>
    );
  }
}

class User extends Component {
  constructor(props) {
    super(props);
  }

  static logout() {
    persist.logout()
    window.location.reload();
  }

  render() {
    const menu = (<Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">个人中心</a>
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item>
        <a href="javascript:void(0)" onClick={User.logout}>退出登录</a>
      </Menu.Item>
    </Menu>);

    return (
      <div style={{ float: 'right' }}>
        <Avatar icon={'user'}/>
        <Dropdown overlay={menu}>
          <a><span style={{ margin: '0 5px' }}>{persist.getUser()}</span> <Icon type={'down'}/></a>

        </Dropdown>
      </div>
    );
  }
}

class Index extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Sider width={260} style={{ minHeight: '100vh' }}>
            <div>
              <img className='logo' src={logo}/>
              <h2 style={{ color: '#fff', display: 'inline' }}>IMS Manager</h2>
            </div>
            <div>
              <NavMenu/>
            </div>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff' }}>
              <div>
                <User/>
              </div>
            </Header>
            <Content style={{ background: '#fff', margin: '20px 16px', padding: '25px 20px' }}>
              <ImsRoutes/>
            </Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}


export default App;
