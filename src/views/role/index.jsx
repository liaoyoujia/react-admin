import React, { Component } from 'react'
import { Card, Button, Table, Modal, Message } from 'antd'
import { reqRoles, reqAddRole, reqUpdateRole } from '../../http/index'
import { connect } from 'react-redux'
import { resetUserInfor } from '../../redux/actions'
import { formateDate } from '../../config/formateDate'
import AddForm from './components/addForm.jsx'
import AuthForm from './components/authForm.jsx'
class Role extends Component {
  constructor(props) {
    super(props)
    this.authForm = React.createRef()
    this.state = {
      roleData: [],
      role: {}, //选择的角色
      visible: 0 //1添加角色 2 设置角色权限
    }
  }
  initTableColumns = () => {
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: formateDate
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render: formateDate
      },
      {
        title: '授权人',
        dataIndex: 'auth_name'
      }
    ]
  }
  loadTableData = async () => {
    const res = await reqRoles()
    if (res.status === 0) {
      this.setState({
        roleData: res.data
      })
    }
  }
  addRole = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({
          visible: 0
        })
        const res = await reqAddRole(values)
        if (res.status === 0) {
          Message.success('添加角色成功！')
          this.loadTableData()
        }
      }
    })
  }
  updateRole = async () => {
    const role = this.state.role
    this.setState({
      visible: 0
    })
    const menus = this.authForm.current.getCheckKeys()
    role.menus = menus
    role.auth_time = Date.now()
    role.auth_name = this.props.user.username
    const res = await reqUpdateRole(role)
    if (res.status === 0) {
      if (this.props.user._id === role._id) {
        this.props.resetUserInfor()
      } else {
      }
      Message.success('更新角色成功！')
    }
  }
  chooseRow = role => {
    return {
      onClick: event => {
        this.setState({ role })
      }
    }
  }
  componentWillMount() {
    this.initTableColumns()
  }
  componentDidMount() {
    this.loadTableData()
  }
  render() {
    const { role, roleData } = this.state
    const title = (
      <span>
        <Button
          type="primary"
          style={{ marginRight: 16 }}
          onClick={() => this.setState({ visible: 1 })}
        >
          创建角色
        </Button>
        <Button
          disabled={role._id ? false : true}
          type="primary"
          onClick={() => {
            this.setState({ visible: 2 })
          }}
        >
          设置角色权限
        </Button>
      </span>
    )
    return (
      <Card title={title} className="role">
        <Table
          rowKey="_id"
          onRow={this.chooseRow}
          rowSelection={{
            type: 'radio',
            selectedRowKeys: [role._id],
            onSelect: role => {
              this.setState({
                role
              })
            }
          }}
          columns={this.columns}
          dataSource={roleData}
          pagination={{ pageSize: 3 }}
          bordered
        />
        <Modal
          title="添加角色"
          visible={this.state.visible === 1 ? true : false}
          onOk={this.addRole}
          onCancel={() => this.setState({ visible: 0 })}
        >
          <AddForm
            setForm={form => {
              this.form = form
            }}
          ></AddForm>
        </Modal>
        <Modal
          title="设置角色权限"
          visible={this.state.visible === 2 ? true : false}
          onOk={this.updateRole}
          onCancel={() => this.setState({ visible: 0 })}
        >
          <AuthForm role={role} ref={this.authForm}></AuthForm>
        </Modal>
      </Card>
    )
  }
}

export default connect(state => ({ user: state.user }), { resetUserInfor })(
  Role
)
