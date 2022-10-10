<template>
  <div class="app">
    <Navbar :user="user"/>
    <div class="auth-wrapper">
      <div class="auth-inner">
        <router-view :user="user" :key="$route.fullPath"/>

      </div>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
import Navbar from './components/navbar.vue'

export default {
  name: 'default',
  components: {
    Navbar
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
body {
  min-height: 88vh;
  display: grid;
  margin: auto 0;
}
</style>
