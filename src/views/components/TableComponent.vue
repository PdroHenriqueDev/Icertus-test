<template>
  <v-app>
    <div class="table_container">
        <v-data-table
            :headers="headersWithAction"
            :items="todos"
            :loading="shouldLoad"
            class="elevation-1 overflow-y-auto"
            loading-text="Loading... Please wait"
            v-if="showActions"
            height="60vh"
        >
            <template v-slot:[`item.name`]="props">
                <v-edit-dialog
                    :return-value.sync="props.item.name"
                    @save="updateById(props.item)"
                    @cancel="cancel"
                    @open="open"
                    @close="close"
                    ref="dialog"
                >
                    {{ props.item.name }} 
                    <template v-slot:input>
                        <v-text-field
                        v-model="props.item.name"
                        :rules="[max25chars]"
                        label="Edit"
                        single-line
                        counter
                        ></v-text-field>
                    </template>
                </v-edit-dialog>
            </template>

            <template v-slot:[`item.done`]="{ item }">
                <div v-if="item.done">
                    <v-icon
                    v-b-tooltip.hover title="Marked as done"
                    small
                    color="green"
                    >
                        fa-solid fa-check
                    </v-icon>
                </div>

                <div v-if="!item.done">
                    <v-icon
                    v-b-tooltip.hover title="Unfinished"
                    small
                    color="red"
                    >
                        fa-solid fa-xmark
                    </v-icon>
                </div>
            </template>


            <template v-slot:[`item.actions`]="{ item }">
                <v-icon
                    v-b-tooltip.hover title="Mark as done"
                    small
                    class="mr-2"
                    @click="markAsDone(item)"
                >
                    fa-solid fa-check
                </v-icon>
                <v-icon
                    v-b-tooltip.hover title="Delete"
                    small
                    @click="deleteById(item.id)"
                >
                    mdi-delete
                </v-icon>
            </template>
        
        </v-data-table>

        <v-snackbar
            v-model="snack"
            :timeout="3000"
            :color="snackColor"
            v-if="showActions"
        >
        {{ snackText }}

            <template v-slot:action="{ attrs }">
                <v-btn
                    v-bind="attrs"
                    text
                    @click="snack = false"
                >
                Close
                </v-btn>
            </template>
        </v-snackbar>

        <v-data-table
            v-else
            :headers="headers"
            :items="todos"
            class="elevation-1 overflow-y-auto"
            :loading="shouldLoad"
            loading-text="Loading... Please wait"
            height="60vh"
            width="60vw"
        ></v-data-table>
    </div>
  </v-app>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { useTodosStore } from '@/store/todos' 
  import { storeToRefs } from 'pinia'
import { ToDo } from '@/types/todo'

  export default Vue.extend({
        props: {
            showActions: Boolean,
        },
        setup() {
            const store = useTodosStore()
            const { fetchData, deleteById, updateById, markAsDone } = store
            const { todos, shouldLoad } = storeToRefs(store)

            fetchData()

            return {
                todos,
                shouldLoad,
                deleteById: (id: number) => {
                    deleteById(id)
                    fetchData()
                },
                updateById: (toDo: ToDo) => {
                    updateById(toDo)
                    fetchData()
                },
                markAsDone: (toDo: ToDo) => {
                    markAsDone(toDo)
                    fetchData()
                }
            }
        },
        data: () => ({
            headersWithAction: [
                {
                text: 'ID',
                align: 'start',
                sortable: false,
                value: 'id',
                },
                { text: 'Name', value: 'name' },
                { text: 'Done', value: 'done', sortable: false },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            headers: [
                {
                text: 'ID',
                align: 'start',
                sortable: false,
                value: 'id',
                },
                { text: 'Name', value: 'name' },
                { text: 'Done', value: 'done', sortable: false },
            ],
            max25chars: (v: string) => v.length <= 25 || 'Input too long!',
            snack: false,
            snackColor: '',
            snackText: '',
        }),
        methods: {
            save () {
                this.snack = true
                this.snackColor = 'success'
                this.snackText = 'Data saved'
            },
            cancel () {
                this.snack = true
                this.snackColor = 'error'
                this.snackText = 'Canceled'
            },
            open () {
                this.snack = true
                this.snackColor = 'info'
                this.snackText = 'Dialog opened'
            },
            close () {
                console.log('Dialog closed')
            },
        }
    })
</script>

<style scoped lang="scss">

.table_container {
    display: flex;
    justify-content: center;
    .v-data-table {
        width: 60vw;
        display: grid;
        align-content: space-between;
    }
}

</style>
