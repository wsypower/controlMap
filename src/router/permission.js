import router from './router'
import store from './store'
import NProgress from 'nprogress' // 进展条
import 'nprogress/nprogress.css' // 进展条样式
import util from '../utils/util'

NProgress.configure({ showSpinner: false }) // NProgress 配置

const whiteList = ['/login', '/auth-redirect'] // 不需要重定向的白名单

router.beforeEach(async (to, from, next) => {
  // 开始进度条
  NProgress.start()

  // 确认用户已经登录，userId已经获取
  const hasUserId = util.cookies.get('userId')

  if (hasUserId) {
    if (to.path === '/login') {
      // 如果已经登录，重定向到首页
      next({ path: '/' })
      NProgress.done()
    } else {
      //确定用户是否通过getInfo获得了他的权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          //获取用户信息
          //注意：角色必须是对象数组！例如：['admin']或['developer'，'editor']
          const { roles } = await store.dispatch('user/getInfo')

          //根据角色生成可访问的路线图
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          //动态添加可访问的路由
          router.addRoutes(accessRoutes)

          //hack方法确保addRoutes完整
          //设置replace：true，因此导航不会留下历史记录
          next({ ...to, replace: true })
        } catch (error) {
          //删除令牌并转到登录页面重新登录
          await store.dispatch('user/resetToken')
          //Message.error（错误||'有错误'）
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /*没有令牌*/

    if (whiteList.indexOf(to.path) !== -1) {
      //在免费登录白名单中，直接进入
      next()
    } else {
      //其他无权访问的页面被重定向到登录页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  //完成进度条
  NProgress.done()
})
