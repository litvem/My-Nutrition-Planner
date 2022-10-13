<template>
  <div class="RecipePage">
    <div class="box-form">
       <div class="title">
        <h1 :recipe="recipe">{{recipe.recipe[0].name}}</h1>
      </div>
      <div class="image-ingredients">
        <b-row>
          <b-col cols="3" id="image">
            <img :recipe="recipe" :src="recipe.recipe[0].image" />
            <h5>Category: {{recipe.recipe[0].category}}</h5>
          </b-col>
          <b-col cols="8" id="ingredients">
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
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <div class="buttons">
              <b-button v-b-toggle.collapse-1 class="submit-button">Add to plan</b-button>
              <b-button id="edit-button" v-on:click="editRecipe()">Edit</b-button>
              <b-button id="delete-button" v-on:click="deleteRecipe()">Delete recipe</b-button>
              <b-collapse id="collapse-1" class="mt-2">
                <b-card id="options">
                  <p class="card-text">Choose week:</p>
                  <b-form-group>
                    <b-form-input id="week"
                      v-model="weekNumber"
                      type="number"
                      placeholder="Enter week number"
                      required ></b-form-input>
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
          </b-col>
        </b-row>
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
      })
      .catch(error => {
        console.log(error.message)
      })
  },
  data() {
    return {
      recipe: null,
      day: '',
      weekNumber: '',
      recipeId: this.$route.params.id
    }
  },
  methods: {
    addToDay() {
      Api.post('profiles/' + localStorage.id + '/days', {
        name: this.day,
        week: this.weekNumber,
        recipes: this.recipe.recipe[0]
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }).catch(error => {
        alert('Warning: Recipe not added to day ' + error)
      })
      console.log(this.weekNumber + ' ' + this.day + ' ' + this.recipe.recipe[0].name + ' ' + this.recipe.recipe[0].items + ' ' + this.recipe.recipe[0].instruction + ' ' + this.recipe.recipe[0].category)
    },

    editRecipe() {
      this.$router.push(`/editRecipe/${this.recipeId}`)
    },

    deleteRecipe() {
      Api.delete('profiles/' + localStorage.id + '/recipes/' + this.$route.params.id, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }).catch(error => {
        alert('Warning: ' + error)
      })
      this.$router.push('/userHome')
      return this.$router.go()
    }
  }
}

</script>

<style scoped>
  .RecipePage {
    background-image: url("../assets/recipe-page-background.jpg");
    background-size: cover;
    background-attachment: fixed;
    position: relative;
    height: 110%;
  }
  .box-form .title {
    height: 100%;
    display: flex;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
  }
  .box-form .title {
    width: 100%;
    height: 100%;
    padding: 4%;
    padding-bottom: 1%;
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

    .image-ingredients {
      margin-left: 3%;
      min-height: 70vh;
    }

    h5 {
      margin-top: 0.7em;
      margin-bottom: 0.7em;
      margin-right: 5%;
      margin-left: 5%;
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
      width: 90%;
      text-align: center;
    }

    #image {
      max-width: 100%;
      height: auto;
      justify-content: center;
      align-items: center;
    }

    .buttons {
      widows: 30%;
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
    }

    .submit-button:hover {
      color: rgb(255, 245, 139);
      text-decoration: underline;
      font-weight: bold;
      background-color: rgba(249, 183, 116, 0.584);
      box-shadow: 0px 4px 10px 0px #ffc400e7;
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
    }

    #delete-button:hover {
      color: rgb(43, 0, 0);
      text-decoration: underline;
      font-weight: bold;
      background-color: rgba(251, 2, 2, 0.584);
      box-shadow: 0px 4px 10px 0px #a10000b3;
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
    }

    #edit-button:hover {
      color: rgb(254, 183, 135);
      text-decoration: underline;
      font-weight: bold;
      background-color: rgba(251, 85, 2, 0.584);
      box-shadow: 0px 4px 10px 0px #a17100b3;
    }

    #options {
      text-align: center;
      margin-top: 1em;
      margin-bottom: 0.7em;
      margin-left: -1%;
      margin-right: 0%;
      width: 23.5%;
      font-size: 17px;
      font-weight: bold;
      color: #5d2f00;
      background-color: #fffcd4ce;
      box-shadow: 0px 4px 10px 0px #ffc8038e;
    }

    #week {
      font-size: 17px;
      background-color: #fffcd4ce;
      box-shadow: 0px 4px 10px 0px #ffc8038e;
    }

    #day {
      font-size: 17px;
      background-color: #fffcd4ce;
      box-shadow: 0px 4px 10px 0px #ffc8038e;
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

    img {
        max-width: 350px;
        max-height: 350px;
        align-items: center;
    }

    @media(max-width: 768px) {
      h1 {
        margin-top: 10%;
        margin-bottom: 5%;
        text-align: center;
      }
    #image {
      margin-left: 15%;
    }
    .ingredients-list {
      margin-left: 31%;
      width: 100%;
    }
    .instructions-text {
      margin-left: 31%;
      width: 100%;
    }
    .buttons {
      text-align: center;
      margin-left: 9%;
    }
    #options {
      margin-top: 1em;
      margin-bottom: 0.7em;
      margin-left: 14%;
      margin-right: 0;
      width: 70%;
      font-size: 17px;
      font-weight: bold;
      color: #5d2f00;
      background-color: #fffcd4ce;
      box-shadow: 0px 4px 10px 0px #ffc8038e;
    }
  }
  </style>
