/*
 * @Author: wei.yafei
 * @Date: 2019-06-14 17:03:40
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-08-14 10:55:21
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

//加载时间过滤器(依赖于dayjs)
import vueFiltersDate from '@/filters/moment/main'
Vue.use(vueFiltersDate)

//mock => 生产环境(上线前请注释！！！)
import '@/mock'

// 引入echarts
import echarts from "echarts";
Vue.prototype.$echarts = echarts;

// 核心插件
Vue.use(cgAdmin)

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    // 获取userId并登陆
    this.$store
      .dispatch('cgadmin/account/login')
      .then(() => {
        //登录后获取用户权限
        const role = this.$store.getters['cgadmin/user/role']
        //设置侧边栏菜单
        const menu = menuAside.filter(v => v.role.includes(role))
        //当前菜单
        const currentPage = this.$store.state.cgadmin.page.current
        //点亮当前页
        const menuCurrentActive = menu.map(item => {
          currentPage.includes(item.path) ? (item.active = true) : (item.active = false)
          return item
        })
        this.$store.commit('cgadmin/menu/asideSet', menuCurrentActive)
      })
      .catch(err => {
        console.log(err)
      })
    //设置侧边栏伸缩
    this.$store.commit('cgadmin/menu/asideCollapseSetState', setting.menu.asideCollapse)
  },
  mounted() {
    // 展示系统信息
    this.$store.commit('cgadmin/releases/versionShow')
    // 获取并记录用户 UA
    this.$store.commit('cgadmin/ua/get')
  }
}).$mount('#app')
