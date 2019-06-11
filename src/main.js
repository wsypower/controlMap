import Vue from "vue";
import "./axios/axios";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import "./plugins/ant-design-vue.js";
import router from './router'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
