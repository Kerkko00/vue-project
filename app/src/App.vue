<template>
  <div>
    <Navbar @search="search"/>
    <Sort @sort="sort"/>
    <template v-for="idea in orderByVotes" :key="idea.id">
      <Content :idea="idea" @vote="upvote"/>
    </template>
    <div id="noresults" v-show="!orderByVotes.length">No results</div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue"
import Content from "./components/Content.vue"
import Sort from "./components/Sort.vue"

export default {
  name: 'App',
  components: {
    Navbar,
    Content,
    Sort,
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
  computed: {
    //Shows results in order chosen by the user
    orderByVotes() {
      let votes = this.ideas;
      if (this.sortOrder === "highest") {
        return votes.sort((a, b) => b.upvotes - a.upvotes)
      } else if (this.sortOrder === "lowest") {
        return votes.sort((a, b) => a.upvotes - b.upvotes)
      } else if (this.sortOrder === "search") {
        let result = votes.filter(e => (e.title.toLowerCase().includes(this.searchParams)));
        return result;
      }
      return 0;
    },
  },
  methods: {

    sort(sortOrder) {
      switch (sortOrder) {
        case "highest":
          return this.sortOrder = "highest";
        case "lowest":
          return this.sortOrder = "lowest";
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
        redirect: 'follow'
      };

      fetch(`http://127.0.0.1:3000/api/votes?post=${id}`, requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
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

#noresults {
  text-align: center;
}
</style>
