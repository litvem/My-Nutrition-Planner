<template>
    <div>
        <h1>Forgot password</h1>

        <form action="#">
            <div class="input-box">
                <input type="text" placeholder="Enter your username" required>
            </div>

            <select class="form-select form-select-sm" aria-label=".form-select-sm example" required>
                <option selected>Select your secret question</option>
                <option value="1">What is the name of your first pet?</option>
                <option value="2">When did your parents meet?</option>
                <option value="3">What is your favorite season?</option>
            </select>

            <div class="input-box">
                <input type="text" placeholder="Answer secret question" required>
            </div>

            <div class="input-box">
                <input type="password" placeholder="Enter new password" required>
            </div>

            <div class="input-box">
                <input type="password" placeholder="Confirm new password" required>
            </div>

            <div class="input-box">
              <input type="submit" class="submit" v-on:click="goToUserHome" value="Reset password">
            </div>
        </form>
    </div>
</template>

<script>

export default {
  name: 'forgotPassword',

  methods: {
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
</style>
