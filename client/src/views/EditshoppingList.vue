<template>
<div class="editSL">
  <div class="container">
    <b-row>
      <h2 id="page-title">EDIT SHOPPING LIST</h2>
    </b-row>
    <br>
    <b-row>
      <b-form-input type="text" name="SLName" v-model="shoppinglist[0].name" class="form-control"></b-form-input>
    </b-row>
    <br>
    <b-row v-for="item in shoppinglist[0].items" :key="item._id">
        <b-form-input type="number" name="item" v-model="item.amount" class="form-control"></b-form-input>
        <b-form-input type="text" name="unit" v-model="item.unit" class="form-control"></b-form-input>
        <b-form-input type="text" name="amount" v-model="item.item" class="form-control"></b-form-input>
    </b-row>
 </div>
</div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'edit-shopping-list',
  data() {
    return {
      shoppinglist: null
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
        this.shoppinglist.forEach(sl => {
          console.log(sl.name)
        })
      })
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
