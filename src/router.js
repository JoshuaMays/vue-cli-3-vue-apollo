import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/new/1'
    },
    {
      path: '/create',
      component: () => import (/* webpackChunkName: "createLink" */ './views/CreateLink.vue')
    },
    {
      path: '/login',
      component: () => import (/* webpackChunkName: "appLogin" */ './views/AppLogin.vue')
    },
    {
      path: '/new/:page',
      component: () => import (/* webpackChunkName: "linkList" */ './views/LinkList.vue')
    },
    {
      path: '/search',
      component: () => import (/* webpackChunkName: "search" */ './views/Search.vue')
    },
    {
      path: '/top',
      component: () => import (/* webpackChunkName: "linkList" */ './views/LinkList.vue')
    }
  ]
})
