<template>
  <div>
    <Navbar/>
    <div class="buttons">
      <button class="orderbutton" @click.prevent="sort('highest')">Sort by highest</button>
      <button class="orderbutton" @click.prevent="sort('lowest')">Sort by lowest</button>
    </div>
    <template v-for="idea in orderByVotes" :key="idea.id">
      <Content :idea="idea" @vote="upvote"/>
    </template>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue"
import Content from "./components/Content.vue"

export default {
  name: 'App',
  components: {
    Navbar,
    Content,
  },
  created(){
    this.fetchData();
  },
  data() {
    return {
      ideas: [],
      sortOrder: "lowest"
    }
  },
  computed: {
    orderByVotes() {
      let votes = this.ideas;
      if (this.sortOrder === "highest") {
        return votes.sort((a, b) => b.upvotes - a.upvotes)
      } else if (this.sortOrder === "lowest") {
        return votes.sort((a, b) => a.upvotes - b.upvotes)
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
    upvote(id) {

      this.ideas.forEach(idea => {
        if (idea.id === id) {
          idea.upvotes++;
        }
      })
    },
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
    }
  }
}
</script>

<style>
html {
  font-family: Arial, sans-serif;
}

ul {
  padding: 0;
  margin: 0;
}

li {
  list-style-type: none;
}


.orderbutton {
  background-color: white;
  color: black;
  border: 2px solid #555555;
  padding: 6px 14px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 5px;
}

.orderbutton:hover {
  background-color: #555555;
  color: white;
  border: 2px solid #555555;
}

.buttons {
  margin: 15px 5px;
  display: flex;
  justify-content: flex-end;
  margin: 0em 1em;
  margin-top: 1em;
}

</style>
