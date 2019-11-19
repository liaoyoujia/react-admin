import React, { Component } from 'react'
import { Card, Button, Table, Select, Input, Message } from 'antd'
import LinkButton from '../../../components/linkButton/index.jsx'
import { PAGE_SIZE } from '../../../config/constants'
import {
  reqGoods,
  reqUpdateStatus,
  reqSearchProduct
} from '../../../http/index'
const { Option } = Select
export default class Category extends Component {
  state = {
    pageNum: 1,
    searchName: '',
    searchType: 'productName',
    columnData: [] //列表数据
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
        dataIndex: 'price',
        render: price => `￥${price}`
      },
      {
        width: '5%',
        title: '状态',
        render: product => {
          const { status, _id } = product
          const newStatus = status === 1 ? 2 : 1
          return (
            <span>
              <Button
                type="primary"
                onClick={() => {
                  this.updateStatus(_id, newStatus)
                }}
              >
                {status === 1 ? '下架' : '上架'}
              </Button>
              <div>{status === 1 ? '在售' : '已下架'}</div>
            </span>
          )
        }
      },
      {
        width: '5%',
        title: '操作',
        render: product => {
          return (
            <span>
              <LinkButton
                onClick={() =>
                  this.props.history.push('/product/detail', { product })
                }
              >
                详情
              </LinkButton>
              <LinkButton
                onClick={() =>
                  this.props.history.push('/product/editor', product)
                }
              >
                修改
              </LinkButton>
            </span>
          )
        }
      }
    ]
  }
  // 修改商品状态
  updateStatus = async (id, status) => {
    let res = await reqUpdateStatus(id, status)
    if (res.status === 0) {
      Message.success('状态修改成功!')
      this.loadCardData()
    }
  }
  // 加载列表数据
  loadCardData = async () => {
    let res = await reqGoods(this.state.pageNum, PAGE_SIZE)
    if (res.status === 0) {
      let list = res.data.list.map(item => ({ ...item, key: item._id }))
      this.total = res.data.total
      this.setState({
        columnData: list
      })
    }
  }

  //跳转页码
  changePage = page => {
    this.setState(
      {
        pageNum: page
      },
      function() {
        if (this.state.searchName !== '') {
          this.getSearchProduct(this.state.pageNum)
        } else {
          this.loadCardData()
        }
      }
    )
  }

  getSearchProduct = async pageNum => {
    const { searchName, searchType } = this.state
    const res = await reqSearchProduct(
      pageNum,
      searchName,
      searchType,
      PAGE_SIZE
    )
    if (res.status === 0) {
      let list = res.data.list.map(item => ({ ...item, key: item._id }))
      this.total = res.data.total
      this.setState({
        columnData: list
      })
    }
  }
  componentDidMount() {
    this.initColumnData()
    this.loadCardData()
  }
  render() {
    const { columnData, searchType, searchName } = this.state
    const extra = (
      <Button
        type="primary"
        icon="plus"
        onClick={() => this.props.history.push('/product/add')}
      >
        添加商品
      </Button>
    )
    const title = (
      <span>
        <Select
          value={searchType}
          style={{ width: 140 }}
          onChange={value => {
            this.setState({ searchType: value })
          }}
        >
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input
          placeholder="关键字"
          value={searchName}
          onChange={e => this.setState({ searchName: e.target.value })}
          style={{ width: 140, margin: '0 14px' }}
        ></Input>
        <Button type="primary" onClick={() => this.getSearchProduct(1)}>
          搜索
        </Button>
      </span>
    )
    return (
      <div>
        <Card title={title} extra={extra} style={{ width: '100%' }}>
          <Table
            columns={this.columns}
            dataSource={columnData}
            pagination={{
              defaultPageSize: PAGE_SIZE,
              total: this.total,
              onChange: this.changePage
            }}
            bordered
          />
        </Card>
      </div>
    )
  }
}
