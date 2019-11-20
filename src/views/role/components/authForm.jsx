import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Tree } from 'antd'
import menuConfig from '../../../config/routerDetail'
const { TreeNode } = Tree
export default class authForm extends Component {
  static propTypes = {
    role: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props)
    const { menus } = this.props.role
    this.state = {
      checkedKeys: menus
    }
  }
  getTreeNode = menuConfig => {
    return menuConfig.reduce((pre, item) => {
      pre.push(
        <TreeNode title={item.title} key={item.key}>
          {item.children ? this.getTreeNode(item.children) : null}
        </TreeNode>
      )
      return pre
    }, [])
  }
  getCheckKeys = () => this.state.checkedKeys

  onCheck = checkedKeys => {
    this.setState({
      checkedKeys
    })
  }
  componentWillReceiveProps(nextProps) {
    const menus = nextProps.role.menus
    this.setState({
      checkedKeys: menus
    })
  }

  componentWillMount() {
    this.treeNode = this.getTreeNode(menuConfig)
  }
  render() {
    const value = this.props.role.name
    let { checkedKeys } = this.state
    return (
      <div className="auth-form">
        <div className="auth-from-header" style={{ marginBottom: 20 }}>
          <span style={{ fontSize: 14, marginRight: 8 }}>角色名称:</span>
          <Input style={{ width: 250 }} disabled value={value}></Input>
        </div>
        <Tree
          checkable
          defaultExpandAll
          checkedKeys={checkedKeys}
          onCheck={this.onCheck}
        >
          <TreeNode title="平台权限" key="all">
            {this.treeNode}
          </TreeNode>
        </Tree>
      </div>
    )
  }
}
