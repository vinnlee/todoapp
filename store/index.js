export const state = () => ({
  todos: [],
})

export const mutations = {
  add(state, todo) {
    state.todos.push(todo)
  },
  toggle(state, todo) {
    state.todos[state.todos.indexOf(todo)].done = !todo.done
  },
  edit(state, { todo, name }) {
    state.todos[state.todos.indexOf(todo)].name = name
  },
  remove(state, todo) {
    state.todos.splice(state.todos.indexOf(todo), 1)
  },
}

export const actions = {
  async getTodo() {
    // const todoRef = await this.$fireStore.collection('todos').get()
    // todoRef.forEach((doc) => {
    //   console.log(doc.id, '=>', doc.data())
    // })
  },

  async addTodo(todo) {
    // const newTodo = await db.collection('cities').add(todo)
  },
}
