import { get } from 'lodash'
import router from '@/router/index'

// 判定是否需要缓存
//根据 object对象的path路径获取值。 如果解析 value 是 undefined 会以 defaultValue 取代。
// const isKeepAlive = data => get(data, 'meta.cache', false)

export default {
  namespaced: true,
  state: {
    //首页加载动效
    Spinning: true,
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
    open({ state, commit }, { name, meta, fullPath }) {
      console.log('走跳转页面')
      // const isCache = get(meta, 'cache', false)
      // console.log(isCache)
      return new Promise(resolve => {
        // 如果这个页面需要缓存 将其添加到缓存设置
        // if (isCache) {
        //   commit('keepAlivePush', name)
        //   console.log(state.keepAlive)
        // }
        // 设置当前页
        commit('currentSet', fullPath)
        resolve()
      })
    }
  },
  mutations: {
    SpinningRefresh(state) {
      state.Spinning = !state.Spinning
    },
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
  },
  /**
   * @description 获取router-page
   * @author weiyafei
   * @date 2019-06-26-12:56:42
   * @param {Object} state
   * @param {Object} getters
   * @param {Object} rootState
   */
  getters: {
    getRouterPage(state, getters, rootState) {
      return rootState.cgadmin.menu.aside
    }
  }
}
