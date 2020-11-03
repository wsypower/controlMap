/*
 * @Author: wei.yafei
 * @Date: 2019-06-14 15:44:35
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-07-19 19:04:34
 */

/*=============================================
 =                  router配置                 =
 =============================================*/

import layoutHeaderAside from '@/layouts/header-aside'
// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
// 对应utils下util.import.development.js和util.import.production.js
// eslint-disable-next-line no-unused-vars
const _import = require('@/utils/util.import.' + process.env.NODE_ENV)

/*=============================================
=                  在主框架内显示               =
=============================================*/

//大多数路由设置要写在 frameIn 下。frameIn 中的页面会
//在嵌套在一个包含顶栏和侧边栏的页面布局中显示

const frameIn = [
  {
    path: '/',
    name: 'layoutHeaderAside',
    redirect: { path: '/section' },
    component: layoutHeaderAside,
    meta: {
      title: '管控平台'
    },
    children: [
      {
        path: '/section',
        name: 'people',
        meta: {
          title: '人员管控',
          role: ['admin', 'super_editor']
        },
        component: _import('section/index.vue')
      },
      //测试 => page2
      {
        path: '/car',
        name: 'car',
        meta: {
          title: '车辆管控',
          role: ['admin', 'super_editor']
        },
        component: _import('car/index.vue')
      },
      //测试 => page3
      {
        path: '/records',
        name: 'records',
        meta: {
          title: '案卷管控',
          role: ['admin', 'super_editor']
        },
        component: _import('records/index.vue')
      },
      {
        path: '/video',
        name: 'video',
        meta: {
          title: '视频管控',
          role: ['admin', 'super_editor']
        },
        component: _import('video/index.vue')
      },
      {
        path: '/emergency',
        name: 'emergency',
        meta: {
          title: '应急指挥',
          role: ['admin', 'super_editor']
        },
        component: _import('emergency/page6.vue')
      },
      {
        path: '/manhole',
        name: 'manhole',
        meta: {
          title: '智能井盖',
          role: ['admin', 'super_editor']
        },
        component: _import('manhole/index.vue')
      },
      {
        path: '/dustbin',
        name: 'dustbin',
        meta: {
          title: '智能垃圾桶',
          role: ['admin', 'super_editor']
        },
        component: _import('dustbin/index.vue')
      },
      {
        path: '/water',
        name: 'water',
        meta: {
          title: '智能水位计',
          role: ['admin', 'super_editor']
        },
        component: _import('water/index.vue')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        meta: {
          title: '案卷',
          role: ['admin', 'super_editor']
        },
        component: _import('function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        meta: {
          title: '案卷',
          role: ['admin', 'super_editor']
        },
        component: _import('function/redirect')
      }
    ]
  }
]

/*=============================================
=       在主框架之外显示 一些不用权限的公用页面      =
=============================================*/
/* 登录 */
const frameOut = []

/* 没有权限-401 */
const errorPage = [
  {
    path: '/401',
    name: '401',
    component: _import('error/401')
  }
]

/*=============================================
=               导出需要显示菜单的               =
=============================================*/

export const frameInRoutes = frameIn

/*=============================================
=                 重新组织后导出                =
=============================================*/

export default [...frameIn, ...errorPage, ...frameOut]
