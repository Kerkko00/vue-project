<template>
  <div>
  <nav class="navbar">
    <ul>
      <li class="navbtn"><router-link to="/">Home</router-link></li>
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
        <li class="navbtn"><a href="#">Hei, {{ user }}</a></li>
        <li class="navbtn"><a href="#" @click.prevent="logout">Log out</a></li>
      </ul>
    </ul>
  </nav>
  <router-view :searchP="searchParams" @login="storage"/>

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
    }
  },
  methods: {
    storage(){
      let token = localStorage.getItem("token")
      let user = localStorage.getItem("user")
      console.log("testi " + user)
      if(token != null && user != null) {
        this.loggedin = true;
        this.token = token;
        this.user = user;
      }
    },
    logout(){
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      this.token = "",
      this.user = "",
      this.loggedin = false;
    }
  }
}
</script>

<style>
html {
  font-family: Arial, sans-serif;
}

body {
  margin: 0;
}

ul {
  padding: 0;
  margin: 0;
}

li {
  list-style-type: none;
}

.navbar {
  background-color: lightsalmon;
}

.navbtn a {
  color: black;
  text-decoration: none;
  font-weight: bold;
  padding: 1em;
  display: inline-block;
}

.navbtn {
  text-align: center;
  border-bottom: 1px solid black;
  /* Centers text vertically */
  line-height: 150%;
}

.navbtn:hover {
  background-color: lightcoral;
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
  border: 1px solid blue;
}

@media only screen and (min-width: 650px) {
  .navbar ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .navbtn {
    border: 1px solid black;
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