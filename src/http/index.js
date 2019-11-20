import http from './main'
// 登录接口
export const login = data => http({ url: '/login', method: 'POST', data })
// 请求品类一二级列表
export const reqCatoryLits = parentId => http({ url: '/manage/category/list', params: { parentId } })

// 添加分类
export const reqAddCategory = data => http({ url: '/manage/category/add', method: 'POST', data })

// 更新分类
export const reqUpdateCategory = data => http({ url: '/manage/category/update', method: 'POST', data })

// 获取一个分类
export const reqCategory = categoryId => http({ url: '/manage/category/info', params: { categoryId } })

// 获取商品详情
export const reqGoods = (pageNum, pageSize) => http({ url: '/manage/product/list', params: { pageNum, pageSize } })

// 更新商品的状态（上架/下架）
export const reqUpdateStatus = (productId, status) => http({ url: '/manage/product/updateStatus', method: 'POST', data: { productId, status } })

// 删除指定名称的图片
export const reqDeleteImg = (name) => http({ url: '/manage/img/delete', method: 'POST', data: { name } })

//添加修改商品
export const reqAddOrUpdateProduct = (data) => http({ url: '/manage/product/' + (data._id ? 'update' : 'add'), method: 'POST', data })

// 搜索商品
export const reqSearchProduct = (pageNum, searchName, searchType, pageSize) => http({ url: '/manage/product/search', params: { pageNum, pageSize, [searchType]: searchName } })


export const reqRoles = () => http({ url: '/manage/role/list' })
export const reqAddRole = (data) => http({ url: '/manage/role/add', method: 'POST', data })
export const reqUpdateRole = (data) => http({ url: '/manage/role/update', method: 'POST', data })

export const reqUsers = () => http({ url: '/manage/user/list' })
export const reqDeleteUser = (userId) => http({ url: '/manage/user/delete', method: 'POST', data: { userId } })
export const reqAddOrUpdateUser = (user) => http({ url: '/manage/user/' + (user._id ? 'update' : 'add'), method: 'POST', data: user })
