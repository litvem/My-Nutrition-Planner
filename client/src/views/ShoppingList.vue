<template>
    <div class="container-fluid" id="shoppingListView">
      <h2>Shopping lists</h2>
        <b-button v-on:click="goToAddShoppingList">Create Shopping List</b-button>
      <br>
    <div class="card">
     <div class="card-body">
     </div>
   </div>
    </div>
</template>

<script>

export default {
  name: 'shoppingList',
  setup() {
    return {
      shoppingLists: []

    }
  },
  methods: {
    goToAddShoppingList() {
      this.$router.push('/addShoppingList')
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
