<template>
  <nav class="navbar">
    <ul>
      <li class="navbtn"><a href="#">Home</a></li>
      <li class="navbtn" id="search">
        <form>
          <input type="text"/>
          <button>Search</button>
        </form>
      </li>
      <ul v-if="!loggedin">
        <li class="navbtn"><a href="#">Login</a></li>
        <li class="navbtn"><a href="#">Register</a></li>
      </ul>
      <ul v-else>
        <li class="navbtn"><a href="#">My ideas</a></li>
        <li class="navbtn"><a href="#">Profile</a></li>
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
    }
  },
}
</script>

<style scoped>
.navbar {
  background-color: lightsalmon;
}

a {
  color: black;
  text-decoration: none;
}

.navbar ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.navbtn {
  padding: 1em;
  background-color: lightseagreen;
}

.navbtn a {
  padding: 1em;
}

.navbtn:hover {
  background-color: lightcoral;
}

#search button {
  font-size: x-large;
  border: none;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}

#search:hover {
  background-color: lightseagreen;
}
</style>