<template>
    <div class="container-fluid" id="shoppingListView">
      <h2>Shopping lists</h2>
        <b-button v-on:click="goToAddShoppingList()">Create Shopping List</b-button>
        <br>
        <b-button v-on:click="deleteShoppingLists()">Delete All</b-button>

      <br>
    <div class="card">
     <div class="card-body">
        <b-card v-for="shoppingList in shoppingLists.shoppinglists"
        :key="shoppingList"
         >
           <p>{{shoppingList.name}}</p>
           <p>Year: {{shoppingList.year}} Week: {{shoppingList.week}}</p>

        </b-card>
     </div>
   </div>
</div>

</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'shoppingList',

  data() {
    return {
      message: '',
      shoppingLists: null
    }
  },
  beforeCreate() {
    Api.get('/profiles/' + localStorage.id + '/shoppinglists', {

      headers: {
        Authorization: 'Bearer ' + localStorage.token
      }
    })
      .then(response => {
        this.shoppingLists = response.data
        console.log(response.data.message)
      })
      .catch(error => {
        console.log(error.response.status)
        if (error.response.status === 404) {
          console.log('404 error found')
          // TODO add 404 page
          this.$router.push('/addShoppingList')
        }
      })
  },
  methods: {
    goToAddShoppingList() {
      this.$router.push('/addShoppingList')
    },
    deleteShoppingLists() {
      Api.delete('/profiles/' + localStorage.id + '/shoppingLists', {
        headers: {
          Authorization: 'Bearer ' + localStorage.token
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
  #shoppingListView{
    background-image: url('https://img.freepik.com/free-photo/condiments-prepare-italian-pasta_1220-429.jpg?w=996&t=st=1664979691~exp=1664980291~hmac=3f8d79f6fc3ee5a911438a9d9514716e6021d1956446eb0a438fcdce8088ec3d');
    background-size: cover;
  }
</style>
