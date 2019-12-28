import LayotAside from '../layout-aside'
import LayoutHeader from '../layout-header'
import BreadCrumb from '../common/bread-crumb.vue'
import { quillEditor } from 'vue-quill-editor' // 引入了quillEditor组件
import CoverImage from '../publish/cover-image' // 路径和老师的不一样 因为文件夹
import SelectImage from '../publish/select-image'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  install (Vue) {
    Vue.component('layout-aside', LayotAside) //  全局注册
    Vue.component('layout-header', LayoutHeader)//  全局注册
    Vue.component('bread-crumb', BreadCrumb) // 全局注册一个面包屑组件
    Vue.component('quill-editor', quillEditor)//  全局注册一个富文本
    Vue.component('cover-image', CoverImage) // 注册一个封面组件
    Vue.component('select-image', SelectImage) //  注册一个选择素材组件
  }
}
