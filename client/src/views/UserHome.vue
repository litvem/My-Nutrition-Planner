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
                <div class="categories" aria-label="Default select example">
                  <b-form-select v-model="selected" :options="options"></b-form-select>
                </div>
                <button class="search-btn" v-on:click="filterRecipes">Search</button>

            </div>
            <b-row>
            <div class="view" v-for="recipe in filteredRecipes" v-bind:key="recipe._id">
              <RecipePreview v-bind:recipe-prev="recipe"
              :key="recipe.name"
              :name="recipe.name"
              :category="recipe.category"
              :imgURL="recipe.imgURL" />
            </div>
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
  components: {
    RecipePreview
  },
  data() {
    return {
      selected: null,
      options: [
        { value: null, text: 'Caterogy options' },
        { value: 'breakfast', text: 'Breakfast' },
        { value: 'lunch', text: 'Lunch' },
        { value: 'dinner', text: 'Dinner' },
        { value: 'snack', text: 'Snack' }
      ],
      submitted: false,
      filteredRecipes: [
        {
          tag: [
            'bad',
            'fast'
          ],
          _id: '633d9c43fc3851a42e329507',
          name: 'Recipe1',
          category: 'Lunch',
          picture: '',
          instruction: 'Cooking instruction',
          items: [
            {
              _id: 1,
              item: 'ketchup',
              amount: 10,
              unit: 'tablespoon'
            },
            {
              _id: 2,
              item: 'potato',
              amount: 100,
              unit: 'grams'
            }
          ],
          __v: 0
        },
        {
          tag: [
            'bad2',
            'fast'
          ],
          _id: '633d9c68fc3851a42e32950c',
          name: 'Recipe2',
          category: 'Lunch',
          picture: '',
          instruction: 'Cooking instruction2',
          items: [
            {
              _id: 3,
              item: 'chili sauce',
              amount: 5,
              unit: 'ml'
            },
            {
              _id: 4,
              item: 'sallad',
              amount: 200,
              unit: 'grams'
            }
          ],
          __v: 0
        }]
    }
  },
  mounted() {
    console.log('Page is loaded')
    // Load the real recipes form the server
    Api.get('/profiles/:profileId/recipes')
      .then(response => {
        // console.log(response.data)
        this.recipes = response.data.recipes
      })
      .cath(error => {
        console.error(error)
        // In case of error we could delete all the recipes.
        // this.recipes = []
      })
      .then(() => {
        // This code is always executed at the end. After success os failure.
      })
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
    deleteRecipe(id) {
      Api.delete(`/profiles/:profileId/recipes/${id}`)
        .then(response => {
          const index = this.recipes.findIndex(recipe => recipe._id === id)
          this.recipes.splice(index, 1)
        })
        .catch(error => {
          console.error(error)
        })
    },
    filterRecipes(e) {
      this.submitted = true
      const filter = this.category
      if (filter) {
        Api.get('/profiles/HarryPotter/recipes?category=' + filter)
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            this.message = error
          })
      } else {
        Api.get('/profiles/HarryPotter/recipes')
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            this.message = error
          })
      }
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

  .filter .categories {
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
    .filter .categories {
    width: 100%;
    font-size: 10px;
    }
  }
</style>
