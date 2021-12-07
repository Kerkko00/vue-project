<template>
  <div>
    <ul>
      <li id="title">{{ idea.title }}</li>
      <li id="desc">{{ idea.description }}</li>
      <li id="upvotes">
        <button v-on:click="vote" v-if="hasVoted">&uArr;</button>
        {{ idea.upvotes }}
      </li>
      <li id="author">By {{ idea.author }}</li>
    </ul>
    <button v-if="idea.author === this.user" @click.prevent="deleteIdea">Delete</button>
  </div>
</template>

<script>
export default {
  name: "Content",
  data() {
    return{

    }
  },
  computed:{
    hasVoted(){
      console.log(this.user_id)
      console.log(this.idea.voters)
    if(this.idea.voters.includes(this.user_id) == true || this.user == ""){
      return false;
    }
    return true;
    }
  },
  methods: {
    vote() {

      return this.$emit("vote", this.idea.id)
    },
    deleteIdea(){
      return this.$emit("delete", this.idea.id)
    }
  },
  props: {
    idea: Object,
    user: String,
    user_id: Number,
  },
}
</script>

<style scoped>
div {
  border: 1px solid black;
  padding: 1.5em;
  margin: 1em;
  border-radius: 3px;
}

#title {
  font-weight: bold;
  font-size: x-large;
}

#desc {
  font-style: italic;
}

#upvotes {
  float: right;
  font-weight: bolder;
  font-size: xx-large;
}

#upvotes button {
  font-size: x-large;
  background: none;
  border: none;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}

#author {
  font-style: oblique;
}
</style>