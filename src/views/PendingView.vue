<template>
  <v-app>
      <div class="content_container">
        <TableComponent :data="pendingTodos"/>
      </div>
  </v-app>
</template>

<script lang="ts">
  import Vue from 'vue'
  import TableComponent from './components/TableComponent.vue'
  import { useTodosStore } from '@/store/todos' 

  export default Vue.extend({
    components: {
    TableComponent
    },
    setup() {
      const store = useTodosStore()
      const { pendingTodos } = store
      
      return {
        pendingTodos
      }
    },
    data: () => ({
    }),
  })
</script>

<style scoped lang="scss">
.content_container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
