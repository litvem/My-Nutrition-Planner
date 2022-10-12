<template>
    <div class="container-fluid" id="shoppingListView">
      <h2>Shopping lists</h2>
        <b-button v-on:click="goToAddShoppingList">Create Shopping List</b-button>
        <br>
        <b-button v-on:click="deleteShoppingLists()">Delete All</b-button>

      <br>
    <div class="card">
     <div class="card-body">
        <shopping-list-prev v-for="shoppingList in shoppingLists.shoppinglists"
        :key="shoppingList.name"
        :name="shoppingList.name" />
     </div>
   </div>
</div>

</template>

<script>
import ShoppingListPrev from '../components/ShoppingListPrev.vue'
import { Api } from '@/Api'

export default {
  name: 'shoppingList',
  components: {
    ShoppingListPrev
  },
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

        // if (response.data.message === 'Shoppinglist not found') {
        //   console.log('empty')
        // }

        // if (response.data.message)
        // console.log(Object.toString(response.data))
        // console.log(Object.toString(this.shoppingLists))
      })
      .catch(error => {
        console.log(error.response.status)
        if (error.response.status === 404) {
          console.log('404 error found')
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
