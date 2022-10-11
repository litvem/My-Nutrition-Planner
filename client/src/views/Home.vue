<template>
  <div class = "Welcomeview navbar-expand-md">
     <div class="animation">
        <TextAnimation/>
     </div>
     <section>
        <div class="contentBx navbar-expand-md">
           <div class="welcome-text">
               <h2>Looking for a place to store your favourite recipes? <br />
               Make weekly shopping easier?<br />
               Keep track of your meals and stay healthy?<br /><br/>
               Then this is the right place for you!
               </h2>
               <hr />
              </div>
           </div>
        <form class="loginBx navbar-expand-md">
           <div class="login-form">
              <h3>Login</h3>
              <hr />
              <br>
              <div class="inputs">
              <input type="text" v-model="username" placeholder="username">
              <br>
              <input type="password" v-model="password" placeholder="password">
              </div>
              <br>
              <button @click="handleSubmit">Login</button>
              <div class="inputBx">
                   <br>
                   <p>Don't have an account?</p>
                   <router-link class="link" :to="{ name: 'register' }">Register now</router-link>
              </div>
           </div>
        </form>
       </section>
   </div>
</template>

<script>
import { Api } from '@/Api'
import TextAnimation from '../components/TextAnimation.vue'
export default {
  name: 'home',
  components: {
    TextAnimation
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
      })
        .then(response => {
          if (response.data.message === 'Authentication successful') {
            localStorage.token = response.data.token
            localStorage.setItem('id', response.data.id)
            this.$router.push('/userHome')
            this.$router.go(0)
          } else {
            this.$router.push('/')
            this.$router.go(0)
            // Emma TODO: here we need to do the red notification for wrong password or username.
          }
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
* {
    margin:0;
    padding:0;
    box-sizing: border-box;
}

.Welcomeview {
  background-image: url("../assets/foodbackground.jpg");
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  width: 100%;
  height: 100vh;
  margin: auto;
  position: absolute;
}
.animation {
  font-family: 'Georgia';
  background-origin: padding-box;
}

section{
    position: absolute;
    width: 60%;
    height: 60%;
    display: flex;
    margin-top: 15%;
    margin-left: 15%;
    z-index: 1;
}

section .contentBx{
    background-color:rgba(30, 30, 31, 0.486);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;
    margin-left: -10%;
}

section .contentBx .welcome-text{
    width: 80%;
}
section .contentBx .welcome-text h2{
    font-size: 100%;
    margin-bottom: 5px;
    display: inline-block;
    color:#ffffff;
    font-weight: 400;
    font-size: 30px;
}

section .loginBx{
   background-color: rgba(7, 6, 9, 0.457);
   display: flex;
   justify-content: center;
   align-items: center;
   width: 50%;
   height: 100%;
}

section .loginBx .login-form{
   width: 70%;
}

section .loginBx .login-form h3{
   color: #ffffff;
   font-weight: 600;
   font-size: 30xp;
   text-transform: uppercase;
   margin-top: 60px;
   border-bottom: 4px solid rgba(209, 1, 1, 0.956);
   display: inline-block;
   letter-spacing: 2px;
}

section .loginBx .login-form input{
   width: 100%;
   padding: 10px 20px;
   outline: none;
   font-weight: 400;
   border: 1px solid #607d8b;
   font-size: 16px;
   letter-spacing: 1px;
   color: #fbfbfc;
   background: transparent;
   border-radius: 30px;
   margin-top: 10px;
}

section .loginBx .login-form button {
   width: 100%;
   padding: 10px 20px;
   outline: none;
   font-weight: 400;
   border: 1px solid #2e6783;
   font-size: 16px;
   letter-spacing: 1px;
   color: #042333;
   border-radius: 30px;
   margin-top: 10px;
}

section .loginBx .login-form p {
   color: #ffffff;
}

.link{
    color: rgb(12, 156, 31);
}

@media(max-width: 1200px){
  section {
    position: absolute;
    width: 80%;
    height: 60%;
    display: flex;
    margin-top: 29%;
    margin-left: 10%;
    z-index: 1;
}
  section .contentBx .welcome-text h2{
    font-size: 25px;
  }
  section .loginBx .login-form h3{
   font-size: 1.3em;
  }

}

@media(max-width: 768px){
  .contentBx .welcome-text h2{
    font-size: 15px;
    font-weight: 200;
  }
}

</style>
