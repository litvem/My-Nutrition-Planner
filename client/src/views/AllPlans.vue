<template>
  <div class="AllPlans">
    <div id="container-main">
      <div class="left">
        <div class="title">
          <h1>My weekly plans</h1>
        </div>
        <div id="container-left">
         <div class="list">
          <b-row>
            <b-col cols="12" lg="6" sm="12" v-for="plan in plans.weeklyCalenders" v-bind:key="plan._id">
              <h5 v-on:click="goToWeeklyPlan()">Week {{plan.week}}  Year {{plan.year}}</h5>
            </b-col>
          </b-row>
        </div>
        <div class="buttons">
          <button class="add-btn" v-on:click="addPlan = !addPlan">Add new plan</button>
          <button class="delete-btn" v-on:click="deleteAllPlans">Delete all plans</button>
        </div>
        </div>
      </div>
      <div class="right">
        <div class="plan-form" v-if="addPlan">
          <label for="day-name" v-if="addPlan">Day: </label>
          <div class="name" v-if="addPlan">
            <b-form-select v-model="name" :options="options" v-if="addPlan"></b-form-select>
          </div>
          <label for="week-number" v-if="addPlan">Week number: </label>
          <b-form-input id="week" v-model="week" v-if="addPlan"/>
          <label for="year" v-if="addPlan">Year: </label>
          <b-form-input id="year" v-model="year" v-if="addPlan" />
          <button class="save-plan" v-on:click="savePlan" v-if="addPlan">Save</button>
        </div>
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
      plans: null,
      addPlan: false,
      name: 'none',
      options: [
        { value: 'none', text: 'Select day' },
        { value: 'Monday', text: 'Monday' },
        { value: 'Tuesday', text: 'Tuesday' },
        { value: 'Wednesday', text: 'Wednesday' },
        { value: 'Thursday', text: 'Thursday' },
        { value: 'Friday', text: 'Friday' },
        { value: 'Saturday', text: 'Saturday' },
        { value: 'Sunday', text: 'Sunday' }
      ]
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
        console.error(error)
      })
  },
  methods: {
    goToWeeklyPlan() {
      localStorage.setItem('week', this.plans.week)
      localStorage.setItem('year', this.plans.year)
      this.$router.push('/weeklyCalendar')
      this.$router.go()
    },
    savePlan() {
      if (this.name === 'none') {
        this.name = 'Monday'
      }

      Api.post('/profiles/' + localStorage.id + '/days', {
        year: this.year,
        week: this.week,
        name: this.name
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.token
        }
      })
        .then(response => {
          this.addPlan = false
          this.$router.go()
        })
        .catch(error => {
          console.error(error)
        })
    },
    deleteAllPlans() {
      Api.delete('/profiles/' + localStorage.id + '/days', {
        headers: {
          Authorization: 'Bearer ' + localStorage.token
        }
      })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          this.message = error
        })
      this.$router.go()
    }
  }
}
</script>

<style lang="scss" scoped>
  .AllPlans {
    background-image: url("../assets/all-plans-background.png");
    background-size: cover;
    background-attachment: fixed;
    position: relative;
    min-height: 60vh;
  }

  #container-main {
    min-height: 95vh;
    display: flex;
  }

  .left {
    width: 61%;
  }

  .right {
    width: 39%;
  }

  .plan-form{
    background-color: rgba(255, 255, 255, 0.468);
    margin-top: 57%;
    margin-left: 10%;
    margin-right: 10%;
    height: 40%;
    width: 80%;
    padding: 13px 20px;
    border-radius: 8px;
    display: inline-block;
    border: 0;
    outline: 0;
    box-shadow: 0px 4px 10px 0px #bcff0375;
  }
  .left .title {
    height: 100%;
    display: flex;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    padding: 5%;
  }

  .left .title {
    width: 100%;
    height: 40%;
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
    margin-top: 25%;
    margin-bottom: 1%;
    width: 100%;
  }

  #container-left {
    display: flex;
  }
  .list {
    width: 85%;
    min-height: 66vh;
    padding: 4%;
    padding-top: 1%;
    overflow: hidden;
    align-items: left;
    text-align: left;
  }

  .plan-form {
    color: rgb(71, 41, 2);
    font-size: 16px;
    font-weight: bold;
  }

  .buttons {
    width: 25%;
  }

  .add-btn {
    margin-top: 1.5em;
    margin-bottom: 0.7em;
    margin-right: 1em;
    margin-left: 1em;
    float: center;
    align-self: auto;
    color: black;
    font-size: 16px;
    padding: 12px 25px;
    border-radius: 50px;
    display: inline-block;
    border: 0;
    outline: 0;
    box-shadow: 0px 4px 10px 0px #d0fba08e;
    background-image: linear-gradient(135deg, #aef9744f 10%, #70a2047f 100%);
    &:hover {
    color: #fff;
    font-weight: bold;
    text-decoration: underline;
    box-shadow: 0px 4px 10px 0px #ebfbd985;
    background-image: linear-gradient(135deg, #88a40e89 10%, #3d5403ad 100%);
    }
  }

  .delete-btn {
    margin-top: 0.7em;
    margin-bottom: 0.7em;
    margin-right: 0;
    margin-left: 1em;
    float: center;
    align-self: auto;
    color: black;
    font-size: 16px;
    padding: 12px 25px;
    border-radius: 50px;
    display: inline-block;
    border: 0;
    outline: 0;
    box-shadow: 0px 4px 10px 0px #f9a3548e;
    background-image: linear-gradient(135deg, #f6b974ca 10%, #ff8000c7 100%);
  }

  .delete-btn:hover {
    color: #fff;
    font-weight: bold;
    text-decoration: underline;
    box-shadow: 0px 4px 10px 0px #fec7938e;
    background-image: linear-gradient(135deg, #bb6605ca 10%, #442201c7 100%);
  }

  .save-plan {
    margin-top: 0.7em;
    margin-bottom: 0.7em;
    margin-right: 0;
    margin-left: 1em;
    float: center;
    align-self: auto;
    color: black;
    font-size: 16px;
    padding: 12px 25px;
    border-radius: 50px;
    display: inline-block;
    border: 0;
    outline: 0;
    box-shadow: 0px 4px 10px 0px #85db0d8e;
    background-image: linear-gradient(135deg, #eff886a3 10%, #a6ff0080 100%);
  }

  .save-plan:hover {
    color: #fff;
    font-weight: bold;
    text-decoration: underline;
    box-shadow: 0px 4px 10px 0px #4324018e;
    background-image: linear-gradient(135deg, #9fad03a3 10%, #31490380 100%);
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
    box-shadow: 0px 4px 10px 0px #f7eca57c;
    background-image: linear-gradient(135deg, #fcf4035c 10%, #ffcd0449 100%);
  }

  h5:hover {
    color: rgb(66, 26, 1);
    text-decoration: underline;
    background-color: rgba(255, 152, 96, 0.345);
    box-shadow: 0px 4px 10px 0px #482601a0;
  }

  @media(max-width: 768px) {
    .list {
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
