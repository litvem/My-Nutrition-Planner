<template>
<div>
<div>
<div id ="background" class="container-fluid">
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <h1 class="float-start">My Recipes</h1>
      </div>

      <div class="col">
        <button class="btn" v-on:click="goToAddRecipe()">Add new recipe</button>
      </div>

      <div class="col">
        <form>
          <input type="search" class="form-control" placeholder="Search by name or category..." aria-label="Search">
        </form>
      </div>
      <br><br>

    </div>
  </div>
    <b-row>
    <section class="container-fluid" id="recipes">
        <b-row>
        <recipe-preview
        v-for="recipe in recipes.recipes"
        :key="recipe.name"
        :recipe="recipe"
        v-on:click="goToRecipePage()" />
        </b-row>
    </section>
    </b-row>
</div>
</div>
<!--
<div v-else>
<div class="container-fluid">
    <div class="row">
      <div class="col">
        <h1 class="float-start">My Recipes</h1>
      </div>
</div>
      <div class="row">
        <h3> Start by adding your favourite recipes here! </h3>
        <button class="btn" v-on:click="goToAddRecipe()">Add new recipe</button>
      </div>
    </div>
  </div>
</div>
-->
</div>
</template>

<script>
import RecipePreview from '../components/RecipePreview.vue'
import { Api } from '@/Api'

export default {
  name: 'recipes',
  components: {
    RecipePreview
  },
  data() {
    return {
      recipes: null,
      message: null,
      haveRecipes: 0,

      recipesTest: [
        {
          name: 'Chicken soup',
          category: 'Soup',
          imgURL: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
        },
        {
          name: 'Lasagna',
          category: 'Dinner',
          imgURL: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
        },
        {
          name: 'Banana ice-cream',
          category: 'Desert',
          imgURL: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
        },
        {
          name: 'Banana bread',
          category: 'Desert',
          imgURL: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
        },
        {
          name: 'Chicken soup',
          category: 'Soup',
          imgURL: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
        },
        {
          name: 'Lasagna',
          category: 'Dinner',
          imgURL: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
        },
        {
          name: 'Banana ice-cream',
          category: 'Desert',
          imgURL: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
        },
        {
          name: 'Banana bread',
          category: 'Desert',
          imgURL: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
        }
      ]

    }
  },
  beforeCreate() {
    Api.get('/profiles/' + localStorage.id + '/recipes')
      .then(response => {
        this.recipes = response.data
        this.recipes.recipes.forEach(recipe => console.log(recipe.image))
      })
      .catch(error => {
        this.message = error.message
        // console.log(error.message)
      })
    if (this.message === 'Request failed with status code 404') {
      this.haveRecipes = 1
    }
    console.log(this.message)
    console.log(this.haveRecipes)
  },
  methods: {
    goToAddRecipe() {
      this.$router.push('/addRecipe')
    }

  }
}
</script>

<style scoped>

  #background{
    background-image: url('https://img.freepik.com/free-photo/golden-cutlery-with-textile-plate-dark-background-top-view_1220-6580.jpg?w=996&t=st=1664984396~exp=1664984996~hmac=79c8fc863f63487bb345b48115a001dfef7e250422b4443191829207582e91a7');
  }
  .btn {
    float:left;
    background-color: rgb(64, 224, 112);
  }

  section #recipes {
    display: flex;
    flex-direction: column;
  }

  @media (min-width: 30rem) {
    #recipes {
      flex-direction: row;
    }
  }
</style>
