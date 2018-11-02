import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Link, Redirect } from 'react-router-dom';
import logo from './asserts/logo.svg';
import './App.css';
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';
import 'antd/dist/antd.css';
import User from './pages/user/user'

const SubMenu = Menu.SubMenu;
const { Header, Content, Footer, Sider } = Layout;

const RouteFallback = (props) => {
  return <Redirect to={{
    pathname: '/',
    from:props.location
  }}/>
}

class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <Layout>
          <Sider style={{ minHeight: '100vh', width: 300 }}>
            <div>
              <img className='logo' src={logo}/>
              <h3 style={{color:'#fff', display:'inline'}}>IMS Manager</h3>
            </div>
              <div>
              <Menu theme={'dark'} mode="inline" defaultSelectedKeys={['home']}>
                <Menu.Item key='home'><Link to='/'><Icon type={'home'}/><span>Home</span></Link></Menu.Item>
                <SubMenu key={'user'} title={<span><Icon type={'user'}/><span>用户</span></span>}>
                  <Menu.Item key={'1'}><Link to="/userManager"><span>用户管理</span></Link></Menu.Item>
                  <Menu.Item key={'2'}><Link to='/relationship'><span>好友关系</span></Link></Menu.Item>
                </SubMenu>
              </Menu>
              </div>
          </Sider>
          <Layout>
            <Header style={{background: '#fff'}}>Header</Header>

            <Content style={{background: '#fff', margin: '20px 16px', padding:'25px 20px'}}>
              <Route exact path='/' component={Dashboard}/>
              <Route path='/userManager' component={User}/>
              <Route component={RouteFallback}/>
            </Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
      </div>
      </Router>
    );
  }
}

class Dashboard extends Component{
  render() {
    return (
      <div>Dashboard</div>
    )
  }
}


export default App;
