/*
 * @Author: wei.yafei
 * @Date: 2019-06-08 11:11:41
 * @Last Modified by: wei.yafei 
 * @Last Modified time: 2019-06-25 11:29:48
 */
export default {
  namespaced: true,
  state: {
    // 用户信息
    info: {}
  },
  actions: {
    /**
     * @description 设置用户数据
     * @param {Object} state vuex state
     * @param {*} info info
     */
    set({ state, dispatch }, info) {
      return new Promise(async resolve => {
        // store 赋值
        state.info = info
        // 持久化
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
  }
}
