<template>
    <div>
        <h1>Add recipe</h1>
        <button class="btn" v-on:click="goToRecipes">Save</button>
    </div>
</template>

<script>

export default {
  name: 'forgotPassword',

  methods: {
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
    }
</style>
