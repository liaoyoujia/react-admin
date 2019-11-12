import http from './main'
// 登录接口
export const login = data => http({ url: '/login', method: 'POST', data })
// 请求品类一二级列表
export const reqCatoryLits = parentId => http({ url: '/manage/category/list', params: { parentId } })

// 添加分类
export const reqAddCategory = data => http({ url: '/manage/category/add', method: 'POST', data })
// export const reqAddCategory = (categoryName, parentId) => ajax(BASE + '', { categoryName, parentId }, 'POST')

// 更新分类
export const reqUpdateCategory = data => http({ url: '/manage/category/update', method: 'POST', data })
// export const reqUpdateCategory = ({ categoryId, categoryName }) => ajax(BASE + '/manage/category/update', { categoryId, categoryName }, 'POST')

// 获取一个分类
export const reqCategory = categoryId => http({ url: '/manage/category/info', params: { categoryId } })
// export const reqCategory = (categoryId) => ajax(BASE + '/manage/category/info', { categoryId })
