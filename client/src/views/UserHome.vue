<template>
    <div>
        <h1>User Home Page</h1>
        <button class="btn" v-on:click="goToProfile">Profile</button>
        <button class="btn" v-on:click="goToRecipes">Recipes</button>
        <button class="btn" v-on:click="goToWeeklyCalendar">Weekly calendar</button>
    </div>
</template>

<script>
export default {
  name: 'userHome',
  methods: {
    goToProfile() {
      this.$router.push('/profile')
    },
    goToRecipes() {
      this.$router.push('/recipes')
    },
    goToWeeklyCalendar() {
      this.$router.push('/weeklyCalendar')
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
