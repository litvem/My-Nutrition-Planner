<template>
  <div>
    <b-jumbotron header="Welcome to MyNutritionPlanner">
      <b-button class="btn" variant="primary" v-on:click="goToRegister">Register</b-button>
      <b-button class="btn" variant="primary" v-on:click="goToLogin">Log in</b-button>
    </b-jumbotron>
    <app-footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import AppFooter from '@/components/AppFooter.vue'

export default {
  name: 'home',
  components: {
    AppFooter
  },
  data() {
    return {
      message: 'none'
    }
  },
  methods: {
    goToRegister() {
      this.$router.push('/register')
    },
    goToLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style>
.btn {
  margin-bottom: 1em;
  margin-right: 1em;
}
</style>
