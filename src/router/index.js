// import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/index.vue'
import Login from '../views/login/index.vue'
import Home2 from '../views/home/home.vue' // 默认背景
const routes = [
  {
    // 强制跳转
    path: '/',
    redirect: '/home'
  },
  {
    // 主页
    path: '/home',
    name: 'home',
    component: Home,
    children: [{
      path: '', // 二级路由 什么都不写作 作为默认组件
      component: Home2
    }, {
      //  二级路由表
      path: 'comment', // 完整地址 相对地址  一级路由加/二级路由不需要加/
      component: () => import('../views/comment')//  按需加载
    }, {
      path: 'material',
      component: () => import('../views/material')//  按需加载
    }, {
      path: 'articles',
      component: () => import('../views/articles') //  按需加载
    }, {
      path: 'publish/:articleId', // 定义动态路由参数 此规则值匹配修改文章
      component: () => import('../views/publish') // 按需加载
    }, {
      path: 'publish', // 此规则是匹配文章
      component: () => import('../views/publish') // 按需加载
    }, {
      path: 'account', //  账户信息
      component: () => import('../views/account') // 按需加载
    }]
  }, {
    // 登录页面
    path: '/login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
