<template>
    <div>
      <article class="recipe-preview">
        <div
        :style="{backgroundImage: 'url(' + imgURL + ')'}"
        class="thumbnail"></div>
          <div class="content">
              <h5>{{name}}</h5>
              <div class="alert alert-success" role="alert"> <a href="#" class="alert-link">{{category}}</a></div>
            <p></p>
          </div>
      </article>
    </div>
</template>
<!--<template>
    <div>
      <article class="recipe-preview">
        <div class="thumbnail"></div>
          <img class="img" src="http://localhost:3000/uploads/lilo-stitch-.png-1665150914470.png" />
          <div class="content">
            <h5>{{category}}</h5>
            <div class="alert alert-success" role="alert"> <a href="#" class="alert-link">{{name}}</a></div>
            <p></p>
          </div>
      </article>
    </div>
</template>-->
<script>

export default {
  name: 'recipe-prev',
  props: {
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    imgURL: {
      type: String,
      required: true
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
  background-color: rgba(255, 255, 255, 0.447);
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
