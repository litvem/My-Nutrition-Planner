<template>
    <div>
        <h1>Recipes</h1>
        <button class="btn" v-on:click="goToAddRecipe">Add recipe</button>
    </div>
</template>

<script>
export default {
  name: 'recipes',
  methods: {
    goToAddRecipe() {
      this.$router.push('/addRecipe')
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
