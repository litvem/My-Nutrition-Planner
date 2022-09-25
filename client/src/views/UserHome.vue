<template>
  <div class="background">
    <div class="box-form">
      <div class="center">
        <div class="overlay">
          <h2>Home</h2>
          <div class="firstrow">
            <button class="btn" v-on:click="goToProfile">Profile</button>
            <button class="btn" v-on:click="goToWeeklyCalendar">Weekly Plan</button>
          </div>
          <div class="secondrow">
            <button class="btn" v-on:click="goToRecipes">Recipes</button>
            <button class="btn" v-on:click="goToShoppingList">Shopping List</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userHome',
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
