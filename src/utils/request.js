//  对axios进行一个封装
import axios from 'axios'
import router from '../router' //  路由实力对象引入
import { Message } from 'element-ui' //  引入提示对象
import JSONBig from 'json-bigint' //  引入第三方包
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
// 后台数据到达响应拦截器之前走的函数
axios.defaults.transformResponse = [function (data) {
  return JSONBig.parse(data) //  替换JSON.parse为了保证数字正确
}]
// 响应拦截
axios.interceptors.response.use(function (response) {
  //  成功时执行.
  return response.data ? response.data : {} //  为了解决data不存在时then中读取数据报错问题
}, function (error) {
  console.log(error)
  // 回调函数  所有失败会进到第二个回调函数.
  // 执行失败 状态码不是200  或者219/204
  let status = error.response.status //  获取状态码  根据状态码进行提示
  // let configurl = error.request.url //  请求地址
  let message = '' // 提示信息
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      //  如果同样的状态码 但是不同意思 需要通过 请求地址来判断是哪个的响应  请求地址+状态码 一起判断怎么处理

      //  resfehtokentoken 过期 强制跳转到登录页 resfehtoken 是用来换取token的
      //  this.$router =>路由实力对象
      router.push('/login') // 回到登录页
      break
    case 401:
      //  token过期
      window.localStorage.removeItem('user-token')
      router.push('/login') // 强制回登录
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 404:
      message = '手机号不正确'
      break
    default:
      break
  }
  Message({ type: 'warning', message }) //  提示消息
  //  状态码
  // 想让错误的拦截器的内容继续进入到以后的catch中 而是进入then
  Promise.reject(error)
})

export default axios
