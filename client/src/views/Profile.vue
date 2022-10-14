<template>
  <div class="profile">
    <div class="row">
      <div class="form-body">
        <div class="form-holder">
          <div class="form-content">
            <div class="form-items">

              <h3>Profile</h3>
              <hr>

              <form class="inputs">
                <!--  username section-->
                <div id="userInput" class="username col-md-12 d-flex flex-row mt-2 mb-2 align-items-center gap-2">
                  <input class="form-control" type="text" ref="id" :disabled="!editUsername" :class="{view: !editUsername}" :value="user.username" required>
                  <button class="btn btn-sm btn-success" @click="editUsername = !editUsername" v-if="!editUsername">Edit</button>
                </div>

                <div class="username col-md-12 d-flex flex-row mt-2 mb-2 align-items-center gap-2" v-if="editUsername">
                  <button class="btn btn-sm btn-success me-1" @click="changeUsername" >Save</button> <!-- noll ställ editUsername-->
                  <button class="btn btn-sm btn-danger"  @click="editUsername = false">Cancel</button>
                </div>
                <!-- warning-->
                <div class="alert alert-warning" role="alert" v-if="usernNameExist">
                  Username already exist! Please try again
                </div>
                <!-- password section-->

                <div class="text-center mt-5 mb-2 align-items-center gap-2" v-if="!editPassword">
                  <button class="btn btn-default btn-success" @click="editPassword = !editPassword">Edit password</button>
                </div>
                <!-- Enter password-->
                <div class="form-control mt-2 mb-2 align-items-center gap-2" v-if="editPassword">
                  <label for="Enter password" v-if="editPassword" class="label mt-1 mb-1 align-items-center gap-2">Password</label>
                  <input type="password" v-model="password" v-if="editPassword" id="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && $v.password.$error }" />
                    <div v-if="submitted && $v.password.$error" class="invalid-feedback">
                      <span v-if="!$v.password.required">Password is required</span>
                      <span v-if="!$v.password.minLength">Password must be at least 3 characters</span>
                    </div>
                </div>
                <!-- Confirm password-->
                <div class="form-control mt-2 mb-2 align-items-center gap-2" v-if="editPassword">
                  <label for="confirmPassword" v-if="editPassword" class="label mt-1 mb-1 align-items-center gap-2">Confirm Password</label>
                  <input type="password" v-model="confirmPassword" v-if="editPassword" id="confirmPassword" name="confirmPassword" class="form-control" :class="{ 'is-invalid': submitted && $v.confirmPassword.$error }" />
                    <div v-if="submitted && $v.confirmPassword.$error" class="invalid-feedback">
                      <span v-if="!$v.confirmPassword.required">Confirm Password is required</span>
                    <span v-else-if="!$v.confirmPassword.sameAsPassword">Passwords must match</span>
                    </div>
                </div>
                <!-- editPassword true-->
                <!--  <div class="text-center mt-3 mb-3 align-items-center gap-2" v-if="editPassword">
                    <input class="form-control" type="password" ref="password">
                  </div>

                  <div class="text-center mt-3 mb-3 align-items-center gap-2" v-if="editPassword">
                    <input class="form-control" type="password" ref="password">
                  </div>

                  <div class="password col-md-12 d-flex flex-row mt-2 mb-2 align-items-center gap-2" v-if="editPassword">
                    <button class="btn btn-sm btn-success me-1" @click="save" >Save</button>
                    <button class="btn btn-sm btn-danger"  @click="editPassword = false">Cancel</button>
                </div> -->
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { Api } from '@/Api'
// import { required, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  name: 'profile',
  props: ['user'],
  data: function () {
    return {
      editUsername: false,
      editPassword: false,
      usernNameExist: false,
      username: '',
      password: '',
      confirmPassword: '',
      submitted: false,
      successAlert: false
    }
  },
  methods: {
    changeUsername() {
      this.submitted = true
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }Api.patch('/profiles/' + this.user._id, {
        username: this.username
      })
        .catch(error => {
          this.message = error
        })
      this.successAlert = true
    }
  },
  changePassword() {
    this.submitted = true
    this.$v.$touch()
    if (this.$v.$invalid) {
      return
    }Api.put('/profiles/' + this.user._id, {
      username: this.username,
      password: this.password
    })
      .catch(error => {
        this.message = error
      })
    this.successAlert = true
  }

}
</script>

<style lang='scss' scoped>
*, body {
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
  }

  .profile, body {
    background-image: url("../assets/profile-background.jpg");
    background-size: cover;
    background-attachment: fixed;
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .form-body{
    flex-direction: row;
    height: 100%;
  }
  .form-holder {
    position: relative;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 200px; // increasing moved the content up and down
    right: 20%; // media remove
}

  .form-holder .form-content {
    position: relative;
    text-align: center;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-align-items: center;
    align-items: center;
    padding: 60px;

    .form-items {
      border: 3px solid #fff;
      padding: 40px;
      display: inline-block;
      width: 100%;
      min-width: 540px;
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      border-radius: 10px;
      text-align: left;
      -webkit-transition: all 0.4s ease;
      transition: all 0.4s ease;
    }
    h3 {
      color: #fff;
      text-align: left;
      font-size: 40px;
      font-weight: 600;
      margin-bottom: 5px;
      }
  }
  .label{
          color: #fff;
  }

  @media(max-width: 768px) {
    .form-holder {
      right: 0%; // media remove
    }
    .form-items {
      border: 3px solid #fff;
      padding: 10px;
      display: inline-block;
      width: 80%;
      max-width: 200px;
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      border-radius: 10px;
      text-align: left;
      -webkit-transition: all 0.4s ease;
      transition: all 0.4s ease;
    }
  }
/*
 *, body {
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
  }

  .profile, body {
    height: 100%;
    background-image: url("../assets/profile-background.jpg");
    background-size: contain;
    overflow: hidden;
  }

  .form-holder {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 100vh;
  }

.form-holder .form-content {
    position: relative;
    text-align: center;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-align-items: center;
    align-items: center;
    padding: 60px;
}

.form-content .form-items {
    border: 3px solid #fff;
    padding: 40px;
    display: inline-block;
    width: 100%;
    min-width: 540px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    text-align: left;
    -webkit-transition: all 0.4s ease;
    transition: all 0.4s ease;
}

.form-content h3 {
    color: #fff;
    text-align: left;
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 5px;
}

.form-content h3.form-title {
    margin-bottom: 30px;
}

.form-content label, .was-validated .form-check-input:invalid~.form-check-label, .was-validated .form-check-input:valid~.form-check-label{
    color: #fff;
}

.form-content input[type=text], .form-content input[type=password], .form-content input[type=email], .form-content select {
    width: 100%;
    padding: 9px 20px;
    text-align: left;
    border: 0;
    outline: 0;
    border-radius: 6px;
    background-color: #fff;
    font-size: 15px;
    font-weight: 300;
    color: #8D8D8D;
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
    margin-top: 16px;
}

.btn-primary{
    background-color: #6C757D;
    outline: none;
    border: 0px;
     box-shadow: none;
}

.btn-primary:hover, .btn-primary:focus, .btn-primary:active{
    background-color: #495056;
    outline: none !important;
    border: none !important;
    box-shadow: none;
}

.form-content textarea {
    position: static !important;
    width: 100%;
    padding: 8px 20px;
    border-radius: 6px;
    text-align: left;
    background-color: #fff;
    border: 0;
    font-size: 15px;
    font-weight: 300;
    color: #8D8D8D;
    outline: none;
    resize: none;
    height: 120px;
    -webkit-transition: none;
    transition: none;
    margin-bottom: 14px;
}

.form-content textarea:hover, .form-content textarea:focus {
    border: 0;
    background-color: #ebeff8;
    color: #8D8D8D;
}

.mv-up{
    margin-top: -9px !important;
    margin-bottom: 8px !important;
}

.invalid-feedback{
    color: #ff606e;
}

.valid-feedback{
   color: #2acc80;
} */
</style>
