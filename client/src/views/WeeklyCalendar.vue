<template>
  <div class="weeklyCal">
    <div class="row">
      <div class="title sm">
        <h1>Weekly plan</h1>
      </div>
      <div class="form-body sm">
        <div class="form-holder sm">
          <div class="form-content sm">
            <!-- EDIT YEAR -->
            <div class="form-items sm" v-if="user">
              <div class="editWeeks row-sm-3 d-flex flex-row mt-2 mb-2 align-items-center gap-2">
                <label id="week" for="week">Week: </label>
                <input class="form-control" type="text" v-if="!editWeek" :disabled="!editWeek" :class="{view: !editWeek}" :value="this.$route.params.week">
                <input type="text" v-if="editWeek" v-model="week" id="thisWeek" name="week" class="form-control"/>
                <button class="btn edit-btn btn-sm" @click="editWeek = !editWeek" v-if="!editWeek">Edit</button>
              </div>
              <div class="ediWrrks col-sm-3 d-flex flex-row mt-2 mb-2 ml-5 align-items-center gap-2" v-if="editWeek">
                <button class="btn save-btn btn-sm " @click="changeWeek()">Save</button>
                <button class="btn cancel-btn btn-sm"  @click="editWeek=false">Cancel</button>
              </div>
            </div>
            <!-- EDIT YEAR -->
            <div class="form-items sm" v-if="user">
              <div class="editWeeks row-sm-3 d-flex flex-row mt-2 mb-2 ml-2 align-items-center gap-2">
                <label id="year" for="Year"> Year: </label>
                <input class="form-control" type="text" v-if="!editYear" :disabled="!editYear" :class="{view: !editYear}" :value="this.$route.params.year">
                <input type="text" v-if="editYear" v-model="year" id="thisYear" name="year" class="form-control"/>
                <button class="btn edit-btn btn-sm" @click="editYear = !editYear" v-if="!editYear">&nbsp;Edit</button>
              </div>
              <div class="editWeeks col-sm-12 d-flex flex-row mt-2 mb-2 ml-5 align-items-center gap-2" v-if="editYear">
                <button class="btn save-btn btn-sm " @click="changeYear()">Save</button>
                <button class="btn cancel-btn btn-sm"  @click="editYear=!editYear">Cancel</button>
              </div>
            </div>
          </div>
                      <!--alert if week if less that 0 and greater that 52-->
          <div class="alert alert-warning d-flex align-items-center" :show="dismissCountDown" variant="success" @dismissed="dismissCountDown=0"
          @dismiss-count-down="countDownChanged" role="alert" v-if="weekOutsideOfRange">
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
              The week number should be greater that 0 and less than 52.
          </div>
      <!--alert if year is less that current and greater that next year-->
          <div class="alert alert-warning d-flex align-items-center" :show="dismissCountDown"  variant="success" @dismissed="dismissCountDown=0"
          @dismiss-count-down="countDownChanged" role="alert" v-if="yearLessThanCurrent">
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
              Select between current or next year.
          </div>
      <!--alert if weekly calendar already exists-->
          <div class="alert alert-warning d-flex align-items-center" :show="dismissCountDown" variant="success" @dismissed="dismissCountDown=0"
          @dismiss-count-down="countDownChanged"  role="alert" v-if="weekCalExist">
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
              Weekly plan for selected week already exists.
          </div>
        </div>
      </div>
      <div class="calendar sm">
        <div class="weekDays ">
<!---------------MÅNDAG----------->
          <div class="day" >
            <div class="day-week">
              <p class="dayName ">Mon</p>
            </div>
             <div class="daysRecipe"  v-if="mondayRecipes.length > 0">
              <div class="events" v-for="monRecipes in mondayRecipes" v-bind:key="monRecipes._id">
                <div class="event start-10 end-12 recipeCard container">
                  <b-row align-h="start" align-v="center">
                    <b-col cols="1">
                      <b-icon icon="trash"></b-icon>
                    </b-col>
                    <b-col align-h="start">
                      <p class="recipe">{{monRecipes.name}}</p>
                    </b-col>
                  </b-row>
                  </div>
                </div>
              </div>
            </div>
<!---------------TISDAG----------->
            <div class="day">
              <div class="day-week">
                <p class="dayName">Tues</p>
              </div>
               <div class="daysRecipe"  v-if="tuesdayRecipes.length > 0">
                <div class="events" v-for="tuesRecipes in tuesdayRecipes" v-bind:key="tuesRecipes._id">
                  <div class="event start-10 end-12 recipeCard container">
                    <b-row align-h="start">
                      <b-col cols="1">
                        <b-icon icon="trash"></b-icon>
                      </b-col>
                      <b-col>
                        <p class="recipe">{{tuesRecipes.name}} </p>
                      </b-col>
                    </b-row>
                  </div>
                </div>
              </div>
            </div>
<!---------------ONSDAG----------->
          <div class="day">
            <div class="day-week">
              <p class="dayName">Wed</p>
            </div>
             <div class="daysRecipe"  v-if="wednesdayRecipes.length > 0">
                <div class="events" v-for="wedRecipes in wednesdayRecipes" v-bind:key="wedRecipes._id">
                  <div class="event start-10 end-12 recipeCard container">
                    <b-row align-h="start">
                      <b-col cols="1">
                        <b-icon icon="trash"></b-icon>
                      </b-col>
                      <b-col>
                        <p class="recipe">{{wedRecipes.name}} </p>
                      </b-col>
                    </b-row>
                  </div>
                </div>
              </div>
            </div>
<!---------------TORSDAG----------->
          <div class="day">
            <div class="day-week">
              <p class="dayName">Thurs</p>
            </div>
             <div class="daysRecipe"  v-if="thursdayRecipes.length > 0">
                <div class="events" v-for="thursRecipes in thursdayRecipes" v-bind:key="thursRecipes._id">
                  <div class="event start-10 end-12 recipeCard container">
                    <b-row align-h="start">
                      <b-col cols="1">
                        <b-icon icon="trash"></b-icon>
                      </b-col>
                      <b-col>
                        <p class="recipe">{{thursRecipes.name}} </p>
                      </b-col>
                    </b-row>
                  </div>
                </div>
              </div>
            </div>
<!---------------FREDAG----------->
          <div class="day">
            <div class="day-week">
              <p class="dayName">Fri</p>
            </div>
            <div class="daysRecipe" v-if="fridayRecipes.length > 0">
              <div class="events" v-for="friRecipes in fridayRecipes" v-bind:key="friRecipes._id">
                <div class="event start-10 end-12 recipeCard container">
                  <b-row align-h="start">
                    <b-col cols="1">
                      <b-icon icon="trash"></b-icon>
                    </b-col>
                    <b-col>
                      <p class="recipe">{{friRecipes.name}} </p>
                    </b-col>
                  </b-row>
                </div>
              </div>
            </div>
          </div>
<!---------------LORDAG----------->
          <div class="day">
            <div class="day-week">
              <p class="dayName">Sat</p>
            </div>
              <div class="daysRecipe" v-if="saturdayRecipes.length > 0">
                <div class="events" v-for="satRecipes in saturdayRecipes" v-bind:key="satRecipes._id">
                  <div class="event start-10 end-12 recipeCard container">
                    <b-row align-h="start">
                      <b-col cols="1">
                        <b-icon icon="trash"></b-icon>
                      </b-col>
                      <b-col>
                        <p class="recipe">{{satRecipes.name}} </p>
                      </b-col>
                    </b-row>
                  </div>
                </div>
              </div>
            </div>
<!---------------SÖNDAG----------->
          <div class="day">
            <div class="day-week">
              <p class="dayName">Sun</p>
            </div>
            <div class="daysRecipe"  v-if="sundayRecipes.length > 0">
                <div class="events" v-for="sunRecipes in sundayRecipes" v-bind:key="sunRecipes._id">
                  <div class="event start-10 end-12 recipeCard container">
                    <b-row align-h="start">
                      <b-col cols="1">
                        <b-icon icon="trash"></b-icon>
                      </b-col>
                      <b-col>
                        <p class="recipe">{{sunRecipes.name}} </p>
                      </b-col>
                    </b-row>
                  </div>
                </div>
            </div>
          </div>
<!-- week ends here-->
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
  name: 'weeklyCalendar',
  props: ['user'],
  data() {
    return {
      editWeek: false,
      editYear: false,
      weekOutsideOfRange: false,
      yearLessThanCurrent: false,
      weekCalExist: false,
      dissmissSecs: 3,
      dismissCountDown: 0,
      days: [],
      week: '',
      year: '',
      mondayRecipes: [],
      tuesdayRecipes: [],
      wednesdayRecipes: [],
      thursdayRecipes: [],
      fridayRecipes: [],
      saturdayRecipes: [],
      sundayRecipes: [],
      daysID: []
    }
  },
  mounted() {
    Api.get('/profiles/' + localStorage.id + '/days?week=' + this.$route.params.week + '&year=' + this.$route.params.year, {
      headers: {
        Authorization: 'Bearer ' + localStorage.token
      }
    })
      .then(response => {
        this.days = response.data.days

        this.mondayRecipes = this.days[0].recipes
        this.tuesdayRecipes = this.days[1].recipes
        this.wednesdayRecipes = this.days[2].recipes
        this.thursdayRecipes = this.days[3].recipes
        this.fridayRecipes = this.days[4].recipes
        this.saturdayRecipes = this.days[5].recipes
        this.sundayRecipes = this.days[6].recipes
      })
      .then(() => {
        const weekDays = this.days
        for (const day of weekDays) {
          if (day._id !== 'none') {
            this.daysID.push(day._id)
          }
        }
      })
      .catch(error => {
        console.error(error)
      })
      // }
  },
  methods: {
    changeWeek() {
      if (this.week < 1 || this.week > 52) {
        this.weekOutsideOfRange = true
      } else {
        Api.patch('/profiles/' + localStorage.id + '/days', {
          year: this.$route.params.year,
          week: this.week,
          weekdays: this.daysID
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.token
          }
        })
          .then(response => {
            if (response.data.status === 200) {
              this.editWeek = false
              this.editYear = false
              this.$router.push(`/weeklyCalendar/${this.$route.params.year}/${this.week}`)
            }
          })
          .catch(error => {
            console.error(error)
            if (error.response.status === 409) {
              this.weekCalExist = true
            }
          })
      }
    },
    changeYear() {
      const currentYear = new Date().getFullYear()
      if (this.year < currentYear || this.year > (currentYear + 1)) {
        this.yearLessThanCurrent = true
      }

      Api.patch('/profiles/' + localStorage.id + '/days', {
        year: this.year,
        week: this.$route.params.week,
        weekdays: this.daysID
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.token
        }
      })
        .then(response => {
          console.log(' edited ' + this.currentWeek)
          console.log(' edited ' + this.currentWeek)
          if (response.data.status === 200) {
            this.editWeek = false
            this.editYear = false
            this.$router.push(`/weeklyCalendar/${this.year}/${this.$route.params.week}`)
          }
        })
        .catch(error => {
          console.error(error)
          if (error.response.status === 409) {
            this.weekCalExist = true
          }
        })
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.dissmissSecs
      this.weekCalExist = false
      this.$router.go(0)
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
    @media(max-width: 600px){
      font-size: 3em;
    }
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
    @media(max-width: 600px){
      display: block;
    }

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
    text-align: cen;
    -webkit-transition: all 0.4s ease;
    transition: all 0.4s ease;

  }

label{
  color: #fff;
  font-size: 1.5em;
  margin-right: 2%;
  margin-left:10%;
  @media(max-width: 600px){
    font-size: 1.2em;
  }
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

.alert{
  margin-left: 3%;
  margin-right: 65%;

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
  .day{
    min-height: 200px !important;
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
    //
    padding: 1px;
    margin-left: 2px;
    margin-right: 2px;
  }

  .event {
    border: 3px solid #0f8a13;
    border-radius: 5px;
    padding: 1 rem;
    margin: 0 0.8rem;
    margin-top:5%;
    background: rgba(254, 254, 254, 0.38);
}

  .recipe {
    color: rgb(0, 0, 0);
//    text-align: center;
    font-weight: bold;
    margin-bottom: 1rem;
    // text-align: center;
    width: 100%;
    z-index: -10;
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

    .days{
      border: 0px solid #ffffff00;
    }
  }

  .dayName{
    font-size: 2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.793);
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
