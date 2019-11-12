import React, { Component } from 'react'
import { Card, Button, Icon, Table, Message, Modal } from 'antd'
import LinkButton from '../../components/linkButton/index.jsx'
import AddForm from './components/add_form/index.jsx'
import UpdateForm from './components/update_form/index.jsx'
import {
  reqCatoryLits,
  reqAddCategory,
  reqUpdateCategory
} from '../../http/index'
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
        width: '80%',
        title: '分类的名称',
        dataIndex: 'name'
      },
      {
        width: '20%',
        title: '操纵',
        render: categroy => {
          return (
            <span>
              <LinkButton
                onClick={() => {
                  this.showUpdateCategroy(categroy)
                }}
              >
                修改分类
              </LinkButton>
              {this.state.parentId === '0' ? (
                <LinkButton
                  onClick={() => {
                    this.showSubCategory(categroy)
                  }}
                >
                  查看子分类
                </LinkButton>
              ) : null}
            </span>
          )
        }
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
    const {
      columnData,
      categroyVisible,
      parentId,
      subCategoryData
    } = this.state
    const categroy = this.categroy || {}
    const extra = (
      <Button type="primary" onClick={this.showAdd}>
        <Icon type="plus" />
        添加
      </Button>
    )
    const title =
      parentId === '0' ? (
        '一级分类列表'
      ) : (
        <span>
          <LinkButton onClick={this.showCategroys}>一级分类列表</LinkButton>
          <Icon type="arrow-right" style={{ margin: '0 6px' }} />
          <span>二级分类列表</span>
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
          <Modal
            title="添加分类"
            visible={categroyVisible === 1 ? true : false}
            onOk={this.handleAddCategory}
            onCancel={() => this.setState({ categroyVisible: 0 })}
          >
            <AddForm
              columnData={columnData}
              parentId={parentId}
              setForm={form => {
                this.form = form
              }}
            ></AddForm>
          </Modal>
          <Modal
            title="更新分类"
            visible={categroyVisible === 2 ? true : false}
            onOk={this.handleUpCategory}
            onCancel={() => this.setState({ categroyVisible: 0 })}
          >
            <UpdateForm
              categroyName={categroy.name}
              setForm={form => {
                this.form = form
              }}
            ></UpdateForm>
          </Modal>
        </Card>
      </div>
    )
  }
}
