import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import User from '../pages/user/user';
import UserDetail from '../pages/user/detail';
import Msg from '../pages/msg/msg';

class Dashboard extends Component {
  render() {
    return (
      <div>Dashboard</div>
    );
  }
}

class Relationship extends Component {
  render() {
    return (
      <div>Relationship</div>
    );
  }
}

class ImsRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/console/dashboard/home' component={Dashboard}/>
        <Route exact path='/console/user/userManager' component={User}/>
        <Route path='/console/user/userManager/detail' component={UserDetail}/>
        <Route path='/console/user/relationship' component={Relationship}/>
        <Route path='/console/msg/msgManager' component={Msg}/>
        <Redirect to='/console/dashboard/home'/>
      </Switch>
    );
  }
}

export default ImsRoutes;

