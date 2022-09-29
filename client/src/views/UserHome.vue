<template>
  <div class="container-fluid">
    <b-container class="top">
      <b-row>
        <h2>Home</h2>
      </b-row>
      <b-row>
        <b-col>
          <button class="btn" v-on:click="goToProfile">Profile</button>
        </b-col>
        <b-col>
          <button class="btn" v-on:click="goToAddRecipe">Add recipe</button>
        </b-col>
        <b-col>
          <button class="btn" v-on:click="goToWeeklyCalendar">Weekly Plan</button>
        </b-col>
        <b-col>
          <button class="btn" v-on:click="goToShoppingList">Shopping List</button>
        </b-col>
      </b-row>
      <b-row>
        <h3>My favourite recipes</h3>
      </b-row>
      <b-row>
        <div v-for="recipe in recipes" v-bind:key="recipe._id">
          <p>{{recipe.name}}</p>
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'userHome',
  components: {
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
  data() {
    return {
      recipes: []
    }
  },
  methods: {
    goToProfile() {
      this.$router.push('/profile')
    },
    goToAddRecipe() {
      this.$router.push('/addRecipe')
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
    }
  }
}
</script>

<style scoped>

  .container-fluid {
    margin-top: 3%;
    margin-bottom: 3%;
    margin-right: 10%;
    margin-left: 10%;
  }

  h2 {
    color: #210b85;
    font-size: 5vmax;
    line-height: 1;
    font-weight: 700;
    margin-top: 1%;
    margin-bottom: 1%;
    margin-right: 20%;
    margin-left: 20%;
    width: 100%;
    text-align: center;
  }

  .btn {
    margin-bottom: 1em;
    margin-top: 1em;
    margin-right: 0.1em;
    margin-left: 0.1em;
    float: center;
    color: #fff;
    font-size: 16px;
    padding: 12px 35px;
    border-radius: 50px;
    display: inline-block;
    border: 0;
    outline: 0;
    box-shadow: 0px 4px 20px 0px #285fc6a6;
    background-image: linear-gradient(135deg, #7b70f5 10%, #285fc6a6 100%);
  }

  h3 {
    color: #210b85;
    font-size: 3vmax;
    line-height: 1;
    font-weight: 500;
    margin-top: 1%;
    margin-bottom: 1%;
    margin-right: 20%;
    margin-left: 20%;
    width: 100%;
    text-align: center;
  }

</style>
