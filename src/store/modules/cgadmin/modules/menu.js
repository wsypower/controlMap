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
    asideCollapseSet({ commit, dispatch, state }, collapse) {
      return new Promise(async resolve => {
        // store 赋值
        commit('asideCollapseSetState', collapse)
        // 持久化
        await dispatch(
          'cgadmin/db/set',
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
     * @description 切换侧边栏展开和收缩
     * @param {Object} state vuex state
     */
    asideCollapseToggle({ commit, state, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        commit('asideCollapseToggleState')
        // 持久化
        await dispatch(
          'cgadmin/db/set',
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
     * @description 从持久化数据读取侧边栏展开或者收缩
     * @param {Object} state vuex state
     */
    asideCollapseLoad({ state, dispatch }) {
      return new Promise(async resolve => {
        // store 赋值
        state.asideCollapse = await dispatch(
          'cgadmin/db/get',
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
    },
    /**
     * @description 点击元素开启active,如果没有active为true返回false,否则相反
     * @author weiyafei
     * @date 2019-06-27-15:02:08
     * @param {Object} commit vuex mutations
     * @param {Object} state  vuex state
     * @param {Object} item 点击元素
     */
    asideSetItemActive({ commit, state }, item) {
      return new Promise(async resolve => {
        // store 赋值
        commit('asideSetItem', item)
        // 获取aside
        let aside = state.aside
        // 判断当前有没有active为true的元素，有 => 返回true,否则相反
        let asideMenuIsExpand = aside.some(item => item.active)
        // end
        resolve(asideMenuIsExpand)
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
