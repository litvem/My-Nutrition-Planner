<template>
  <div class="jumbotron">
        <div class="container">
            <div class="row">
                <div class="col-sm-8 offset-sm-2">
                    <div>
                      <h1>Register</h1>
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
                                <button class="btn register-btn">Register</button>
                            </div>
                            <br>
                            <div class="container signin">
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
      submitted: false
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
      Api.post('/profiles', {
        username: this.username,
        password: this.password
      })
        .catch(error => {
          this.message = error
        })
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.user))
    },
    goToLogin() {
      this.$router.push('/')
    }
  }
}

</script>

<style scoped>
  h1 {
    color: #210b85
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

  label {
    color: #210b85;
    font-size: 16px;
  }

  .jumbotron {
    justify-content: center;
    align-content: center;
  }

</style>
