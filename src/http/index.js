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

// 获取商品分页列表
// export const reqProducts = (pageNum, pageSize) => ajax(BASE + '/manage/product/list', { pageNum, pageSize })

// 更新商品的状态(上架/下架)
// export const reqUpdateStatus = (productId, status) => ajax(BASE + '/manage/product/updateStatus', { productId, status }, 'POST')

// export const reqSearchProducts = ({ pageNum, pageSize, searchName, searchType }) => ajax(BASE + '/manage/product/search', {
//   pageNum,
//   pageSize,
//   [searchType]: searchName,
// })

// 删除指定名称的图片
// export const reqDeleteImg = (name) => ajax(BASE + '/manage/img/delete', { name }, 'POST')

// 添加/修改商品
// export const reqAddOrUpdateProduct = (product) => ajax(BASE + '/manage/product/' + (product._id ? 'update' : 'add'), product, 'POST')
// 修改商品
// export const reqUpdateProduct = (product) => ajax(BASE + '/manage/product/update', product, 'POST')
