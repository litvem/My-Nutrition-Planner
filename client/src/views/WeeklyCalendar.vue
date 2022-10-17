<template>
  <div class="weeklyCal">
    <div class="row">
      <div class="title sm">
        <h1>Weekly plan</h1>
      </div>
      <div class="form-body sm">
        <div class="form-holder sm">
          <div class="form-content sm">
            <div class="form-items sm" v-if="user">
              <div class="editWeeks row-sm-3 d-flex flex-row mt-2 mb-2 align-items-center gap-2">
                <label for="week">Week: </label>
                <input class="form-control" type="text" v-if="!editWeek" :disabled="!editWeek" :class="{view: !editWeek}" :value="4">
                <input type="text" v-if="editWeek" v-model="week" id="thisWeek" name="week" class="form-control"/>
                <button class="btn edit-btn btn-sm" @click="editWeek = !editWeek" v-if="!editWeek">Edit</button>
              </div>
              <div class="ediWrrks col-sm-3 d-flex flex-row mt-2 mb-2 ml-5 align-items-center gap-2" v-if="editWeek">
                <button class="btn save-btn btn-sm " @click="changeWeek">Save</button>
                <button class="btn cancel-btn btn-sm"  @click="editWeek=false">Cancel</button>
              </div>
            </div>
            <div class="form-items sm" v-if="user">
              <div class="editWeeks row-sm-3 d-flex flex-row mt-2 mb-2 align-items-center gap-2">
                <label for="week">Year: </label>
                <input class="form-control" type="text" v-if="!editWeek" :disabled="!editWeek" :class="{view: !editWeek}" :value="4">
                <input type="text" v-if="editWeek" v-model="week" id="thisWeek" name="week" class="form-control"/>
                <button class="btn edit-btn btn-sm" @click="editWeek = !editWeek" v-if="!editWeek">Edit</button>
              </div>
              <div class="editWeeks col-sm-12 d-flex flex-row mt-2 mb-2 ml-5 align-items-center gap-2" v-if="editWeek">
                <button class="btn save-btn btn-sm " @click="changeWeek">Save</button>
                <button class="btn cancel-btn btn-sm"  @click="editWeek=false">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="calendar md">
        <div class="weekDays md">
          <div class="day mon ">
            <div class="day-week">
<!---------------MÅNDAG----------->
              <p class="dayName ">Mon</p>
            </div>
            <div class="events">
              <div class="event start-10 end-12 recipeCard">
                <p class="recipe">Recipe1</p>
              </div>
            </div>
          </div>
<!---------------TISDAG----------->
          <div class="day tues">
            <div class="day-week">
              <p class="dayName">Tues</p>
            </div>
            <div class="events">
              <div class="event start-10 end-12 recipeCard">
                <p class="recipe">Potatos with meatballs and ketchup and testing the width of the card event </p>
              </div>
            </div>
          </div>
<!---------------ONSDAG----------->
          <div class="day wed">
            <div class="day-week">
              <p class="dayName">Wed</p>
            </div>
            <div class="events">
              <div class="event start-10 end-12 recipeCard">
                <p class="recipe">Recipe1</p>
              </div>
            </div>
          </div>
<!---------------TORSDAG----------->
          <div class="day thurs">
            <div class="day-week">
              <p class="dayName">Thurs</p>
            </div>
            <div class="events">
              <div class="event start-10 end-12 recipeCard">
                <p class="recipe">Recipe1</p>
              </div>
            </div>
          </div>
<!---------------FREDAG----------->
          <div class="day thurs">
            <div class="day-week">
              <p class="dayName">Fri</p>
            </div>
            <div class="events">
              <div class="event start-10 end-12 recipeCard">
                <p class="recipe">Recipe1</p>
              </div>
              <div class="event start-10 end-12 recipeCard">
                <p class="recipe">Recipe1</p>
              </div>
            </div>
          </div>
<!---------------LORDAG----------->
          <div class="day thurs">
            <div class="day-week">
              <p class="dayName">Sat</p>
            </div>
            <div class="events">
              <div class="event start-10 end-12 recipeCard">
                <p class="recipe">Recipe1</p>
              </div>
            </div>
          </div>
<!---------------SÖNDAG----------->
          <div class="day thurs">
            <div class="day-week">
              <p class="dayName">Sun</p>
            </div>
            <div class="events">
              <div class="event start-10 end-12 recipeCard">
                <p class="recipe">Recipe1</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
              <!-- testing if it works
              <div class="loginAgain" v-if="!user">
              <h1> Please login again</h1>
            </div> -->
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'profile',
  props: ['user'],
  data() {
    return {
      editWeek: false,
      editYear: false,
      days: [],
      recipes: [],
      week: '',
      year: ''
    }
  },
  mounted() {
    if (localStorage.getItem('week') === null || localStorage.getItem('year') === null) {
      this.$router.push('/allPlans')
    } else {
      Api.get('/profiles/' + localStorage.id + '/days?week=' + localStorage.week + '&year=' + localStorage.week, {
        headers: {
          Authorization: 'Bearer ' + localStorage.token
        }
      })
        .then(response => {
          console.log(response.data)
          this.days = response.data.days
        })
        .catch(error => {
          console.error(error)
        })
    }
  },
  methods: {
    changeWeek() {
      console.log(this.week)
      this.editWeek = false
    }
  }
}
</script>

<style lang='scss' scoped>
*, body {
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
.weeklyCal {
   background-image: url("../assets/weekDays.jpg");
  background-size: cover;
  background-attachment: fixed;
  position: relative;
  width: 100%;
  min-height: 98vh;
  overflow: hidden;
}
.row{
  margin-top:10%;
  .title{
  margin-left: 5%;
    h1{
    color: #ffffff;
    font-size: 4em;
    font-weight: bold;
    }
  }
}
// BUTTONS LAYOUT
.form-holder {
    position: relative;
    text-align: center;
    display: contents;
    justify-content: center;
    align-items: center;
    padding: 1px; // increasing moved the content up and down
    right: 10%; // media remove
    flex-direction:column ;
  }

  .form-holder .form-content {
    position: relative;
    text-align: center;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-align-items: center;
    align-items: center;
    margin-top: 2%;
    padding: 10px;
    flex-direction:row ;

  .form-items {
   // border: 3px solid #fff;
    flex-direction: column;
    padding: 1px;
    display: inline-block;
    width: 100%;
    min-width: 300px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
   // border-radius: 10px;
    text-align: left;
    -webkit-transition: all 0.4s ease;
    transition: all 0.4s ease;
  }

label{
  color: #fff;
  font-size: 1.5em;
  margin-right: 2%;
  margin-left:10%;
}
.form-control{
  width: 15%;
}
.edit-btn, .save-btn {
  float: center;
  color: #fff;
  padding: 8px 16px;
  display: inline-block;
  border: 1;
  border-radius: 10px;
  border-color: #97a109a7;
  outline: 0;
  box-shadow: 0px 4px 20px 0px #a6fa94a6;
  background-image: linear-gradient(135deg, #4fc96e 10%, #036920c8 100%);
  }
  .cancel-btn {
    float: center;
    color: #fff;
    padding: 8px 16px;
    display: inline-block;
    border: 1;
    border-radius: 10px;
    border-color: #97a109a7;
    outline: 0;
    box-shadow: 0px 4px 20px 0px #ff90b5a6;
    background-image: linear-gradient(135deg, #d25f5f 10%, #d60404c8 100%);
  }
}
// CALENDER LAYOUT
.row .calendar {
  display: grid;
  grid-template-columns: auto 1fr;
  margin: 2rem;
  max-width: 95%;
  .weekDays {
    display: grid;
    grid-column: 2;
    gap: 5px;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
  .day-week {
    display: flex;
    gap: 1em;
  }
  .dayName {
    color: #ffffff;
    margin-left: 15%;
    display: inline;
    font-size: 3rem;
    font-weight: bold;
  }
  .events {
    display: grid;
    border-radius: 5px;
  }

  .event {
    border: 3px solid #0f8a13;
    border-radius: 5px;
    padding: 0.5rem;
    margin: 0 0.8rem;
    margin-top:5%;
    background: rgba(254, 254, 254, 0.38);
  }

  .recipe {
    color: rgb(0, 0, 0);
    text-align: center;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
}

.space,
.day-week {
  height: 60px
}

/* .recipeCard {
  background: #ffffffb4;
} */

@media(max-width: 768px) {

  .row{
    margin-top:18%;
    width: 100%;
    .title{
      margin-left: 20%;
    }
  }
  .form-holder {
    position: absolute;
/*     top: 5%; */
    right: 0%; // media remove
  }
  .form-holder .form-items {
    padding: 10px;
    display: inline-block;
    width: 100%;
    max-width: 200px;
    text-align: center;
    -webkit-transition: all 0.4s ease;
    transition: all 0.4s ease;
    flex-direction: column;
  }
.form-holder .form-content .form-control{
  width: 30%;
}
.form-holder .form-content .form-control .save-btn {
  width: 20%;
}
.form-holder .form-content .form-control .canel-btn {
    width: 20%;
}

.row .calendar{
  display: grid;
  margin: inherit;
  margin-top: 2%;
  .weekDays {
    display: block;
    .dayName{
      margin-left: 20%;; // CHANGE TEXT g
    }
  }
  .events{
 /*    padding-block: 2px; */
    max-width: 90%;
/*     justify-content: center; */
    margin-left: 10%;
    text-justify: center;

  }
}

}

</style>
