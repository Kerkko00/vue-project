<template>
  <div>
<h1>Login</h1>
  <form>
    <label for="username">Username: </label>
    <input type="text" id="username" name="username" v-model="username"/>
    <br><br>
    <label for="password">Password: </label>
    <input type="password" id="password" name="password" v-model="password"/>
    <br><br>
    <button type="submit" class="button" @click.prevent="login">Login</button>
  </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    login() {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      let urlencoded = new URLSearchParams();
      urlencoded.append("username", this.username);
      urlencoded.append("password", this.password);

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };

      fetch("http://localhost:3000/api/users/login", requestOptions)
          .then(response => {
            console.log(response)
            if (response.status === 200) {
              this.$router.push({name: "Home"})
            }
           return response.text()
          })
          .then(result => {
            console.log(result)
            let msg = JSON.parse(result)
            console.log(msg.token)
            console.log(msg.user.username)
            if (msg.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('token', msg.token);
              localStorage.setItem("user", msg.user.username);
              this.$emit("login");
            }
          })
          .catch(error => console.log('error', error));
    }
  }
}
</script>

<style scoped>

</style>