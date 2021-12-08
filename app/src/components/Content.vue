<template>
  <div>
    <ul>
      <li id="title">{{ idea.title }}</li>
      <li id="desc">{{ idea.description }}</li>
      <li id="upvotes">
        <button id="upvotebutton" v-on:click="vote" :disabled="hasVoted || isDisabled"><img src="@/assets/images/upvote.png"></button>
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
      isDisabled: false,
    }
  },
  computed:{
    hasVoted(){
      console.log(this.user_id)
      console.log(this.idea.voters)
    if(this.idea.voters.split(',').includes(this.user_id.toString()) == true || this.user == ""){
      return true;
    }
    return false;
    }
  },
  methods: {
    vote() {
      this.isDisabled = true;
      //this.src = "@/assets/images/upvote.png"
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
  background-color: white;
  border: 4px solid #116466;
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

#upvotes img {
  width: 50px;
}

#upvotes button:disabled {
 filter: grayscale(100%);
}

@media only screen and (min-width: 450px) {
  #upvotes {
    float: right;
  }
}
</style>