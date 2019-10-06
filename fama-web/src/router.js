import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/profile',
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/post:id',
      component: () => import('./views/Post.vue')
    },
    {
      path: '/add-post',
      component: () => import('./views/AddPost.vue')
    }
  ]
})
