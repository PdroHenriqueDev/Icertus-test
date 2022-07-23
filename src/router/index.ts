import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ToDosView from '../views/ToDosView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: HomeView,
    children: [
      {
        path: '',
        name: 'todos',
        component: ToDosView,
      },
      {
        path: '/done',
        name: 'done',
        component: () => import(/* webpackChunkName: "done" */ '../views/DoneView.vue'),
      },
      {
        path: '/pending',
        name: 'pending',
        component: () => import(/* webpackChunkName: "done" */ '../views/PendingView.vue'),
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
