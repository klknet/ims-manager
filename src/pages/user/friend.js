import React, { Component } from 'react';
import { Avatar, Table, Modal } from 'antd';

class Friend extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const columns = [
      {
        title: '头像',
        dataIndex: 'imgUrl',
        render(text) {
          return <Avatar size={48} src={text}/>
        }
      },
      {
        title: '备注',
        dataIndex: 'notename'
      },
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '昵称',
        dataIndex: 'nickname'
      }
    ];
    const {visible, friends, friendsOk, friendsCancel} = this.props
    return (
      <Modal visible={visible}
             title={'好友列表'}
             onOk={friendsOk}
             onCancel={friendsCancel}>
        <Table columns={columns}
               dataSource={friends}
               pagination={false}
               rowKey = {'userId'}
               size={'middle'}/>
      </Modal>

    );
  }
}

export default Friend