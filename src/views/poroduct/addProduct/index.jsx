import React, { Component } from 'react'
import { Card, Button, Input, Cascader, Icon, Form, Message } from 'antd'
import LinkButton from '../../../components/linkButton/index.jsx'
import UploadImg from '../components/uploadImg/index.jsx'
import Editor from '../components/editor/index.jsx'
import { reqCatoryLits, reqAddOrUpdateProduct } from '../../../http/index'
const { TextArea } = Input

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options: []
    }
    this.uploadImg = React.createRef()
    this.editor = React.createRef()
  }

  // 加载一级列表
  loadCategory = async (parentId = 0) => {
    let res = await reqCatoryLits(parentId)
    if (res.status === 0) {
      const options = res.data.map(item => ({
        parentId: item.parentId,
        value: item._id,
        label: item.name,
        isLeaf: false
      }))
      this.setState({
        options
      })
    }
  }
  // 加载二级分类
  loadSubOptions = async selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1]
    targetOption.loading = true
    let res = await reqCatoryLits(targetOption.value)
    targetOption.loading = false
    if (res.status === 0) {
      if (res.data && res.data.length) {
        const subCategory = res.data.map(item => ({
          value: item._id,
          label: item.name,
          isLeaf: true
        }))
        targetOption.children = subCategory
      } else {
        targetOption.isLeaf = true
      }
    }
    this.setState({
      options: [...this.state.options]
    })
  }
  // 验证价格
  validatePrice = (rule, value, callback) => {
    if (value * 1 > 0) {
      callback() // 验证通过
    } else {
      callback('价格必须大于0') // 验证没通过
    }
  }
  // 提交数据
  submit = () => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let pCategoryId, categoryId
        const { name, desc, price, categoryIds } = values
        if (categoryIds.length === 1) {
          pCategoryId = '0'
          categoryId = categoryIds[0]
        } else {
          pCategoryId = categoryIds[0]
          categoryId = categoryIds[1]
        }
        const imgs = this.uploadImg.current.getImgs()
        const detail = this.editor.current.getDetail()
        const product = {
          name,
          desc,
          price,
          pCategoryId,
          categoryId,
          imgs,
          detail
        }
        const res = await reqAddOrUpdateProduct(product)
        console.log(res, 111111111111111)
        if (res.status === 0) {
          Message.success('商品添加成功！')
          console.log(this.props.history, 123333333)
          this.props.history.goBack()
        } else {
          Message.error('商品添加成功！')
        }
      }
    })
  }
  componentDidMount() {
    this.loadCategory()
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 }
    }
    const { options } = this.state
    const { getFieldDecorator } = this.props.form
    const title = (
      <span>
        <LinkButton>
          <Icon type="arrow-left" style={{ fontSize: 20 }}></Icon>
        </LinkButton>
        <span>添加商品</span>
      </span>
    )
    return (
      <Card title={title} style={{ width: '100%' }}>
        <Form
          onSubmit={this.handleSubmit}
          {...formItemLayout}
          style={{ width: '100%' }}
        >
          <Form.Item label="商品名称">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入商品名称!' }]
            })(<Input placeholder="请输入商品名称!" />)}
          </Form.Item>
          <Form.Item label="商品描述">
            {getFieldDecorator('desc', {
              rules: [{ required: true, message: '请输入商品描述!' }]
            })(<TextArea placeholder="请输入商品描述!" />)}
          </Form.Item>
          <Form.Item label="商品价格">
            {getFieldDecorator('price', {
              rules: [
                { required: true, message: '请输入商品价格!' },
                { validator: this.validatePrice }
              ]
            })(
              <Input
                type="number"
                addonAfter="元"
                placeholder="请输入商品价格！"
              />
            )}
          </Form.Item>
          <Form.Item label="商品分类">
            {getFieldDecorator('categoryIds', {
              rules: [{ required: true, message: '必须输入商品价格' }]
            })(
              <Cascader
                placeholder="请输入商品分类!"
                options={options}
                loadData={this.loadSubOptions}
              />
            )}
          </Form.Item>
          <Form.Item label="商品图片">
            <UploadImg ref={this.uploadImg}></UploadImg>
          </Form.Item>
          <Form.Item
            label="商品详情"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 16 }}
          >
            <Editor ref={this.editor}></Editor>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={this.submit}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}
export default Form.create()(Index)
