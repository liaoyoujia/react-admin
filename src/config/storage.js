import store from 'store'
// 存值
export const setStore = (name, data) => store.set(name, data)
// 取值
export const getStore = (name) => store.get(name)
// 删除
export const removeStore = (name) => store.remove(name)
