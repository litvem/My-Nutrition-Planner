<template>
  <RecipeTemplate v-bind="recipe.recipe"/>
</template>

<script>
import { Api } from '@/Api'
export default {
  name: 'recipe-page',

  mounted() {
    // Api.get('/profiles/' + localStorage.id + '/recipes/' + this.$route.param.id)
    Api.get('/profiles/' + localStorage.id + '/recipes/' + '6343d4d651b49c3d28bc85c7')
      .then(response => {
        console.log(response.data)
        this.recipe = response.data
      })
      .catch(error => {
        this.message = error.message
        console.log(error.message)
      })
  },
  data() {
    return {
      recipe: null
    }
  }
}

</script>

<style scoped>
img {
    max-width: 350px;
    max-height: 350px;
    border: 3px solid black;
    box-shadow: inset 0px 0px 10px 20px gray;
}
</style>
