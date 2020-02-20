<template>
  <div class="tasklist">
    <h3>Task List</h3>
    <Task v-for="n in howMany" :key="n" card-title="Some Title" card-author="Alex" card-content="Some content"/>
  </div>
</template>

<script>

import Task from "./Task"

export default {
  name: 'TaskList',
  components:{
      Task
  },
  props: {
    howMany: Number
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
