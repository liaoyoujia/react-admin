import { SET_HEADER_TITLE, SET_USER, REST_USER } from './action-types'
import { setStore, removeStore } from '../config/storage'
import { login } from '../http/index'

export const setHeaderTitle = (headerTitle) => {
  setStore('headerTitle', headerTitle)
  return { type: SET_HEADER_TITLE, data: headerTitle }
}

export const setUserInfor = (user) => ({ type: SET_USER, data: user })


// 退出 重置用户
export const resetUserInfor = () => {
  removeStore('user')
  return { type: REST_USER }
}


export const loginUser = (userInfor) => {
  return async (dispatch) => {
    let user = await login(userInfor)
    if (user.status === 0) {
      setStore('user', user.data)
      dispatch(setUserInfor(user.data))
    }
  }
}
