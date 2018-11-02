import { Component } from 'react'
import { Layout } from 'antd'

const { Header, Footer, Sider, Content} = Layout

class BasicLayout extends Component {
  render() {
    return (
      <Layout>
        <Sider>sider</Sider>
      </Layout>
    )
  }
}