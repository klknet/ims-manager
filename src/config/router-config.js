import React from 'react';
import User from '../pages/user/user';
import Detail from '../pages/user/detail';

function Home() {
  return (
    <div>
      <div>Home</div>
    </div>
  );
}

function Relationship() {
  return <div>Relationship</div>;
}

const routes = [
  {
    path: '/console',
    component: Home,
  },
  {
    path: '/console/userManager',
    component: User,
  },
  {
    path: '/console/userManager/detail',
    component: Detail,
  },
  {
    path: '/console/relationship',
    component: Relationship,
  },
];


export default routes;