<template>
  <div class="UserHome">
    <div class="box-form">
      <div class="form-container">
        <div class="menu"  v-show="user">
          <h1>Home</h1>
          <div class="filter">
            <h2>Choose recipe category:</h2>
            <div class="category" aria-label="Default select example">
              <b-form-select v-model="category" :options="options"></b-form-select>
            </div>
            <button class="search-btn" v-on:click="filterRecipes">Search</button>
            <button class="delete-btn" v-on:click="deleteAllRecipes">Delete all recipes</button>
          </div>
          <div class="recipesHolder">
            <b-row id="allRecipes" v-if="this.category==='Category options'" v-show="recipes.length > 0">
              <b-col cols="12" sm="4" md="3" :key="recipe._id" v-for="recipe in recipes">
                <RecipePreview
                  :recipe="recipe"
                  :image="recipe.image"
                   />
              </b-col>
            </b-row>
            <b-row id="alert-holder" v-show="recipes.length === 0">
              <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </symbol>
              </svg>
              <div class="alert d-flex align-items-center" role="alert" id="no-recipes-alert">
                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                  You have no recipes yet.
              </div>
            </b-row>
            <b-row id="filteredRecipes" v-if="this.category!=='Category options'">
              <b-col cols="12" sm="4" md="3" :key="recipe._id" v-for="recipe in filteredRecipes">
                <RecipePreview
                :recipe="recipe"/>
              </b-col>
            </b-row>
          </div>
<!--           <div class="loading"   v-show="!user">
            <Loader/>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
import RecipePreview from '../components/RecipePreview.vue'
/* import Loader from '../components/loader.vue' */

export default {
  name: 'userHome',
  props: ['user'],
  components: {
    RecipePreview/* ,
    Loader */
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
        console.error(error)
      })
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
    margin-top: 17%;
    margin-bottom: 0;
    width: 100%;
  }

  .filter {
    display: flex;
    position: relative;
    align-items: center;
    flex-direction: row;
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
    font-weight: bold;
    text-decoration: underline;
    box-shadow: 0px 4px 10px 0px #f9c3918e;
    background-image: linear-gradient(135deg, #f17603ca 10%, #682301d1 100%);
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
    &:hover {
    color: #fff;
    font-weight: bold;
    text-decoration: underline;
    box-shadow: 0px 4px 10px 0px #ff67678e;
    background-image: linear-gradient(135deg, #d80404ca 10%, #490202c7 100%);
    }
  }

  .recipesHolder {
    min-height: 35vh;
  }

  #alert-holder {
    align-items: center;
    justify-content: center;
    margin-left: 30%;
    margin-right: 35%;
  }

  #no-recipes-alert {
    justify-content: center;
    display: flex;
    flex-direction: row;
    color: rgb(78, 6, 0);
    background-color: rgba(250, 189, 185, 0.917);
    box-shadow: 0px 4px 10px 0px #fb68688e;
    border-radius: 8px;
    display: inline-block;
    padding: 10px 25px;
    border: 0;
    outline: 0;
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
