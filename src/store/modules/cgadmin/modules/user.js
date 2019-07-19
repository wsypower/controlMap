/*
 * @Author: wei.yafei
 * @Date: 2019-06-08 11:11:41
 * @Last Modified by: wei.yafei 
 * @Last Modified time: 2019-07-17 10:14:23
 */
export default {
  namespaced: true,
  state: {
    // 用户信息
    info: {}
  },
  getters: {
    role: state => {
      return state.info.name && state.info.name.role
    }
  },
  actions: {
    /**
     * @description 设置用户数据
     * @param {Object} state vuex state
     * @param {*} info info
     */
    set({ commit, dispatch }, info) {
      return new Promise(async resolve => {
        // store 赋值 => 通过 => createPersistedState()持久化用户数据到se
        commit('infoSet', info)
        // 持久化 => 讲用户数据放入到存储到localStorage
        await dispatch(
          'cgadmin/db/set',
          {
            dbName: 'sys',
            path: 'user.info',
            value: info,
            user: true
          },
          { root: true }
        )
        // end
        resolve()
      })
    },
    /**
     * @description 从数据库取用户数据
     * @param {Object} state vuex state
     */
    load({ state, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        state.info = await dispatch(
          'cgadmin/db/get',
          {
            dbName: 'sys',
            path: 'user.info',
            defaultValue: {},
            user: true
          },
          { root: true }
        )
        // end
        resolve()
      })
    }
  },
  /**
   * @description 存取用户信息
   * @author weiyafei
   * @date 2019-06-27-21:34:52
   * @param {Object} state vuex state
   * @param {Object} info 用户信息
   */
  mutations: {
    infoSet(state, info) {
      state.info = info
    }
  }
}
