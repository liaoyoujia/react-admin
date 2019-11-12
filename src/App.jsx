import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Layout from './layout/index.jsx'
import Login from './views/login/index.jsx'
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/" component={Layout}></Route>
        {/* <Redirect path="/"></Redirect> */}
      </Switch>
    </BrowserRouter>
  )
}

export default App
