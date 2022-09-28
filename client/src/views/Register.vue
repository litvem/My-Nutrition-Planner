<template>
  <div>
    <b-form>
      <div class="container">
        <h1>Register</h1>
        <div class="input-box">
            <input type="text" placeholder="Enter your username" name="username" v-model="username" required>
        </div>
        <div class="input-box">
            <input type="password" placeholder="Enter your password" name="password" v-model="password" required>
        </div>
        <div class="input-box">
            <input type="password" placeholder="Confirm your password" required>
        </div>
        <hr>
        <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

        <button type="submit" class="register-btn" v-on:click="createUser()">Register</button>
        <br>
        <div class="container signin">
          <p>Already have an account? <a href="#" v-on:click="goToLogin()">Sign in</a>.</p>
        </div>
      </div>
    </b-form>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'register',
  data() {
    return {
      message: 'none',
      username: '',
      password: ''
    }
  },
  methods: {
    createUser: function () {
      Api.post('/profiles', {
        username: this.username,
        password: this.password
      })
        .catch(error => {
          this.message = error
        })
    }
  },

  goToLogin() {
    this.$router.push('/')
  },
  goToUserHome() {
    this.$router.push('/userHome')
  }
}

</script>

<style scoped>
  h1 {
    color: #210b85
  }

  form {
    margin: auto;
    padding: 25px;
    width: 100%;
    background: #FFFFFF;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    flex: 1;
    align-items: normal;
    justify-content: space-between;
    box-shadow: 0 0 20px 6px #090b6f33;
    }

  container {
    justify-content: center;
    align-content: center;
  }

  form input, select {
    width: auto;
    padding: 10px;
    margin-top: 25px;
    font-size: 16px;
    border: none;
    outline: none;
    border-bottom: 2px solid #B0B3B9;
  }

  .register-btn {
    margin-top: 0.2em;
    margin-bottom: 1em;
    margin-right: 1em;
    margin-left: 0.01em;
    float: center;
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
</style>
