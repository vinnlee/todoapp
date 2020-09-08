<template>
  <v-card v-if="$store.state.isAuth" flat>
    <v-toolbar color="primary" dark extended flat tile>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-btn icon @click="signOut">
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card class="mx-auto pb-3" max-width="960" style="margin-top: -65px;">
      <v-toolbar flat>
        <v-toolbar-title>Todo List</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-actions class="px-1 pb-0">
        <v-text-field
          v-model="task"
          solo
          flat
          hide-details
          label="What needs to be done?"
          clearable
          @keyup.enter="addTodo"
        ></v-text-field>
      </v-card-actions>
      <v-list v-if="todoItem" two-line flat class="pt-0">
        <v-subheader>Task</v-subheader>
        <template v-for="todo in todoList">
          <todo-item :key="todo.id" :todo="todo"></todo-item>
        </template>
      </v-list>
      <v-card-actions v-if="todoItem" class="py-0 px-4">
        <span class="text-sm-body-2 mt-1">{{ todoItemRemain }} item lefts</span>
        <v-spacer></v-spacer>
        <v-btn color="primary text-capitalize" @click="clearCompleted">
          Clear completed
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TodoItem from '@/components/TodoItem'

export default {
  middleware: 'auth',
  components: {
    TodoItem,
  },
  data: () => ({
    task: '',
  }),
  computed: {
    ...mapGetters(['todoList', 'todoItem', 'todoItemRemain']),
  },
  methods: {
    ...mapActions(['signOut']),
    addTodo(e) {
      this.$store.dispatch('add', this.task)
      this.task = ''
    },
    clearCompleted() {
      const doneList = this.$store.state.todos.filter((todo) => todo.done)
      this.$store.dispatch('clear', doneList)
    },
  },
}
</script>
