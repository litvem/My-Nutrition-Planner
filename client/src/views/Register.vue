<template>
  <div>
    <b-form>
      <div class="container">
        <h1>Register</h1>
        <div class="input-box">
            <input type="text" placeholder="Enter your username" required>
        </div>
        <div class="input-box">
            <input type="password" placeholder="Enter your password" required>
        </div>
        <div class="input-box">
            <input type="password" placeholder="Confirm your password" required>
        </div>
<!--
        <select class="form-select form-select-sm" aria-label=".form-select-sm example" required>
            <option selected>Select secret question</option>
            <option value="1">What is the name of your first pet?</option>
            <option value="2">When did your parents meet?</option>
            <option value="3">What is your favorite season?</option>
        </select>

        <div class="input-box">
            <input type="text" placeholder="Answer secret question" required>
        </div>
-->
        <hr>
        <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

        <button type="submit" class="register-btn" v-on:click="goToUserHome()">Register</button>
        <br>
        <div class="container signin">
          <p>Already have an account? <a href="#" v-on:click="goToLogin()">Sign in</a>.</p>
        </div>
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'register',
  methods: {
    goToLogin() {
      this.$router.push('/')
    },
    goToUserHome() {
      this.$router.push('/userHome')
    }
  }
}
</script>

<style scoped>
    h1 {
        color:black
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

    form input,select{
        width: auto;
        padding: 10px;
        margin-top: 25px;
        font-size: 16px;
        border: none;
        outline: none;
        border-bottom: 2px solid #B0B3B9;
    }
</style>
