<template>
  <v-list-item-group>
    <v-list-item :ripple="false" :inactive="true" :selectable="false">
      <v-list-item-action>
        <v-checkbox
          color="primary"
          :input-value="todo.done"
          :disabled="editTodo"
          light
          @change="toggle(todo)"
        ></v-checkbox>
      </v-list-item-action>

      <v-list-item-content>
        <template v-if="editTodo">
          <v-text-field
            :value="todo.name"
            flat
            hide-details
            autofocus
            class="edit-box"
            @blur="edit"
            @keyup.enter="edit"
          ></v-text-field>
        </template>
        <template v-else>
          <v-list-item-title
            :class="{ done: todo.done }"
            v-text="todo.name"
          ></v-list-item-title>
        </template>
      </v-list-item-content>

      <v-list-item-action class="flex-row">
        <v-btn :disabled="todo.done" icon>
          <v-icon medium @click="editTodo = true">edit</v-icon>
        </v-btn>
        <v-btn icon @click="remove(todo)">
          <v-icon medium>delete</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-list-item-group>
</template>

<style scoped>
.done {
  text-decoration: line-through;
}

.edit-box {
  padding-top: 0 !important;
  margin-top: 0 !important;
}
</style>

<script>
export default {
  props: {
    todo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      editTodo: false,
    }
  },
  methods: {
    edit(e) {
      const { value } = e.target
      const { todo } = this
      this.$store.commit('edit', { todo, name: value })
      this.editTodo = false
    },
    toggle(todo) {
      this.$store.commit('toggle', todo)
    },
    remove(todo) {
      this.$store.commit('remove', todo)
    },
  },
}
</script>
