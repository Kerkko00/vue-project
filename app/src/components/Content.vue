<template>
  <div>
    <ul>
      <li id="title">{{ idea.title }}</li>
      <li id="desc">{{ idea.description }}</li>
      <li id="upvotes">
        <button id="upvotebutton" v-on:click="vote" :disabled="hasVoted || isDisabled"><img alt="Thumbs up button"
                                                                                            src="@/assets/images/upvote.png">
        </button>
        {{ idea.upvotes }}
      </li>
      <li id="author">By {{ idea.author }}</li>
    </ul>
    <button class="button" id="deleteButton" v-if="idea.author === this.user" @click.prevent="deleteIdea">Delete</button>
  </div>
</template>

<script>
export default {
  name: "Content",
  data() {
    return {
      isDisabled: false,
    }
  },
  computed: {
    /** Checks if user is not signed in or has already voted on a post */
    hasVoted() {
      return this.idea.voters.split(',').includes(this.user_id.toString()) === true || this.user === "";
    }
  },
  methods: {
    /** Handles voting button by disabling it and emitting voted idea */
    vote() {
      this.isDisabled = true;
      return this.$emit("vote", this.idea.id)
    },
    /** Handles deleting an idea by emitting its id when delete is clicked */
    deleteIdea() {
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

#upvotes {
  font-weight: bolder;
  font-size: xx-large;
}

#upvotes button {
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

#deleteButton {
  font-size: 14px;
  margin-bottom: 0;
}

@media only screen and (min-width: 450px) {
  #upvotes {
    float: right;
  }
}
</style>