<template>
  <div class="container">
   <img
    src="https://images.unsplash.com/photo-1549589237-9e70b6be4da8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=925&q=80"
    alt="Pancake"
   />
   <div class="container__text">
    <h1>Caramel Cake Pancakes</h1>
    <div class="container__text__star">
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
     <span class="fa fa-star checked"></span>
    </div>
    <p>
     If you're fan of caramel cake, then you'll love our Caramel Cake Pancakes.
     We Complete these over-the-top pancakes with Caramel Syrup.
    </p>
    <div class="container__text__timing">
     <div class="container__text__timing_time">
      <h2>Hands-on Time</h2>
      <p>30 min</p>
     </div>
     <div class="container__text__timing_time">
      <h2>Total Time</h2>
      <p>40 min</p>
     </div>
     <div class="container__text__timing_time">
      <h2>Yield</h2>
      <p>40 min</p>
     </div>
    </div>
    <button class="btn">view recipe <i class="fa fa-arrow-right"></i></button>
   </div>
  </div>
</template>

<script>
export default {
  name: 'daysRecipesView',
  props: ['recipe'],
  methods: {

  }
}
</script>

<style lang="scss" scoped>
$primary-color: #fff;
$border-radius: 5px;
$black-color: #351897;

* {
 margin: 0;
 padding: 0;
 box-sizing: border-box;
}

body {
 background-color: #c2a3d1;
 font-family: Arial, Helvetica, sans-serif;
 display: grid;
 place-items: center;
 min-height: 100vh;
}

.container {
 background-color: $primary-color;
 position: relative;
 display: grid;
 grid-template-columns: 300px 600px;
 border-radius: $border-radius;
 box-shadow: 0 15px 20px rgba(0, 0, 0, 0.356);
 img {
  width: 300px;
  height: 300px;
  border-radius: $border-radius 0 0 $border-radius;
 }
 .btn {
  position: absolute;
  bottom: -20px;
  right: -20px;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  background-color: #fc9400;
  color: $primary-color;
  padding: 22px 45px;
  font-size: 1rem;
  text-transform: uppercase;
  border-radius: $border-radius;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.294);
  i {
   margin-left: 20px;
   font-size: 1.5rem;
  }
 }
}
.container__text {
 padding: 40px 40px 0;
 h1 {
  color: $black-color;
  font-weight: 400;
 }
 .container__text__star span {
  font-size: 0.8rem;
  color: #ffa800;
  margin: -5px 0 20px;
 }
 p {
  font-size: 0.9rem;
 }
 .container__text__timing {
  display: flex;
  margin: 20px 0 10px;
  .container__text__timing_time {
   margin-right: 40px;
  }
  h2 {
   margin-bottom: 5px;
   font-size: 1rem;
   font-weight: 400;
   color: #818189;
  }
  p {
   color: $black-color;
   font-weight: bold;
   font-size: 1.2rem;
  }
 }
}

</style>
