import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import menuConfig from '../../config/routerDetail'
import homeLogo from '../../assert/imgs/home_logo.png'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { setHeaderTitle } from '../../redux/actions'
const { SubMenu } = Menu
class LeftNav extends Component {
  // renderMenu = menuList => {
  //   return menuList.map(item => {
  //     if (item.children) {
  //       return (
  //         <SubMenu
  //           key={item.key}
  //           title={
  //             <span>
  //               <Icon type={item.icon} />
  //               <span>{item.title}</span>
  //             </span>
  //           }
  //         >
  //           {this.renderMenu(item.children)}
  //         </SubMenu>
  //       )
  //     } else {
  //       return (
  //         <Menu.Item key={item.key}>
  //           <Icon type={item.icon} />
  //           <span>{item.title}</span>
  //         </Menu.Item>
  //       )
  //     }
  //   })
  // }
  renderMenu = menuList => {
    let path = this.props.location.pathname
    return menuList.reduce((pre, item) => {
      if (item.children) {
        if (
          item.children.find(item => {
            return item.key === path
          })
        ) {
          this.openKey = item.key
        }
        pre.push(
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.renderMenu(item.children)}
          </SubMenu>
        )
      } else {
        pre.push(
          <Menu.Item
            key={item.key}
            onClick={() => this.props.setHeaderTitle(item.title)}
          >
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      }
      return pre
    }, [])
  }

  componentWillMount() {
    this.menuNode = this.renderMenu(menuConfig)
  }
  render() {
    let path = this.props.location.pathname
    return (
      <div style={{ width: '100%' }}>
        <div
          className="home-logo"
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            boxSizing: 'border-box',
            padding: 20,
            backgroundColor: '#002140'
          }}
        >
          <img src={homeLogo} alt="" style={{ width: '40px' }} />
          <h1 style={{ color: '#fff', fontSize: 18, marginLeft: 20 }}>
            项目后台
          </h1>
        </div>
        <Menu
          // defaultSelectedKeys={[path]}
          selectedKeys={[path]}
          // defaultSelectedKeys={['1']}
          defaultOpenKeys={[this.openKey]}
          mode="inline"
          theme="dark"
        >
          {this.menuNode}
        </Menu>
      </div>
    )
  }
}

export default connect(
  null,
  { setHeaderTitle }
)(withRouter(LeftNav))
