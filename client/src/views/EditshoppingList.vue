<template>
<div class="editSL">
  <div class="container">
    <b-row>
      <h2 id="page-title">EDIT SHOPPING LIST</h2>
    </b-row>
    <br>
    <div class="d-flex justify-content-center">
          <b-button variant="success" class="menu-button" v-on:click="saveShoppingList()">
            <b-icon icon="check2"></b-icon> Save List</b-button>
          <br>
          <b-button variant="danger" class="menu-button" v-on:click="goToShoppingLists()">
            <b-icon icon="x-circle"></b-icon>Cancel</b-button>
        </div>
    <b-row>
      <b-col cols="10">
        <b-form-input :disabled="!editName" type="text" name="SLName" v-model="shoppinglist[0].name" class="form-control"></b-form-input>
      </b-col>
      <b-col cols="2">
        <b-button variant="primary" v-on:click="editName = true">
            <b-icon icon="pencil-square"></b-icon> Edit Name
        </b-button>
      </b-col>
    </b-row>
    <br>
    <div>
        <b-button variant="primary" v-on:click="editList = true">
            <b-icon icon="pencil-square"></b-icon> Edit List
        </b-button>
        <br>

    <b-row aligh-h="center" v-for="item in shoppinglist[0].items" :key="item._id">
      <b-col>
        <b-form-input :disabled="!editList" type="number" name="item" v-model="item.amount" class="form-control"></b-form-input>
      </b-col>
      <b-col>
        <b-form-input :disabled="!editList" type="text" name="unit" v-model="item.unit" class="form-control"></b-form-input>
      </b-col>
      <b-col>
        <b-form-input :disabled="!editList" type="text" name="amount" v-model="item.item" class="form-control"></b-form-input>
      </b-col>
      </b-row>
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
      editList: false
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
        this.shoppinglist.forEach(sl => {
          console.log(sl.name)
        })
      })
  },
  methods: {
    goToShoppingLists() {
      this.$router.push('/shoppingLists')
    },
    saveShoppingList() {
      if (this.editName === true && this.editList === false) {
        Api.put('/profiles/' + localStorage.id + '/shoppingLists/' + this.$route.params.id, {
          shoppinglist: this.shoppinglist
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        // TODO catch
      } else if (this.editList === true) {
        for (let i = 0; i < this.count; i++) {
          if (this.shoppinglist[0].items.amount <= 0 && this.shoppinglist[0].items.unit === '' && this.shoppinglist[0].items.item === '') {
            // TODO remove null item
          }
        }
        // TODO check if array has elements
        Api.patch('/profiles/' + localStorage.id + '/shoppingLists/' + this.$route.params.id, {
          profileId: localStorage.id,
          shoppinglist: this.shoppinglist
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.editSL {
    background-image: url("../assets/shopping-lists-background.jpg");
    background-size: cover;
    background-attachment: fixed;
    position: relative;
    height: 200%;
  }
</style>
