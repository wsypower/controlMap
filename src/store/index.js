/*
 * @Author: wei.yafei
 * @Date: 2019-06-11 11:58:18
 * @Last Modified by:   wei.yafei
 * @Last Modified time: 2019-06-14 16:58:18
 */
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

/* eslint-disable no-new */
const store = new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {}
})

export default store
