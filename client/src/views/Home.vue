<template>
  <div class="background">
  <div @submit.prevent="handleSubmit" class="box-form">
    <div class="left">
      <div class="overlay">
        <h2>Welcome to your Nutrition Planner</h2>
          <br>
          <p2>Looking for a place to store your favourite recipes? Make weekly shopping easier? Keep track of your meals and stay healthy? Then this is the right place for you!</p2>
      </div>
    </div>

    <div class="right">
      <h4>Login</h4>
      <br>
      <p>Don't have an account? <a href="" v-on:click="goToRegister">Register here</a>, it takes less than a minute</p>
      <div class="inputs">
        <input type="text" v-model="username" placeholder="username">
        <br>
        <input type="password" v-model="password" placeholder="password">
      </div>
      <br><br>
      <div class="forget-password">
<a href="" v-on:click="goToForgoPassword">Forgot password?</a>
</div>
<br>
<button v-on:click="handleSubmit()">Login</button>
</div>
</div>
</div>
</template>

<script>
import { Api } from '@/Api'
export default {
  name: 'home',
  components: {
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {

    handleSubmit() {
      Api.post('/profiles/login', {
        username: this.username,
        password: this.password
      }).then(response => {
        if (response.data.message === 'Authentication successful') {
          localStorage.token = response.data.token
          localStorage.setItem('id', response.data.id)
          return this.$router.push('/userHome')
        } else {
          return this.$router.push('/')
        }
      })
        .catch(error => {
          console.error(error)
        })

      console.log(localStorage.id)
    },
    goToUserHome() {

    },
    goToRegister() {
      this.$router.push('/register')
    },
    goToForgoPassword() {
      this.$router.push('/forgotPassword')
    }
  }
}
</script>

<style scoped>
.btn {
  margin-bottom: 1em;
  margin-right: 1em;
}

.box-form {
  margin: 0 auto;
  width: 80%;
  background: #FFFFFF;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex: 1;
  align-items: normal;
  justify-content: space-between;
  box-shadow: 0 0 20px 6px #090b6f85;
}
@media (max-width: 900px) {
  .box-form {
    flex-flow: wrap;
    text-align: center;
    align-content: center;
    align-items: center;
  }
}
.box-form div {
  height: auto;
}
.box-form .left {
  color: #FFFFFF;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("https://images.unsplash.com/photo-1521986329282-0436c1f1e212?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80");
  overflow: hidden;
}
.box-form .left .overlay {
  padding: 30px;
  width: 100%;
  height: 100%;
  background: #9697fcad;
  overflow: hidden;
  box-sizing: border-box;
}
.box-form .left .overlay h1 {
  font-size: 10vmax;
  line-height: 1;
  font-weight: 900;
  margin-top: 40px;
  margin-bottom: 20px;
}
.box-form .left .overlay span p {
  margin-top: 30px;
  font-weight: 900;
}
.box-form .left .overlay span a {
  background: #3b5998;
  color: #FFFFFF;
  margin-top: 10px;
  padding: 14px 50px;
  border-radius: 100px;
  display: inline-block;
  box-shadow: 0 3px 6px 1px #042d4657;
}
.box-form .left .overlay span a:last-child {
  background: #1dcaff;
  margin-left: 30px;
}
.box-form .right {
  width: 60%;
  padding: 40px;
  overflow: hidden;
}
@media (max-width: 700px) {
  .box-form .right {
    width: 100%;
  }
}
.box-form .right h5 {
  font-size: 6vmax;
  line-height: 0;
}
.box-form .right p {
  font-size: 14px;
  color: #B0B3B9;
}
.box-form .right .inputs {
  overflow: hidden;
}
.box-form .right input {
  width: 100%;
  padding: 10px;
  margin-top: 25px;
  font-size: 16px;
  border: none;
  outline: none;
  border-bottom: 2px solid #B0B3B9;
}
.box-form .right .forget-password {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.box-form .right .forget-password input {
  margin: 0;
  margin-right: 7px;
  width: auto;
}
.box-form .right button {
  float: right;
  color: #fff;
  font-size: 16px;
  padding: 12px 35px;
  border-radius: 50px;
  display: inline-block;
  border: 0;
  outline: 0;
  box-shadow: 0px 4px 20px 0px #285fc6a6;
  background-image: linear-gradient(135deg, #7b70f5 10%, #285fc6a6 100%);
}

label {
  display: block;
  position: relative;
  margin-left: 30px;
}

</style>
