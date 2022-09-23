<template>
    <div>
      <h1>Login</h1>
        <form action="#">
          <div class="container">
            <input type="username" name="username" placeholder="Username" required>
            <input type="password" name="password" placeholder="Password" required>

            <input type="submit" v-on:click="goToUserHome" value="Login">

            <div class="bottom-container">
              <div class="row">
                <div class="col">
                  <a href="#" v-on:click="goToForgotPassword" style="color:white" class="btn">Forgot password?</a>
               </div>
              </div>
            </div>
          </div>
        </form>
    </div>
</template>

<script>
export default {
  name: 'login',
  methods: {
    goToUserHome() {
      this.$router.push('/userHome')
    },
    goToForgotPassword() {
      this.$router.push('/forgotPassword')
    }
  }
}
</script>

<style scoped>
    h1 {
        color:black
    }
    .btn {
        background-color: gray;
    }
</style>
