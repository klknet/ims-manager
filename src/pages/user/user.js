import { Component } from 'react';
import React from 'react';
import {Route, BrowserRouter as Router, Link, Redirect, Switch } from 'react-router-dom';
import { Breadcrumb, Table } from 'antd';
import config from '../../config/settings';
import './user.css';
import UserDetail from "./detail";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 5,
        onChange: this.changePage.bind(this)
      },
    };
  }

  changePage(pageNum) {
    let params = {
      method: 'GET'
    };
    let url = config.url + '/manager/user/listUser?page='+pageNum+'&size='+this.state.pagination.pageSize
    fetch(url, params).then(res => res.json())
      .then((data) => {
        const pagination = this.state.pagination;
        pagination.total = data.total
        pagination.current = pageNum
        this.setState({
          data: data.list,
          pagination,
        });
      })
  }

  componentDidMount() {
    this.changePage(this.state.pagination.current)
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
        key: 'username',
      },
      {
        title: '昵称',
        dataIndex: 'nickname',
        key: 'nickname',
      },
      {
        title: '手机号',
        dataIndex: 'cellphone',
        key: 'cellphone',
      },
      {
        title: '城市',
        dataIndex: 'city',
        key: 'city',
      },
      {
        title: '注册时间',
        dataIndex: 'createtime',
        key: 'createtime',
      },
      {
        title: '操作',
        key: 'operation',
        render(text) {
            return (<Link to={"/console/userManager/detail"}>编辑</Link>)
        },
      },
    ];
    return (
      <div>
        <Breadcrumb style={{ margin: '0 0 16px 0' }}>
          <Breadcrumb.Item>用户</Breadcrumb.Item>
          <Breadcrumb.Item>用户管理</Breadcrumb.Item>
        </Breadcrumb>

        <Table columns={columns} dataSource={this.state.data} rowKey="userId"
               pagination={this.state.pagination} size="middle"/>

      </div>
    );
  }
}

export default User;