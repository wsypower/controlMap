import { get } from 'lodash'
import router from '@/router/index'

// 判定是否需要缓存
//根据 object对象的path路径获取值。 如果解析 value 是 undefined 会以 defaultValue 取代。
const isKeepAlive = data => get(data, 'meta.cache', false)

export default {
  namespaced: true,
  state: {
    // 当前页面
    current: '',
    // 需要缓存的页面 name
    keepAlive: []
  },
  actions: {
    /**
     * @class current
     * @description 打开一个新的页面
     * @param {Object} state vuex state
     * @param {Object} param 从路由钩子的 to 对象上获取 { fullPath } 路由信息
     */
    open({ commit }, { fullPath }) {
      return new Promise(resolve => {
        commit('currentSet', fullPath)
        resolve()
      })
    },
    /**
     * @class opened
     * @description 关闭当前激活之外的 tag
     * @param {Object} state vuex state
     * @param {Object} param { pageSelect: 当前选中的tagName }
     */
    closeOther({ state, commit, dispatch }, { pageSelect } = {}) {
      return new Promise(async resolve => {
        const pageAim = pageSelect || state.current
        let currentIndex = 0
        state.opened.forEach((page, index) => {
          if (page.fullPath === pageAim) {
            currentIndex = index
          }
        })
        // 删除打开的页面数据 并更新缓存设置
        if (currentIndex === 0) {
          state.opened.splice(1).forEach(({ name }) => commit('keepAliveRemove', name))
        } else {
          state.opened.splice(currentIndex + 1).forEach(({ name }) => commit('keepAliveRemove', name))
          state.opened.splice(1, currentIndex - 1).forEach(({ name }) => commit('keepAliveRemove', name))
        }
        // 设置新的页面
        state.current = pageAim
        if (router.app.$route.fullPath !== pageAim) {
          router.push(pageAim)
        }
        // 持久化
        await dispatch('opencgdb')
        // end
        resolve()
      })
    }
  },
  mutations: {
    /**
     * @class keepAlive
     * @description 从已经打开的页面记录中更新需要缓存的页面记录
     * @param {Object} state vuex state
     */
    keepAliveRefresh(state) {
      state.keepAlive = state.opened.filter(item => isKeepAlive(item)).map(e => e.name)
    },
    /**
     * @description 删除一个页面的缓存设置
     * @param {Object} state vuex state
     * @param {String} name name
     */
    keepAliveRemove(state, name) {
      const list = [...state.keepAlive]
      const index = list.findIndex(item => item === name)

      if (index !== -1) {
        list.splice(index, 1)
        state.keepAlive = list
      }
    },
    /**
     * @description 增加一个页面的缓存设置
     * @param {Object} state vuex state
     * @param {String} name name
     */
    keepAlivePush(state, name) {
      const keep = [...state.keepAlive]
      keep.push(name)
      state.keepAlive = keep
    },
    /**
     * @description 清空页面缓存设置
     * @param {Object} state vuex state
     */
    keepAliveClean(state) {
      state.keepAlive = []
    },
    /**
     * @class current
     * @description 设置当前激活的页面 fullPath
     * @param {Object} state vuex state
     * @param {String} fullPath new fullPath
     */
    currentSet(state, fullPath) {
      state.current = fullPath
    },
    /**
     * @class pool
     * @description 保存 pool (候选池)
     * @param {Object} state vuex state
     * @param {Array} routes routes
     */
    init(state, routes) {
      const pool = []
      const push = function(routes) {
        routes.forEach(route => {
          if (route.children) {
            push(route.children)
          } else {
            if (!route.hidden) {
              const { meta, name, path } = route
              pool.push({ meta, name, path })
            }
          }
        })
      }
      push(routes)
      state.pool = pool
    }
  }
}
