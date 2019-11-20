import React, { Component } from 'react'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'
const Item = Form.Item
class addForm extends Component {
  static propTypes = {
    setForm: PropTypes.func.isRequired
  }
  componentDidMount() {
    this.props.setForm(this.props.form)
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 12 }
    }
    const { getFieldDecorator } = this.props.form
    return (
      <Form {...formItemLayout}>
        <Item label="角色名称">
          {getFieldDecorator('roleName', {
            rules: [{ required: true, message: '请输入角色名称！' }]
          })(<Input placeholder="请输入角色名称！" />)}
        </Item>
      </Form>
    )
  }
}
export default Form.create()(addForm)
