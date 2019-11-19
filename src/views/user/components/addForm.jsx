import React, { Component } from 'react'
import { Form, Input, Select } from 'antd'
import PropTypes from 'prop-types'
const { Option } = Select
class addForm extends Component {
  static propTypes = {
    roles: PropTypes.array.isRequired,
    setForm: PropTypes.func.isRequired,
    user: PropTypes.object
  }
  componentDidMount() {
    this.props.setForm(this.props.form)
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 }
    }
    const roles = this.props.roles
    const user = this.props.user
    const { getFieldDecorator } = this.props.form
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="用户名">
          {getFieldDecorator('username', {
            initialValue: user.username,
            rules: [
              {
                required: true,
                message: '请输入用户名!'
              }
            ]
          })(<Input placeholder="请输入用户名!" />)}
        </Form.Item>
        {user._id ? null : (
          <Form.Item label="密码">
            {getFieldDecorator('password', {
              initialValue: user.password,
              rules: [
                {
                  required: true,
                  message: '请输入密码!'
                }
              ]
            })(<Input.Password placeholder="请输入密码!" />)}
          </Form.Item>
        )}

        <Form.Item label="手机号">
          {getFieldDecorator('phone', {
            initialValue: user.phone,
            rules: [
              {
                pattern: /^1(3|4|5|7|8)\d{9}$/,
                message: '请输入正确手机号格式!'
              }
            ]
          })(<Input placeholder="请输入手机号！" />)}
        </Form.Item>
        <Form.Item label="邮箱">
          {getFieldDecorator('email', {
            initialValue: user.email,
            rules: [
              {
                type: 'email',
                message: '请输入正确邮箱格式!'
              }
            ]
          })(<Input placeholder="请输入邮箱！" />)}
        </Form.Item>
        <Form.Item label="角色">
          {getFieldDecorator('role_id', {
            initialValue: user.role_id,
            rules: [
              {
                required: true,
                message: '请输入角色!'
              }
            ]
          })(
            <Select>
              {roles.map(item => (
                <Option value={item._id} key={item._id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
      </Form>
    )
  }
}
export default Form.create()(addForm)
