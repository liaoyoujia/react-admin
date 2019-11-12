import React, { Component } from 'react'
import { Card, Button, Icon, Table, Message, Select, Input } from 'antd'
import LinkButton from '../../components/linkButton/index.jsx'
import {
  reqCatoryLits,
  reqAddCategory,
  reqUpdateCategory
} from '../../http/index'
const { Option } = Select
export default class Category extends Component {
  state = {
    columnData: [], //一级列表
    subCategoryData: [], //二级列表
    categroyVisible: 0, //1添加分类 2更新分类
    parentId: '0' //一级或者二级列表
  }
  // 首次table展示
  initColumnData = () => {
    this.columns = [
      {
        width: '35%',
        title: '商品名称',
        dataIndex: 'name'
      },
      {
        width: '35%',
        title: '商品描述',
        dataIndex: 'desc'
      },
      {
        width: '20%',
        title: '商品价格',
        dataIndex: 'price'
      },
      {
        width: '5%',
        title: '状态',
        render() {
          return (
            <span>
              <Button type="primary">下载</Button>
              <div>在售</div>
            </span>
          )
        }
      },
      {
        width: '5%',
        title: '操作',
        render() {}
      }
    ]
  }
  // 展示二级列表
  showSubCategory = categroy => {
    this.setState(
      {
        parentId: categroy.key
      },
      function() {
        this.loadCatoryList(this.state.parentId)
      }
    )
  }
  //展示一级列表
  showCategroys = () => {
    this.setState({
      parentId: '0'
    })
  }
  // 请求一二级列表
  async loadCatoryList(parentId = '0') {
    // 请求一级列表
    let catoryData = await reqCatoryLits(parentId)
    if (catoryData && catoryData.status === 0) {
      let columnData = catoryData.data.map(item => ({
        name: item.name,
        key: item._id
      }))
      if (parentId !== '0') {
        // 二级列表数据
        this.setState({
          subCategoryData: columnData
        })
      } else {
        // 一级列表数据
        this.setState({
          columnData
        })
      }
    } else {
      if (parentId === '0') {
        Message.error('请求一级列表出错了！')
      } else {
        Message.error('请求二级列表出错了！')
      }
    }
  }
  // 展示添加
  showAdd = () => {
    this.setState({
      categroyVisible: 1
    })
  }
  // 修改分类
  showUpdateCategroy = categroy => {
    this.setState({
      categroyVisible: 2
    })
    this.categroy = categroy
  }
  // 添加分类
  handleAddCategory = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({
          categroyVisible: 0
        })
        this.form.resetFields()
        let res = await reqAddCategory(values)
        if (res.status === 0) {
          const { parentId } = this.state
          this.loadCatoryList(parentId)
        }
      }
    })
  }
  // 更新分类
  handleUpCategory = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({
          categroyVisible: 0
        })
        let o = {
          categoryId: this.categroy.key,
          categoryName: values.categoryName
        }
        this.form.resetFields()
        let res = await reqUpdateCategory(o)
        if (res.status === 0) {
          let { parentId } = this.state
          this.loadCatoryList(parentId)
        }
      }
    })
  }
  componentDidMount() {
    this.initColumnData()
    this.loadCatoryList()
  }
  render() {
    const { columnData, parentId, subCategoryData } = this.state
    const extra = (
      <Button type="primary" icon="plus">
        添加商品
      </Button>
    )
    const title = (
      <span>
        <Select defaultValue="jack" style={{ width: 140 }}>
          <Option value="jack">按名称搜索</Option>
          <Option value="lucy">按描述搜索</Option>
        </Select>
        <Input
          placeholder="关键字"
          style={{ width: 140, margin: '0 14px' }}
        ></Input>
        <Button type="primary">搜索</Button>
      </span>
    )
    return (
      <div>
        <Card title={title} extra={extra} style={{ width: '100%' }}>
          <Table
            columns={this.columns}
            dataSource={parentId === '0' ? columnData : subCategoryData}
            pagination={{ defaultPageSize: 5 }}
            bordered
          />
        </Card>
      </div>
    )
  }
}
