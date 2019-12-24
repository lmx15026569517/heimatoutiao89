import LayotAside from '../layout-aside'
import LayoutHeader from '../layout-header'
import BreadCrumb from '../common/bread-crumb'

export default {
  install (Vue) {
    Vue.component('layout-aside', LayotAside) //  全局注册
    Vue.component('layout-header', LayoutHeader)//  全局注册
    Vue.component('bread-crumb', BreadCrumb) // 全局注册一个面包屑组件
  }
}
