<template>
    <div class="container-fluid" id="shoppingListView">
      <h2>Shopping lists</h2>
        <b-button v-on:click="goToAddShoppingList()">Create Shopping List</b-button>
        <br>
        <b-button v-on:click="deleteShoppingLists()">Delete All</b-button>

      <br>
    <b-card>
      <div v-for="shoppinglist in shoppinglists" :key="shoppinglist._id">
        <b-button v-b-toggle="'collapse' + shoppinglist._id">Week {{shoppinglist.week}}: {{shoppinglist.name}}</b-button>
        <b-collapse :id="'collapse' + shoppinglist._id">
          <b-card>
            <b-form-checkbox v-for="item in shoppinglist.items" :key="item._id">{{item.amount}} {{item.unit}} {{item.item}}</b-form-checkbox>
          </b-card>
        </b-collapse>
      </div>
    </b-card>
</div>

</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'shoppingList',
  data() {
    return {
      message: '',
      count: 0,
      shoppinglists: [],
      items: []
    }
  },
  beforeCreate() {
    Api.get('/profiles/' + localStorage.id + '/shoppinglists', {

      headers: {
        Authorization: 'Bearer ' + localStorage.token
      }
    })
      .then(response => {
        this.shoppinglists = response.data.shoppinglists
        // this.shoppinglists.forEach(sl => {

        // })
        console.log(this.shoppinglists)
        console.log(this.shoppinglists[0].items)
        // is needed for proper data binding since key in count starts from 1
        this.count = this.shoppinglists.length + 1
        // console.log(this.shoppinglists[0])
      })
      .catch(error => {
        console.log(error)
        if (error.response.status !== 'undefined' && error.response.status === 404) {
          console.log('404 error found')
          //    TODO add 404 page
          this.$router.push('/addShoppingList')
        }
      })
  },
  methods: {
    goToAddShoppingList() {
      this.$router.push('/addShoppingList')
    },
    goToSLPage(ID) {
      this.$router.push(`/shoppingLists/${ID}`)
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
