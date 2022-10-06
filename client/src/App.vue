<template>
  <div class="app">
    <Navbar :user="user"/>
    <div class="auth-wrapper">
      <div class="auth-inner">
        <router-view :user="user"/>
      </div>
    </div>
  </div>
</template>

<script>
// import { Api } from '@/Api'
import Navbar from './components/navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  },
  data() {
    return {
      user: null
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgba(255, 254, 254, 0.9);
}

</style>
