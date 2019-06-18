/*
 * @Author: wei.yafei
 * @Date: 2019-06-14 17:03:40
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-06-18 16:53:15
 */
// Vue
import Vue from 'vue'
import App from './App.vue'
// 核心插件
import cgAdmin from '@/plugins/cgadmin'
// store
import store from './store/index'

// 菜单和路由设置
import router from './router/index'

Vue.config.productionTip = false

//mock
import './mock'

// 核心插件
Vue.use(cgAdmin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
