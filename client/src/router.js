import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import UserHome from './views/UserHome.vue'
import Uploadimage from './views/Uploadimage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/userHome',
      name: 'userHome',
      component: UserHome
    },
    {
      path: '/uploadImage',
      name: 'image',
      component: Uploadimage
    }
  ]
})
