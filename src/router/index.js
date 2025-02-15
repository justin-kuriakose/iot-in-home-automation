import { createWebHistory, createRouter } from 'vue-router'

import admin from '../views/admin.vue'
import login from '../views/login.vue'
import signup from '../views/signup.vue'
import test from '../views/test.vue'

const routes = [
  { path: '/admin', component: admin, name: 'admin' },
  { path: '/', component: login, name: 'login' },
  { path: '/signup.vue', component: signup, name: 'signup' },
  { path: '/test', component: test, name: 'test' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router