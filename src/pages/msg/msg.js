import React, { Component } from 'react';
import axios from '../../utils/request';
import { Breadcrumb, Table } from 'antd';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import persist from '../../utils/persist';


class Msg extends Component {
  constructor(props) {
    super(props);
    axios.defaults.headers.common['Authorization'] = persist.getToken();
    this.state = {
      data: [],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        onChange: this.changePage.bind(this),
      },
    };
  }

  changePage(pageNum) {
    let url = 'manager/msg/listMsg?page=' + pageNum + '&size=' + this.state.pagination.pageSize;
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

  render() {
    const columns = [
      {
        title: '发送人',
        dataIndex: 'sendId',
        key: 'sender',
      },
      {
        title: '接受人',
        dataIndex: 'destId',
        key: 'receiver',
      },
      {
        title: '内容',
        dataIndex: 'content',
        key: 'content',
      },
      {
        title: '发送时间',
        dataIndex: 'ts',
        key: 'ts',
        render(text) {
          return <span>{moment(text).format('YYYY-MM-DD HH:mm')}</span>;
        },
      },
      {
        title: '消息类型',
        dataIndex: 'msgType',
        key: 'msgType',
      },
      {
        title: '操作',
        key: 'operation',
        render(text, record) {
          let path = {
            pathname: '/console/listManager/detail',
            state: record,
          };
          return (<Link to={path}>编辑</Link>);
        },
      },
    ];
    return (
      <div>
        <Breadcrumb style={{ margin: '0 0 16px 0' }}>
          <Breadcrumb.Item>消息</Breadcrumb.Item>
          <Breadcrumb.Item>消息管理</Breadcrumb.Item>
        </Breadcrumb>

        <Table columns={columns} dataSource={this.state.data} rowKey="msgId"
               pagination={this.state.pagination} size="middle"/>

      </div>
    );
  }
}

export default Msg;