<template>
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
                    <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon
                            small
                            color="green"
                            v-bind="attrs"
                            v-on="on"
                        >
                            fa-solid fa-check
                        </v-icon>
                    </template>
                    <span>Marked as done</span>
                    </v-tooltip>
                </div>

                <div v-if="!item.done">
                    <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon
                            small
                            color="red"
                            v-bind="attrs"
                            v-on="on"
                        >
                            fa-solid fa-xmark
                        </v-icon>
                    </template>
                    <span>Unfinished</span>
                    </v-tooltip>
                </div>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
                <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon
                            small
                            class="mr-2"
                            @click="markAsDone(item)"
                            v-bind="attrs"
                            v-on="on"
                        >
                            fa-solid fa-check
                        </v-icon>
                    </template>
                    <span>Mark as done</span>
                </v-tooltip>

                <v-tooltip left>
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon
                            small
                            @click="deleteById(item.id)"
                            v-bind="attrs"
                            v-on="on"
                        >
                            mdi-delete
                        </v-icon>
                    </template>
                    <span>Delete</span>
                </v-tooltip>
                
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

        <!-- the readOnly table -->
        <v-data-table
            v-else
            :headers="headers"
            :items="todos"
            class="elevation-1 overflow-y-auto"
            :loading="shouldLoad"
            loading-text="Loading... Please wait"
            height="60vh"
            width="60vw"
        >
            <template v-slot:[`item.done`]="{ item }">
                <div v-if="item.done">
                     <v-tooltip left>
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon
                                small
                                color="green"
                                v-bind="attrs"
                                v-on="on"
                            >
                                fa-solid fa-check
                            </v-icon>
                        </template>
                        <span>Marked as done</span>
                    </v-tooltip>
                </div>

                <div v-if="!item.done">
                    <v-tooltip left>
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon
                                small
                                color="red"
                                v-bind="attrs"
                                v-on="on"
                            >
                                fa-solid fa-xmark
                            </v-icon>
                        </template>
                        <span>Unfinished</span>
                    </v-tooltip>
                </div>
            </template>
        </v-data-table>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { useTodosStore } from '@/store/todos' 
  import { storeToRefs } from 'pinia'
import { ToDo } from '@/types/todo'

  export default Vue.extend({
        props: {
            showActions: Boolean,
            data: []
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
                },
                updateById: (toDo: ToDo) => {
                    updateById(toDo)
                },
                markAsDone: (toDo: ToDo) => {
                    markAsDone(toDo)
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
