<template>
    <!-- to add picture see https://www.youtube.com/watch?v=u2AwJAFeaKc  8.30 example LOGO -->
    <!-- start repo https://github.com/johnkomarnicki/navigation-menu/blob/Starter-Files/package.json-->
    <header :class="{ 'scrolled-nav': scrolledNav}">
      <nav>
        <div class="branding">
          <img src="@/assets/logo.png"/>
         <!--  <h1>MyNutrionPlanner</h1>-->
        </div>
        <ul v-show="!mobile" class ="navigation">
          <li><router-link class="link" :to="{ name: 'home' }">Login</router-link></li>
          <li><router-link class="link" :to="{ name: 'register' }">Sign up</router-link></li>
        </ul>
        <div class="icon">
          <i @click="toggleMobileNav" v-show="mobile" class="far fa-bars" :class="{'icon-active':mobileNav}"></i>
        </div>
        <transition name="mobile-nav">
          <ul v-show="mobileNav" class ="dropdown-nav">
            <li><router-link class="link" :to="{ name: 'home' }">Login</router-link></li>
            <li><router-link class="link" :to="{ name: 'register' }">Sign up</router-link></li>
          </ul>
        </transition>
      </nav>
    </header>
  </template>
<script>

export default {
  name: 'NavBar',
  data() {
    return {
      scrolledNav: null,
      mobile: null,
      mobileNav: null,
      windowWidth: null
    }
  },
  created() {
    window.addEventListener('resize', this.checkScreen)
    this.checkScreen()
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll)
  },
  method: {

    toggleMobileNav() {
      this.mobileNav = !this.mobileNav
    },
    updateScroll() {
      const scrollPosition = window.scrollY
      if (scrollPosition > 50) {
        this.scrolledNav = true
        return
      }
      this.scrolledNav = false
    },
    checkScreen() {
      this.windowWidth = window.innerWidth
      if (this.windowWidth <= 750) {
        this.mobile = true
        return
      }
      this.mobile = false
      this.mobileNav = false
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
      width: 100%;
      margin-left: 5% auto;
      @media(max-width: 1140px){
        max-width: 1140%;
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
        padding: 16px;
        margin-left: 16px;
      }
      .link {
        font-size: 14px;
        transition: .5 ease all;
        padding-bottom: 4px;
        border-bottom: 1px solid transparent;// to add a hover effect

        &:hover {
          color:#0a82ebed;
          border-color: #589fea;
        }
      }

      .branding{
        display: flex;
        align-items: center;
        img{
          width: 45px;
          transition: 0.5;
          transition: .5 ease all;
          border-bottom: 1px solid transparent;// either the picture

          &:hover {
            color:#0a82ebed;
            border-color: #589fea;
          }
        }
          h1 {
          background: linear-gradient(to right, #027030,#37be19,#9bdf12);
          -webkit-text-fill-color: transparent;
          -webkit-background-clip: text;
          font-weight: bold;
          list-style: none;
          text-decoration: none;
          font-size: 30px;
          transition: .5 ease all; // or the text
          border-bottom: 1px solid transparent;// to add a hover effect
          margin-left: 10 em;

          &:hover {
            color:#0a82ebed;
            border-color: #589fea;
          }
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
        i {
          cursor: pointer;
          font-size: 24px; // size of the icon
          transition: .8 ease all;
        }
      }
      .icon-active{
        transform: rotate(180deg);
      }
      .dropdown-nav{
        display: flex;
        flex-direction: column;
        position: fixed;
        width: 100%;
        max-width: 200px;
        height: 100%;
        background:rgba(2, 9, 30, 0.926);
        top: 5%;
        right:0;

        li{
          margin-left: 0;
          .link {
            color:rgb(12, 156, 31);;
          }
        }
      }
      .mobile-nav-enter-active,
      .mobile-nav-leave-active{
        transition: 1s ease all;
      }
      .mobile-nav-enter-from
      .mobile-nav-leave-to{
        transform: translateX(-250px)
      }
      .mobile-nav-enter-to{
        transform: translateX(0);
      }
    }
  }
  .scrolled-nav{
    background-color: #000;
    box-shadow: 0 4px 6px -1px rgba(0,0,0, 0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
    nav {
      padding: 8px;

      .branding {
        img {
          width: 40 px;
          box-shadow: 0 4px 6px -1px rgba(0,0,0, 0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
        }
      }
    }
  }

  @media (max-width: 800px) {
      .navbar {
          flex-direction: column;
          align-items: flex-start;
      }

      .toggle-button {
          display: flex;
      }

      .navbar-links {
          display: none;
          width: 100%;
      }

      .navbar-links ul {
          width: 100%;
          flex-direction: column;
      }

      .navbar-links ul li {
          text-align: center;
      }

      .navbar-links ul li a {
          padding: .5rem 1rem;
      }

      .navbar-links.active {
          display: flex;
      }
  }
</style>
