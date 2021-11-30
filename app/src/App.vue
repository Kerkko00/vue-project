<template>
  <div>
    <Navbar @search="search"/>
    <ContentManager @sort-order="sort" @ideaContents="addIdea"/>
    <template v-for="idea in orderByVotes" :key="idea.id">
      <Content :idea="idea" @vote="upvote" @delete="deleteIdea"/>
    </template>
    <div id="noresults" v-show="!orderByVotes.length">No results</div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data(){
    return {
      searchParams: "",
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
