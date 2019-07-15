/*
 * @Author: wei.yafei
 * @Date: 2019-07-11 19:58:33
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-07-15 18:12:20
 */
import store from '@/store'
import util from '@/utils/util'
/*=============================================
=    指定组件的渲染和观察期间未捕获错误的处理函数     =
=============================================*/

export default {
  install(Vue, options) {
    Vue.config.errorHandler = function(error, instance, info) {
      //获得更新后立即使用DOM
      // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
      Vue.nextTick(() => {
        // store 追加 log
        store.dispatch('cgadmin/log/push', {
          message: `${info}: ${error.message}`,
          type: 'danger',
          meta: {
            error,
            instance
          }
        })
        // 只在开发模式下打印 log
        if (process.env.NODE_ENV === 'development') {
          util.log.capsule(' cg-Admin ', '💀 错误提示!', 'danger')
          util.log.danger('>>>>>> 错误信息 >>>>>>')
          console.log(info)
          util.log.danger('>>>>>> 错误组件 >>>>>>')
          const errorComponents = instance && instance.$vnode && instance.$vnode.tag.split('-')
          const errorComponentsLength = errorComponents && errorComponents.length - 1
          console.log(errorComponentsLength && errorComponents[errorComponentsLength])
          util.log.danger('>>>>>> 错误实例 >>>>>>')
          console.log(instance)
          util.log.danger('>>>>>> Error >>>>>>')
          console.log(error)
        }
      })
    }
    Vue.config.warnHandler = function(msg, vm, trace) {
      // `trace` 是组件的继承关系追踪
      Vue.nextTick(() => {
        // 只在开发模式下打印 log
        util.log.capsule(' cg-Admin ', '💣 警告提示!', 'warning')
        util.log.warning('>>>>>> 警告信息 >>>>>>')
        console.log(msg)
        util.log.warning('>>>>>> 警告实例 >>>>>>')
        console.log(vm)
        util.log.warning('>>>>>> 警告组件 >>>>>>')
        const errorComponents = vm && vm.$vnode && vm.$vnode.tag.split('-')
        const errorComponentsLength = errorComponents && errorComponents.length - 1
        console.log(errorComponentsLength && errorComponents[errorComponentsLength])
        util.log.warning('>>>>>> 继承关系 >>>>>>')
        console.log(trace)
      })
    }
  }
}
