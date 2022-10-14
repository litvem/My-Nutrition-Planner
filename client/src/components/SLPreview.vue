<template>
  <div class="card-body">
    <b-card v-for="shoppingList in shoppingLists.shoppinglists"
    :key="shoppingList"
    >
        <a href="#" @click="goToSLPage()">{{shoppingList.name}}</a>
        <div>Year: {{shoppingList.year}} Week: {{shoppingList.week}}</div>

    </b-card>
  </div>
</template>

<script>
export default {
  name: 'SLPreview',
  props: ['shoppingList'],
  data() {
    return {
      count: null
    }
  },
  beforeCreate() {
  },
  methods: {
    goToSLPage() {
      this.$router.push(`/shoppingLists/${this.shoppingList._id}`)
    }
  }
}
</script>

<style scoped>

</style>
