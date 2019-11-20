import React, { Component } from 'react'
import { Card, Button } from 'antd'
import ReactEcharts from 'echarts-for-react'
export default class Bar extends Component {
  state = {
    sales: [5, 20, 36, 10, 10, 20], // 销量的数组
    stores: [6, 10, 25, 20, 15, 10] // 库存的数组
  }
  getOption = (sales, stores) => {
    return {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量', '销价']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'line',
          data: sales
        },
        {
          name: '销价',
          type: 'line',
          data: stores
        }
      ]
    }
  }
  updateMap = () => {
    const sales = this.state.sales.map(item => item + 1)
    const stores = this.state.stores.reduce((pre, item) => {
      pre.push(item - 0.5)
      return pre
    }, [])
    this.setState({
      sales,
      stores
    })
  }
  render() {
    const { sales, stores } = this.state
    return (
      <div>
        <Card>
          <Button type="primary" onClick={this.updateMap}>
            更新
          </Button>
        </Card>
        <Card title="折线图">
          <ReactEcharts
            option={this.getOption(sales, stores)}
            style={{ width: '70%', height: 500 }}
          ></ReactEcharts>
        </Card>
      </div>
    )
  }
}
