<template>
<div></div>
</template>

<script>

export default {
  name: 'addRecipe',

  methods: {
    goToRecipes() {
      this.$router.push('/recipes')
    }
  }
}
</script>

<style scoped>
    h1 {
        color:black
    }
    .btn {
        background-color: turquoise;
    }
</style>
