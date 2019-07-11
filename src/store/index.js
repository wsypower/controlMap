/*
 * @Author: wei.yafei
 * @Date: 2019-06-11 11:58:18
 * @Last Modified by: wei.yafei  
 * @Last Modified time: 2019-07-11 22:03:51
 */

/*=============================================
=                   store                     =
=============================================*/

import Vue from 'vue'
import Vuex from 'vuex'
// import Cookies from '@utils/util.cookies.js'
//解决vuex刷新后数据消失问题  => 简单教程（https://juejin.im/post/5cb3fea0f265da03587befa7）
//默认持久化所有state
// import createPersistedState from 'vuex-persistedstate'
import cgadmin from './modules/cgadmin'
Vue.use(Vuex)
/* eslint-disable no-new */
const store = new Vuex.Store({
  /*=============================================
  =           缓存自己配置，以前的暂时作废           =
  =============================================*/

  // plugins: [
  //   //默认存储到localStorage  =>  为保证user的信息安全，用户
  //   //信息保存在sessionStorage（仅在当前会话下有效，关闭页面被清楚）
  //   // createPersistedState({
  //   //   storage: window.sessionStorage
  //   // })
  //   createPersistedState()
  // ],
  modules: {
    cgadmin
  }
})

export default store
