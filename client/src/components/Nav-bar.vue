<template>
  <!-- to add picture see https://www.youtube.com/watch?v=u2AwJAFeaKc  8.30 example LOGO -->
  <!-- start repo https://github.com/johnkomarnicki/navigation-menu/blob/Starter-Files/package.json-->
  <header :class="{ 'scrolled-nav': scrollPosition}">
    <nav>
      <div class="branding">
        <img src="@/assets/logo.png"/>
      </div>
      <ul v-show="!mobile" class ="navigation">
        <li><router-link class="link" :to="{ name: 'home' }">Login</router-link></li>
        <li><router-link class="link" :to="{ name: 'register' }">Sign up</router-link></li>
      </ul>
      <div class="icon">
        <i @click="toggleMobileNav" v-show="mobile" class="far fa-bars" :class="{'icon-active':mobileNav}"></i>
      </div>
      <transition name="mobile-nav"></transition>
        <ul v-show="mobile" class ="dropdown-nav">
          <li><router-link class="link" :to="{ name: 'home' }">Login</router-link></li>
        <li><router-link class="link" :to="{ name: 'register' }">Sign up</router-link></li>
        </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      scrollPosition: null,
      mobile: false,
      mobileNav: null,
      windWdth: null
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  background-color: rgba(2, 9, 30, 0.926);
  z-index: 99;
  width: 100%;
  position: fixed;
  transition: .5 ease all;
  color:#fff;

  nav {
    position: relative;
    display: flex;
    flex-direction: row;
    padding: 12px 0;
    transition: .5 ease all;
    width: 90;
    margin: 0 auto;
    @media(min-width:1140px){
      max-width: 1140px;
    }
    ul,
    .link {
      font-weight: 500;
      color:rgb(12, 156, 31);
      list-style: none;
      text-decoration: none;
    }
    li {
      text-transform: uppercase;
      padding: 16 px;
      margin-left: 16px;
    }
    .link {
      font-size: 14px;
      transition: .5 ease all;
      border-bottom: 1px solid transparent;// to add a hover effect

      &:hover {
        color:#0a82ebed;
        border-color: #589fea;
      }
    }

    .branding{
      display: flex;
      align-items: left;
      img{
        width: 45px;
        transition: 0.5;
      }
    }
    .navigation {
      display: flex;
      align-items: center;
      flex:1;
      justify-content: flex-end;
    }
    .icon {
      display:flex;
      align-items: center;
      position:absolute;
      top:0;
      right: 24px;
      height: 100%;
      i{
        cursor: pointer;
        font-size: 24px;
        transition: .8 ease all;
      }
    }
    .icon-active{
      transform: rotate(180deg);
    }
  }
}
</style>
