/*
 * @Author: wei.yafei
 * @Date: 2019-06-14 17:03:40
 * @Last Modified by: wei.yafei
 * @Last Modified time: 2019-08-02 15:14:50
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

// 引入echarts
import echarts from "echarts";
Vue.prototype.$echarts = echarts;

import { HappyScroll } from 'vue-happy-scroll'
//自定义组件名
Vue.component('happy-scroll', HappyScroll)
// 引入css
import 'vue-happy-scroll/docs/happy-scroll.css'

import 'swiper/dist/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)


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
    this.$store
      .dispatch('cgadmin/account/login')
      .then((res) => {
        //登录后获取用户权限
        // const role = this.$store.getters['cgadmin/user/role']
        // console.log(role)
        //设置侧边栏菜单
          const role = 'admin';
        const menu = menuAside.filter(v => v.role.includes(role))
        this.$store.commit('cgadmin/menu/asideSet', menu)
      })
      .catch(err => {
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
