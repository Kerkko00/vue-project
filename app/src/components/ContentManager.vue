<template>
  <div>
    <div class="buttons">
      <div>
        <button v-if="this.loggedin" class="button" @click.prevent="showAddModal = true">Add idea</button>
        <button v-if="this.loggedin" class="button" @click.prevent="sort('own')">My ideas</button>
      </div>
      <div>
        <button class="button" @click.prevent="sort('highest')">Sort by highest</button>
        <button class="button" @click.prevent="sort('lowest')">Sort by lowest</button>
      </div>
    </div>

    <div class="modal" id="addModal" :style="{'display': showAddModal ? 'block' : 'none'}">
      <div class="modalContent">
        <button class="close" @click.prevent="showAddModal = false">&times;</button>
        <h2>Add Idea</h2>
        <form>
          <label for="title">Title: </label>
          <input type="text" id="title" name="title" maxlength="65" v-model="title"/>
          <br><br>
          <p>Description: </p>
          <textarea id="description" v-model="description" maxlength="2000"></textarea>
          <button type="submit" class="button" @click.prevent="addIdea">Add</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContentManager",
  data() {
    return {
      showAddModal: false,
      title: "",
      description: "",
      loggedin: this.logged,
    }
  },
  watch: {
    /** Updates loggedin status */
    logged(newVal) {
      this.loggedin = newVal;
    }
  },
  methods: {
    /** Handles sorting order for posts by emitting it */
    sort(order) {
      this.$emit("sort-order", order);
    },
    /** Handles adding idea by emitting it and hiding addIdea modal from view */
    addIdea() {
      this.$emit("ideaContents", this.title, this.description);
      this.showAddModal = false;
    },
  },
  emits: ["sort-order", "ideaContents"],
  props: ["logged"],
}
</script>

<style scoped>
.buttons {
  margin: 1em;
  display: flex;
  justify-content: space-between;
}

.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modalContent {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 1em;
  border: 1px solid #888;
  border-radius: 5px;
  width: 80%;
  -webkit-box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.85);
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.85);
}

.modalContent h2 {
  margin-top: 0;
}

.modalContent p {
  margin: 0;
}

.modalContent textarea {
  width: 100%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>