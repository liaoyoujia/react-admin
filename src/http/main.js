import axios from 'axios'
import { message } from 'antd'
const http = axios.create({
  baseURL: '/',
  timeout: 5000,
})

http.interceptors.request.use(
  config => {
    message.loading('网络请求中')
    return config
  },
  error => {
    message.destroy()
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  response => {
    message.destroy()
    return response.data
  },
  error => {
    message.info('network request error:' + error)
    message.destroy()
    return Promise.reject(error)
  }
)

export default http
