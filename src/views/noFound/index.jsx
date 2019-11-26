import React, { Component } from 'react'
import { Empty } from 'antd'

export default class index extends Component {
  render() {
    return (
      <div>
        <Empty
          description="页面走丢了，快去找找吧！"
          onClick={() => this.props.history.push({ pathname: '/home' })}
        ></Empty>
      </div>
    )
  }
}
