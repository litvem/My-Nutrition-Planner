<template>
<div id = "background" class="container">
    <div class="row">
      <h1 v-bind="recipe">{{this.recipe.name}}</h1>
    </div>

    <div class="row">
      <div class="col-6" id="left">

        <div class="row">
          <img v-bind="recipe" :src="this.recipe.imagePath">
        </div>

        <br>

          <div class="row">
            <div class="col">
              <div class="alert alert-success" role="alert"> <a href="#" class="alert-link" v-bind="recipe">{{recipe.category}}</a></div>
            </div>
          </div>

          <div class="row">
                  <div class="col">
                    <b-button v-b-toggle.collapse-1 variant="primary">Add to Plan</b-button>
                    <b-collapse id="collapse-1" class="mt-2">
                        <b-card>
                        <p class="card-text">Choose week:</p>
                        <b-form-group v-slot="{ ariaDescribedby }">
                        <b-form-checkbox-group
                        v-model="selected"
                        :options="options"
                        :aria-describedby="ariaDescribedby"
                        name="radios-stacked"
                        stacked>
                        </b-form-checkbox-group>
                        </b-form-group>
                    </b-card>
                    </b-collapse>
                  </div>
                  <div class="col">
                    <b-button variant="danger">Delete recipe</b-button>
                  </div>

        </div>
    </div>
    <div class="col-6" id="right">
            <b-card>
                <h4>Ingredients</h4>
                <ul>
                  <li v-bind="recipe" v-for="ingredient in recipe.items"
                  :key="ingredient.itemId">{{ingredient.amount}} {{ingredient.unit}} {{ingredient.item}}</li>
                </ul>
                <br>

                <h4>Instructions</h4>
                <p v-bind="recipe">{{recipe.instruction}}</p>

            </b-card>
        </div>
      </div>

</div>

</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'recipe-page',
  mounted() {
    // Api.get('/profiles/' + localStorage.id + '/recipes/' + this.$route.param.id)
    Api.get('/profiles/' + localStorage.id + '/recipes/' + 'PancakesURL')
      .then(response => {
        console.log(response.data)
        this.recipe = response.data
      })
      .catch(error => {
        this.message = error.message
        console.log(error.message)
      })
  },
  data() {
    return {
      selected: 'first',
      recipe: null,
      options: [
        { text: '2022-Week 39', value: '39' },
        { text: '2022-Week 40', value: '40' }
      ]
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

#background {
  background-image: url('https://img.freepik.com/premium-photo/cutting-board-vegetables_1220-2560.jpg?w=996')
}
</style>
