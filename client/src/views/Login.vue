<template>
    <!-- How to fix ajust @media  minute 12:00-->
    <!-- https://www.youtube.com/watch?v=mSAEGEAnyIY&ab_channel=OnlineTutorials -->
    <div class="home">
        <section>
          <div class="imgBx">
            <img src="@/assets/foodbackground.png"/>
          </div>
          <div class="contentBx">
            <div class="formBx">
                <h2>Login</h2>
                <form>
                   <div class="inputBx">
                    <span>Username</span>
                    <input type="text" name="">
                   </div>
                   <div class="inputBx">
                    <span>Password</span>
                    <input type="password" name="">
                   </div>
                   <div class="remember">
                    <label><input type="checkbox" name=""></label>
                   </div>
                   <div class="inputBx">
                    <span>Submit</span>
                    <input type="submit"  value="Sign in" name="">
                   </div>
                   <div class="inputBx">
                    <p>Don't have an account?<a hrf="#">Sing up</a></p>
                   </div>
                </form>
            </div>
          </div>
        </section>
    </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'login',
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

<style scoped>
* {
    margin:0;
    padding:0;
    box-sizing: border-box;
}
section{
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
}

section .imgBx{
    position: relative;
    width: 50%;
    height: 100%;
}
section .imgBx:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(225deg,#e91e63,#03a9f4);
    z-index: 1;
    mix-blend-mode: screen;
}
section .imgBx img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

section .contentBx{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;
}

section .contentBx .formBx{
    width: 50%;
}

section .contentBx .formBx h2{
   color: #607d8b;
   font-weight: 600;
   font-size: 1.5em;
   text-transform: uppercase;
   margin-bottom: 20px;
   border-bottom: 4px solid #ff4584;
   display: inline-block;
   letter-spacing: 1px;
}
section .contentBx .formBx .inputBx{
    margin-bottom: 20px;
}
section .contentBx .formBx .inputBx span{
    font-size: 16px;
    margin-bottom: 5px;
    display: inline-block;
    color:#607db8;
    font-weight: 300;
    font-size: 16;
}
section .contentBx .formBx .inputBx input{
    width: 100%;
    padding: 10px 20px;
    outline: none;
    font-weight: 400;
    border: 1px solid #607d8b;
    font-size: 16px;
    letter-spacing: 1px;
    color: #607d8b;
    background: transparent;
    border-radius: 30px;
}
section .contentBx .formBx .inputBx input [type='submit']{
    background: #ff4584;
    color:#fff;
    outline: none;
    border: none;
    font-weight: 500;
    cursor: pointer;
}
section .contentBx .formBx .inputBx input [type='submit']:hover{
    background: #f53677;
}
section .contentBx .formBx .remember{
    margin-bottom: 10px;
    color: #607d8b;
    font-weight: 400;
    font-size: 14px;
}
section .contentBx .formBx .inputBx p{
    color: #607d8b;
}
section .contentBx .formBx .inputBx p a{
    color: #ff4584;
}

@media(max-width: 768px){
    section .imgBx{
        position: absolute;
        top: 0;
        left:0;
        width: 100%;
        height: 100%;
    }
    section .contentBx{
        display: flex;
        justify-content:  center;
        align-content: center;
        width: 100%;
        height: 100%;
        z-index: 1;
    }
    section .contentBx .formBx{
        width: 100%;
        padding: 40px;
        background: rgb(255 255 255 / 0.9);
        margin: 50px;
    }
}
</style>
