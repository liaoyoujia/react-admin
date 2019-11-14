import React, { Component } from "react";
import { Card, Button, Table, Select, Input, Message } from "antd";
import LinkButton from "../../../components/linkButton/index.jsx";
import { PAGE_SIZE } from "../../../config/constants";
import { reqGoods, reqUpdateStatus } from "../../../http/index";
const { Option } = Select;
export default class Category extends Component {
  state = {
    pageNum: 1,
    columnData: [] //列表数据
  };
  // 首次table展示
  initColumnData = () => {
    this.columns = [
      {
        width: "35%",
        title: "商品名称",
        dataIndex: "name"
      },
      {
        width: "35%",
        title: "商品描述",
        dataIndex: "desc"
      },
      {
        width: "20%",
        title: "商品价格",
        dataIndex: "price",
        render: price => `￥${price}`
      },
      {
        width: "5%",
        title: "状态",
        render: product => {
          const { status, _id } = product;
          const newStatus = status === 1 ? 2 : 1;
          return (
            <span>
              <Button
                type="primary"
                onClick={() => {
                  this.updateStatus(_id, newStatus);
                }}
              >
                {status === 1 ? "下架" : "上架"}
              </Button>
              <div>{status === 1 ? "在售" : "已下架"}</div>
            </span>
          );
        }
      },
      {
        width: "5%",
        title: "操作",
        render() {
          return (
            <span>
              <LinkButton>详情</LinkButton>
              <LinkButton>修改</LinkButton>
            </span>
          );
        }
      }
    ];
  };
  // 修改商品状态
  updateStatus = async (id, status) => {
    let res = await reqUpdateStatus(id, status);
    if (res.status === 0) {
      Message.success("状态修改成功!");
      this.loadCardData();
    }
  };
  // 加载列表数据
  loadCardData = async () => {
    this.pageNum = 1;
    let res = await reqGoods(this.pageNum, PAGE_SIZE);
    if (res.status === 0) {
      let list = res.data.list.map(item => ({ ...item, key: item._id }));
      this.setState({
        columnData: list
      });
    }
  };
  componentDidMount() {
    this.initColumnData();
    this.loadCardData();
  }
  render() {
    const { columnData } = this.state;
    const extra = (
      <Button
        type="primary"
        icon="plus"
        onClick={() => this.props.history.push("/product/add")}
      >
        添加商品
      </Button>
    );
    const title = (
      <span>
        <Select defaultValue="jack" style={{ width: 140 }}>
          <Option value="jack">按名称搜索</Option>
          <Option value="lucy">按描述搜索</Option>
        </Select>
        <Input
          placeholder="关键字"
          style={{ width: 140, margin: "0 14px" }}
        ></Input>
        <Button type="primary">搜索</Button>
      </span>
    );
    return (
      <div>
        <Card title={title} extra={extra} style={{ width: "100%" }}>
          <Table
            columns={this.columns}
            dataSource={columnData}
            pagination={{ defaultPageSize: 5 }}
            bordered
          />
        </Card>
      </div>
    );
  }
}
