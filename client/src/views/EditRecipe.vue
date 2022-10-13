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

      <b-button type="submit" variant="primary" @click="toggleName">Edit Name</b-button>

      <h4>Change recipe image</h4>
<!-- EDIT IMAGE -->
      <div class="mb-3">
        <label for="formFile" class="form-label" :aria-disabled="true">Select file</label>
        <input class="form-control" type="file" id="formFile">
      </div>

      <div>
        <h4>Edit recipe category</h4>
        <b-button type="submit" variant="primary" @click="toggleCategory">Edit Name</b-button>
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
        <b-button type="submit" variant="primary" @click="toggleIngredients">Edit Name</b-button>
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
<!-- TODO fix duplicate key -->
          <div v-for="key in count" :key="key">
            <div class="form-inline">
              <input type="number" size="20" placeholder="Amount" v-model="unitsArray[key]">
              <input type="text" placeholder="Amount" v-model="itemsArray[key]">
              <input type="number" placeholder="Amount" v-model="amountsArray[key]">
<!--
              <input type="number" size="20" placeholder="Amount" v-model="amounts['amount'+key]" :id="key">
              <select class="form-select" aria-label="Unit" v-model="units['unit'+key]" :id="key">
                -->
                <!-- <option value="grams">pcs</option> -->
                <!--
                <option value="grams">grams</option>
                <option value="kg">kg</option>
                <option value="ml">ml</option>
                <option value="dl">dl</option>
                <option value="l">l</option>
              </select>
              <input type="text" placeholder="Item" v-model="items['item'+key]" :id="key">
              -->
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
      <textarea class="form-control" id="instructions" rows="10" v-model="this.recipe.recipe[0].instruction"></textarea>
      <p>hey {{this.recipe.recipe[0].instruction}}</p>
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
        // test
        for (let i = 0; i < this.count; i++) {
          this.itemsArray.push(this.ingredientsObj[i].item)
          this.unitsArray.push(this.ingredientsObj[i].unit)
          this.amountsArray.push(this.ingredientsObj[i].amount)
        }
        console.log(this.itemsArray)
        // this.amounts.push({ amount: this.itemsObj[0].amount })
        // this.units.push({ units: this.itemsObj[0].unit })
        // this.item.push({ item: this.itemsObj[0].item })
        // console.log(this.itemsObj[0].amount)

        // const itemKey = Object.keys(this.items)
        // const unitKey = Object.keys(this.units)
        // const amKey = Object.keys(this.amounts)

        // for (let i = 0; i < this.count; i++) {
        //   this.amounts.push({ amount: this.itemObj[i].amount })
        //   this.units.push({ units: this.itemObj[i].unit })
        //   this.item.push({ item: this.itemObj[i].item })
        // }
        // console.log('---out')
      })
      .catch(error => {
        console.log(error.message)
      })
  },
  methods: {
    add() {
      this.count++
    },
    remove() {
      this.count--
    },
    saveChanges() {
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
      // this.recipeName = this.recipe.recipe[0].name
      // this.editName = !this.editName
      this.editName = true
      console.log('edit name ' + this.editName)
      console.log(this.recipe.recipe[0].name)
    },
    toggleImageURL() {

    },
    toggleCategory() {
      this.editCategory = true
      console.log('edit name ' + this.editCategory)
    },
    toggleInstructions() {

    },
    toggleIngredients() {
      this.editIngredients = true
    }

  }

}

</script>

<style scoped>

</style>
