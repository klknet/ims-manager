// type 0-单节点  1-分组 2-叶子节点
const MenuSettings = [
  {
    type: 0,
    link: '/console',
    name: '主页',
    key: 'home',
    icon: 'home',
  },
  {
    type: 1,
    icon: 'user',
    name: '用户',
    key: 'user',
    subs: [
      {
        type: 2,
        name: '用户管理',
        key: 'userManager',
        link: '/console/userManager',
      },
      {
        type: 2,
        name: '好友关系',
        key: 'relationship',
        link: '/console/relationship',
      },
    ],
  },
  {
    type: 1,
    icon: 'message',
    name: '消息',
    key: 'msg',
    subs: [
      {
        type: 2,
        name: '消息管理',
        key: 'msgManager',
        link: '/console/msgManager',
      },
    ],
  },
];
export default MenuSettings;
