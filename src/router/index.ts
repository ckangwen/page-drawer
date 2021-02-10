import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import H5 from "../views/H5.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/h5",
    name: "H5",
    component: H5
  }
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
});

export default router;
