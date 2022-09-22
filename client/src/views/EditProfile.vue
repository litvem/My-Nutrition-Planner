<template>
    <div>
        <h1>Edit Profile</h1>
        <button class="btn" v-on:click="goToProfile">Save</button>
    </div>
</template>

<script>
export default {
  name: 'profile',
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
    }
</style>
