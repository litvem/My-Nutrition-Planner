<template>
    <div class="weeklyCal">
      <div class="row">
        <br><h1>Weekly plan</h1><br>
        <div class="calendar">
          <div class="days">
            <div class="day mon">
              <div class="date">
                <p class="date-day">Mon</p>
              </div>
              <div class="events">
                <div class="event start-2 end-5 securities">
                  <p class="recipe">Recipe1</p>
                </div>
              </div>
            </div>
            <div class="day tues">
              <div class="date">
                <p class="date-day">Tues</p>
              </div>
              <div class="events">
                <div class="event start-10 end-12 corp-fi">
                  <p class="recipe">Recipe1</p>
                </div>
                <div class="event start-1 end-4 ent-law">
                  <p class="recipe">Recipe1</p>
                </div>
              </div>
            </div>
            <div class="day wed">
              <div class="date">
                <p class="date-day">Wed</p>
              </div>
              <div class="events">
                <div class="event start-12 end-1 writing">
                  <p class="recipe">Recipe1</p>
                </div>
                <div class="event start-2 end-5 securities">
                  <p class="recipe">Recipe1</p>
                </div>
              </div>
            </div>
            <div class="day thurs">
              <div class="date">
                <p class="date-day">Thurs</p>
              </div>
              <div class="events">
                <div class="event start-10 end-12 corp-fi">
                  <p class="recipe">Recipe1</p>
                </div>
                <div class="event start-1 end-4 ent-law">
                  <p class="recipe">Recipe1</p>
                </div>
              </div>
            </div>
            <div class="day fri">
              <div class="date">
                <p class="date-day">Fri</p>
              </div>
              <div class="events">
              </div>
            </div>
            <div class="day fri">
              <div class="date">
                <p class="date-day">Sat</p>
              </div>
              <div class="events">
              </div>
            </div>
            <div class="day fri">
              <div class="date">
                <p class="date-day">Sun</p>
              </div>
              <div class="events">
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
  /*   background-image: url("../assets/weekly-plan-background.jpg");
    background-size: cover;
    background-attachment: fixed; */
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .calendar {
    display: grid;
    gap: 10px;
    grid-template-columns: auto 1fr;
    margin: 2rem;
  }

  .days {
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
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  .event {
    border: 1px solid #f2d3d8;
    border-radius: 5px;
    padding: 0.5rem;
    margin: 0 0.5rem;
    background: white;
  }

  .space,
  .date {
    height: 60px
  }

  // Global / Etc

  body {
    font-family: system-ui, sans-serif;
  }

  .corp-fi {
    background: #ffd6d1;
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

  .date {
    display: flex;
    gap: 1em;
  }

  .date-day {
    display: inline;
    font-size: 3rem;
    font-weight: 100;
  }

</style>
