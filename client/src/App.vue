<template>
  <div id="app">
    <div class="auth-wrapper">
      <div class="auth-inner">
        <router-view :user="user" />
      </div>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
// import AppHeader from './components/AppHeader.vue'
// import AppFooter from './components/AppFooter.vue'

export default {
  name: 'default',
  /* components: {
    AppFooter
  }, */
  data() {
    return {
      user: null
    }
  },
  created() {
    const id = localStorage.getItem('id')
    const token = localStorage.getItem('token')
    Api.get('/profiles' + id, {
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
