import React, { Component } from 'react'
import './index.less'
import { connect } from 'react-redux'
import { Layout } from 'antd'
import { Route, Switch, Redirect } from 'react-router-dom'
import LeftNav from './compoents/left-nav.jsx'
import Header from './compoents/header.jsx'
import Home from '../views/home/index.jsx'
import Category from '../views/category/index.jsx'
import Order from '../views/order/index.jsx'
import Product from '../views/poroduct/index.jsx'
import Role from '../views/role/index.jsx'
import User from '../views/user/index.jsx'
import ChartLine from '../views/chart/line.jsx'
import ChartBar from '../views/chart/bar.jsx'
import ChartPie from '../views/chart/pie.jsx'

const { Footer, Sider, Content } = Layout

class Main extends Component {
  render() {
    let { user } = this.props
    if (!user || !user._id) {
      return <Redirect to="/login"></Redirect>
    }
    return (
      <Layout className="main">
        <Sider className="main-left">
          <LeftNav></LeftNav>
        </Sider>
        <Layout className="main-cont">
          <Header></Header>
          <Content style={{ boxSizing: 'border-box', padding: '24px' }}>
            <Switch>
              <Redirect exact from="/" to="/home" />
              <Route path="/home" component={Home}></Route>
              <Route path="/category" component={Category}></Route>
              <Route path="/product" component={Product}></Route>
              <Route path="/user" component={User}></Route>
              <Route path="/role" component={Role}></Route>
              <Route path="/order" component={Order}></Route>
              <Route path="/charts/pie" component={ChartPie}></Route>
              <Route path="/charts/bar" component={ChartBar}></Route>
              <Route path="/charts/line" component={ChartLine}></Route>
            </Switch>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
              padding: '30px 0 20px',
              boxSizing: 'border-box'
            }}
          >
            推荐使用谷歌浏览器，体验更好，开发者liaoyoujia!
          </Footer>
        </Layout>
      </Layout>
    )
  }
}
export default connect(
  state => ({ user: state.user }),
  null
)(Main)
