import React, { Component } from 'react'
import { Card, Button, Table, Modal, Message, Popconfirm } from 'antd'
import AddForm from './components/addForm.jsx'
import { formateDate } from '../../config/formateDate'
import { reqUsers, reqDeleteUser, reqAddOrUpdateUser } from '../../http/index'
import LinkButton from '../../components/linkButton/index.jsx'
export default class User extends Component {
  state = {
    tableData: [],
    roles: [],
    visible: false
  }
  initTableColumn = () => {
    this.columnData = [
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },
      {
        title: '电话',
        dataIndex: 'phone'
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: formateDate
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        render: role_id => this.rolesName[role_id]
      },
      {
        title: '操作',
        render: user => {
          return (
            <span>
              <LinkButton
                style={{ marginLeft: 10 }}
                onClick={() => {
                  this.showModel(user)
                }}
              >
                修改
              </LinkButton>
              <LinkButton onClick={() => this.deleteUser(user)}>
                删除
              </LinkButton>
            </span>
          )
        }
      }
    ]
  }
  showModel = user => {
    this.setState({
      visible: true
    })
    this.user = user
    this.editor = !!this.user
  }
  deleteUser = user => {
    Modal.confirm({
      title: `真的要删除用户${user.username}吗？`,
      onOk: async () => {
        const res = await reqDeleteUser(user._id)
        if (res.status === 0) {
          Message.success('删除成功！')
          this.loadTableData()
        }
      }
    })
  }
  loadTableData = async () => {
    const res = await reqUsers()
    if (res.status === 0) {
      let tableData = res.data.users.map(item => ({ ...item, key: item._id }))
      this.initRoleName(res.data.roles)
      this.setState({
        tableData,
        roles: res.data.roles
      })
    }
  }
  initRoleName = roles => {
    this.rolesName = roles.reduce((pre, item) => {
      pre[item._id] = item.name
      return pre
    }, {})
  }
  handleOk = () => {
    this.setState({
      visible: false
    })
    this.form.validateFields(async (err, values) => {
      if (!err) {
        this.form.resetFields()
        if (this.editor) {
          values._id = this.user._id
        }
        let res = await reqAddOrUpdateUser(values)
        if (res.status === 0) {
          Message.success(`${this.editor ? '修改' : '添加'}用户成功！`)
          this.loadTableData()
        }
      }
    })
  }
  componentWillMount() {
    this.initTableColumn()
  }
  componentDidMount() {
    this.loadTableData()
  }
  render() {
    const { tableData, roles } = this.state
    const user = this.user || {}
    const title = (
      <Button
        type="primary"
        onClick={() => {
          this.user = null
          this.setState({ visible: true })
        }}
      >
        创建用户
      </Button>
    )
    return (
      <Card title={title}>
        <Table columns={this.columnData} dataSource={tableData} bordered />

        <Modal
          title="添加用户"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={() => {
            this.form.resetFields()
            this.setState({ visible: false })
          }}
        >
          <AddForm
            roles={roles}
            user={user}
            setForm={form => {
              this.form = form
            }}
          ></AddForm>
        </Modal>
      </Card>
    )
  }
}
