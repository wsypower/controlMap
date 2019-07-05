import util from '@/utils/util.js'
import { AccountLogin } from '@/api/account/login'
import router from '@/router'
import { has } from 'lodash'

export default {
  namespaced: true,
  actions: {
    /**
     * @description 登录获取角色信息-权限
     * @param {Object} param context
     * @param {Object} param route {Object} 登录成功后定向的路由对象 任何 vue-router 支持的格式
     */
    login({ dispatch, commit }) {
      return new Promise((resolve, reject) => {
        //获取url参数对象
        const UrlParameters = util.getURLParameters()
        //判断参数是不是key是不是userId
        const isUserId = has(UrlParameters, 'userId')
        if (isUserId) {
          //cookies存储userId
          util.cookies.set('userId', UrlParameters.userId)
          //调用登录接口
          AccountLogin()
            .then(async res => {
              // 设置 vuex 用户信息
              commit('cgadmin/user/infoSet', res, { root: true })
              await dispatch(
                'cgadmin/user/set',
                {
                  name: res
                },
                { root: true }
              )
              // 结束
              resolve(res)
            })
            .catch(err => {
              //打断登录退出至401页面
              dispatch('logout')
              //回调捕获错误
              reject(err)
            })
        } else {
          //打断登录退出至401页面
          dispatch('logout')
        }
      })
    },
    /**
     * @description 注销用户并返回401页面
     * @param {Object} param context
     * @param {Object} param confirm {Boolean} 是否需要确认
     */
    logout({ dispatch }) {
      /**
       * @description 注销
       */
      // 跳转路由
      router.replace({
        name: '401'
      })
      // 删除cookie
      util.cookies.remove('userId')
      // 清空 vuex 用户信息
      dispatch('cgadmin/user/set', {}, { root: true })
    }
  }
}
