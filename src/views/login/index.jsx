import React, { Component } from 'react'
import logo from '../../assert/imgs/login_logo.png'
import Form from './components/form.jsx'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import './index.less'

class login extends Component {
  render() {
    let { user } = this.props
    if (user && user._id) {
      return <Redirect to="/home"></Redirect>
    }
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="" className="login-logo" />
          <h1 className="login-title">React项目:后台管理系统</h1>
        </header>
        <section>
          <Form></Form>
        </section>
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user }),
  null
)(login)
