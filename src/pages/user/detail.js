import React, { Component } from 'react';
import { Avatar, Button, Form, Input, Modal } from 'antd';
import axios from '../../utils/request';
import User from './user';

const FormItem = Form.Item;

class UserDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    const { getFieldDecorator } = this.props.form;
    const {visible, detail, detailOk, detailCancel} = this.props
    return (
      <Modal visible={visible}
             title={'好友详情'}
             onOk={detailOk}
             okText={'修改'}
             cancelText={'取消'}
             onCancel={detailCancel}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Form>
            {getFieldDecorator('userId', {initialValue: detail.userId})(<Input type='hidden'/>)}
            <FormItem label={'头像'} {...formItemLayout}>
              {getFieldDecorator('imgUrl', {})(
                <Avatar size={64} src={detail.imgUrl}/>,
              )}
            </FormItem>
            <FormItem label={'昵称'} {...formItemLayout}>
              {getFieldDecorator('nickname', { initialValue: detail.nickname })(
                <Input/>,
              )}
            </FormItem>
            <FormItem label={'手机号'} {...formItemLayout}>
              {getFieldDecorator('cellphone', { initialValue: detail.cellphone })(
                <Input disabled={true}/>,
              )}
            </FormItem>
            <FormItem label={'城市'} {...formItemLayout}>
              {getFieldDecorator('city', {initialValue: detail.city})(
                <Input />,
              )}
            </FormItem>
          </Form>
        </div>
      </Modal>
    );
  }
}

const Detail = Form.create()(UserDetail);

export default Detail;