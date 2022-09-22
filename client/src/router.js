import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import ForgotPassword from './views/ForgotPassword.vue'
import UserHome from './views/UserHome.vue'
import Profile from './views/Profile.vue'
import EditProfile from './views/EditProfile.vue'
import Recipes from './views/Recipes.vue'
import AddRecipe from './views/AddRecipe.vue'

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
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/forgotPassword',
      name: 'forgotPassword',
      component: ForgotPassword
    },
    {
      path: '/userHome',
      name: 'userHome',
      component: UserHome
    },
    {
      path: '/pfofile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/editProfile',
      name: 'editProfile',
      component: EditProfile
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: Recipes
    },
    {
      path: '/addRecipe',
      name: 'addRecipe',
      component: AddRecipe
    }
  ]
})
