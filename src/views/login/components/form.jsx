import React, { Component } from 'react'
import './form.less'
import { Form, Icon, Input, Button } from 'antd'
import { connect } from 'react-redux'
import { loginUser } from '../../../redux/actions'
class form extends Component {
  handleSubmit = event => {
    // 阻止事件的默认行为
    event.preventDefault()
    const { validateFields } = this.props.form
    validateFields(async (err, values) => {
      if (!err) {
        this.props.loginUser(values)
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login-form">
        <h1 className="login-form-title">用户登录</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户!' }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="用户"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="密码"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
const WrappedNormalLoginForm = Form.create()(form)
export default connect(
  null,
  { loginUser }
)(WrappedNormalLoginForm)
