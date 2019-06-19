import Vue from 'vue'
//!注意 有些组件使用异步加载会有影响
Vue.component('cg-icon-svg', () => import('./cg-icon/cg-icon-svg/index.vue'))
