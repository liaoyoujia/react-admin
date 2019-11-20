import React, { Component } from 'react'
import { Card, Icon, Statistic } from 'antd'
export default class Home extends Component {
  render() {
    return (
      <div>
        <Card
          title="商品总量"
          style={{ width: 250 }}
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
      </div>
    )
  }
}
