<template>
  <div class="ShoppingListPage">
    <div class="box-form">
       <div class="title">
        <h1>{{SL.shoppinglists[0].name}}</h1>
      </div>
      <b-card>
        <b-row>
          <b-col id="items-list">
            <!-- will not save checked items after leaving page-->
            <div v-for="item in SL.shoppingList[0].items" :key="item">
              <b-form-checkbox
              >{{item.amount}} {{item.unit}}  {{item.item}}
              </b-form-checkbox>
            </div>
          </b-col>
        </b-row>
      </b-card>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'recipe-page',

  beforeCreate() {
    Api.get('/profiles/' + localStorage.id + '/shoppingLists/' + this.$route.params.id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(response => {
        console.log(response.data)
        this.SL = response.data
      })
      .catch(error => {
        console.log(error.message)
      })
  },
  data() {
    return {
      SL: null,
      year: '',
      weekNumber: ''
    }
  },
  methods: {
    editShoppingList() {

    },

    deleteShoppingList() {
      Api.delete('profiles/' + localStorage.id + '/shoppingLists/' + this.$route.params.id, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }).catch(error => {
        alert('Warning: ' + error)
      })
      this.$router.push('/shoppingLists')
      return this.$router.go()
    }
  }
}

</script>

<style scoped>
    .ShoppingListPage {
      background-image: url("../assets/SL-page.jpg");
      background-size: cover;
      background-attachment: fixed;
      position: relative;
      height: 110%;
    }

   #page-title {
    color: #fff;
    font-size: 50px;
    font-weight: bold;
    text-align: left;
    margin-top: 4%;
    margin-bottom: 2%;
    width: 100%;
    float: left;
  }

    .box-form{
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      padding: 4%;
      padding-bottom: 1%;
      overflow: hidden;
    }

    .edit-button {
        color: #fff;
        font-size: 15px;
        font-weight: bold;
        border-radius: 10px;
        display: inline-block;
        box-shadow: 0px 4px 10px 0px #a6fa94a6;
        background-image: linear-gradient(135deg, #70e68ecc 10%, #2c780377 100%);
    }

</style>
