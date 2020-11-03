/**
 *  "throttle-debounce": "^2.1.0",
 *  "viewerjs": "^1.5.0",
 */

import { extend } from './utils'
import './viewer.css'
import CgViewer from './cgViewer.vue'
import directive from './directive'
import Viewer from 'viewerjs'
export default {
  /**
   * 注册插件
   *
   * @author weiyafei
   * @date 2019-12-24-20:34:43
   */
  install(Vue, { name = 'viewer', debug = false, defaultOptions } = {}) {
    // 设置defaultOptions
    Viewer.setDefaults(defaultOptions)
    // 注册组件
    Vue.component(name, extend(CgViewer, { name }))
    // 注册指令
    Vue.use(directive, { name, debug })
  },
  /**
   * 设置Options属性
   *
   * @author weiyafei
   * @date 2019-12-24-20:34:07
   * @param {Object} defaultOptions 设置Options
   */
  setDefaults(defaultOptions) {
    Viewer.setDefaults(defaultOptions)
  }
}
