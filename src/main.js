/*
 * @Author: wei.yafei
 * @Date: 2019-06-14 17:03:40
 * @Last Modified by: wei.yafei 
 * @Last Modified time: 2019-07-05 16:09:48
 */
// Vue
import Vue from 'vue'
import App from './App.vue'
// 核心插件
import cgAdmin from '@/plugins/cgadmin'
// store
import store from './store/index'

// 菜单和路由设置
import router from '@/router/index'
import menuAside from '@/menu/aside.js'
// import { frameInRoutes } from '@/router/router'
Vue.config.productionTip = false
// 设置文件
import setting from '@/setting.js'

//mock => 生产环境(上线前请注释！！！)
import '@/mock'

// 核心插件
Vue.use(cgAdmin)

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    // 获取userId并登陆
    this.$store.dispatch('cgadmin/account/login')
    // 处理路由 得到每一级的路由设置
    // this.$store.commit('cgadmin/page/init', frameInRoutes)
    //设置侧边栏菜单
    this.$store.commit('cgadmin/menu/asideSet', menuAside)
    //设置侧边栏
    this.$store.commit('cgadmin/menu/asideCollapseSetState', setting.menu.asideCollapse)
  },
  mounted() {
    // 获取并记录用户 UA
    console.log(this.$store)
    console.log(this.$store.getter('cgadmin/user/role'))
    this.$store.commit('cgadmin/ua/get')
  }
}).$mount('#app')
