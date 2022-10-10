<template>
    <div>
        <h1>Profile</h1>
        <button class="btn" v-on:click="goToEditProfile">Edit profile</button>
        <button class="btn" v-on:click="goToRecipes">Recipes</button>
    </div>
</template>

<script>
export default {
  name: 'profile',
  methods: {
    goToEditProfile() {
      this.$router.push('/editProfile')
    },
    goToRecipes() {
      this.$router.push('/recipes')
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
