<template>
    <div class="AllPlans">
      <div class="box-form">
        <div class="title">
          <h1>My weekly plans</h1>
        </div>
        <div class="list">
          <b-row>
            <b-col cols="12" lg="6" sm="12" v-for="plan in plans.weeklyCalenders" v-bind:key="plan._id">
              <h5 v-on:click="goToWeeklyPlan()">Week {{plan.week}}  Year {{plan.year}}</h5>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
  </template>

<script>
import { Api } from '@/Api'
export default {
  name: 'allPlans',
  data() {
    return {
      plans: null
    }
  },
  mounted() {
    Api.get('/profiles/' + localStorage.id + '/days?weekcalenders=true', {
      headers: {
        Authorization: 'Bearer ' + localStorage.token
      }
    })
      .then(response => {
        console.log(response.data)
        this.plans = response.data
      })
      .catch(error => {
        this.message = error.message
      })
    if (this.message === 'Request failed with status code 404') {
      this.havePlans = 1
    }
  },
  methods: {
    goToWeeklyPlan() {
      localStorage.setItem('week', this.plans.week)
      localStorage.setItem('year', this.plans.year)
      this.$router.push('/weeklyCalendar')
      this.$router.go()
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
    min-height: 66vh;
    padding: 4%;
    padding-top: 1%;
    overflow: hidden;
    align-items: left;
    text-align: left;
  }

  h5 {
  margin-top: 0.7em;
  margin-bottom: 0.7em;
  margin-right: 0;
  margin-left: 0;
  float: center;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  padding: 12px 40px;
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
    }

    .box-form .list {
      width: 100%;
      min-height: 60vh;
      text-align: center;
    }

    .title h1 {
      text-align: center;
      margin-top: 40%;
      font-size: 35px;
    }

    h5 {
      width: 70%;
      text-align: center;
      margin-left: 5%;
    }
  }
  </style>
