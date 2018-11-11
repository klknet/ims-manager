import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import logo from './asserts/logo.svg';
import './App.css';
import {Layout} from 'antd';
import 'antd/dist/antd.css';
import NavMenu from './component/nav-menu';
import ImsRoutes from './component/ims-routes';

const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Layout>
            <Sider width={260} style={{ minHeight: '100vh'}}>
              <div>
                <img className='logo' src={logo}/>
                <h2 style={{ color: '#fff', display: 'inline' }}>IMS Manager</h2>
              </div>
              <div>
                <NavMenu/>
              </div>
            </Sider>
            <Layout>
              <Header style={{ background: '#fff' }}>Header</Header>

              <Content style={{ background: '#fff', margin: '20px 16px', padding: '25px 20px' }}>
                <ImsRoutes/>
              </Content>
              <Footer>Footer</Footer>
            </Layout>
          </Layout>
        </div>
      </Router>
    );
  }
}


export default App;
