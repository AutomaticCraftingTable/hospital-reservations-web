import { createRouter, createWebHistory } from 'vue-router'
import MyAbout from '$src/pages/MyAbout.vue'
import MyHome from '$src/pages/MyHome.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MyHome, 
  },
  {
    path: '/about',
    name: 'About',
    component: MyAbout, 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
