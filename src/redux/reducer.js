import { SET_HEADER_TITLE, SET_USER, REST_USER } from './action-types'
import { combineReducers } from 'redux'
import { getStore } from '../config/storage'
// 顶部标题
let header_title = getStore('headerTitle') || "首页"
function headerTitle (state = header_title, action) {
  switch (action.type) {
    case SET_HEADER_TITLE:
      return action.data
    default:
      return state
  }
}


// 用户信息
let userInfor = getStore('user') || {}
function user (state = userInfor, action) {
  switch (action.type) {
    case SET_USER:
      return action.data
    case REST_USER:
      return {}
    default:
      return state
  }

}


export default combineReducers({
  headerTitle,
  user
})
