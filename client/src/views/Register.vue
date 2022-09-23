<template>
  <div>
      <h1>Register</h1>
      <div>
        <form action="#">
            <div class="input-box">
                <input type="text" placeholder="Enter your username" required>
            </div>
            <div class="input-box">
                <input type="password" placeholder="Enter your password" required>
            </div>
            <div class="input-box">
                <input type="password" placeholder="Confirm your password" required>
            </div>

            <select class="form-select form-select-sm" aria-label=".form-select-sm example" required>
                <option selected>Select secret question</option>
                <option value="1">What is the name of your first pet?</option>
                <option value="2">When did your parents meet?</option>
                <option value="3">What is your favorite season?</option>
            </select>

            <div class="input-box">
                <input type="text" placeholder="Answer secret question" required>
            </div>

            <hr>
            <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

            <button type="submit" class="registerbtn">Register</button>
            <br>
            <div class="container signin">
              <p>Already have an account? <a href="#" v-on:click="goToLogin">Sign in</a>.</p>
            </div>
        </form>
      </div>
    </div>
</template>

<script>
export default {
  name: 'register',
  methods: {
    goToLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
    h1 {
        color:black
    }
</style>
