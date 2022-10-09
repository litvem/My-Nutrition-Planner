<template>
  <div id="app">
    <div id="nav">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#" v-on:click="goToHome">MyNutritionPlanner</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
             <b-nav-item href="#" v-on:click="goToRecipes">Recipes</b-nav-item>
             <b-nav-item href="#" v-on:click="goToWeeklyCalendar">Weekly Plan</b-nav-item>
             <b-nav-item href="#" v-on:click="goToShoppingList">Shopping List</b-nav-item>
          </b-navbar-nav>
          <b-nav-item-dropdown text="Profile" right>
              <b-dropdown-item v-on:click="goToEdit()">Edit Profile</b-dropdown-item>
             <b-dropdown-item href="#">Log Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-collapse>
      </b-navbar-nav>
    </b-navbar>
  </div>
    <body>
      <router-view :user="user"/>
    </body>
    <app-footer/>
  </div>
</template>

<script>
import { Api } from '@/Api'
import AppFooter from './components/AppFooter.vue'

export default {
  name: 'default',
  components: {
    AppFooter
  },
  data() {
    return {
      user: null
    }
  },
  created() {
    const id = localStorage.getItem('id')
    const token = localStorage.getItem('token')
    Api.get('/profiles/' + id, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then(response => {
        this.user = response.data
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    goToHome() {
      this.$router.push('/')
    },
    goToRecipes() {
      this.$router.push('/recipes')
    },
    goToWeeklyCalendar() {
      this.$router.push('/weeklyCalendar')
    },
    goToShoppingList() {
      this.$router.push('/shoppinglist')
    },
    goToAddShoppingList() {
      this.$router.push('/addShoppingList')
    },
    goToEdit() {
      this.$router.push('/editProfile')
    }
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  min-height: 88vh;
  display: grid;
  margin: auto 0;
}
</style>
