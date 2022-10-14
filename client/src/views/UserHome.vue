<template>
  <div class="UserHome">
    <div class="box-form">
      <div class="form-container">
        <div class="menu">
          <h1>Home</h1>
          <br>
          <button class="btn" v-on:click="goToAddRecipe">Add recipe</button>
          <button class="btn" v-on:click="goToWeeklyPlans">Weekly plans</button>
          <button class="btn" v-on:click="goToShoppingList">Shopping list</button>
          <div class="filter">
            <h2>Choose recipe category:</h2>
            <div class="category" aria-label="Default select example">
              <b-form-select v-model="category" :options="options"></b-form-select>
            </div>
            <button class="search-btn" v-on:click="filterRecipes">Search</button>
            <button class="delete-btn" v-on:click="deleteAllRecipes">Delete all recipes</button>
          </div>
          <div class="recipesHolder">
            <b-row id="allRecipes" v-if="this.category==='Category options'" >
              <b-col cols="12" sm="4" md="3" :key="recipe._id" v-for="recipe in recipes">
                <RecipePreview
                  :recipe="recipe"
                  :image="recipe.image"
                   />
              </b-col>
            </b-row>
            <b-row v-else><p>No recipes created yet</p></b-row>
            <b-row id="filteredRecipes" v-if="this.category!=='Category options'">
              <b-col cols="12" sm="4" md="3" :key="recipe._id" v-for="recipe in filteredRecipes">
                <RecipePreview
                :recipe="recipe"/>
              </b-col>
            </b-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
import RecipePreview from '../components/RecipePreview.vue'

export default {
  name: 'userHome',
  props: ['user'],
  components: {
    RecipePreview
  },
  data() {
    return {
      options: [
        { value: 'Category options', text: 'Category options' },
        { value: 'Breakfast', text: 'Breakfast' },
        { value: 'Lunch', text: 'Lunch' },
        { value: 'Dinner', text: 'Dinner' },
        { value: 'Snack', text: 'Snack' }
      ],
      recipes: [],
      filteredRecipes: [],
      category: 'Category options'
    }
  },
  mounted() {
    Api.get('/profiles/' + localStorage.id + '/recipes', {

      headers: {
        Authorization: 'Bearer ' + localStorage.token
      }
    })
      .then(response => {
        this.recipes = response.data.recipes
      })
      .catch(error => {
        this.message = error.message
      })
    if (this.message === 'Request failed with status code 404') {
      this.haveRecipes = 1
    }
  },
  methods: {
    goToProfile() {
      this.$router.push('/profile')
    },
    goToAddRecipe() {
      this.$router.push('/addRecipe')
    },
    goToWeeklyPlans() {
      this.$router.push('/allPlans')
    },
    goToShoppingList() {
      this.$router.push('/shoppingList')
    },
    filterRecipes(e) {
      const filter = this.category

      console.log('category is ' + (filter !== 'Category options'))

      if (filter !== 'Category options') {
        Api.get('/profiles/' + localStorage.id + '/recipes?category=' + filter, {

          headers: {
            Authorization: 'Bearer ' + localStorage.token
          }
        })
          .then(response => {
            console.log(response)
            this.filteredRecipes = response.data.recipes
            this.filteredRecipes.forEach((recipe) => console.log(recipe.name))
          })
          .catch(error => {
            this.message = error
          })
      }
    },
    deleteAllRecipes() {
      Api.delete('/profiles/' + localStorage.id + '/recipes', {
        headers: {
          Authorization: 'Bearer ' + localStorage.token
        }
      })
        .catch(error => {
          this.message = error
        })
      this.$router.go()
    }
  }
}
</script>

<style lang="scss" scoped>
  .UserHome {
    background-image: url("../assets/user-home-background.jpg");
    background-size: cover;
    background-attachment: fixed;
    position: relative;
    height: 100%;
  }

  .box-form .form-container {
    height: 100%;
    display: flex;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
  }

  .box-form .menu {
    width: 100%;
    height: 100%;
    padding: 5%;
    overflow: hidden;
    align-items: center;
    text-align: center;
  }

  h1 {
    color: #fff;
    text-transform: uppercase;
    font-size: 50px;
    font-weight: bold;
    text-align: center;
    margin-top: 20%;
    margin-bottom: 1%;
    width: 100%;
  }

  .filter {
    display: flex;
    position: relative;
    align-items: center;
    flex-direction: row;
  }

  .recipesHolder {
    min-height: 35vh;
  }

  h2 {
    color: #fff;
    font-size: 23px;
    font-weight: bold;
    text-align: center;
    margin-top: 6%;
    margin-bottom: 5%;
    margin-right: 0%;
    margin-left: 0%;
    width: 30%;
  }

  .btn {
    margin-top: 0.7em;
    margin-bottom: 0.7em;
    margin-right: 1em;
    margin-left: 1em;
    float: center;
    align-self: auto;
    color: #fff;
    font-size: 16px;
    padding: 12px 35px;
    border-radius: 50px;
    display: inline-block;
    border: 0;
    outline: 0;
    box-shadow: 0px 4px 10px 0px #a6fa94a6;
    background-image: linear-gradient(135deg, #70e68e 10%, #2c7803a6 100%);
  }

  .search-btn {
    margin-top: 0.7em;
    margin-bottom: 0.7em;
    margin-right: 1em;
    margin-left: 1em;
    float: center;
    align-self: auto;
    color: black;
    font-size: 16px;
    padding: 12px 35px;
    border-radius: 50px;
    display: inline-block;
    border: 0;
    outline: 0;
    box-shadow: 0px 4px 10px 0px #ff7d038e;
    background-image: linear-gradient(135deg, #f9a352ca 10%, #ff5500c7 100%);

    &:hover {
    color: #fff;
    }
  }

  .delete-btn {
    margin-top: 0.7em;
    margin-bottom: 0.7em;
    margin-right: 0;
    margin-left: 1em;
    float: center;
    align-self: auto;
    color: black;
    font-size: 16px;
    padding: 12px 35px;
    border-radius: 50px;
    display: inline-block;
    border: 0;
    outline: 0;
    box-shadow: 0px 4px 10px 0px #ed51518e;
    background-image: linear-gradient(135deg, #f88686ca 10%, #ff0000c7 100%);
  }

  .delete-btn:hover {
    color: #fff;
  }

  .filter .category {
    margin-top: 1em;
    margin-bottom: 0.7em;
    margin-left: 0%;
    margin-right: 2%;
    width: 35%;
    font-size: 25px;
    color: #5d2f00;
    box-shadow: 0px 4px 10px 0px #ff7d038e;
  }

  p {
    color: #fff;
  }

  @media(max-width: 768px) {
    .box-form .form-container {
      width: 100%;
      z-index: 1;
      justify-content: center;
      align-items: center;
      }
    .box-form .menu {
      width: 100%;
      align-items: center;
      margin-right: 5%;
    }
    .menu h1 {
      font-size: 35px;
    }
    .btn {
      display: none;
    }
    .filter {
      flex-direction: column;
      align-items: center;
      margin-left: 7%;
    }
    .filter h2 {
      font-size: 17px;
      text-align: center;
      width: 100%;
    }
    .filter .category {
    width: 100%;
    font-size: 10px;
    }
  }
</style>
