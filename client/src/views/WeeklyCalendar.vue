<template>
  <div class="weeklyCal">
    <div class="row">
      <div class="title">
        <h1>Weekly plan</h1>
      </div>
      <div id="userNameInput" class="username col-md-12 d-flex flex-row mt-2 mb-2 align-items-center gap-2">
                <input class="form-control" type="text" v-if="!editUsername" :disabled="!editUsername" :class="{view: !editUsername}" :value="4">
                <input type="text" v-if="editUsername" v-model="username" id="username" name="username" class="form-control" :class="{ 'is-invalid': submitted && $v.username.$error }" />
                <div v-if="submitted && !$v.username.required" class="invalid-feedback">Username is required</div>
              <!-- editbutton-->
                <button class="btn edit-btn btn-sm" @click="editUsername = !editUsername" v-if="!editUsername">Edit</button> <!-- <i class="bi bi-pencil-square"></i>  -->
              </div>
      <div class="calendar">
        <div class="weekDays">
          <div class="day mon">
            <div class="day-week">
              <p class="dayName">Mon</p>
            </div>
            <div class="events">
              <div class="event start-10 end-12 recipeCard">
                <p class="recipe">Recipe1</p>
              </div>
            </div>
          </div>
          <div class="day tues">
            <div class="day-week">
              <p class="dayName">Tues</p>
            </div>
            <div class="events">
              <div class="event start-10 end-12 recipeCard">
                <p class="recipe">Recipe1</p>
              </div>
            </div>
          </div>
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
          <div class="day fri">
            <div class="day-week">
              <p class="dayName">Fri</p>
            </div>
            <div class="event start-10 end-12 recipeCard">
                <p class="recipe">Recipe1</p>
              </div>
          </div>
          <div class="day sat">
            <div class="day-week">
              <p class="dayName">Sat</p>
            </div>
            <div class="event start-10 end-12 recipeCard">
                <p class="recipe">Recipe1</p>
              </div>
          </div>
          <div class="day sun">
            <div class="day-week">
              <p class="dayName">Sun</p>
            </div>
            <div class="event start-10 end-12 recipeCard">
                <p class="recipe">Recipe1</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style lang='scss' scoped>

// width = 100% / 7 column-number = 14.285714285714285714285714285714%
/* :root {
  --numDays: 5;
  --numHours: 10;
  //--timeHeight: 60px;
  --calBgColor: #fff1f8;
  --eventColor1: #ffd6d1;
  --eventColor2: #fafaa3;
  --eventColor3: #e2f8ff;
  --eventColor4: #d1ffe6;
} */
*, body {
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
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
  margin-top:7%;
  .title{
  margin-left: 5%;
    h1{
    color: #ffffff;
    font-size: 4em;
    font-weight: bold;
    }
  }
}

.calendar {
  display: grid;
  gap: 10px;
  grid-template-columns: auto 1fr;
  margin: 2rem;
}

.weekDays {
  display: grid;
  grid-column: 2;
  gap: 5px;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}

.events {
  display: grid;
  //grid-template-rows: repeat(var(--numHours), var(--timeHeight));
  border-radius: 5px;
  background: var(--calBgColor);
}

/* // Place on Timeline
.start-10 {
  grid-row-start: 2;
}

.start-12 {
  grid-row-start: 4;
}

.start-1 {
  grid-row-start: 5;
}

.start-2 {
  grid-row-start: 6;
}

.end-12 {
  grid-row-end: 4;
}

.end-1 {
  grid-row-end: 5;
}

.end-3 {
  grid-row-end: 7;
}

.end-4 {
  grid-row-end: 8;
}

.end-5 {
  grid-row-end: 9;
} */

// Event

.recipe {
  color: #ffffff;
  text-align: center;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.event {
  border: 1px solid #0aad10;
  border-radius: 5px;
  padding: 0.5rem;
  margin: 0 0.8rem;
  margin-top:5%;
  background: rgba(0, 0, 0, 0.761);
}

.space,
.day-week {
  height: 60px
}

// Global / Etc

body {
  font-family: system-ui, sans-serif;
}

.recipeCard {
  background: #080606b4;
}

.ent-law {
  background: var(--eventColor2);
}

.writing {
  background: var(--eventColor3);
}

.securities {
  background: var(--eventColor4);
}

.day-week {
  display: flex;
  gap: 1em;
}

.dayName {
  color: #ffffff;
  margin-left: 10%;
  display: inline;
  font-size: 3rem;
  font-weight: bold;
}

</style>
