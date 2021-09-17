import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// import Home from '../components/Home.vue'
import crs from '../views/createRS.vue'
import retrievers from '../views/retrieveRS.vue'
import monitoring from '../views/monitoring.vue'
import notis from '../views/notificationRS.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: crs
  },
  {
    path: '/crs',
    name: 'crs',
    component: crs
  },
  {
    path: '/reis',
    name: 'retrievers',
    component: retrievers
  },
  {
    path: '/notis',
    name: 'notis',
    component: notis
  },
  {
    path: '/mtoverws',
    name: 'monitoring',
    component: monitoring
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
