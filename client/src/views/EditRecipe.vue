<template>
<div>
<div id ="background" class="container-fluid">

  <div class="row">
    <div class="col">

      <h1>Edit recipe</h1>
<!-- SAVE, CANCEL -->
      <button type="submit" class="btn btn-success" @click="saveChanges()">Save changes</button>
      <button type="submit" class="btn btn-danger" @click="cancelEdit()">Cancel</button>

      <!-- Save, cancel button warning when button is pressed that the changes will be lost -->
      <br>
    </div>

  </div>
  <div class="row">
    <div class="col" id="left">

      <h4>Edit recipe name</h4>
<!-- EDIT NAME -->
      <div v-if="this.editName">
        <b-form-input type="text" name="recipeName" v-model="recipe.recipe[0].name" class="form-control"></b-form-input>
      </div>
      <div v-else>
        <b-form-input type="text" name="recipeName" v-model="recipe.recipe[0].name" class="form-control" :disabled=true></b-form-input>
      </div>

      <b-button type="submit" variant="primary" @click="toggleName">Edit</b-button>

      <h4>Change recipe image</h4>
<!-- EDIT IMAGE -->
      <b-button type="submit" variant="primary" @click="toggleImage">Change</b-button>
      <div v-if="changeImage">
        <div class="mb-3">
          <label for="formFile" class="form-label">Select file</label>
          <input class="form-control" type="file" id="formFile">
        </div>
      </div>
      <div v-else>
       <img :src="recipe.recipe[0].image">
      </div>

      <div>
        <h4>Edit recipe category</h4>
        <b-button type="submit" variant="primary" @click="toggleCategory">Edit</b-button>
<!-- EDIT CATEGORY -->
        <div v-if="this.editCategory">
          <b-form-group v-slot="{ ariaDescribedby }">
            <b-form-radio-group
            v-model="selected"
            :options="options"
            :aria-describedby="ariaDescribedby"
            name="radios-stacked"
            stacked>
            </b-form-radio-group>
          </b-form-group>
        </div>
        <div v-else>
           <b-form-group v-slot="{ ariaDescribedby }">
            <b-form-radio-group
            v-model="selected"
            :options="disabledOptions"
            :aria-describedby="ariaDescribedby"
            name="radios-stacked"
            stacked>
            </b-form-radio-group>
          </b-form-group>
        </div>
      </div>

    </div>

    <div class="col" id="right">
      <div class="row">

        <h4>Edit ingredients list</h4>
        <b-button type="submit" variant="primary" @click="toggleIngredients">Edit</b-button>
<!-- EDIT INGREDIENTS -->
<!-- TODO add pcs as option once backend enables it -->

        <div v-if="this.editIngredients">
<!-- TODO check if can do with array instead of first-..  -->
          <div class="form-inline">
            <input type="number" placeholder="Amount" v-model="firstAmount">
              <select class="form-select" aria-label="Unit" aria-placeholder="Unit" v-model="firstUnit">
                <!-- <option value="grams">pcs</option> -->
                <option value="grams">grams</option>
                <option value="kg">kg</option>
                <option value="ml">ml</option>
                <option value="dl">dl</option>
                <option value="l">l</option>
              </select>
            <input type="text" placeholder="Item" v-model="firstItem">
          </div>
          <div v-for="key in count" :key="key">
            <div class="form-inline">
              <input type="number" size="20" placeholder="Amount" v-model="ingredientsObj[key].amount">
              <input type="text" placeholder="Unit" v-model="ingredientsObj[key].unit">
              <input type="text" placeholder="Item" v-model="ingredientsObj[key].item">
            </div>
          </div>
          <div class="controls">
            <a href="#" id="add_more_fields" @click="add"><i class="fa fa-plus"></i> Add Item</a>
            <a href="#" id="remove_fields"  @click="remove"><i class="fa fa-plus"></i> Remove Item</a>
          </div>
          </div>

        <div v-else>
          <ul>
            <li :recipe="recipe" v-for="ingredient in recipe.recipe[0].items"
            :key="ingredient.itemId">{{ingredient.amount}} {{ingredient.unit}} {{ingredient.item}}
            </li>
          </ul>
        </div>

      </div>
      <h4>Instructions</h4>
      <b-button type="submit" variant="primary" @click="toggleInstructions">Edit</b-button>

<!-- EDIT INSTRUCTIONS -->
      <div v-if="editInstructions">
        <textarea class="form-control" id="instructions" rows="10" v-model="this.recipe.recipe[0].instruction"></textarea>
      </div>
      <div v-else>
        <textarea class="form-control" id="instructions" rows="10" v-model="this.recipe.recipe[0].instruction" disabled></textarea>
      </div>
    </div>
  </div>
  </div>

</div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'edit-recipe',
  data() {
    return {
      recipe: null,
      // input togglers
      editName: false,
      editCategory: false,
      editIngredients: false,
      editInstructions: false,
      changeImage: false,

      selected: null,
      options: [
        { text: 'Breakfast', value: 'Breakfast' },
        { text: 'Lunch', value: 'Lunch' },
        { text: 'Dinner', value: 'Dinner' },
        { text: 'Snack', value: 'Snack' }
      ],
      disabledOptions: [
        { text: 'Breakfast', value: 'Breakfast', disabled: true },
        { text: 'Lunch', value: 'Lunch', disabled: true },
        { text: 'Dinner', value: 'Dinner', disabled: true },
        { text: 'Snack', value: 'Snack', disabled: true }
      ],
      count: 0,
      // to remove if array solution is valid
      amounts: {},
      units: {},
      items: {},

      ingredientsObj: [],
      firstAmount: null,
      firstUnit: '',
      firstItem: '',
      instructions: '',
      pictureURL: '',
      unitsArray: [],
      amountsArray: [],
      itemsArray: []
    }
  },
  beforeCreate() {
    Api.get('/profiles/' + localStorage.id + '/recipes/' + this.$route.params.id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(response => {
        console.log(response.data)
        this.recipe = response.data
        // needed for proper rendering
        this.selected = this.recipe.recipe[0].category
        this.firstAmount = this.recipe.recipe[0].items[0].amount
        this.firstUnit = this.recipe.recipe[0].items[0].unit
        this.firstItem = this.recipe.recipe[0].items[0].item
        this.count = this.recipe.recipe.length
        console.log(this.count)
        console.log(this.recipe.recipe[0].instruction)

        // for proper data binding of ingredients after edit
        this.ingredientsObj = this.recipe.recipe[0].items
      })
      .catch(error => {
        console.log(error.message)
      })
  },
  methods: {
    add() {
      this.itemsObs.push({ amount: null, unit: null, item: null })
      this.count++
    },
    remove() {
      this.count--
    },
    saveChanges() {
      //   object.arrayOfRecipes.arrayOfItemsObj = new array of itemsObj
      this.recipe.recipe[0].items = this.itemsObj

      Api.patch('/profiles/' + localStorage.id + '/recipes/' + this.$route.params.id, {
        name: this.recipe.recipe[0].name,
        category: this.selected,
        items: this.recipe.recipe[0].items,
        instruction: this.recipe.recipe[0].instruction
        // imagePath: this.pictureURL
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }).then(response => {
        console.log(response.data.message)
      })
        .catch(error => {
          console.log(error)
        })
    },
    cancelEdit() {
      this.$router.push('/userHome')
    },
    toggleName() {
      this.editName = true
    },
    toggleImage() {
      this.changeImage = true
    },
    toggleCategory() {
      this.editCategory = true
    },
    toggleInstructions() {
      this.editInstructions = true
    },
    toggleIngredients() {
      this.editIngredients = true
    }

  }

}

</script>

<style scoped>
  img {
        max-width: 350px;
        max-height: 350px;
        align-items: center;
    }
</style>
