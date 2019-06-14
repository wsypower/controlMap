/*
 * @Author: wei.yafei
 * @Date: 2019-06-14 16:56:20
 * @Last Modified by: wei.yafei 
 * @Last Modified time: 2019-06-14 17:11:36
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

// 导出路由 在 main.js 里使用
const router = new VueRouter({
  routes
})

export default router
