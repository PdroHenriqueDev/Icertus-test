<template>
  <v-app>
    <div class="content_container d-flex flex-column justify-content-center p-5">
        <div class="input_container w-100 m-2 mb-5 d-flex justify-content-center">
            <input 
              placeholder="Insert the new task name" 
              class="form-control w-50" 
              type="text" 
              v-model="taskName" 
              v-on:keyup.enter="addTodo(taskName)"
            >

            <div 
              @click="addTodo(taskName)" 
              class="icon_container ml-2 d-flex justify-content-center align-items-center"
            >
              <v-icon height="24" width="24">fa-solid fa-plus</v-icon>
            </div>
        </div>
        <TableComponent :showActions="true"/>
    </div>

      <v-snackbar
        v-model="snackbar"
      >
        {{ text }}

        <template v-slot:action="{ attrs }">
          <v-btn
            color="pink"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
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
      const { addTodo, fetchData } = store

      return {
        addTodo: (name: string) => {
          addTodo(name)
          fetchData()
        },
      }
    },
    data: () => ({
      taskName: '',
      snackbar: false,
      text: `Click on the name to edit`,
    }),
    mounted() {
      setTimeout(() => this.snackbar = true, 1000)
    }
  })
</script>

<style scoped lang="scss">
.content_container {
  .input_container {

  }
  .icon_container {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #EEEEEF;
    border: 1px solid #DDDDDD;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
