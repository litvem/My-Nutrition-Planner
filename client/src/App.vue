<template>
  <div class="app">
    <NavBar/>
    <router-view />
  </div>
</template>

<script>
import NavBar from './components/Nav-bar.vue'
export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: Georgia, serif;
  font-weight: 400;
}
.app {
  min-height: 100vh;
  position: relative;
  background-color: #f1f1f1;
}
.container {
  padding: 0 20px;
  max-width: 1140px;
  margin: 0 auto;
}
</style>
