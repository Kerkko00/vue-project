<template>
  <nav class="navbar">
    <ul>
      <li class="navbtn"><a href="#">Home</a></li>
      <li class="navbtn" id="search">
        <form>
          <input type="text" placeholder="Search" v-model="searchParams" @input="submitSearch"/>
<!--          <button v-on:click.prevent="submitSearch">Search</button>-->
        </form>
      </li>
      <ul v-if="!loggedin">
        <li class="navbtn"><a href="#">Login</a></li>
        <li class="navbtn"><a href="#">Register</a></li>
      </ul>
      <ul v-else>
        <li class="navbtn"><a href="#">My ideas</a></li>
        <li class="navbtn"><a href="#">Log out</a></li>
      </ul>
    </ul>
  </nav>
</template>
<script>
export default {
  name: "Navbar",
  data() {
    return {
      loggedin: false,
      searchParams: "",
    }
  },
  methods: {
    submitSearch() {
      return this.$emit("search", this.searchParams)
    }
  },
  emits: ["search"]
}
</script>

<style scoped>
.navbar {
  background-color: lightsalmon;
}

a {
  color: black;
  text-decoration: none;
  font-weight: bold;
}

.navbtn {
  padding: 1em 1.5em;
  text-align: center;
  border-bottom: 1px solid black;
  /* Centers text vertically */
  line-height: 150%;
}

.navbtn:hover {
  background-color: lightcoral;
}

#search input {
  padding: 0.5em;
  outline: none;
  border: none;
  border-radius: 1em;
  width: 90%;
}

/*
#search button {
  padding: 0.5em;
  border: none;
  border-radius: 1em;
}
 */

#search:hover {
  background: none;
}

#search input:focus {
  border: 1px solid blue;
}

@media only screen and (min-width: 600px) {
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