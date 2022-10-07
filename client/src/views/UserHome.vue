<template>
  <div class="UserHome">
    <div class="UserHomeView">
      <div class="box-form">
        <div class="form-container">
          <div class="menu">
            <h1>Home</h1>
            <br>
            <button class="btn" v-on:click="goToProfile">Profile</button>
            <button class="btn" v-on:click="goToRecipes">Recipes</button>
            <button class="btn" v-on:click="goToWeeklyCalendar">Weekly Plan</button>
            <button class="btn" v-on:click="goToShoppingList">Shopping List</button>
            <div class="filter">
                <h2>Choose recipe category:</h2>
                <div class="category" aria-label="Default select example">
                  <b-form-select v-model="category" :options="options"></b-form-select>
                </div>
                <button class="search-btn" v-on:click="filterRecipes">Search</button>
            </div>
            <b-row>
            <b-col cols="12" md="6" xl="3" class="view" v-for="recipe in filteredRecipes" v-bind:key="recipe._id">
              <RecipePreview v-bind:recipe-prev="recipe"
              :key="recipe._id"
              :name="recipe.name"
              :category="recipe.category"
              :imgURL="recipe.imgURL" />
            </b-col>
            </b-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import RecipeItem from '@/components/RecipeItem.vue'
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
        { value: null, text: 'Caterogy options' },
        { value: 'breakfast', text: 'Breakfast' },
        { value: 'lunch', text: 'Lunch' },
        { value: 'dinner', text: 'Dinner' },
        { value: 'snack', text: 'Snack' }
      ],
      filteredRecipes: []
    }
  },
  methods: {
    goToProfile() {
      this.$router.push('/profile')
    },
    goToRecipes() {
      this.$router.push('/recipes')
    },
    goToWeeklyCalendar() {
      this.$router.push('/weeklyCalendar')
    },
    goToShoppingList() {
      this.$router.push('/shoppingList')
    },
    filterRecipes(e) {
      /* const id = localStorage.getItem('id')
      const filter = this.category
      if (filter !== 'Category options') {
        Api.get('/profiles/' + id + '/recipes?category=' + 'Lunch')
          .then(response => {
            console.log(response)
            this.filteredRecipes = response.data
            this.filteredRecipes.forEach((recipe) => console.log(recipe.name))
          })
          .catch(error => {
            this.message = error
          })
      } else {
       */
      const id = localStorage.getItem('id')
      Api.get('/profiles/' + id + '/recipes')
        .then(response => {
          this.filteredRecipes = response.data.recipes
          this.filteredRecipes.forEach((recipe) => console.log(recipe.name))
        })
        .catch(error => {
          this.message = error
        })
      // }
    }
  }
}
</script>

<style scoped>
  .UserHomeView {
    background-image: url("../assets/user-home-background.jpg");
    background-size: cover;
    background-attachment: fixed;
    position: relative;
    height: 100%;
  }

  .box-form .form-container {
    height: 100%;
    display: flex;
    padding: 80px;
    width: 80%;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    margin-right: 10%;
    margin-left: 10%;
  }

  .box-form .menu {
    width: 100%;
    height: 100%;
    padding: 40px;
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
    margin-top: 13%;
    margin-bottom: 1%;
    width: 100%;
  }

  .filter {
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
  }

  .filter view {
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
  }

  h2 {
    color: #fff;
    font-size: 23px;
    font-weight: bold;
    text-align: left;
    margin-top: 5%;
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
  }

  .search-btn:hover {
    color: #fff;
  }

  .filter .category {
    margin-top: 1em;
    margin-bottom: 0.7em;
    margin-left: 1%;
    width: 50%;
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
