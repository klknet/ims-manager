import React, { Component } from 'react';
import { Avatar, Badge, Breadcrumb, Table } from 'antd';
import './user.css';
import * as moment from 'moment';
import axios from '../../utils/request';
import persist from '../../utils/persist';
import Friend from './friend';
import UserDetail from './detail';

class User extends Component {
  constructor(props) {
    super(props);
    axios.defaults.headers.common['Authorization'] = persist.getToken();
    this.state = {
      data: [],
      friends: [],
      detail:{},
      pagination: {
        total: 0,
        current: 0,
        pageSize: 10,
        onChange: this.changePage.bind(this),
      },
    };
  }

  changePage(pageNum) {
    let url = 'manager/user/listUser?page=' + pageNum + '&size=' + this.state.pagination.pageSize;
    axios.get(url).then((res) => {
      let data = res.data;
      const pagination = this.state.pagination;
      pagination.total = data.totalElements;
      pagination.current = pageNum;
      this.setState({
        data: data.content,
        pagination,
      });
    });
  }

  componentDidMount() {
    this.changePage(this.state.pagination.current);
  }

  renderFriend = (record) => {
    this.setState({
      friends: record.friends
    })
  }

  friendsOk = (e) => {
    this.setState({
      friends: []
    })
  }

  friendsCancel = (e) => {
    this.setState({
      friends: []
    })
  }

  renderDetail = (record) => {
    this.setState({
      detail: record
    })
  }

  detailOk = (e) => {
    this.setState({
      detail: {}
    })
  }

  detailCancel = (e) => {
    this.setState({
      detail: {}
    })
  }

  render() {
    let that = this
    const columns = [
      {
        title: '头像',
        dataIndex: 'imgUrl',
        key: 'imgUrl',
        render(text) {
          return <Avatar size={48} src={text}/>;
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
        title: '在线状态',
        dataIndex: 'state',
        render(text) {
          return <div>{text === 'ONLINE' ? <Badge status="processing" text="在线"/> :
            <Badge status="default" text="离线"/>}</div>;
        },
      },
      {
        title: '注册时间',
        dataIndex: 'createtime',
        key: 'createtime',
        render(text) {
          return <span>{moment(text).format('YYYY-MM-DD HH:mm')}</span>;
        },
      },
      {
        title: '操作',
        key: 'operation',
        render(text, record) {
          return (
            <div>
              <a href={'javascript:void(0)'} onClick={() => that.renderDetail(record)}>编辑</a>
              <span> | </span>
              <a href={'javascript:void(0)'} onClick={() => that.renderFriend(record)}>好友</a>
            </div>
          );
        },
      },
    ];
    return (
      <div>
        <Breadcrumb style={{ margin: '0 0 16px 0' }}>
          <Breadcrumb.Item>用户</Breadcrumb.Item>
          <Breadcrumb.Item>用户管理</Breadcrumb.Item>
        </Breadcrumb>

        <Table columns={columns}
               dataSource={this.state.data} rowKey="userId"
               pagination={this.state.pagination} size="middle"
               />

        <Friend visible={this.state.friends.length > 0}
                friends = {this.state.friends}
                friendsOk={this.friendsOk}
                friendsCancel={this.friendsCancel}/>

        <UserDetail visible={Object.keys(this.state.detail).length > 0}
                    detail={this.state.detail}
                    detailOk={this.detailOk}
                    detailCancel={this.detailCancel}/>
      </div>
    );
  }
}

export default User;