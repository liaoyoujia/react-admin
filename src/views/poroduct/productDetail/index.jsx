import React, { Component } from 'react'
import { Card, Icon, List } from 'antd'
import { BASE_URL } from '../../../config/constants'
import LinkButton from '../../../components/linkButton/index.jsx'
import { reqCategory } from '../../../http/index'
const Item = List.Item
export default class index extends Component {
  state = {
    product: {},
    cName1: '',
    cName2: ''
  }
  async initListData() {
    const { product } = this.props.location.state
    const { pCategoryId, categoryId } = product
    this.setState({
      product
    })
    if (pCategoryId === '0') {
      let res = await reqCategory(categoryId)
      if (res.status === 0) {
        const cName1 = res.data.name
        this.setState({
          cName1
        })
      }
    } else {
      const res = await Promise.all([
        reqCategory(pCategoryId),
        reqCategory(categoryId)
      ])
      const cName1 = res[0].data.name
      const cName2 = res[1].data.name
      this.setState({
        cName1,
        cName2
      })
    }
  }
  componentWillMount() {
    this.initListData()
  }
  render() {
    const title = (
      <span>
        <LinkButton
          onClick={() => {
            this.props.history.goBack()
          }}
        >
          <Icon type="arrow-left" style={{ fontSize: 18 }}></Icon>
        </LinkButton>
        商品详情
      </span>
    )
    const { product } = this.props.location.state
    const { cName1, cName2 } = this.state
    return (
      <Card title={title} className="product-detail">
        <List>
          <Item>
            <span className="product-item">商品名称:</span>
            <span>{product.name}</span>
          </Item>
          <Item>
            <span className="product-item">商品描述:</span>
            <span>{product.desc}</span>
          </Item>
          <Item>
            <span className="product-item">商品价格:</span>
            <span>{product.price}</span>
          </Item>
          <Item>
            <span className="product-item">所属分类:</span>
            <span>{cName2 === '' ? cName1 : cName1 + '->' + cName2}</span>
          </Item>
          <Item>
            <span className="product-item">商品图片:</span>
            {product.imgs.map(item => (
              <img src={BASE_URL + item} alt="desc" key={item} />
            ))}
          </Item>
          <Item>
            <span className="product-item">商品详情:</span>
            <span dangerouslySetInnerHTML={{ __html: product.detail }}></span>
          </Item>
        </List>
      </Card>
    )
  }
}
