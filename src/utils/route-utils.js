import { Route } from 'react-router-dom';
import React from 'react';

export function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => {
        console.log(route)
        return <route.component {...props}/>;
      }}
    />
  );
}