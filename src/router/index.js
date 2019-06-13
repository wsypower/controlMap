import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/celli',
    name: 'Map',
    component: () => import('@/views/map/index.vue'),
    meta: {
      title: '测试'
    }
  }
]

// eslint-disable-next-line no-new
const router = new VueRouter({
  routes
})

export default router
