import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'
class UpdateFrom extends Component {
  static propTypes = {
    categroyName: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired
  }
  componentWillMount() {
    this.props.setForm(this.props.form)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { categroyName } = this.props
    return (
      <Form>
        <Form.Item>
          {getFieldDecorator('categoryName', {
            initialValue: categroyName,
            rules: [{ required: true, message: '请输入分类名称！' }]
          })(<Input placeholder="请输入分类名称" />)}
        </Form.Item>
      </Form>
    )
  }
}
export default Form.create()(UpdateFrom)
