<template>
  <div>
    <ul>
      <li id="title">{{ idea.title }}</li>
      <li id="desc">{{ idea.description }}</li>
      <li id="upvotes">
        <button v-on:click="vote">&uArr;</button>
        {{ idea.upvotes }}
      </li>
      <li id="author">By {{ idea.author }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Content",
  data() {
    return {}
  },
  methods: {
    vote() {

      return this.$emit("vote", this.idea.id)
    }
  },
  props: {
    idea: Object,
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