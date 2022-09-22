<template>
    <div>
       <h1>Login</h1>
       <button class="btn" v-on:click="goToUserHome">Login</button>
    </div>
</template>

<script>
export default {
  name: 'login',
  methods: {
    goToUserHome() {
      this.$router.push('/userHome')
    }
  }
}
</script>

<style scoped>
    h1 {
        color:blue
    }
    .btn {
        background-color: turquoise;
    }
</style>
