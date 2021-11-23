<template>
  <div>
    <Navbar/>
    <template v-for="idea in ideas" :key="idea">
      <Content :ideas="idea"/>
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
  data() {
    return {
      ideas: [
        {title: "Something", desc: "This is something cool", user: "bob", upvotes: 12},
        {title: "Something else", desc: "This is something super cool ", user: "sam", upvotes: 15},
        {title: "Something sick", desc: "This is something amazingly cool", user: "joe", upvotes: 23},
        {title: "Something crazy", desc: "This is something amazingly crazy", user: "kek", upvotes: 33},
      ]
    }
  },


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
</style>
