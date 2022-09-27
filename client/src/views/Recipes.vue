<template>
<div class="container-fluid">
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <h1 class="float-start">My Recipes</h1>
      </div>

      <div class="col">
        <button class="btn" v-on:click="goToAddRecipe">Add new recipe</button>
      </div>

      <div class="col">
        <form>
          <input type="search" class="form-control" placeholder="Search by name or category..." aria-label="Search">
        </form>
      </div>
      <br><br>

    </div>
  </div>
  <div class="row">
    <section class="container-fluid" id="recipes">
        <recipe-preview
        v-for="recipe in recipes"
        :key="recipe.name"
        :name="recipe.name"
        :category="recipe.category"
        :imgURL="recipe.imgURL"/>
    </section>
  </div>
</div>
</template>

<script>
import RecipePreview from '../components/RecipePreview.vue'

export default {
  components: {
    RecipePreview
  },

  data() {
    return {
      recipes: [
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
  name: 'recipes',
  methods: {
    goToAddRecipe() {
      this.$router.push('/addRecipe')
    }
  }
}
</script>

<style scoped>

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
