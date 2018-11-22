import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import logo from './asserts/logo.svg';
import './App.css';
import {Layout} from 'antd';
import 'antd/dist/antd.css';
import NavMenu from './component/nav-menu';
import ImsRoutes from './component/ims-routes';
import NormalLoginForm from './pages/login/login';

const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: false
    }
  }

  componentWillMount () {
    this.setState({
      login: true
    })
  }

  callback () {
    console.log('callback')
    this.setState = {
      login: true
    }
  }
  render() {
    console.log(this.state.login)
    if(!this.state.login){
      return (
        <Router>
          <Switch>
            <Route path={'/console/login'} component={
              props => {
                return <NormalLoginForm callback={this.callback.bind(this)}/>}
            }/>
            <Redirect to={'/console/login'}/>
          </Switch>
        </Router>)
    }
    return (
      <Router>
        <Index/>
      </Router>
    );
  }
}

class Index extends Component {
  render() {
    return (
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
    )
  }
}


export default App;
