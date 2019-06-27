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
    asideCollapseSet({ commit }, collapse) {
      return new Promise(resolve => {
        // store 赋值
        commit('asideCollapseSetState', collapse)
        // end
        resolve()
      })
    },
    /**
     * 切换侧边栏展开和收缩
     * @param {Object} state vuex state
     */
    asideCollapseToggle({ commit }) {
      return new Promise(resolve => {
        // store 赋值
        commit('asideCollapseToggleState')
        // end
        resolve()
      })
    },
    asideCollapseActive({ commit }, item) {
      return new Promise(resolve => {
        // store 赋值
        commit('asideSetItemActive', item)
        // end
        resolve()
      })
    }
  },
  mutations: {
    /**
     * @description 设置侧边栏收缩
     * @param {Object} state vuex state
     * @param {Boolean} collapse
     */
    asideCollapseSetState(state, collapse) {
      state.asideCollapse = collapse
    },
    /**
     * @description 切换侧边栏展开和收缩
     * @param {Object} state vuex state
     * @param {Boolean} collapse
     */
    asideCollapseToggleState(state) {
      state.asideCollapse = !state.asideCollapse
    },
    /**
     * @description 设置侧边栏菜单数据
     * @param {Object} state vuex state
     * @param {Array} menu menu setting
     */
    asideSet(state, menu) {
      // store 赋值
      state.aside = menu
    },
    /**
     * @description 激活当前被点击菜单 - active
     * @param {Object} state vuex state
     * @param {Array} item 点击的元素
     */
    asideSetItem(state, item) {
      state.aside.map(v => {
        //切换点击元素的active，其他设为false
        v.path === item.path ? (v.active = !v.active) : (v.active = false)
      })
    }
  }
}
