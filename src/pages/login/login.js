import { Button, Checkbox, Form, Icon, Input } from 'antd';
import React from 'react';
import './login.css';
import logo from '../../asserts/logo.svg';

import axios from '../../utils/request';
import ReactDOM from 'react-dom';
import persist from '../../utils/persist'

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.login = ()=>{
      props.callback()
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post("auth/login", {...values}).then(res=>{
          persist.storeToken(res.data.token)
          persist.storeUser(res.data.user)
          this.login()
          window.location.url = '/console/dashboard/home'
        }).catch(error=>{
          if(error)
            console.log(error)
        })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-container">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            <img className='login-logo' src={logo}/>
            <h1 style={{ display: 'inline' }}>Ims Manager</h1>
          </FormItem>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder="Username"/>,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>} type="password"
                     placeholder="Password"/>,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>,
            )}
            <a className="login-form-forgot" href="">Forgot password</a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="">register now!</a>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

ReactDOM.render(<WrappedNormalLoginForm />, document.getElementById('root'));
export default WrappedNormalLoginForm;