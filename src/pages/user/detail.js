import {Component} from 'react'
import {Form, Input, Button, Avatar} from 'antd'
import React from "react";

const FormItem = Form.Item

class UserDetail extends Component{
    constructor(props) {
        super(props)
        this.state = {
            data: {
                nickname: 'n',
                city:'c',
                imgUrl:''
            }
        }
    }
    render() {
        const formItemLayout = {
            layCol: {span:4},
            wrapperCol: {span: 14}
        }
        const buttonItemLayout = {
            wrapperCol: { span: 14, offset: 4 },
        }
        return (
            <div>
                <Form layout={"horizontal"}>
                    <FormItem label={"头像"} {...formItemLayout}>
                        <Avatar size={64} src={this.state.imgUrl}/>
                    </FormItem>
                    <FormItem label={"昵称"}>
                        <Input value={this.state.nickname}/>
                    </FormItem>
                    <FormItem label={"城市"}>
                        <Input value={this.state.city}/>
                    </FormItem>
                    <FormItem {...buttonItemLayout}>
                        <Button type="primary">Submit</Button>
                    </FormItem>
                </Form>
            </div>

        )
    }
}

export default UserDetail