import React, { Component } from 'react'
import { Card, Icon, Statistic, DatePicker } from 'antd'
import moment from 'moment'
import Line from './compoents/line.jsx'
import Bar from './compoents/bar.jsx'
import './index.less'
const { RangePicker } = DatePicker
const dateFormat = 'YYYY/MM/DD'
export default class Home extends Component {
  state = {
    isVisted: true
  }
  handleChange = isVisted => {
    this.setState({
      isVisted
    })
  }
  render() {
    const { isVisted } = this.state
    const title = (
      <span>
        <span
          className={isVisted ? 'active title' : 'title'}
          onClick={() => this.handleChange(true)}
        >
          访问量
        </span>
        <span
          className={isVisted ? 'title' : 'active title'}
          onClick={() => this.handleChange(false)}
        >
          销售量
        </span>
      </span>
    )
    const extra = (
      <RangePicker
        defaultValue={[
          moment('2015/01/01', dateFormat),
          moment('2015/01/01', dateFormat)
        ]}
        format={dateFormat}
      />
    )
    return (
      <div>
        <div className="home">
          <Card
            title="商品总量"
            style={{ width: 250, height: 250 }}
            headStyle={{ color: 'rgba(0,0,0,.45)' }}
            extra={
              <Icon
                type="question-circle"
                style={{ color: 'rgba(0,0,0,.45)', fontSize: 20 }}
              ></Icon>
            }
          >
            <Statistic
              value={11.28}
              valueStyle={{ color: '#000', fontSize: 32, fontWeight: 600 }}
              prefix={<Icon type="arrow-up" />}
              suffix="%"
            />
            <Statistic
              value={15}
              valueStyle={{ color: '#000', fontSize: 16 }}
              prefix={'周同比'}
              suffix={
                <div>
                  %
                  <Icon
                    style={{ color: 'red', marginLeft: 10 }}
                    type="arrow-down"
                  />
                </div>
              }
            />
            <Statistic
              value={14}
              valueStyle={{ color: '#000', fontSize: 16 }}
              prefix={'日同比'}
              suffix={
                <div>
                  %
                  <Icon
                    style={{ color: 'green', marginLeft: 10 }}
                    type="arrow-up"
                  />
                </div>
              }
            />
          </Card>
          <Line></Line>
        </div>
        <Card title={title} extra={extra}>
          <Card
            style={{ width: '60%' }}
            title={isVisted ? '访问量' : '销售量'}
            extra={<Icon type="reload" />}
          >
            <Bar></Bar>
          </Card>
        </Card>
      </div>
    )
  }
}
