import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ToDosView from '../views/ToDosView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '',
        name: 'todos',
        component: ToDosView,
      },
    ]
  },
  // {
  //   path: '/todos',
  //   name: 'todos',
  //   component: () => import(/* webpackChunkName: "todos" */ '../views/ToDosView.vue'),
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
