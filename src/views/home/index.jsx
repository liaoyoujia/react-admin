import React, { Component } from 'react'
import { Card, Icon, Statistic, DatePicker, Timeline } from 'antd'
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
            style={{ width: '68%', float: 'left' }}
            title={isVisted ? '访问量' : '销售量'}
            extra={<Icon type="reload" />}
          >
            <Bar></Bar>
          </Card>
          <Card
            style={{ width: '18%', float: 'right' }}
            title="任务"
            extra={<Icon type="reload" />}
          >
            <Timeline>
              <Timeline.Item color="green">新版本迭代会</Timeline.Item>
              <Timeline.Item color="green">完成网站设计初版</Timeline.Item>
              <Timeline.Item color="red">
                <p>联调接口</p>
                <p>功能验收</p>
              </Timeline.Item>
              <Timeline.Item color="green">
                <p>登录功能设计</p>
                <p>权限验证</p>
                <p>页面排版</p>
              </Timeline.Item>
            </Timeline>
          </Card>
        </Card>
      </div>
    )
  }
}
