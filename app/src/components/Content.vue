<template>
  <div>
    <ul>
      <li id="title">{{ ideas.title }}</li>
      <li id="desc">{{ ideas.desc }}</li>
      <li id="upvotes">
        <button>&uArr;</button>
        {{ ideas.upvotes }}
      </li>
      <li id="user">By {{ ideas.user }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Content",
  data() {
    return {}
  },
  methods: {},
  props: {
    ideas: Object,
  },
}
</script>

<style scoped>
div {
  border: 1px solid black;
  padding: 1.5em;
  margin: 1em;
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

#user {
  font-style: oblique;
}
</style>