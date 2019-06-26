/*
 * @Author: wei.yafei
 * @Date: 2019-06-14 17:03:40
 * @Last Modified by: wei.yafei 
 * @Last Modified time: 2019-06-26 15:15:11
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
import { frameInRoutes } from '@/router/router'
Vue.config.productionTip = false
// 设置文件
import setting from '@/setting.js'
//mock
import './mock'

// 核心插件
Vue.use(cgAdmin)

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    // 处理路由 得到每一级的路由设置
    // this.$store.commit('cgadmin/page/init', frameInRoutes)
    //设置侧边栏菜单
    this.$store.commit('cgadmin/menu/asideSet', menuAside)
    //设置侧边栏
    this.$store.commit('cgadmin/menu/asideCollapseSetState', setting.menu.asideCollapse)
  }
}).$mount('#app')
