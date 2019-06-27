/*
 * @Author: wei.yafei
 * @Date: 2019-06-14 15:44:35
 * @Last Modified by: wei.yafei 
 * @Last Modified time: 2019-06-27 17:28:56
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
    meta: { title: '管控平台' },
    children: [
      //测试 => page1
      {
        path: '/section',
        name: 'page1',
        meta: {
          title: '人员管控'
        },
        component: _import('section/page1.vue')
      },
      //测试 => page2
      {
        path: '/car',
        name: 'page2',
        meta: {
          title: '车辆管控'
        },
        component: _import('car/page2.vue')
      },
      //测试 => page3
      {
        path: '/records',
        name: 'page3',
        meta: {
          title: '案卷'
        },
        component: _import('records/page3.vue')
      },
      //测试 => page4
      {
        path: '/special',
        name: 'page4',
        meta: {
          title: '视频'
        },
        component: _import('special/page4.vue')
      },
      //测试 => page5
      {
        path: '/video',
        name: 'page5',
        meta: {
          title: '专题服务'
        },
        component: _import('video/page5.vue')
      },
      //测试 => page6
      {
        path: '/emergency',
        name: 'page6',
        meta: {
          title: '应急指挥'
        },
        component: _import('emergency/page6.vue')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        meta: {
          title: '案卷'
        },
        component: _import('function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        meta: {
          title: '案卷'
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

/* 错误页面-404 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('error/404')
  }
]
/* 没有权限-401 */
const errorPermission = [
  {
    path: '/401',
    name: 'Page401',
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

export default [...frameIn, ...errorPage, ...errorPermission, ...frameOut]
