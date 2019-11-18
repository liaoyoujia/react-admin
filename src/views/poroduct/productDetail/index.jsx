import React, { Component } from 'react'
import { Card, Icon, List } from 'antd'
import { BASE_URL } from '../../../config/constants'
import LinkButton from '../../../components/linkButton/index.jsx'
const Item = List.Item
export default class index extends Component {
  state = {
    product: {}
  }
  initListData() {
    const { product } = this.props.location.state
    this.setState({
      product
    })
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
    const { product } = this.state
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
            <span>{product.name}</span>
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
