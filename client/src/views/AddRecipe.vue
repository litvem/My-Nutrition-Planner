<template>
<div class="addRecipe">
  <div class="container-fluid">

  <div class="row">
    <div class="col">
      <h1 id="page-title">Create new recipe</h1>
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
        <div class="card-body">
          <div class="form-inline">
              <b-form-input type="number" size="20" placeholder="Amount" v-model="firstAmount"></b-form-input>
              <b-form-select class="form-select" aria-label="Unit" v-model="firstUnit" :id="key">
                <option value="pcs">pcs</option>
                <option value="grams">grams</option>
                <option value="kg">kg</option>
                <option value="ml">ml</option>
                <option value="dl">dl</option>
                <option value="l">l</option>
              </b-form-select>
              <b-form-input type="text" placeholder="Item" v-model="firstItem"></b-form-input>
            </div>
          <div v-for="key in count" :key="key">
            <div class="form-inline">
              <b-form-input type="number" size="20" placeholder="Amount" v-model="amounts['amount'+key]" :id="key"></b-form-input>
              <b-form-select class="form-select" aria-label="Unit" v-model="units['unit'+key]" :id="key">
                <option value="pcs">pcs</option>
                <option value="grams">grams</option>
                <option value="kg">kg</option>
                <option value="ml">ml</option>
                <option value="dl">dl</option>
                <option value="l">l</option>
              </b-form-select>
              <b-form-input type="text" placeholder="Item" v-model="items['item'+key]" :id="key"></b-form-input>
            </div>
          </div>
          <div class="d-flex justify-content-start">
            <b-button-group style="margin-top: 5px;">
              <b-button variant="info" class="menu-button"  @click="add">
                <b-icon icon="plus"></b-icon> Add item</b-button>
              <br>
              <b-button variant="danger" class="menu-button" @click="remove">
                <b-icon icon="x"></b-icon> Remove Item</b-button>
            </b-button-group>
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
      firstUnit: '',
      firstItem: '',
      recipeName: '',
      instructions: ''
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
        instruction: this.instructions
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
  .addRecipe {
    background-image: url("../assets/edit-recipe-background.jpg");
    background-size: cover;
    background-attachment: fixed;
    position: relative;
    min-height: 90vh;
    height: 120%;
    color: white;
  }

    #page-title {
    color: #fff;
    font-size: 50px;
    font-weight: bold;
    margin-top: 5%;
    margin-bottom: 2%;
    width: 100%;
    text-align: center;
  }

</style>
