import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import ForgotPassword from './views/ForgotPassword.vue'
import UserHome from './views/UserHome.vue'
import Profile from './views/Profile.vue'
import EditProfile from './views/EditProfile.vue'
import Recipes from './views/Recipes.vue'
import AddRecipe from './views/AddRecipe.vue'
import WeeklyCalendar from './views/WeeklyCalendar.vue'
import ShoppingList from './views/ShoppingList.vue'
import RecipePage from './views/RecipePage.vue'

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
      path: '/profile',
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
    },
    {
      path: '/recipePage',
      name: 'recipe-page',
      component: RecipePage
    },
    {
      path: '/weeklyCalendar',
      name: 'weeklyCalendar',
      component: WeeklyCalendar
    },
    {
      path: '/shoppingList',
      name: 'shoppingList',
      component: ShoppingList
    }
  ]
})
