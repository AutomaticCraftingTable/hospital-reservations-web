import { createRouter, createWebHistory } from 'vue-router'
import Login from '$src/pages/Login.vue'
import Register from '$src/pages/Register.vue'
import NotFound from '$src/pages/NotFound.vue'
import Home from '$src/pages/Home.vue'
import Services from '$src/pages/Services.vue'
import Doctors from '$src/pages/Doctors.vue'
import RegisterDoctor from '$src/pages/RegisterDoctor.vue'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/services',
    name: 'Services',
    component: Services,
  },
  {
    path: '/doctors',
    name: 'Doctors',
    component: Doctors,
  },
  {
    path: "/visits",
    name: "Visits",
    component: () => import("$src/pages/Visits.vue"),
  },
  {
    path: '/register-doctor',
    name: 'RegisterDoctor',
    component: RegisterDoctor,
  },
  {
  path: "/doctor-visits",
  name: "DoctorVisits",
  component: () => import("$src/pages/DoctorVisits.vue"),
}
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.isReady().then(() => {
  const path = localStorage.getItem('path') ?? '/login'
  router.replace(path)
  localStorage.removeItem('path')
})

export default router
