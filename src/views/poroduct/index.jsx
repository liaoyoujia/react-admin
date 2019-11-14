import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./home/index.jsx";
import AddPrduct from "./addProduct/index.jsx";
export default class index extends Component {
  render() {
    return (
      <Switch>
        <Route path="/product" component={Home} exact></Route>
        <Route path="/product/add" component={AddPrduct}></Route>
      </Switch>
    );
  }
}
