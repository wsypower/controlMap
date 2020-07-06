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
    redirect: { path: '/drainoffwater' },
    component: layoutHeaderAside,
    meta: {
      title: '管控系统'
    },
    children: [
      {
        path: '/drainoffwater',
        name: 'drainoffwater',
        meta: {
          title: '排水监测',
          role: ['admin']
        },
        component: _import('drainoffwater/index.vue')
      },
      {
        path: '/watersupply',
        name: 'watersupply',
        meta: {
          title: '供水监测',
          role: ['admin']
        },
        component: _import('watersupply/index.vue')
      },
      {
        path: '/gas',
        name: 'gas',
        meta: {
          title: '燃气监测',
          role: ['admin']
        },
        component: _import('gas/index.vue')
      },
      {
        path: '/streetlight',
        name: 'streetlight',
        meta: {
          title: '智慧路灯',
          role: ['admin']
        },
        component: _import('streetlight/index.vue')
      },
      {
        path: '/bridge',
        name: 'bridge',
        meta: {
          title: '桥梁监控',
          role: ['admin']
        },
        component: _import('bridge/index.vue')
      },
      {
        path: '/site',
        name: 'site',
        meta: {
          title: '工地监控',
          role: ['admin']
        },
        component: _import('site/index.vue')
      },
      {
        path: '/car',
        name: 'car',
        meta: {
          title: '工地车监控',
          role: ['admin']
        },
        component: _import('car/index.vue')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        meta: {
          title: '页面刷新',
          role: ['admin', 'super_editor']
        },
        component: _import('function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        meta: {
          title: '页面重定向',
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
