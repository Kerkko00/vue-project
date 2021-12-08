<template>
  <div id="content">
    <h1>Login</h1>
    <h2>Please login with your user credentials</h2>
    <form @submit.prevent="login">
      <input type="text" id="username" class="userInput" name="username" placeholder="Username" v-model="username" required
             oninvalid="this.setCustomValidity('Please enter username')"
             oninput="this.setCustomValidity('')"/>
      <br><br>
      <input type="password" id="password" class="userInput" name="password" placeholder="Password" v-model="password" required
             oninvalid="this.setCustomValidity('Please enter password')"
             oninput="this.setCustomValidity('')"/>
      <br><br>
      <input type="submit" class="button" value="Login">
      <p>or</p>
      <a id="toregister" style="font-size: 12px;" @click="this.$router.push({name:'Register'})">Create an account</a>
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
            if (response.status === 200) {
              this.$router.push({name: "Home"})
            } else if (response.status !== 200) {
              alert("Wrong username or password")
            }
            return response.text()
          })
          .then(result => {
            let msg = JSON.parse(result)
            if (msg.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              let data = {"token": msg.token, "user": msg.user.username, "user_id": msg.user.id}

              localStorage.setItem("data", JSON.stringify(data));
              this.$emit("login");
            }
          })
          .catch(error => console.log('error', error));
    }
  },
  emits: ["login"]
}
</script>

<style scoped>
#toregister {
  cursor: pointer;
  text-decoration: underline;
}
#content {
  text-align: center;
  color: white;
}

#content h1 {
  font-size: 48px;
}
</style>