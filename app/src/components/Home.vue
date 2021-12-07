<template>
  <div>
    <ContentManager @sort-order="sort" @ideaContents="addIdea" :logged="logged"/>
    <template v-for="idea in orderByVotes" :key="idea.id">
      <Content :idea="idea" @vote="upvote" @delete="deleteIdea" :user="user" :user_id="user_id"/>
    </template>
    <div id="noresults" v-show="!orderByVotes.length">No results</div>
  </div>
</template>

<script>

import Content from "./Content.vue"
import ContentManager from "./ContentManager.vue"

export default {
  name: 'Home',
  components: {

    Content,
    ContentManager,
  },
  created(){
    this.fetchData();
  },
  data() {
    return {
      ideas: [],
      sortOrder: "highest",
      searchParams: "",
    }
  },
  watch: {
    searchP(newVal){
      this.searchParams = newVal;
      if(this.searchParams != ""){
        this.search(this.searchParams);
      }
    }
  },
  computed: {
    //Shows results in order chosen by the user
    orderByVotes() {
      let votes = this.ideas;
      if (this.sortOrder === "highest") {
        return votes.sort((a, b) => b.upvotes - a.upvotes)
      } else if (this.sortOrder === "lowest") {
        return votes.sort((a, b) => a.upvotes - b.upvotes)
      } else if (this.sortOrder === "search") {
        return votes.filter(e => (e.title.toLowerCase().includes(this.searchParams)));
      } else if (this.sortOrder === "own") {
        return votes.filter(e => (e.author === this.user));
      }
      return 0;
    },
  },
  props: ["searchP", "logged", "token", "user", "order", "user_id"],
  methods: {
    sort(sortOrder) {
      switch (sortOrder) {
        case "highest":
          return this.sortOrder = "highest";
        case "lowest":
          return this.sortOrder = "lowest";
        case "own":
          return this.sortOrder = "own";
      }
    },
    //Saves upvotes to database with REST api
    upvote(id) {
      this.ideas.forEach(idea => {
        if (idea.id === id) {
          idea.upvotes++;
        }
      });
      let requestOptions = {
        method: 'POST',
        redirect: 'follow',
        headers: {
          'Authorization': 'Bearer ' + this.token,
        },
      };

      fetch(`http://127.0.0.1:3000/api/votes?post=${id}`, requestOptions)
          .then(response => response.text())
          .then(result => {
            if(result == "Wrong JWT"){
              console.log("logging out")
              this.$emit("logout");
              this.$emit.push({name: "Login"})
            }
            console.log(result)

          })
          .catch(error => console.log('error', error));
    },
    //Fetches idea data from REST api
    async fetchData(){
      let requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      await fetch("http://127.0.0.1:3000/api/ideas", requestOptions)
          .then(response => response.text())
          .then(result => {
            console.log(JSON.parse(result))
            this.ideas = JSON.parse(result);
          })
          .catch(error => console.log('error', error));
    },
    search(searchParams) {
      console.log(searchParams)
      this.sortOrder = "search"
      this.searchParams = searchParams.toLowerCase()
      if(searchParams == "") this.sortOrder = "highest";
    },
    addIdea(title, description) {
      console.log(title, description)
      let raw = JSON.stringify({
        "title": title,
        "description": description,
      });
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("X-Requested-With", "xmlhttprequest");
      myHeaders.append("Authorization", "Bearer " + this.token);

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("http://localhost:3000/api/postIdea", requestOptions)
          .then(response => response.text())
          .then(result => {
            if(result == "Wrong JWT"){
              console.log("logging out")
              this.$emit("logout");
              this.$router.push({name: "Login"})
            }
            this.ideas.push({id: result, title: title, description: description, author: this.user, upvotes: 0, voters: ""})
          })
          .catch(error => console.log('error', error));
    },
    deleteIdea(id){
      let requestOptions = {
        method: 'DELETE',
        redirect: 'follow',
        headers: {
          'Authorization': 'Bearer ' + this.token,
        },
      }
      fetch(`http://127.0.0.1:3000/api/deleteIdea?id=${id}`, requestOptions)
          .then(response => response.text())
          .then(result => {
            console.log(result)
            if(result == "Wrong JWT"){
              console.log("logging out")
              this.$emit("logout");
              this.$router.push({name: "Login"})
            }
          })
          .catch(error => console.log('error', error));
      this.ideas = this.ideas.filter(e => (e.id != id));
    }
  }
}
</script>

<style scoped>
#noresults {
  text-align: center;
}
</style>
