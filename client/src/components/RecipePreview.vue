<template>
  <div>
    <div class="card">
      <img id="image" class="img" :src= "recipe.image" />
      <div class="content">
        <h5 v-on:click="goToRecipePage()" v-bind="recipe">{{recipe.name}}   {{recipe.category}}</h5>
        <h6>Category: {{ recipe.category }}</h6>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'recipe-prev',
  props: ['recipe'],
  methods: {
    goToRecipePage() {
      this.$router.push(`/recipePage/${this.recipe._id}`)
      this.$router.go()
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  border-radius: 3px;
  box-shadow: 1px 1px 5px 1px rgba(150, 255, 194, 0.267);
  width: 100%;
  margin: 1rem;
  height: 30%;
  background-color: rgba(240, 255, 240, 0.263);
}

#image {
  margin-top: 10%;
  margin-left: 30%;
  margin-right: 30%;
  z-index: 1;
  //object-fit: cover
}
.content {
  text-align: center;
  padding: 1rem;
}

h5 {
  margin-top: 0.7em;
  margin-bottom: 0.7em;
  margin-right: 1%;
  margin-left: 1%;
  float: center;
  align-self: center;
  color: rgb(201, 253, 214);
  font-size: 16px;
  word-break: break-word;
  font-weight: bold;
  padding: 12px 25px;
  border-radius: 8px;
  display: inline-block;
  border: 0;
  outline: 0;
  box-shadow: 0px 4px 10px 0px #07230191;
  background-image: linear-gradient(135deg, #72ef8f37 10%, #38980427 100%);
  &:hover {
    color: rgb(14, 43, 0);
    text-decoration: underline;
    background-color: rgba(255, 255, 255, 0.342);
  }
}

h6 {
  color: rgb(229, 248, 234);
  text-decoration: underline;
  margin-top: 3%;
}
</style>
