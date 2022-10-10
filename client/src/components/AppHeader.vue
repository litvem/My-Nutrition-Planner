<template>
  <div id="nav">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">MyNutritionPlanner</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
             <b-nav-item href="#" v-on:click="goToRecipes">Recipes</b-nav-item>
             <b-nav-item href="#">Weekly Plan</b-nav-item>
             <b-nav-item href="#" >Shopping List</b-nav-item>
          </b-navbar-nav>
          <b-nav-item-dropdown text="Profile" right>
             <b-dropdown-item href="#">Log Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-collapse>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'app-h'
}
</script>

<style>

</style>
