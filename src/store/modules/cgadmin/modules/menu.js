// 设置文件
import setting from '@/setting.js'

export default {
  namespaced: true,
  state: {
    // 侧栏菜单
    aside: [],
    // 侧边栏内容栏收缩
    asideCollapse: setting.menu.asideCollapse
  },
  actions: {
    /**
     * @description 设置侧边栏展开或者收缩
     * @param {Object} state vuex state
     * @param {Boolean} collapse is collapse
     * @returns {Promise}
     * @example
     // 折叠侧边栏菜单
     * this.$store.dispatch('cgadmin/menu/asideCollapseSet', true)
     // 展开侧边栏菜单
     * this.$store.dispatch('cgadmin/menu/asideCollapseSet', false)
     */
    asideCollapseSet({ state, dispatch }, collapse) {
      return new Promise(async resolve => {
        // store 赋值
        state.asideCollapse = collapse
        // 持久化
        await dispatch(
          'd2admin/db/set',
          {
            dbName: 'sys',
            path: 'menu.asideCollapse',
            value: state.asideCollapse,
            user: true
          },
          { root: true }
        )
        // end
        resolve()
      })
    },
    /**
     * 切换侧边栏展开和收缩
     * @param {Object} state vuex state
     */
    asideCollapseToggle({ state, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        state.asideCollapse = !state.asideCollapse
        // 持久化
        await dispatch(
          'd2admin/db/set',
          {
            dbName: 'sys',
            path: 'menu.asideCollapse',
            value: state.asideCollapse,
            user: true
          },
          { root: true }
        )
        // end
        resolve()
      })
    },
    /**
     * 从持久化数据读取侧边栏展开或者收缩
     * @param {Object} state vuex state
     */
    asideCollapseLoad({ state, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        state.asideCollapse = await dispatch(
          'd2admin/db/get',
          {
            dbName: 'sys',
            path: 'menu.asideCollapse',
            defaultValue: setting.menu.asideCollapse,
            user: true
          },
          { root: true }
        )
        // end
        resolve()
      })
    }
  },
  mutations: {
    /**
     * @description 设置侧边栏菜单
     * @param {Object} state vuex state
     * @param {Array} menu menu setting
     */
    asideSet(state, menu) {
      // store 赋值
      state.aside = menu
    }
  }
}