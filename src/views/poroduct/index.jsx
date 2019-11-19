import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './home/index.jsx'
import AddPrduct from './addOrUpdateProduct/index.jsx'
import UpdatePrduct from './addOrUpdateProduct/index.jsx'
import DetailPrduct from './productDetail/index.jsx'
import './index.less'
export default class index extends Component {
  render() {
    return (
      <Switch>
        <Route path="/product" component={Home} exact></Route>
        <Route path="/product/add" component={AddPrduct}></Route>
        <Route path="/product/editor" component={UpdatePrduct}></Route>
        <Route path="/product/detail" component={DetailPrduct}></Route>
      </Switch>
    )
  }
}
