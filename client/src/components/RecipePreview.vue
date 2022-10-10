<template>
    <div>
      <article class="recipe-preview">
        <div
        :style="{backgroundImage: 'url(' + recipe.imagePath + ')'}"
        class="thumbnail"></div>
            <div class="content">
              <h5 v-on:click="goToRecipePage()" v-bind="recipe">{{recipe.name}}</h5>
              <div class="alert alert-success" role="alert"> <a href="#" class="alert-link">{{recipe.category}}</a></div>
              <p></p>
            </div>
      </article>
    </div>
</template>

<script>

export default {
  name: 'recipe-prev',
  props: ['recipe'],
  backgroundImage: '',
  methods: {
    goToRecipePage() {
      this.$router.push(`/recipePage/${this.recipe.name}`)
    }
  }
}
</script>

<style scoped>
.recipe-preview {
  border-radius: 3px;
  box-shadow: 1px 1px 5px 1px rgb(107, 107, 107);
  width: 200px;
  height: 190px;
  margin: 1rem;
  height: 20rem;
}

.content {
  text-align: center;
  padding: 1rem;
}

.thumbnail {
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 12rem;
}
</style>
