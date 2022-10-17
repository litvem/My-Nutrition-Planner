<template>
<div class="addSL" >
  <div class="container-fluid">

  <div class="row">
    <div class="col">
      <h1>Create new recipe</h1>
      <br>
    </div>

  </div>
  <div class="row">
    <div class="col" id="left">
      <h4>Add recipe name</h4>
        <input type="text" name="recipeName" class="form-control" placeholder="Type name here" v-model="recipeName">

      <h4>Add recipe image</h4>
      <div class="mb-3">
        <label for="formFile" class="form-label">Select file</label>
        <input class="form-control" type="file" id="formFile">

        <input type="text" name="imgURL" class="form-control" placeholder="Add image URL" v-model="pictureURL">

      </div>

      <div>
        <h4>Choose recipe category</h4>
        <b-form-group v-slot="{ ariaDescribedby }">
          <b-form-radio-group
          v-model="selected"
          :options="options"
          :aria-describedby="ariaDescribedby"
          name="radios-stacked"
          stacked>
          </b-form-radio-group>
        </b-form-group>
        <button type="submit" class="btn btn-success" @click="save">Save recipe</button>

      </div>

      </div>
    <div class="col" id="right">
      <div class="row">
        <h4>Ingredients list</h4>
        <br>
        <br>
        <div class="card-body">
            <div class="form-inline">
              <input type="number" placeholder="Amount" v-model="firstAmount">
              <select class="form-select" aria-label="Unit" aria-placeholder="Unit" v-model="firstUnit">
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
              <input type="number" size="20" placeholder="Amount" v-model="amounts['amount'+key]" :id="key">
              <select class="form-select" aria-label="Unit" v-model="units['unit'+key]" :id="key">
                <option value="grams">grams</option>
                <option value="kg">kg</option>
                <option value="ml">ml</option>
                <option value="dl">dl</option>
                <option value="l">l</option>
              </select>
              <input type="text" placeholder="Item" v-model="items['item'+key]" :id="key">
            </div>
          </div>
    <div class="controls">
      <a href="#" id="add_more_fields" @click="add"><i class="fa fa-plus"></i> Add Item</a>
      <a href="#" id="remove_fields"  @click="remove"><i class="fa fa-plus"></i> Remove Item</a>
    </div>
    </div>
      </div>
      <h4>Instructions</h4>
      <textarea class="form-control" id="instructions" rows="10" v-model="instructions"></textarea>
    </div>
  </div>
  </div>
  </div>

</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'addRecipe',
  data() {
    return {
      message: '',
      count: 1,
      selected: 'first',
      options: [
        { text: 'Breakfast', value: 'Breakfast' },
        { text: 'Lunch', value: 'Lunch' },
        { text: 'Dinner', value: 'Dinner' },
        { text: 'Snack', value: 'Snack' }
      ],
      amounts: {},
      units: {},
      items: {},
      itemsObj: [],
      firstAmount: null,
      firstUnit: 'grams',
      firstItem: 'item',
      recipeName: '',
      instructions: '',
      pictureURL: ''
    }
  },
  methods: {
    add: function () {
      this.count++
      console.log(this.count)
    },
    remove: function () {
      this.count--
    },
    save: function () {
      const itemKey = Object.keys(this.items)
      const unitKey = Object.keys(this.units)
      const amKey = Object.keys(this.amounts)

      this.itemsObj.push({ amount: this.firstAmount, unit: this.firstUnit, item: this.firstItem })

      console.log(this.itemsObj[0].amount + ' ' + this.itemsObj[0].unit + ' ' + this.itemsObj[0].item)
      for (let i = 1; i <= this.count; i++) {
        // check if user added input in row of input
        if (this.amounts[amKey[i - 1]] !== undefined) {
          this.itemsObj.push({ amount: this.amounts[amKey[i - 1]], unit: this.units[unitKey[i - 1]], item: this.items[itemKey[i - 1]] })
          console.log('---for')
          console.log(this.amounts[amKey[i - 1]], this.units[unitKey[i - 1]], this.items[itemKey[i - 1]])
        }
        console.log('---out')
      }

      Api.post('/profiles/' + localStorage.id + '/recipes', {
        name: this.recipeName,
        category: this.selected,
        items: this.itemsObj,
        instruction: this.instructions,
        imagePath: this.pictureURL
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      ).catch(error => {
        if (error) {
          alert('Warning: Recipe was not created!' + error)
        } else {
          alert('Recipe was succesfully created!')
          this.$router.push('/userHome')
        }
      })
    }
  }
}
</script>

<style scoped>
  .addSL {
    background-image: url("../assets/shopping-lists-background.jpg");
    background-size: cover;
    background-attachment: fixed;
    position: relative;
    min-height: 93vh;
    height: 200%;
  }

</style>
