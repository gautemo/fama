import { createRouter, createWebHistory, onBeforeRouteLeave } from 'vue-router'
import Home from './views/Home.vue'
import firebase from '@/firebaseinit';

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/profile',
    component: () => import('./views/Profile.vue')
  },
  {
    path: '/post/:id',
    component: () => import('./views/Post.vue')
  },
  {
    path: '/add-post',
    component: () => import('./views/AddPost.vue')
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async () => {
  if(!await firebase.getCurrentUser()){
    await firebase.auth().signInAnonymously();
  }
})

export { router };
