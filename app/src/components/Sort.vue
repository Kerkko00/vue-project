<template>
  <div class="buttons">
    <div>
      <button class="orderbutton" @click.prevent="addIdea()">Add idea</button>
      <button class="orderbutton" @click.prevent="deleteIdea()">Delete idea</button>
    </div>
    <div>
      <button class="orderbutton" @click.prevent="sort('highest')">Sort by highest</button>
      <button class="orderbutton" @click.prevent="sort('lowest')">Sort by lowest</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sort",
  methods: {
    sort(order){
      this.$emit("sort", order);
    },
    addIdea(){
      //jotain keksiä
    },
    deleteIdea(){
      // tähä myös
    }

  }
}
</script>

<style scoped>
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
  margin: 0em 1em;
  margin-top: 1em;
  display: flex;
  justify-content: space-between;
}
</style>