/*
 * @Author: wei.yafei
 * @Date: 2019-06-11 11:58:18
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-06-16 17:03:11
 */

/*=============================================
=                   store                     =
=============================================*/

import Vue from 'vue'
import Vuex from 'vuex'
//解决vuex刷新后数据小时问题  => 简单教程（https://juejin.im/post/5cb3fea0f265da03587befa7）
//默认持久化所有state
//默认存储到localStorage  =>  为保证user的信息安全，用户信息保存在sessionStorage（仅在当前会话下有效，关闭页面被清楚）中
import createPersistedState from 'vuex-persistedstate'
import cgadmin from './modules/cgadmin'

Vue.use(Vuex)

/* eslint-disable no-new */
const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ],
  modules: {
    cgadmin
  }
})

export default store
