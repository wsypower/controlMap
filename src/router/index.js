/*
 * @Author: wei.yafei
 * @Date: 2019-06-14 16:56:20
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-07-19 17:57:46
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
//进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress'

import store from '@/store/index'
import util from '@/utils/util.js'
//路由数据
import routes from './router'

Vue.use(VueRouter)

/*=============================================
=           导出路由 在 main.js 里使用           =
=============================================*/

const router = new VueRouter({
    routes,
    //切换页面滚动到头部
    scrollBehavior: () => ({ y: 0 })
})

/*=============================================
=                 全局路由守卫                  =
=============================================*/

// router.beforeEach((to, from, next) => {
//   // 进度条
//   NProgress.start()
//   // 验证当前路由所有的匹配中是否需要有登录验证的
//   if (to.matched.some(r => r.meta.auth)) {
//     const userId = util.cookies.get('userId')
//     if (userId && userId !== 'undefined') {
//       next()
//     } else {
//       // 没有登录的时候跳转到登录界面
//       // 携带上登陆成功之后需要跳转的页面完整路径
//       util.cookies.remove('userId')
//       next({
//         name: '401'
//       })
//       NProgress.done()
//     }
//   } else {
//     // 不需要身份校验 直接通过
//     next()
//   }
// })
router.beforeEach((to, from, next) => {
    console.log('走新页面')
    // 进度条
    NProgress.start()
    next()
})

router.afterEach(to => {
    // 进度条
    NProgress.done()
    // 打开新的页面
    store.dispatch('cgadmin/page/open', to)
    // 更改标题
    util.title(to.meta.title)
})

/*=============================================
=               路由拦截 * 权限验证              =
=============================================*/

export default router
