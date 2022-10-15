<template>
  <div class="app">
    <Navbar :user="user"/>
    <div class="auth-wrapper">
      <div class="auth-inner">
        <router-view :user="user" :key="$route.fullPath"/>
        <AppFooter/>
      </div>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
import Navbar from './components/navbar.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  name: 'default',
  components: {
    Navbar,
    AppFooter
  },

  data() {
    return {
      user: null
    }
  },
  mounted() {
    if (localStorage.getItem('token') === null) {
      this.$router.push('/')
    } else {
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
  color: rgba(255, 254, 254, 0.9);
}
body {
  min-height: 88vh;
  display: grid;
  margin: auto 0;
}

</style>
