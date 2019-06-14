/*
 * @Author: wei.yafei
 * @Date: 2019-06-14 17:03:40
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-06-14 17:04:46
 */
// Vue
import Vue from 'vue'
import App from './App.vue'
// axios
import './axios/axios'
// store
import store from './store/index'
// 菜单和路由设置
import router from './router/index'
// ant-design-vue
import './plugins/ant-design-vue.js'

Vue.config.productionTip = false

//mock
import './mock'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
