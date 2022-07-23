import { defineStore } from 'pinia'
import axios from 'axios';
import { ToDo } from './../types/todo'

export const useTodosStore = defineStore('todos', {
    state: () => ({
      todos: [],
      shouldLoad: true,
    }),
    getters: {
      doneTodos(state) {
        return state.todos.filter((todo: ToDo) => todo.done)
      },
      pendingTodos(state) {
        return state.todos.filter((todo: ToDo) => !todo.done)
      },
    },
    actions: {
      async fetchData() {
        try {
          const res  = await axios.get('http://localhost:3001/todos')
          this.todos = res.data
          setTimeout(() => this.shouldLoad = false, 1000)
        } catch (error) {
          console.log(error)
        }
      },
      async deleteById(id: number) {
        try {
          await axios.delete(`http://localhost:3001/todos/${id}`)
          this.fetchData()
        } catch (error) {
          console.log(error)
        }
      },
      async addTodo(name: string) {
        if (!name) return
       
        const data = {
          name,
          done: false
        }

        try {
          await axios.post('http://localhost:3001/todos', data)
          this.fetchData()
        } catch (error) {
          console.log(error)
        }
      },
      async updateById(toDo: ToDo) {
        if (!toDo) return
        const { id } = toDo
        try {
          await axios.put(`http://localhost:3001/todos/${id}`, toDo)
          this.fetchData()
        } catch (error) {
          console.log(error)
        }
      },
      async markAsDone(toDo: ToDo) {
        if (!toDo) return
        const { id } = toDo
        const dataUpdated = {
          ...toDo,
          done: true,
        }
        try {
          await axios.put(`http://localhost:3001/todos/${id}`, dataUpdated)
          this.fetchData()
        } catch (error) {
          console.log(error)
        }
      }
    },
})