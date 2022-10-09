<template>
<div>
  <h2>Create new shopping list</h2>
  <div class="wrapper">
    <input type="text" size="50" placeholder="Name" v-model="name">
    <br>
    <div>
      <div class="form-inline">
        <input type="number" placeholder="Amount" v-model="firstAmount">
        <input type="text" placeholder="Unit" v-model="firstUnit">
        <input type="text" placeholder="Item" v-model="firstItem">
      </div>
      <div v-for="key in count" :key="key">
        <div class="form-inline">
          <input type="number" size="50" placeholder="Amount" v-model="amounts['amount'+key]" :id="key">
          <input type="text" size="25" placeholder="Unit" v-model="units['unit'+key]" :id="key">
          <input type="text" size="50" placeholder="Item" v-model="items['item'+key]" :id="key">
        </div>
      </div>

    </div>
    <div class="controls">
      <a href="#" id="add_more_fields" @click="add"><i class="fa fa-plus"></i> Add Item</a>
      <a href="#" id="remove_fields"  @click="remove"><i class="fa fa-plus"></i> Remove Item</a>
    </div>
    <button class="btn" @click="saveList">Save list</button>
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
      count: 1,
      amounts: {},
      units: {},
      items: {},
      itemsObj: []
    }
  },
  methods: {
    add: function () {
      this.count++
    },
    remove: function () {
      this.count--
    },
    saveList: function () {
      const itemKey = Object.keys(this.items)
      const unitKey = Object.keys(this.units)
      const amKey = Object.keys(this.amounts)

      this.itemsObj.push({ amount: this.firstAmount, unit: this.firstUnit, item: this.firstItem })

      for (let i = 0; i < this.count; i++) {
        this.itemsObj.push({ amount: this.amounts[amKey[i]], unit: this.units[unitKey[i]], item: this.items[itemKey[i]] })
      }
      // console.log(this.user.id)
      console.log(localStorage.id)
      Api.post('/profiles/' + localStorage.id + '/shoppinglists', {
        name: this.name,
        items: this.itemsObj
      }).catch(error => {
        this.message = error
        alert('Warning: Shopping list was not created!' + error)
      })
      if (this.message === null) {
        alert('Shopping list was succesfully saved!')
      }
    }
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.btn {
    width: 50%;
    background: #3f51b5;
    color: white;
    border: 0;
    padding: 7px;
    border-radius: 5px;
}

.wrapper {
  margin: 40px auto;
  padding: 10px;
  border-radius: 5px;
  background: white;
  box-shadow: 0px 10px 40px 0px rgba(47,47,47,.1);
}

input[type="text"]{
  padding: 10px;
  margin: 10px auto;
  display: block;
  border-radius: 5px;
  border: 1px solid lightgrey;
  background: none;
  width: 274px;
  color: black;
}

input[type="text"]:focus {
  outline: none;
}

.controls {
  width: 294px;
  margin: 15px auto;
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
