import LayotAside from './home/layout-aside'
import LayoutHeader from './home/layout-header'
import BreadCrumd from './common/bread-crumb'
export default {
  install (Vue) {
    Vue.component('layout-aside', LayotAside) //  全局注册
    Vue.component('/layout-header', LayoutHeader)//  全局注册
    Vue.component('bread-crumb', BreadCrumd) // 全局注册一个面包屑组件
  }
}
