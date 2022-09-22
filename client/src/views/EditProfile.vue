<template>
    <div>
        <h1>Edit Profile</h1>
        <button class="btn" v-on:click="goToUserHome">Save</button>
    </div>
</template>

<script>
export default {
  name: 'profile',
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
