<template>
  <div class="Register">
    <div class="Registerview">
      <div class="box-form">
        <div class="form-container">
          <div class="left">
            <h1>Register</h1>
            <br>
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <label for="user">Username</label>
                <input type="text" v-model="username" id="username" name="username" class="form-control" :class="{ 'is-invalid': submitted && $v.username.$error }" />
                <div v-if="submitted && !$v.username.required" class="invalid-feedback">Username is required</div>
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <input type="password" v-model="password" id="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && $v.password.$error }" />
                  <div v-if="submitted && $v.password.$error" class="invalid-feedback">
                    <span v-if="!$v.password.required">Password is required</span>
                    <span v-if="!$v.password.minLength">Password must be at least 3 characters</span>
                  </div>
                </div>
                <div class="form-group">
                  <label for="confirmPassword">Confirm Password</label>
                  <input type="password" v-model="confirmPassword" id="confirmPassword" name="confirmPassword" class="form-control" :class="{ 'is-invalid': submitted && $v.confirmPassword.$error }" />
                  <div v-if="submitted && $v.confirmPassword.$error" class="invalid-feedback">
                    <span v-if="!$v.confirmPassword.required">Confirm Password is required</span>
                    <span v-else-if="!$v.confirmPassword.sameAsPassword">Passwords must match</span>
                  </div>
                </div>
                <div class="form-group">
                  <hr>
                  <button class="btn register-btn">Register</button>
                  <hr>
                  <div>
                  <b-alert v-model="successAlert" variant="success">
                    <h5>Congratulations!</h5>
                    <h6>You have been successfully registered.</h6>
                    <h6>Click <a href="#" v-on:click="goToLogin()">here</a> to login.</h6>
                  </b-alert>
                </div>
                  <hr>
                  <p>Already have an account? <a href="#" v-on:click="goToLogin()">Sign in</a>.</p>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
import { required, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  name: 'register',
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      submitted: false,
      successAlert: false
    }
  },
  validations: {
    username: { required },
    password: { required, minLength: minLength(3) },
    confirmPassword: { required, sameAsPassword: sameAs('password') }
  },
  methods: {
    handleSubmit(e) {
      this.submitted = true
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      Api.post('/profiles/signup', {
        username: this.username,
        password: this.password
      })
        .catch(error => {
          console.error(error)
        })
      this.successAlert = true
    },
    goToLogin() {
      this.$router.push('/')
    },
    toggle_success_alert() {
      this.user_registered = !this.user_registered
    }
  }
}
</script>

<style scoped>
  .Registerview {
    background-image: url("../assets/top-view-condiments-aromatic-herbs.jpg");
    background-size: cover;
    background-attachment: fixed;
    position: relative;
    height: 100%;
  }

  .box-form .form-container {
    height: 100%;
    display: flex;
    place-items: left;
    padding: 80px;
    width: 80%;
    box-sizing: border-box;
  }

  .box-form .left {
    width: 60%;
    height: 100%;
    padding: 40px;
    overflow: hidden;
  }

  h1 {
    color: #fff;
    text-transform: uppercase;
    font-size: 50px;
    font-weight: bold;
    align-self: center;
  }

  p {
    color: #fff;
    align-self:baseline;
  }

  a {
    color: #00cc44;
    text-decoration: none;
    font-weight: bold;
  }

  .register-btn {
    margin-top: 0.2em;
    margin-bottom: 0.01em;
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
    box-shadow: 0px 4px 20px 0px #a6fa94a6;
    background-image: linear-gradient(135deg, #70e68e 10%, #2c7803a6 100%);
  }

  label {
    color: #fff;
    font-size: 16px;
    font-weight: bold;
  }

  @media(max-width: 768px) {

    .box-form .left {
      width: 100%;
      min-height: 90vh;
    }
    h1 {
      margin-top: 50%;
    }
    .box-form .form-container {
      width: 100%;
      z-index: 1;
      justify-content: center;
      align-items: center;
    }
  }
</style>
