<template>
<div class="addSL">
  <div class="container">
    <b-row>
      <h2 id="page-title">Create new shopping list</h2>
    </b-row>
    <div class="wrapper">
      <div class="d-flex justify-content-center">

      <b-col cols="8">
      <b-row aligh-h="center">
        <input class="input-simple" type="text" size="50" placeholder="Name" v-model="name">
      </b-row>
      <b-row aligh-h="center">
        <b-col>
          <input class="input-simple" type="number" size="50" placeholder="Week Number" v-model="week">
        </b-col>
        <b-col>
          <input class="input-simple" type="number" size="50" placeholder="Year" v-model="year">
        </b-col>
      </b-row>
    <br>
    <div>
       <b-row class="item-row" aligh-h="center" v-for="(item,index) in shoppingListItems" :key="index">
      <b-col>
        <b-form-input type="number" name="item" v-model="item.amount" class="form-control" placeholder="Amount"></b-form-input>
      </b-col>
      <b-col>
        <b-form-select type="text" name="unit" v-model="item.unit" class="form-control" placeholder="Unit">
          <option value="pcs">pcs</option>
          <option value="grams">grams</option>
          <option value="kg">kg</option>
          <option value="ml">ml</option>
          <option value="dl">dl</option>
          <option value="l">l</option>
        </b-form-select>
      </b-col>
      <b-col>
        <b-form-input type="text" name="amount" v-model="item.item" class="form-control" placeholder="Item"></b-form-input>
      </b-col>
      </b-row>
    </div>
    <div class="controls">
      <div class="d-flex justify-content-center">
       <b-button-group>
        <b-button variant="info" class="menu-button"  @click="add">
          <b-icon icon="plus"></b-icon> Add item</b-button>
        <br>
        <b-button variant="danger" class="menu-button" @click="remove">
          <b-icon icon="x"></b-icon> Remove Item</b-button>
       </b-button-group>
      </div>
    </div>
    <b-row align-h="center" align-v="baseline">
      <b-col cols="12">
        <b-button block variant="success" @click="saveList">Save list</b-button>
      </b-col>
    </b-row>
    </b-col>

  </div>
    </div>
  </div>
</div>
</template>

<script>

import { Api } from '@/Api'

export default {

  name: 'AddShoppingList',
  props: ['user'],
  data: function () {
    return {
      name: '',
      week: null,
      year: null,
      shoppingListItems: [{ item: '', unit: '', amount: null }, { item: '', unit: '', amount: null }],
      shoppingList: [],
      count: 2,
      isValid: true,
      unit: '',

      options: [
        { text: 'pcs', value: 'pcs' },
        { text: 'kg', value: 'kg' },
        { text: 'ml', value: 'ml' },
        { text: 'dl', value: 'dl' },
        { text: 'l', value: 'l' }
      ],
      //
      firstAmount: null,
      firstUnit: '',
      firstItem: '',
      amounts: {},
      // units: {},
      items: {},
      itemsObj: []
    }
  },
  methods: {
    add: function () {
      this.shoppingListItems.push({ amount: null, unit: '', item: '' })
      this.count++
    },
    remove: function () {
      if (this.shoppingListItems.length > 1) {
        this.shoppingListItems.pop()
        this.count--
      } else {
        alert('Warning: shopping list cannot have less than 1 item!')
      }
      this.count--
    },
    checkInput: function () {
      this.shoppingListItems.forEach(item => {
        if (item.amount !== null && item.unit !== '' && item.item !== '') {
          this.shoppingList.push(item)
        }
      })
      if (this.shoppingList.length < 1) {
        alert('Please add at least one item in your shopping list!')
        this.isValid = false
      } else if (this.name === '') {
        alert('Please give your shopping list a name!')
        this.isValid = false
      } else if (this.week === null || this.week <= 0) {
        alert('Please add a valid week number!')
        this.isValid = false
      } else if (this.year === null || this.year <= 0) {
        alert('Please add a valid year!')
        this.isValid = false
      } else {
        this.isValid = true
      }
    },
    saveList: function () {
      this.checkInput()
      console.log(this.isValid)
      if (this.isValid) {
        Api.post('/profiles/' + localStorage.id + '/shoppinglists', {
          profileId: localStorage.id,
          week: this.week,
          year: this.year,
          name: this.name,
          items: this.shoppingList
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.token
          }
        }).then(response => {
          if (response.status === 200 || response.status === 201) {
            alert('Shopping list was succesfully saved!')
            this.$router.push('/shoppingLists')
          }
        }).catch(error => {
          console.log('this ' + error.status)
          alert('Warning: Week ' + this.week + ' already has a shopping list!')
        })
      }
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
  #page-title {
    color: #fff;
    font-size: 50px;
    font-weight: bold;
    margin-top: 10%;
    margin-bottom: 2%;
    width: 100%;
    text-align: center;
  }

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

/* .btn {
    width: 50%;
    background: #3f51b5;
    color: white;
    border: 0;
    padding: 7px;
    border-radius: 5px;
} */

.wrapper {
  margin: 40px auto;
  margin-bottom: 40px;
  padding: 10px;
  border-radius: 5px;
  background: rgba(25, 25, 25, 0.641);
  box-shadow: 0px 10px 40px 0px rgba(47,47,47,.1);
}

.input-simple {
  padding: 5px;
  margin: 5px auto;
  display: block;
  border-radius: 5px;
  border: 1px solid lightgrey;
  width: 274px;
  color: black;
}

.item-row {
  margin: 5px auto;
}

input:focus {
  outline: none;
}

.controls {
  color: white;
  width: 294px;
  margin: 15px auto;
}
.menu-buttons {
  margin: 10px;
  color: white;
}

#remove_fields {
  float: right;
}
.controls a i.fa-minus {
  margin-right: 5px;
}

a {
  color: black;
  text-decoration: none;
}

</style>
