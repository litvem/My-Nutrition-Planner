<template>
    <div>
        <form action="#">
            <div>
            <h1>Forgot password</h1>
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
