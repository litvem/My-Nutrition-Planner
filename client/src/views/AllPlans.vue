<template>
    <div class="AllPlans">
      <div class="box-form">
        <div class="title">
          <h1>My weekly plans</h1>
        </div>
        <div class="list">
          <b-row>
          <b-col cols="12" lg="6" sm="12" v-for="plan in plans" v-bind:key="plan.name">
            <h5 v-on:click="goToWeeklyPlan()" v-bind="plan">{{plan.name}}</h5>
          </b-col>
          </b-row>
        </div>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'allPlans',
  data() {
    return {
      plans: [
        { name: 'Weekly plan 1' },
        { name: 'Weekly plan 2' },
        { name: 'Weekly plan 3' },
        { name: 'Weekly plan 4' },
        { name: 'Weekly plan 5' }
      ]
    }
  }
}
</script>

<style scoped>
  .AllPlans {
    background-image: url("../assets/all-plans-background.png");
    background-size: cover;
    background-attachment: fixed;
    position: relative;
    height: 110%;
  }

  .box-form .title {
    height: 100%;
    display: flex;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
  }

  .box-form .title {
    width: 100%;
    height: 100%;
    padding: 4%;
    padding-bottom: 1%;
    overflow: hidden;
    align-items: center;
    text-align: center;
  }

  h1 {
    color: #fff;
    text-transform: uppercase;
    font-size: 50px;
    font-weight: bold;
    text-align: left;
    margin-top: 13%;
    margin-bottom: 1%;
    width: 100%;
  }

  .box-form .list {
    width: 50%;
    min-height: 50vh;
    padding: 4%;
    padding-top: 1%;
    overflow: hidden;
    align-items: left;
    text-align: left;
  }

  h5 {
  margin-top: 0.7em;
  margin-bottom: 0.7em;
  margin-right: 1em;
  margin-left: 0;
  float: center;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  padding: 12px 50px;
  border-radius: 8px;
  display: inline-block;
  border: 0;
  outline: 0;
  box-shadow: 0px 4px 10px 0px #ddc20f7c;
  background-image: linear-gradient(135deg, #fcf40398 10%, #ffcd046c 100%);
}

h5:hover {
    color: rgb(66, 26, 1);
    text-decoration: underline;
    background-color: rgba(255, 152, 96, 0.584);
    box-shadow: 0px 4px 10px 0px #ff8400e7;
  }

  @media(max-width: 768px) {
    .box-form {
      width: 100%;
      z-index: 1;
      justify-content: center;
      align-items: center;
    }
    .box-form .title {
      width: 100%;
      align-items: center;
      margin-right: 5%;
    }

    .box-form .list {
      width: 100%;
      margin-right: 10%;
      min-height: 70vh;
    }

    .title h1 {
      margin-top: 25%;
      font-size: 35px;
    }

    h5 {
      width: 70%;
      text-align: center;
    }
  }
  </style>
