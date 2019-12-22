//  对axios进行一个封装
import axios from 'axios'
//  请求拦截器
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 赋值黑马头条的默认地址
// 请求拦截
axios.interceptors.request.use(function (config) {
  //  执行请求ok
  //  config   是axios的所有配置
  let token = window.localStorage.getItem('user-token') // 获取token
  config.headers.Authorization = `Bearer ${token}` // 统一注入token
  return config // 返回的config就会作为新的请求选项进去请求
}, function () {
  //  执行请求失败
})
// 响应拦截
axios.interceptors.response.use(function (response) {
  //  成功时执行.
  return response.data ? response.data : {} //  为了解决data不存在时then中读取数据报错问题
}, function () {
  // 执行失败 状态码不是200  或者219/204
})

export default axios
