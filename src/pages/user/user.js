import React, { Component } from 'react';
import { Avatar, Badge, Breadcrumb, Table, message } from 'antd';
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
      friendsVisible: false,
      friends: [],
      detailVisible: false,
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
      friendsVisible: true,
      friends: record.friends
    })
  }

  friendsOk = (e) => {
    this.setState({
      friendsVisible: false,
    })
  }

  friendsCancel = (e) => {
    this.setState({
      friendsVisible: false,
    })
  }

  renderDetail = (record) => {
    this.userFormRef.props.form.resetFields()//重置组件为初始值
    this.setState({
      detailVisible: true,
      detail: record
    })
  }

  detailOk = (e) => {
    e.preventDefault();
    this.userFormRef.props.form.validateFields((err, values) => {
      axios.post('manager/user/userUpdate', values).then(res=>{
        message.success("修改成功")
        this.setState({
          detailVisible: false,
        })
        this.changePage(0)
      }).catch(error=>{
        if(error)
          message.error("修改失败")
      });
    });

  }

  detailCancel = (e) => {
    this.setState({
      detailVisible: false,
    })
  }

  saveUserFormRef = (formRef) => {
    this.userFormRef = formRef
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

        <Friend visible={this.state.friendsVisible}
                friends = {this.state.friends}
                friendsOk={this.friendsOk}
                friendsCancel={this.friendsCancel}/>

        <UserDetail visible={this.state.detailVisible}
                    detail={this.state.detail}
                    detailOk={this.detailOk}
                    detailCancel={this.detailCancel}
                    wrappedComponentRef={this.saveUserFormRef}/>
      </div>
    );
  }
}

export default User;