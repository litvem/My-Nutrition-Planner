<template>
  <div class="days">
    <div class="container-md">
      <br><h1> Weekly planner</h1><br>
      <DaysRecipesView :days ="days"/>
    </div>
  </div>

</template>

<script>
import { Api } from '@/Api'
import DaysRecipesView from '../components/daysRecipesView.vue'
//           <!-- <DaysRecipesView :days ="days"/>-->
export default {
  name: 'days',
  props: ['user'],
  components: {
    DaysRecipesView
  },
  data() {
    return {
      days: null
    }
  },
  beforeCreate() {
    const userID = this.user._id

    Api.get('/profiles/' + userID.id + '/days?week=' + localStorage.week, {

      headers: {
        Authorization: 'Bearer ' + localStorage.token
      }
    })
      .then(response => {
        this.days = response.data
      })
      .catch(error => {
        this.message = error.message
      })
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.days{
  background-image: url("../assets/weekly-plan-background.jpg");
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100vh;
}
.box-form-container {
  width: 100%;
  height: 100vh;
}

</style>
