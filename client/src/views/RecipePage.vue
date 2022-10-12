<template>
<div id = "background" class="container">
  <br><br><br>
    <div class="row">
      <h1 :recipe="recipe">{{recipe.recipe[0].name}}</h1>
    </div>

    <div class="row">
      <div class="col-6" id="left">

        <div class="row">
          <img :recipe="recipe" :src="recipe.recipe[0].imagePath">
        </div>

        <br>

          <div class="row">
            <div class="col">
              <div class="alert alert-success" role="alert" :recipe="recipe">{{recipe.recipe[0].category}}</div>
            </div>
          </div>

          <div class="row">
                  <div class="col">
                    <b-button v-b-toggle.collapse-1 variant="primary">Add to Plan</b-button>
                    <b-collapse id="collapse-1" class="mt-2">
                        <b-card>
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
                            placeholder="Enter day (Monday,Tuesday,...)"
                            required ></b-form-input>
                        </b-form-group>
                        <b-button type="submit" variant="primary" v-on:click="addToDay">Submit</b-button>

                    </b-card>
                    </b-collapse>
                  </div>
                  <div class="col">
                    <b-button variant="danger" v-on:click="deleteRecipe()">Delete recipe</b-button>
                  </div>

        </div>
    </div>
    <div class="col-6" id="right">
            <b-card>
                <h4>Ingredients</h4>
                <ul>
                  <li :recipe="recipe" v-for="ingredient in recipe.recipe[0].items"
                  :key="ingredient.itemId">{{ingredient.amount}} {{ingredient.unit}} {{ingredient.item}}</li>
                </ul>
                <br>

                <h4>Instructions</h4>
                <p :recipe="recipe">{{recipe.recipe[0].instruction}}</p>

            </b-card>
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

    deleteRecipe() {
      Api.delete('profiles/' + localStorage.id + '/recipes/' + this.$route.params.id, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }).catch(error => {
        alert('Warning: ' + error)
      })
      this.$router.push('/userHome')
    }
  }
}

</script>

<style scoped>
img {
    max-width: 350px;
    max-height: 350px;
    border: 3px solid black;
    box-shadow: inset 0px 0px 10px 20px gray;
}
</style>
