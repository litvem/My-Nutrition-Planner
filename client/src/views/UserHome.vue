<template>
    <div>
        <h1>User Home Page</h1>
        <button class="btn" v-on:click="goToProfile">Profile</button>
    </div>
</template>

<script>
export default {
  name: 'userHome',
  methods: {
    goToProfile() {
      this.$router.push('/profile')
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
        margin-bottom: 1em;
        margin-right: 1em;
    }
</style>
