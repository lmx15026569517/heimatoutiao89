import Vue from 'vue'
import App from './App.vue'
import './permission' // 引入js
import router from './router'
import ElementUI from 'element-ui' // 引入包
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less' // 引入初始化
import axios from './utils/request' // 引入自己封装的axios
import Component from './components/home' //  引入组件对象
import VueRouter from 'vue-router'

Vue.prototype.$axios = axios // 赋值给全局
Vue.config.productionTip = false
Vue.use(ElementUI) // 全局注册
Vue.use(Component) // 注册全局组件对象  调用对象中的一个方法 install
Vue.use(VueRouter)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
