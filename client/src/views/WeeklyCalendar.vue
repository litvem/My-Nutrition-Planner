<template>
    <div class="WeeklyPlan">
      <div class="WeeklyPlanView">
        <div class="box-form">
          <div class="form-container">
            <br><h1>Weekly plan</h1><br>
            <div class="calendar">
              <div class="day">
                <h2>Monday</h2>
                <b-container class="recipes">
                  <b-jumbotron>
                  </b-jumbotron>
                </b-container>
              </div>
              <div class="day">
                <h2>Tuesday</h2>
                <b-container class="recipes">
                  <b-jumbotron>
                  </b-jumbotron>
                </b-container>
              </div>
              <div class="day">
                <h2>Wednesday</h2>
                <b-container class="recipes">
                  <b-jumbotron>
                  </b-jumbotron>
                </b-container>
              </div>
              <div class="day">
                <h2>Thursday</h2>
                <b-container class="recipes">
                  <b-jumbotron>
                  </b-jumbotron>
                </b-container>
              </div>
              <div class="day">
                <h2>Friday</h2>
                <b-container class="recipes">
                  <b-jumbotron>
                  </b-jumbotron>
                </b-container>
              </div>
              <div class="day">
                <h2>Saturday</h2>
                <b-container class="recipes">
                  <b-jumbotron>
                  </b-jumbotron>
                </b-container>
              </div>
              <div class="day">
                <h2>Sunday</h2>
                <b-container class="recipes">
                  <b-jumbotron>
                  </b-jumbotron>
                </b-container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'login'
}
</script>

<style scoped>
  .WeeklyPlanView {
    background-image: url("../assets/weekly-plan-background.jpg");
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    background-attachment: fixed;
    position: relative;
    height: 100%;
  }

  h1 {
    color: #fff;
    text-transform: uppercase;
    font-size: 50px;
    font-weight: bold;
    text-align: center;
    margin-top: 0%;
    margin-bottom: 1%;
    width: 100%;
  }

  h2 {
    color: #fff;
    font-size: 23px;
    font-weight: bold;
    text-align: center;
    margin-top: 5%;
    margin-bottom: 5%;
    margin-right: 1%;
    margin-left: 1%;
    width: 100%;
  }

  .calendar {
    display: flex;
    position: relative;
    flex-direction: row;
    align-items: center;
    margin-left: 1%;
    margin-right: 1%;
    align-content: center;
  }

  .day {
      align-items: center;
      margin-left: 0.15%;
      margin-right: 0.15%;
      margin-bottom: 1%;
      width: 15%;
      height: 50%;
    }

  .recipes {
    margin: 0%;
    width: 100%;
    padding: 0;
  }

  .jumbotron {
    display: flex;
    justify-content: center;
    align-items: top;
    margin: 0%;
    min-height: 100px;
    width: 100%;;
    padding: 0.5%;
  }

  @media(max-width: 768px) {
    .calendar {
      flex-direction: column;
    }
    h1 {
      font-size: 40px;
    }
    .day {
      width: 100%;
    }
  }
</style>
