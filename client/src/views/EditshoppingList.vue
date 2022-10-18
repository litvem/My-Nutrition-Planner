<template>
<div class="editSL">
  <div class="container">
    <b-row>
      <h2 id="page-title">EDIT SHOPPING LIST</h2>
    </b-row>
    <br>
    <div class="d-flex justify-content-center">
          <b-button id="saleShoppingList-btn" class="menu-button" v-on:click="saveShoppingList()">
            <b-icon icon="check2"></b-icon> Save List</b-button>
          <br>
          <b-button class="cancel-btn" v-on:click="goToShoppingLists()">
            <b-icon icon="x-circle"></b-icon> Cancel</b-button>
        </div>
    <b-row>
      <b-col cols="9" lg="9" sm="12">
        <b-form-input :disabled="!editName" type="text" name="SLName" v-model="shoppinglist[0].name" class="form-control"></b-form-input>
      </b-col>
      <b-col cols="3" lg="3" sm="12">
        <b-button class="edit-btn" v-on:click="editName = true">
            <b-icon icon="pencil-square"></b-icon> Edit Name
        </b-button>
      </b-col>
    </b-row>
    <br>
    <div>
        <b-button class="edit-btn" v-on:click="editList = true">
            <b-icon icon="pencil-square"></b-icon> Edit List
        </b-button>
        <br>

    <b-row aligh-h="center" v-for="(item,index) in shoppinglist[0].items" :key="index">
      <b-col>
        <b-form-input :disabled="!editList" type="number" name="item" v-model="item.amount" class="form-control"></b-form-input>
      </b-col>
      <b-col>
        <b-form-select :disabled="!editList" type="text" name="unit" v-model="item.unit" class="form-control" placeholder="Unit">
          <option value="pcs">pcs</option>
          <option value="grams">grams</option>
          <option value="kg">kg</option>
          <option value="ml">ml</option>
          <option value="dl">dl</option>
          <option value="l">l</option>
        </b-form-select>
      </b-col>
      <b-col>
        <b-form-input :disabled="!editList" type="text" name="amount" v-model="item.item" class="form-control"></b-form-input>
      </b-col>
      </b-row>
      <div class="d-flex justify-content-center">
        <b-button id="add-btn" @click="add">
        <b-icon icon="plus"></b-icon> Add item</b-button>
        <br>
        <b-button class="cancel-btn" @click="remove">
        <b-icon icon="x"></b-icon> Remove Item</b-button>
      </div>
    </div>
 </div>
</div>

</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'edit-shopping-list',
  data() {
    return {
      shoppinglist: null,
      editName: false,
      editList: false,
      count: null,
      editedList: [],
      isValid: false
    }
  },

  beforeCreate() {
    Api.get('/profiles/' + localStorage.id + '/shoppingLists/' + this.$route.params.id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(response => {
        this.shoppinglist = response.data.shoppinglist
        this.count = this.shoppinglist.length
      })
  },
  methods: {
    add: function () {
      this.shoppinglist[0].items.push({ amount: null, unit: '', item: '' })
      this.count++
    },
    remove: function () {
      if (this.shoppinglist[0].items.length > 1) {
        this.shoppinglist[0].items.pop()
        this.count--
      } else {
        alert('Warning: shopping list cannot have less than 1 item!')
      }
    },
    goToShoppingLists() {
      this.$router.push('/shoppingLists')
    },
    checkInput: function () {
      if (this.editedList.length < 1) {
        alert('Please add at least one item in your shopping list!')
        this.isValid = false
      } else if (this.shoppinglist[0].name === '') {
        alert('Please give your shopping list a name!')
        this.isValid = false
      } else {
        this.isValid = true
      }
    },
    saveShoppingList() {
      if (this.editName === true && this.editList === false) {
        if (this.shoppinglist[0].name === '') {
          alert('Please give your shopping list a name!')
        } else {
          Api.put('/profiles/' + localStorage.id + '/shoppingLists/' + this.$route.params.id, {
            profileId: localStorage.id,
            name: this.shoppinglist[0].name,
            week: this.shoppinglist[0].week,
            day: this.shoppinglist[0].day,
            items: this.shoppinglist[0].items
          },
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          }).then(response => {
            if (response.status === 200) {
              alert('Shoppinglist name was edited with succes!')
              this.$router.push('/shoppingLists')
            }
          }).catch(error => {
            console.log(error)
            alert('Warning: Could not save shopping list.')
          })
        }
      } else if (this.editList === true) {
        this.shoppinglist.forEach(sl => {
          sl.items.forEach(item => {
            if (item.amount !== null && item.unit !== '' && item.item !== '') {
              this.editedList.push(item)
              console.log(this.editedList)
            }
          })
        })

        this.checkInput()

        if (this.isValid) {
          Api.patch('/profiles/' + localStorage.id + '/shoppingLists/' + this.$route.params.id, {
            profileId: localStorage.id,
            name: this.shoppinglist[0].name,
            week: this.shoppinglist[0].week,
            day: this.shoppinglist[0].day,
            items: this.editedList
          },
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          }).then(response => {
            if (response.status === 200) {
              alert('Shoppinglist was edited with succes!')
              this.$router.push('/shoppingLists')
            }
          })
        }
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.editSL {
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
    text-align: left;
    margin-top: 20%;
    margin-bottom: 2%;
    width: 100%;
    float: left;
  }

  #saleShoppingList-btn {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    margin-right: 1em;
    margin-left: 0.01em;
    float: center;
    color: rgb(1, 17, 0);
    font-size: 16px;
    padding: 10px 25px;
    border-radius: 50px;
    display: inline-block;
    border: 0;
    outline: 0;
    box-shadow: 0px 4px 20px 0px #9bfc8c84;
    background-image: linear-gradient(135deg, #bafcae 10%, #01a304cb 100%);
      &:hover {
      color: rgb(253, 253, 253);
      text-decoration: underline;
      font-weight: bold;
      background-image: linear-gradient(135deg, #04ff00 10%, #01450d 100%);
      box-shadow: 0px 4px 10px 0px #98ff79;
    }
  }

  .cancel-btn {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    margin-right: 1em;
    margin-left: 0.01em;
    float: center;
    color: rgb(42, 2, 2);
    font-size: 16px;
    padding: 10px 25px;
    border-radius: 50px;
    display: inline-block;
    border: 0;
    outline: 0;
    box-shadow: 0px 4px 20px 0px #ea4e4e84;
    background-image: linear-gradient(135deg, #fa9191 10%, #a31401cb 100%);
      &:hover {
      color: rgb(253, 253, 253);
      text-decoration: underline;
      font-weight: bold;
      background-image: linear-gradient(135deg, #ff0000 10%, #450901 100%);
      box-shadow: 0px 4px 10px 0px #ff7979;
    }
  }

  .edit-btn {
    margin-top: 0;
    margin-bottom: 0.5em;
    margin-right: 1em;
    margin-left: 0.01em;
    width: fit-content;
    float: center;
    color: rgb(42, 2, 2);
    font-size: 16px;
    padding: 10px 25px;
    border-radius: 50px;
    display: inline-block;
    border: 0;
    outline: 0;
    box-shadow: 0px 4px 20px 0px #eadd4e84;
    background-image: linear-gradient(135deg, #faf691 10%, #a39e01cb 100%);
      &:hover {
      color: rgb(253, 253, 253);
      text-decoration: underline;
      font-weight: bold;
      background-image: linear-gradient(135deg, #ffee00 10%, #454101 100%);
      box-shadow: 0px 4px 10px 0px #ffeb79;
    }
  }

  #add-btn {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    margin-right: 1em;
    margin-left: 0.01em;
    float: center;
    color: rgb(1, 17, 0);
    font-size: 16px;
    padding: 10px 25px;
    border-radius: 50px;
    display: inline-block;
    border: 0;
    outline: 0;
    box-shadow: 0px 4px 20px 0px #fce68c84;
    background-image: linear-gradient(135deg, #fce8ae 10%, #a37d01cb 100%);
      &:hover {
      color: rgb(253, 253, 253);
      text-decoration: underline;
      font-weight: bold;
      background-image: linear-gradient(135deg, #ffc800 10%, #453501 100%);
      box-shadow: 0px 4px 10px 0px #ffe979;
    }
  }
</style>
