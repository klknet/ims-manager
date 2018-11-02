import { Component } from 'react';
import React from 'react';
import { Breadcrumb, Table } from 'antd';
import config from '../../config/settings';
import './user.css';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    fetch(config.url + '/manager/user/listUser').then(res => res.json())
      .then((data) => {
        this.setState({
          data: data.results,
        });
      })
      .catch(err =>console.error(err),
      );
  }

  render() {
    const columns = [
      {
        title: '头像',
        dataIndex: 'imgUrl',
        key: 'imgUrl',
        render(text) {
          return <img alt='avatar' className="user-avatar" src={text}/>;
        },
      },
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username'
      },
      {
        title: '昵称',
        dataIndex: 'nickname',
        key: 'nickname',
      },
      {
        title: '手机号',
        dataIndex: 'cellphone',
        key: 'cellphone'
      },
      {
        title: '城市',
        dataIndex: 'city',
        key: 'city'
      },
      {
        title: '注册时间',
        dataIndex: 'createtime',
        key: 'createtime'
      },
      {
        title: '操作',
        key: 'operation',
        render(text){
          return <span>编辑 | 更多</span>
        }
      },
    ];
    return (
      <div>
      <Breadcrumb style={{ margin:'0 0 16px 0'}}>
        <Breadcrumb.Item>用户</Breadcrumb.Item>
        <Breadcrumb.Item>用户管理</Breadcrumb.Item>
      </Breadcrumb>
      <Table columns={columns} dataSource={this.state.data} rowKey="userId" size="middle"/>
      </div>
    );
  }
}

export default User;