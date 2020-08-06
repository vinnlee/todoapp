<template>
  <v-layout column justify-center class="pt-10">
    <h1 class="text-h2 text-center mb-8">Todo List</h1>
    <v-card width="600" class="mx-auto px-4 py-4">
      <v-text-field
        v-model="name"
        solo
        flat
        hide-details
        label="What needs to be done?"
        clearable
        @keyup.enter="addTodo"
      ></v-text-field>
    </v-card>
    <v-card width="600" class="mx-auto mt-5">
      <v-list v-if="list.length" two-line flat>
        <v-subheader>Task</v-subheader>
        <template v-for="todo in list">
          <todo-item :key="todo.id" :todo="todo"></todo-item>
        </template>
      </v-list>
    </v-card>
    <v-card v-if="list.length" width="600" class="mx-auto mt-5 pa-3">
      <v-card-actions class="pa-0">
        <span class="text-sm-body-2 mt-1">{{ itemLeft }} item lefts</span>
        <v-spacer></v-spacer>
        <v-btn color="primary text-capitalize" @click="clearCompleted">
          Clear completed
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
import TodoItem from '@/components/TodoItem'

export default {
  components: {
    TodoItem,
  },
  data() {
    return {
      name: '',
    }
  },
  computed: {
    list() {
      return this.$store.state.todos
    },
    itemLeft() {
      return this.$store.state.todos.filter((todo) => !todo.done).length
    },
  },
  methods: {
    addTodo(e) {
      const newTodo = {
        id: Date.now(),
        name: this.name,
        done: false,
      }
      this.$store.commit('add', newTodo)
      this.name = ''
    },
    clearCompleted() {
      this.$store.state.todos
        .filter((todo) => todo.done)
        .map((todo) => {
          this.$store.commit('remove', todo)
        })
    },
  },
}
</script>
