<template>
  <div class="profile">
    <div class="row">
      <div class="form-body">
        <div class="form-holder">
          <div class="form-content">
            <div class="form-items" v-if="user">
              <h3> {{user.username}}'s Profile</h3>
              <hr>
              <!-- USERNAME-->
              <!-- username field-->
              <div id="userNameInput" class="username col-md-12 d-flex flex-row mt-2 mb-2 align-items-center gap-2">
                <input class="form-control" type="text" v-if="!editUsername" :disabled="!editUsername" :class="{view: !editUsername}" :value="user.username">
                <input type="text" v-if="editUsername" v-model="username" id="username" name="username" class="form-control" :class="{ 'is-invalid': submitted && $v.username.$error }" />
                <div v-if="submitted && !$v.username.required" class="invalid-feedback">Username is required</div>
              <!-- editbutton-->
                <button class="btn edit-btn btn-sm" @click="editUsername = !editUsername" v-if="!editUsername">Edit</button> <!-- <i class="bi bi-pencil-square"></i>  -->
              </div>
              <!-- save or cancel-->
              <div class="username col-md-12 d-flex flex-row mt-2 mb-2 align-items-center gap-2" v-if="editUsername">
                <button class="btn save-btn btn-sm " @click="changeUsername">Save</button>
                <button class="btn cancel-btn btn-sm"  @click="cancelUsernameEdit()">Cancel</button>
              </div>
              <!-- ???warning-->
              <div class="alert alert-warning" role="alert" v-if="userNameExist">
                Username already exist! Please try again.
              </div>

<!---------------------------------------PASSWORD-------------------------------------------------------------------------->
              <div class="text-center mt-5 mb-2 align-items-center gap-2" v-if="!editPassword">
              <button class="btn editPassword-btn" @click="editPassword = !editPassword">Edit password</button>
              </div>

              <form @submit.prevent="changePassword" v-if="editPassword">
                <div class="password-edit col-md-12 d-flex flex-row mt-2 mb-2 align-items-center gap-2" v-if="editPassword">
                  <b-form-input type="password" id="newPassword" v-model="password" v-if="editPassword" placeholder="password" class="form-control flex-row mt-2 mb-2 align-items-center gap-2" :class="{ 'is-invalid': submitted && $v.password.$error }" />

                  <div v-if="submitted && $v.password.$error" class="invalid-feedback">
                    <span v-if="!$v.password.required">New password is required</span>
                    <span v-if="!$v.password.minLength">Password must be at least 3 characters</span>
                  </div>

                  <b-form-input id="newPasswordConfirm" type="password" v-model="confirmPassword" v-if="editPassword" placeholder="Confirm password" class="form-control flex-row mt-2 mb-2 align-items-center gap-2" :class="{ 'is-invalid': submitted && $v.confirmPassword.$error }" />
                  <div v-if="submitted && $v.confirmPassword.$error" class="invalid-feedback">
                    <span v-if="!$v.confirmPassword.required">Confirm password is required</span>
                    <span v-else-if="!$v.confirmPassword.sameAsPassword">Passwords must match</span>
                  </div>

                  <!--alert to be displayed then username successfully changed-->
                 <b-alert v-model="usernameChangedAlert" variant="success" dismissible>
                    <h5>Your username has been updated.</h5>
                  </b-alert> -->

                  <!--alert to be displayed then password successfully changed-->

                <b-alert v-model="passwordChangedAlert" variant="success" dismissible>
                    <h5>Your password has been updated.</h5>
                  </b-alert> -->
                </div>
                <div class="password col-md-12 d-flex flex-row mt-2 mb-2 align-items-center gap-2" v-if="editPassword">
                  <button class="btn save-btn btn-sm"  type="submit">Save</button>
                  <button class="btn cancel-btn btn-sm"  @click="this.editPassword = false">Cancel</button>
                </div>
              </form>

            </div>

            <div class="delete-box d-flex  mt-10 mb-2 align-items-center gap-2 justify-content-md-end"  v-if="user">
                <button class="btn delete-btn btn-sm">Delete account</button> <!-- <i class="bi bi-trash3-fill"></i>-->
                <!-- This one is working tho <button class="btn btn-link"><i class="fas fa-user"></i> Log In</button> -->
            </div>
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
  name: 'profile',
  props: ['user'],
  data() {
    return {
      editUsername: false,
      userNameExist: false,
      usernameChangedAlert: false,
      username: '',
      password: '',
      editPassword: false,
      confirmPassword: '',
      passwordChangedAlert: false,
      submitted: false
    }
  },
  validations: {
    password: { required, minLength: minLength(3) },
    confirmPassword: { required, sameAsPassword: sameAs('password') }
  },
  methods: {
    changeUsername() {
      Api.patch('/profiles/' + localStorage.id, {
        username: this.username
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
      )
        .then(response => {
          if (response.data.status === 200) {
            localStorage.token = response.data.token
            this.userNameExist = false
            this.editUsername = false
          }
          this.$router.go(0)
        })
        .catch(error => {
          console.error(error)
          if (error.response.status === 409) {
            this.userNameExist = true
          }
        })
    },
    changePassword() {
      console.log(this.password)
      this.submitted = true
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }

      Api.put('/profiles/' + localStorage.id, {
        username: this.user.username,
        password: this.password
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then(response => {
          console.log(response)
          if (response.data.status === 200) {
            localStorage.token = response.data.token
            this.editPassword = false
          }
        })
        .catch(error => {
          this.message = error
        })
    },
    cancelUsernameEdit() {
      this.editUsername = false
      this.userNameExist = false
    },
    cancelPasswordEdit() {
      this.editPassword = false
      this.passwordChangedAlert = false
    }
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

  .profile {
    background-image: url("../assets/profile-background.jpg");
    background-size: cover;
    background-attachment: fixed;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .form-body{
    flex-direction: row;
    min-height: 100%;
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
    flex-direction:column ;

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
    .edit-btn, .save-btn {
/*     margin-top: 0.2em;
    margin-bottom: 0.01em;
    margin-right: 1em;
    margin-left: 0.01em; */
    float: center;
    color: #fff;
    padding: 8px 16px;
    display: inline-block;
    border: 1;
    border-radius: 10px;
    border-color: #97a109a7;
    outline: 0;
    box-shadow: 0px 4px 20px 0px #a6fa94a6;
    background-image: linear-gradient(135deg, #4fc96e 10%, #036920c8 100%);
    }
    .cancel-btn {
      float: center;
      color: #fff;
      padding: 8px 16px;
      display: inline-block;
      border: 1;
      border-radius: 10px;
      border-color: #97a109a7;
      outline: 0;
      box-shadow: 0px 4px 20px 0px #ff90b5a6;
      background-image: linear-gradient(135deg, #d25f5f 10%, #d60404c8 100%);
    }
    .editPassword-btn {
      float: center;
      color: #fff;
      padding: 8px 16px;
      display: inline-block;
      align-content: center;
      border: 1;
      border-radius: 10px;
      border-color: #97a109a7;
      outline: 0;
      box-shadow: 0px 4px 20px 0px #a6fa94a6;
      background-image: linear-gradient(135deg, #4fc96e 10%, #036920c8 100%);
    }
  }
  .delete-box {
    margin-top: 10%;
    border: 3px solid #fff;
    padding: 40px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -webkit-transition: all 0.4s ease;
    transition: all 0.4s ease;
    border-radius: 10px;
    overflow: hidden;
  }

  .delete-btn {

    // ALTERNATIVE ONE
/*     float: center;
    color: #fff;
    padding: 8px 16px;
    display: inline-block;
    align-content: center;
    border: 1;
    border-radius: 10px;
    border-color: rgb(255, 255, 255);
    outline: 0;
    box-shadow: 0px 4px 20px 0px #c35a5aa6;
    background-image: linear-gradient(135deg, #bf270cf0 10%,#44a95d 50%, #bf270cf0 100%);
    font-weight: bold;

    &:hover {
      color:rgba(9, 39, 25, 0.971);
      box-shadow: 0px 4px 20px 0px rgb(138, 237, 170);
      border-color: rgb(255, 255, 255);
      background-image: linear-gradient(180deg, #0e0d0df0 10%,#959695 50%, #010101f0 100%); // change the color
    } */

    // ALLTERNATIVE 2
    background-image: linear-gradient(135deg, #0e0d0df0 10%,#959695 50%, #010101f0 100%); // change the color
    border: 2px solid currentColor;
    border-radius: 3rem;
    color: #fffffff0;
    font-size: 80xp;
    font-weight: bold;
    overflow: hidden;
    padding: 1rem 2rem;
    position: relative;
    text-decoration: none;
    transition: .2s transform ease-in-out;
    will-change: transform;
    z-index: 0;

    &::after{
   // background-image: linear-gradient(180deg, #0e0d0df0 10%,#959695 50%, #010101f0 100%);
   // background-image: linear-gradient(135deg, #a60950 10%, #ef0101c8 100%);
   background-image: linear-gradient(135deg, #bf270cf0 10%,#9a6003 50%, #bf270cf0 100%);
    border-radius: 3rem;
    border-radius:rgb(255, 255, 255) ;
    content: '';
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    transform: translate(-100%, 0) rotate(10deg);
    transform-origin: top left;
    transition: .2s transform ease-out;
    will-change: transform;
    z-index: -1;
    }

    &:hover::after{
    transform: translate(0, 0);
    }
    &:hover{
    border: 2px solid transparent;
    color: rgb(255, 255, 255);
    transform: scale(1.05);
    will-change: transform;
    font-weight: bold;
    }

  }

  @media(max-width: 768px) {
    .form-holder {
      top: 5%;
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
      flex-direction: column;
    }
  }

</style>
