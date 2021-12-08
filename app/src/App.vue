<template>
  <div>
  <nav class="navbar">
    <ul>
      <li class="navbtn"><router-link to="/" @click.prevent="reload">Home</router-link></li>
      <li class="navbtn" id="search">
        <form>
          <input type="text" placeholder="Search" v-model="searchParams"/>
        </form>
      </li>
      <ul v-if="!loggedin">
        <li class="navbtn"><router-link to="/login">Login</router-link></li>
        <li class="navbtn"><router-link to="/register">Register</router-link></li>
      </ul>
      <ul v-else>
        <li class="navbtn"><a>Hey, {{ user }}</a></li>
        <li class="navbtn"><a href="#" @click.prevent="logout">Log out</a></li>
      </ul>
    </ul>
  </nav>
  <router-view :user_id="user_id" :searchP="searchParams" :logged="loggedin" :token="token" :user="user" @logout="logout" @login="storage"/>

  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  mounted(){
    this.storage();
  },
  data(){
    return {
    token: "",
      user: "",
      loggedin: false,
      searchParams: "",
      user_id: -1,
    }
  },
  methods: {
    storage(){
    let data = localStorage.getItem("data");
      if(data != null) {
        let {token, user, user_id} = JSON.parse(data);
        this.loggedin = true;
        this.token = token;
        this.user = user;
        this.user_id = user_id;
      }
    },
    logout(){
      localStorage.removeItem("data");
      this.token = "";
      this.user = "";
      this.user_id = -1,
      this.loggedin = false;
    },
    reload() {
      if (this.$route.path === "/") {
        location.reload();
      }
    }
  }
}
</script>

<style>
/*
Colors:


 */
html {
  font-family: Arial, sans-serif;
}

body {
  min-height:100vh;
  margin: 0;
  background: linear-gradient(to bottom, #3C4B4D, #2C3531) no-repeat;
}

ul {
  padding: 0;
  margin: 0;
}

li {
  list-style-type: none;
}

img {
  max-width: 100%;
  height: auto;
}

.navbar {
  background-color: #116466;
}

.navbtn a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  padding: 1em;
  display: inline-block;
}

.navbtn {
  text-align: center;
  /* Centers text vertically */
  line-height: 150%;
}

.navbtn:hover {
  background-color: #F15025;
  transition-duration: 0.2s;
}

#search {
  margin: auto 0;
}

#search input {
  padding: 0.5em;
  outline: none;
  border: none;
  border-radius: 1em;
  width: 90%;
}

#search:hover {
  background: none;
}

#search input:focus {
  border: 2px solid #F15025;
}

.button {
  background-color: white;
  color: black;
  border: 2px solid #555555;
  padding: 6px 14px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.2s;
  cursor: pointer;
  border-radius: 5px;
}

.button:hover {
  background-color: #F15025;
  color: white;
  border: 2px solid #555555;
}

.userInput {
  font-size: 14px;
  padding: 0.5em;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.userInput:focus {
  outline: 2px solid #116466;
}

.userInput:invalid {
  border: 2px solid red;
}

@media only screen and (min-width: 650px) {
  .navbar ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .navbtn {
    font-size: 20px;
  }

  .navbtn:last-child {
    border-left: none;
  }

  #search {
    border: none;
    flex-grow: 2;
  }

  #search input {
    font-size: 16px;
  }
}
</style>