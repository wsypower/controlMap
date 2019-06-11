import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
const baseRoutes = [
  {
    path: "/",
    redirect: "/index"
  }, //重定向
  {
    path: "/index",
    name: "index",
    component: () => import("@/views/map/index.vue"),
    meta: {
      title: "地图管控平台"
    }
  }
];
let RootRouter = new Router({
  routes: baseRoutes,
  //when the page jumps the page rolls back to the top
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});
export default RootRouter;
