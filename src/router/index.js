import Vue from 'vue'
import VueRouter from 'vue-router'
import { BasicLayout } from '../layouts';

Vue.use(VueRouter)

const routes = [
  {
    path: '/celli',
    name: 'Map',
    component: () => import('@/views/map/index.vue'),
    meta: {
      title: '测试'
    }
  },
  {
    path: '/',
    name: 'BasicLayout',
    component: () => import('@/layouts/BasicLayout'),
    meta: {
      title: '基础布局'
    }
  }
]

// eslint-disable-next-line no-new
const router = new VueRouter({
  routes
})

export default router
