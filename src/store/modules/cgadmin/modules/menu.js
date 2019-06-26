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
     * this.$store.dispatch('cgadmin/menu/asideCollapseSet', false)
     // 展开侧边栏菜单
     * this.$store.dispatch('cgadmin/menu/asideCollapseSet', true)
     */
    asideCollapseSet({ state }, collapse) {
      return new Promise(resolve => {
        // store 赋值
        state.asideCollapse = collapse
        // end
        resolve()
      })
    },
    /**
     * 切换侧边栏展开和收缩
     * @param {Object} state vuex state
     */
    asideCollapseToggle({ state }) {
      return new Promise(resolve => {
        // store 赋值
        state.asideCollapse = !state.asideCollapse
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
