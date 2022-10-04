<template>
  <nav class="navbar">
    <div class="brand-title">
      <img src="@/assets/logo.png"/>
      <h1>MyNutrionPlanner</h1>
    </div>
    <a href="#" v-on:click="toggleButton" class="toggle-button">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </a>
    <div class="navbar-links">
      <ul>
        <li><router-link class="link" :to="{ name: 'home' }">Login</router-link></li>
        <li><router-link class="link" :to="{ name: 'register' }">Sign up</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    toggleButton() {
      document.getElementsByClassName('navbar-links')[0].classList.toggle('active')
    }
  }
}

</script>

<style lang="scss" scoped>
* {
    transition: .5 ease all;
    z-index: 99;
}

.navbar {
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(1, 0, 0);
  padding: 10px 0;
  transition: .5 ease all;
}

.brand-title {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  margin: .5rem;
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
      color:rgb(12, 156, 31);
      font-weight: bold;
      margin-left: 5%;
      list-style: none;
      text-decoration: none;
      font-size: 30px;
      transition: .5 ease all; // or the text
      border-bottom: 1px solid transparent;// to add a hover effect

      &:hover {
        color:#0a82ebed;
        border-color: #589fea;
      }
    }
}

.navbar-links {
    height: 100%;
    font-weight: 500;
    color:rgb(12, 156, 31);
    list-style: none;
    text-decoration: none

}

.navbar-links ul {
    display: flex;
    margin: 0;
    padding: 0;
    transition: .5 ease all;
}

.navbar-links li {
    list-style: none;
}

.navbar-links li a {
    display: block;
    text-decoration: none;
    color:rgb(12, 156, 31);;
    padding: 1rem;
    border-bottom: 1px solid transparent;// to add a hover effect

    &:hover {
    color:#0a82ebed;
    border-color: #589fea;
}
}

.toggle-button {
    position: absolute;
    top: .75rem;
    right: 1rem;
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 21px;
}

.toggle-button .bar {
    height: 3px;
    width: 100%;
    background-color: white;
    border-radius: 10px;
}

@media screen and (max-width: 800px) {
    .navbar {
      flex-direction: column;
      align-items: flex-start;

    }
    .brand-title {
      display: flex;
      align-items: center;
      font-size: 1.5rem;
      img{
        width: 10%;
      }
      h1 {
        text-align: right;
        font-size: 1.5rem;
      }
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
      flex-direction: column
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
