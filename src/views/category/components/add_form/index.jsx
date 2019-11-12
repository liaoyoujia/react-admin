import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select } from 'antd'
const { Option } = Select
class AddFrom extends Component {
  static propTypes = {
    columnData: PropTypes.array.isRequired,
    setForm: PropTypes.func.isRequired,
    parentId: PropTypes.string.isRequired
  }
  componentWillMount() {
    this.props.setForm(this.props.form)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { columnData, parentId } = this.props
    return (
      <Form>
        <Form.Item>
          {getFieldDecorator('parentId', {
            initialValue: parentId
          })(
            <Select>
              <Option value="0" key="0">
                一级分类
              </Option>
              {columnData.map((item, index) => (
                <Option value={item.key} key={item.key}>
                  {item.name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('categoryName', {
            rules: [{ required: true, message: '请输入分类名称！' }]
          })(<Input placeholder="请输入分类名称！" />)}
        </Form.Item>
      </Form>
    )
  }
}
export default Form.create()(AddFrom)
