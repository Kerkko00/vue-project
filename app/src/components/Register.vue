<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <label for="username">Username: </label>
      <input type="text" id="username" name="username" v-model="username" maxlength="30" pattern="[A-Za-z]{1,}" required/>
      <br><br>
      <label for="password">Password: </label>
      <input type="password" id="password" name="password" pattern="([A-Za-z]{1,}).{6,}" v-model="password" maxlength="254" required/>
      <br><br>
      <label for="confirmPassword">Confirm Password: </label>
      <input type="password" id="confirmPassword" name="confirmPassword" required/>
      <br><br>
      <input type="submit" class="button" value="Register">
    </form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    register() {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      let confirmPassword = document.getElementById('confirmPassword')
      if (this.password === confirmPassword.value) {
        let urlencoded = new URLSearchParams();
        urlencoded.append("username", this.username);
        urlencoded.append("password", this.password);

        let requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };

        fetch("http://localhost:3000/api/users/register", requestOptions)
            .then(response => {
              console.log(response)
              if (response.status === 201) {
                this.$router.push({name: "Home"})
              }
              return response.text()
            })
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
      } else {
        alert("Passwords don't match")
      }
    }
  }
}
</script>

<style scoped>

</style>