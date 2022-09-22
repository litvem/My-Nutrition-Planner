<template>
    <div>
        <h1>Forgot password</h1>
        <button class="btn" v-on:click="goToUserHome">Reset password</button>
    </div>
</template>

<script>

export default {
  name: 'forgotPassword',

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
</style>
