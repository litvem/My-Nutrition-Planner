<template>
  <div class="container-fluid">
    <b-container class="top">
      <b-row>
        <h2 v-if="user"> {{user.username}}'s Home</h2>
        <h2 v-if="!user">You are not log in!</h2>
      </b-row>
      <b-row>
        <b-col>
          <button class="btn" v-on:click="goToProfile">Profile</button>
        </b-col>
        <b-col>
          <button class="btn" v-on:click="goToAddRecipe">Add recipe</button>
        </b-col>
        <b-col>
          <button class="btn" v-on:click="goToWeeklyCalendar">Weekly Plan</button>
        </b-col>
        <b-col>
          <button class="btn" v-on:click="goToShoppingList">Shopping List</button>
        </b-col>
      </b-row>
      <b-row>
        <h3>My favourite recipes</h3>
      </b-row>
      <b-row>
        <div v-for="recipe in recipes" v-bind:key="recipe._id">
          <p>{{recipe}}</p>
          <recipe-item v-bind:recipe="recipe" v-on:del-recipe="deleteRecipe"/>
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { Api } from '@/Api'
export default {
  name: 'userHome',
  data() {
    return {
      user: null
    }
  },
  create() {
    const response = Api.get('user', {
      Headers: {
        Authorization: 'Bearer' + localStorage.getItem('token')
      }
    })
    console.log(response)
  },
  methods: {
    goToProfile() {
      this.$router.push('/profile')
    },
    goToRecipes() {
      this.$router.push('/recipes')
    },
    goToWeeklyCalendar() {
      this.$router.push('/weeklyCalendar')
    },
    goToShoppingList() {
      this.$router.push('/shoppingList')
    }
  }
}
</script>

<style scoped>
  .h2 {
    margin-top: 40%;
  }
  .btn {
    margin-bottom: 2em;
    margin-right: 2em;
  }
  .box-form {
    margin: 0 auto;
    width: 100%;
    height: 100%;
    background: #FFFFFF;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex: 1;
    align-items: normal;
    justify-content: space-between;
    box-shadow: 0 0 20px 6px #090b6f85;
  }
  @media (max-width: 900px) {
  .box-form {
    flex-flow: wrap;
    text-align: center;
    align-content: center;
    align-items: center;
    }
  }
  .box-form div {
    height: auto;
  }
  .box-form .center {
    color: #FFFFFF;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url("https://images.unsplash.com/photo-1521986329282-0436c1f1e212?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80");
    overflow: hidden;
  }
  .box-form .center .overlay {
    padding: 30px;
    width: 100%;
    height: 100%;
    background: #9697fcad;
    overflow: hidden;
    box-sizing: border-box;
  }
  .box-form .center .overlay h2 {
    font-size: 5vmax;
    line-height: 1;
    font-weight: 700;
    margin-top: 20px;
    margin-bottom: 40px;
    text-align: center;
  }

  .box-form .btn {
    float: center;
    color: #fff;
    font-size: 16px;
    padding: 12px 35px;
    border-radius: 50px;
    display: inline-block;
    border: 0;
    outline: 0;
    box-shadow: 0px 4px 20px 0px #285fc6a6;
    background-image: linear-gradient(135deg, #7b70f5 10%, #285fc6a6 100%);
  }

</style>
