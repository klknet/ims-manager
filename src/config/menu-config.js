// type 1-分组 2-叶子节点
const MenuSettings = [
  {
    type: 1,
    link: '/console/dashboard',
    name: 'DashBoard',
    icon: 'home',
    subs: [
      {
        type: 2,
        name: '主页',
        link: '/console/dashboard/home'
      },
    ],
  },
  {
    type: 1,
    icon: 'user',
    name: '用户',
    link: '/console/user',
    subs: [
      {
        type: 2,
        name: '用户管理',
        link: '/console/user/userManager',
      },
      {
        type: 2,
        name: '好友关系',
        link: '/console/user/relationship',
      },
    ],
  },
  {
    type: 1,
    icon: 'message',
    name: '消息',
    link: '/console/msg',
    subs: [
      {
        type: 2,
        name: '消息管理',
        link: '/console/msg/msgManager',
      },
    ],
  },
];
export default MenuSettings;
