<template>
  <div class="Home">
    <div class="Welcomeview">
    <div class="box-form">
      <div class="wellcome-text container">
        <h1>MyNutrionPlanner</h1>
        <hr />
        <h2>Looking for a place to store your favourite recipes? <br />
            Make weekly shopping easier?<br />
            Keep track of your meals and stay healthy?<br /><br/>
            Then this is the right place for you!
        </h2>
        <hr />
      </div>
      <div class="right">
        <h3>Login</h3>
        <hr />
        <br>
        <div class="inputs">
          <input type="text" placeholder="username">
          <br>
          <input type="password" placeholder="password">
        </div>
        <br><br>
        <div class="forget-password">
          <a href="" v-on:click="goToForgoPassword">Forgot password?</a>
        </div>
        <br>
        <button v-on:click="goToUserHome">Login</button>
        <button v-on:click="goToRegister">Register</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  components: {
  },
  data() {
    return {
      message: 'none'
    }
  },
  methods: {
    goToUserHome() {
      this.$router.push('/userHome')
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

<style lang="scss" scoped>
.Welcomeview {
  background-image: url("../assets/foodbackground.png");
  background-size: cover;
  background-attachment: fixed;
  position: relative;
  height: 100vh;
  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
}
.box-form {
  margin: 0 auto;
  width: 50% auto;
  background-color: rgba(2, 9, 30, 0.842);
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px 6px #09345f60;
  position: absolute;
  top:50%;
  left:40%;
  transform: translate(-50%,-50%);
}
.box-form .wellcome-text {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 80px;
  display:flex;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  @media(max-width: 500px) {
    .box-form .right {
      width: 100%;
    }
  }
    h1 {
      color: rgb(253, 250, 250);
      text-transform: uppercase;
      font-size: 40px;
      font-weight: bold;
      background: linear-gradient(to right, #027030,#37be19,#9bdf12);
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text;

    }
    h2 {
      color: rgb(253, 250, 250);
      font-size: 22px;
      padding-bottom: 4px;
      @media (min-width: 200px) {
        font-size: 20px;
      }
    }
    hr:nth-child(2) {
      height: 3px;
      background-color: rgba(6, 245, 90, 0.591);
      border: none;
      max-width: 700px;
      margin-top: 16px;
    }
}
.box-form .right {
  width: 60%;
  height: 100%;
  padding: 40px;
  overflow: hidden;
  @media (max-width: 700px) {
    .box-form .right {
      width: 100%;
    }
  }
  h3 {
    text-transform: uppercase;
    color: #ffff;
    font-size: 40px;
    @media (min-width: 300px) {
      font-size: 40px;
    }
  }

  hr:nth-child(2) {
      height: 3px;
      background-color: rgba(3, 106, 39, 0.74);
      border: none;
      max-width: 180px;
      margin-top: 5px;
  }

  p {
    font-size: 14px;
    color: #ffff;
  }
  .inputs {
    overflow: hidden;
    }
  input {
    width: 100%;
    padding: 10px;
    margin-top: 25px;
    font-size: 16px;
    border: none;
    outline: none;
    border-bottom: 2px solid #B0B3B9;
  }
  .forget-password {
    color:#fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    input {
      margin: 0;
      margin-right: 7px;
      width: auto;
    }
  }
  button {
    float: right;
    color: #fff;
    font-size: 16px;
    padding: 12px 35px;
    border-radius: 50px;
    display: inline-block;
    border: 0;
    outline: 0;
    box-shadow: 0px 4px 20px 0px #436c38a6;
    background-image: linear-gradient(135deg, #2f61b2 10%, #27d969a6 100%);
  }
}
.btn {
  margin-bottom: 10%;
  margin-left: 10%;
}

label {
  display: block;
  position: relative;
  margin-left: 30px;
}
</style>
