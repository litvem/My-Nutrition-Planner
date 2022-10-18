<template>
  <div class="RecipePage">
    <div class="title">
        <h1 :recipe="recipe">{{recipe.recipe[0].name}}</h1>
      </div>
    <div class="main-content">
      <div id="image-category">
        <img id="image" :recipe="recipe" :src="recipe.recipe[0].image" />
        <h5>Category: {{recipe.recipe[0].category}}</h5>
      </div>
      <div class="ingredients-instructions-buttons">
        <div class="ingredients-list">
          <h4>Ingredients</h4>
            <ul>
              <li :recipe="recipe" v-for="ingredient in recipe.recipe[0].items"
                  :key="ingredient.itemId">{{ingredient.amount}} {{ingredient.unit}} {{ingredient.item}}</li>
              </ul>
        </div>
        <div class="instructions-text">
          <h4>Instructions</h4>
          <p :recipe="recipe">{{recipe.recipe[0].instruction}}</p>
        </div>
        <div class="buttons">
          <b-button v-b-toggle.collapse-1 class="submit-button">Add to plan</b-button>
          <b-button id="edit-button" v-on:click="editRecipe()">Edit</b-button>
          <b-button id="delete-button" v-on:click="deleteRecipe()">Delete recipe</b-button>
        </div>
        <div class="form">
          <b-collapse id="collapse-1" class="mt-2">
            <b-card id="options">
              <p class="card-text">Choose week:</p>
              <b-form-group>
                <b-form-input id="year"
                  v-model="year"
                  type="number"
                  placeholder="Enter year"
                  required >
                </b-form-input>
                <b-form-input id="week"
                  v-model="weekNumber"
                  type="number"
                  placeholder="Enter week number"
                  required >
                </b-form-input>
                <b-form-input id="day"
                  v-model="day"
                  type="text"
                  placeholder="Enter day (Monday, Tuesday, ...)"
                  required >
                </b-form-input>
              </b-form-group>
              <b-button type="submit" class="submit-button" v-on:click="addToDay">Submit</b-button>
            </b-card>
          </b-collapse>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'recipe-page',

  beforeCreate() {
    Api.get('/profiles/' + localStorage.id + '/recipes/' + this.$route.params.id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(response => {
        console.log(response.data)
        this.recipe = response.data
        console.log(this.recipe.recipe[0]._id)
      })
      .catch(error => {
        console.log(error.message)
      })
  },
  data() {
    return {
      recipe: null,
      year: '',
      day: '',
      weekNumber: ''
    }
  },
  methods: {
    addToDay() {
      Api.post('/profiles/' + localStorage.id + '/days', {
        year: this.year,
        name: this.day,
        week: this.weekNumber,
        recipes: this.recipe.recipe[0]
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        if (response.status === 201) {
          alert('Recipe was added to plan in week ' + this.weekNumber)
        } else if (response.status === 404) {
          alert('Warning: Recipe was not added to plan!')
        }
      }).catch(error => {
        if (error.status === 409) {
          // Api.patch()
        }
      })
    }
  },
  editRecipe() {
    this.$router.push(`/editRecipe/${this.$route.params.id}`)
  },

  deleteRecipe() {
    localStorage.setItem('recipeID', this.recipe.recipe[0]._id)
    Api.delete('/profiles/' + localStorage.id + '/recipes/' + localStorage.recipeID, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).then(response => {
      if (response.status === 201) {
        alert('Recipe was sucesfully deleted!')
        this.$router.push('/userHome')
        return this.$router.go()
      }
    }).catch(error => {
      alert('Warning: Could not delete recipe' + error)
    })
  }
}

</script>

<style lang="scss" scoped>
    .RecipePage {
      background-image: url("../assets/recipe-page-background.jpg");
      background-size: cover;
      background-attachment: fixed;
      position: relative;
      height: 110%;
    }

    .title {
      height: 100%;
      width: 100%;
      padding: 4%;
      padding-bottom: 1%;
      display: flex;
      box-sizing: border-box;
      overflow: hidden;
      align-items: center;
      text-align: center;
    }

    h1 {
      color: #fff;
      text-transform: uppercase;
      font-size: 50px;
      font-weight: bold;
      text-align: left;
      margin-top: 4%;
      margin-bottom: 0.5%;
      width: 100%;
    }

    .main-content {
      display: flex;
      flex-direction: row;
      min-height: 70vh;
    }

    #image-category {
      padding: 4%;
      padding-top: 1%;
      padding-bottom: 1%;
      align-items: center;
    }

    #image {
      max-width: 400px;
      max-height: 400px;
    }

    h5 {
      margin-top: 0.7em;
      margin-bottom: 0.7em;
      margin-right: 0%;
      margin-left: 0%;
      float: center;
      color: rgb(66, 26, 1);
      font-size: 20px;
      font-weight: bold;
      padding: 12px 50px;
      border-radius: 8px;
      display: inline-block;
      border: 0;
      outline: 0;
      box-shadow: 0px 4px 10px 0px #ddc20f7c;
      background-image: linear-gradient(135deg, #f7f98fe3 10%, #ffcd0485 100%);
      width: 80%;
      text-align: center;
    }

    .ingredients-instructions-buttons {
      width: 70%;
    }
    .ingredients-list {
      margin-top: 0;
      margin-bottom: 3%;
      margin-right: 0;
      margin-left: 0;
      border-radius: 8px;
      display: inline-block;
      border: 0;
      outline: 0;
      box-shadow: 0px 4px 10px 0px #ddc20f7c;
      background-color: #faf3c3df;
      width: 51%;
    }

    h4 {
      margin-top: 0.7em;
      margin-bottom: 1%;
      margin-right: 5%;
      margin-left: 4%;
      float: center;
      color: rgb(66, 26, 1);
      font-size: 20px;
      font-weight: bold;
      text-decoration: underline;
      display: inline-block;
    }

    ul {
      margin-top: 0.7em;
      margin-bottom: 0.7em;
      margin-right: 5%;
      margin-left: 2%;
      color: rgb(66, 26, 1);
      font-size: 17px;
    }

    .instructions-text {
      margin-top: 0;
      margin-bottom: 3%;
      margin-right: 0;
      margin-left: 0;
      border-radius: 8px;
      display: inline-block;
      border: 0;
      outline: 0;
      box-shadow: 0px 4px 10px 0px #ddc20f7c;
      background-color: #faf3c3f1;
      width: 51%;
    }

    p {
      margin-top: 0.3em;
      margin-bottom: 0.7em;
      margin-right: 5%;
      margin-left: 4%;
      float: center;
      color: rgb(66, 26, 1);
      font-size: 17px;
    }

    .buttons {
      width: 80%;
      margin-left: 1%;
    }

    .submit-button {
      margin-top: 0.2em;
      margin-bottom: 0.01em;
      margin-right: 1em;
      margin-left: 0.01em;
      float: center;
      color: #fff;
      font-size: 16px;
      padding: 10px 15px;
      border-radius: 50px;
      display: inline-block;
      border: 0;
      outline: 0;
      box-shadow: 0px 4px 20px 0px #a6fa94a6;
      background-image: linear-gradient(135deg, #70e68e 10%, #2c7803a6 100%);
        &:hover {
        color: rgb(255, 245, 139);
        text-decoration: underline;
        font-weight: bold;
        background-color: rgba(249, 183, 116, 0.584);
        box-shadow: 0px 4px 10px 0px #ffc400e7;
        }
    }

    #delete-button {
      margin-top: 0.2em;
      margin-bottom: 0.01em;
      margin-right: 1em;
      margin-left: 0.01em;
      float: center;
      color: #fff;
      font-size: 16px;
      padding: 10px 15px;
      border-radius: 50px;
      display: inline-block;
      border: 0;
      outline: 0;
      box-shadow: 0px 4px 20px 0px #ea4e4e84;
      background-image: linear-gradient(135deg, #e69b70 10%, #781103a6 100%);
        &:hover {
        color: rgb(43, 0, 0);
        text-decoration: underline;
        font-weight: bold;
        background-color: rgba(251, 2, 2, 0.584);
        box-shadow: 0px 4px 10px 0px #a10000b3;
      }
    }

    #edit-button {
      margin-top: 0.2em;
      margin-bottom: 0.01em;
      margin-right: 1em;
      margin-left: 0.01em;
      float: center;
      color: #fff;
      font-size: 16px;
      padding: 10px 15px;
      border-radius: 50px;
      display: inline-block;
      border: 0;
      outline: 0;
      box-shadow: 0px 4px 20px 0px #eaae4e84;
      background-image: linear-gradient(135deg, #e6bb70 10%, #784903a6 100%);
      &:hover {
        color: rgb(254, 183, 135);
        text-decoration: underline;
        font-weight: bold;
        background-color: rgba(251, 85, 2, 0.584);
        box-shadow: 0px 4px 10px 0px #a17100b3;
      }
    }

    .form {
      width: 70%;
    }

    #options {
      text-align: center;
      margin-top: 1em;
      margin-bottom: 0.7em;
      margin-left: 1%;
      margin-right: -3%;
      width: 70%;
      font-size: 17px;
      font-weight: bold;
      color: #5d2f00;
      background-color: #fffcd4ce;
      box-shadow: 0px 4px 10px 0px #ffc8038e;
    }

    #year, #week, #day {
      font-size: 17px;
      background-color: #fffcd4ce;
      box-shadow: 0px 4px 10px 0px #ffc8038e;
      padding: 1%;
    }

  @media(max-width: 768px) {
    .main-content {
      display: flex;
      flex-direction: column;
      min-height: 90vh;
    }
    .title {
      height: 100%;
      width: 100%;
      padding-top: 10%;
      padding-bottom: 1%;
      display: flex;
      box-sizing: border-box;
      overflow: hidden;
      //align-items: center;
      text-align: center;
    }

    h1 {
      margin-top: 10%;
      margin-bottom: 5%;
      //text-align: center;
    }
    h5 {
      width: 100%;
    }
    .ingredients-instructions-buttons {
      width: 100%;
      padding-left: 5%;
      padding-right: 5%;
    }
    .ingredients-list {
      width: 100%;
    }
    .instructions-text {
      width: 100%;
    }
    .buttons {
      width: 100%;
    }
    .form {
      width: 100%;
    }
  }
  </style>
