<template>
  <div id="content">
    <h1>Register</h1>
    <form @submit.prevent="register">
      <input type="text" id="username" class="userInput" name="username" placeholder="Username" v-model="username"
             maxlength="30" pattern="[A-Za-z]{1,}" required
             oninvalid="this.setCustomValidity('Username must be letters only and length between 1-30 characters')"
             oninput="this.setCustomValidity('')"/>
      <br><br>
      <input type="password" id="password" class="userInput" name="password" placeholder="Password" pattern=".{6,}"
             v-model="password" maxlength="254" required
             oninvalid="this.setCustomValidity('Password must be 6-254 characters long')"
             oninput="this.setCustomValidity('')"/>
      <br><br>
      <input type="password" id="confirmPassword" class="userInput" name="confirmPassword"
             placeholder="Confirm Password"
             pattern=".{6,}" required
             oninvalid="this.setCustomValidity('Please enter password again')"
             oninput="this.setCustomValidity('')"/>
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
    /** Function for registering user  */
    register() {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      let confirmPassword = document.getElementById('confirmPassword')
      if (this.password === confirmPassword.value) {
        let urlencoded = new URLSearchParams();
        urlencoded.append("username", this.username);
        urlencoded.append("password", this.password);

        // parameters for fetch function
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
              } else if (response.status === 409) {
                alert("Username already exists")
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
#content {
  text-align: center;
  color: white;
}

#content h1 {
  font-size: 48px;
}
</style>