import React, {Component} from 'react';
import {Avatar, Button, Form, Input} from 'antd';
import axios from '../../utils/request'

const FormItem = Form.Item;

class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        nickname: '',
        city: '',
        cellphone: '',
        imgUrl: '',
      },
    };
    if (this.props.location.state)
      this.state.data = Object.assign(this.state.data, this.props.location.state);
  }

  submit(e) {
    e.preventDefault();
    console.log(this.state.data);
    axios.post("manager/user/userUpdate", JSON.stringify(this.state.data))
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 },
    };
    const buttonItemLayout = {
      wrapperCol: { span: 8, offset: 2 },
    };
    return (
      <div>
        <Form onSubmit={this.submit.bind(this)}>
          <FormItem label={'头像'} {...formItemLayout}>
            <Avatar size={64} src={this.state.data.imgUrl}/>
          </FormItem>
          <FormItem label={'昵称'} {...formItemLayout}>
            <Input defaultValue={this.state.data.nickname}/>
          </FormItem>
          <FormItem label={'手机号'} {...formItemLayout}>
            <Input defaultValue={this.state.data.cellphone}/>
          </FormItem>
          <FormItem label={'城市'} {...formItemLayout}>
            <Input defaultValue={this.state.data.city}/>
          </FormItem>
          <FormItem {...buttonItemLayout} >
            <Button type="primary" htmlType={'submit'}>修改</Button>
          </FormItem>
        </Form>
      </div>

    );
  }
}

export default UserDetail;