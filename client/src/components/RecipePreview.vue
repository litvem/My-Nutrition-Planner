<template>
    <div>
      <article class="recipe-preview">
        <!--:style="{backgroundImage: 'url(' + recipe.imagePath + ')'}"-->
        <div class="thumbnail">
          <img id="image" class="img" :src= "recipe.image" />
        </div>
        <div class="content">
          <h5 v-on:click="goToRecipePage()" v-bind="recipe">{{recipe.name}}</h5>
          <h6>Category: {{ recipe.category }}</h6>
          <!--<div class="alert alert-success" role="alert"> <a href="#" class="alert-link">{{recipe.name}}</a></div> -->
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
      this.$router.go()
    }
  }
}
</script>

<style scoped>
.recipe-preview {
  border-radius: 3px;
  box-shadow: 1px 1px 5px 1px rgba(150, 255, 194, 0.267);
  width: 100%;
  margin: 1rem;
  height: 30%;
  background-color: rgba(240, 255, 240, 0.263);
}

.content {
  text-align: center;
  padding: 1rem;
}

.thumbnail {
  background-position: center;
  background-size: cover;
  max-width: 100%;
  max-height: 100%;
}

#image {
  margin-top: 10%;
  align-content: center;
  max-width: 200px;
  height: 150xp;
  z-index: 1;
}

h5 {
  margin-top: 0.7em;
  margin-bottom: 0.7em;
  margin-right: 1em;
  margin-left: 1em;
  float: center;
  align-self: auto;
  color: rgb(201, 253, 214);
  font-size: 16px;
  font-weight: bold;
  padding: 12px 35px;
  border-radius: 8px;
  display: inline-block;
  border: 0;
  outline: 0;
  box-shadow: 0px 4px 10px 0px #07230191;
  background-image: linear-gradient(135deg, #72ef8f37 10%, #38980427 100%);
}

h5:hover {
    color: rgb(14, 43, 0);
    text-decoration: underline;
    background-color: rgba(255, 255, 255, 0.342);
  }

h6 {
  color: rgb(229, 248, 234);
  text-decoration: underline;
  margin-top: 3%;
}
</style>
