<template>
  <div>
    <article class="recipe-preview">
      <div class="thumbnail">
        <img id="image" class="img" :src= "recipe.image" />
      </div>
        <div class="content">
          <h5>{{recipe.category}}</h5>
          <div class="alert alert-success" role="alert"> <a href="#" class="alert-link">{{recipe.name}}</a></div>
          <p></p>
        </div>
    </article>
  </div>
</template>

<script>

export default {
  name: 'recipe-prev',
  props: {
    recipe: Object
  }
}
</script>

<style scoped>
.recipe-preview {
border-radius: 3px;
display: grid;
box-shadow: 1px 1px 5px 1px rgb(107, 107, 107);
width: 200px;
height: 190px;
margin: 1rem;
height: 20rem;
background-color: rgba(255, 255, 255, 0.447);
}
div{
  max-width: 200px;
  height: 150xp;
}
#image{
  align-content: center;
  max-width: 200px;
  height: 150xp;
  z-index: 1;

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
