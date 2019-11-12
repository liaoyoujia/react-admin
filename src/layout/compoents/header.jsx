import React, { Component } from 'react'
import './header.less'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { resetUserInfor } from '../../redux/actions'
import { Modal } from 'antd'
import { formateDate } from '../../config/formateDate'
import LinkButton from '../../components/linkButton/index.jsx'
import { loadWeather } from '../../http/jsonp'

class Header extends Component {
  state = {
    currentTime: formateDate(Date.now()),
    dayPictureUrl: '',
    weather: ''
  }
  componentDidMount() {
    this.getCurrentTime()
    this.getWeather()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }
  getWeather = async () => {
    let { dayPictureUrl, weather } = await loadWeather('北京')
    this.setState({
      dayPictureUrl,
      weather
    })
  }
  getCurrentTime = () => {
    this.timer = setInterval(() => {
      this.setState({
        currentTime: formateDate(Date.now())
      })
    }, 1000)
  }
  //退出
  loginOut = () => {
    Modal.confirm({
      title: '确认退出吗?',
      onOk: () => {
        this.props.resetUserInfor()
      }
    })
  }

  render() {
    const { headerTitle } = this.props
    const { currentTime, dayPictureUrl, weather } = this.state
    return (
      <div className="header">
        <header className="header-top">
          <span className="header-welcome">欢迎，admin</span>
          <LinkButton onClick={this.loginOut}>退出</LinkButton>
        </header>
        <div className="header-cont">
          <h2 className="header-title">{headerTitle}</h2>
          <div className="header-weather ">
            <span>{currentTime}</span>
            <img src={dayPictureUrl} alt="" className="header-weather-img" />
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({ headerTitle: state.headerTitle }),
  { resetUserInfor }
)(withRouter(Header))
