import { cloneDeep } from 'lodash'

export const state = () => ({
  todos: [],
  user: null,
  isAuth: false,
  error: null,
})

export const mutations = {
  add(state, todo) {
    state.todos.push(todo)
  },
  toggle(state, todo) {
    state.todos[state.todos.indexOf(todo)].done = !todo.done
  },
  edit(state, { todo, taskTitle }) {
    state.todos[state.todos.indexOf(todo)].task = taskTitle
  },
  remove(state, todo) {
    state.todos.splice(state.todos.indexOf(todo), 1)
  },
  clear(state) {
    const undoneList = state.todos.filter((todo) => !todo.done)
    state.todos = undoneList
  },
  setUser(state, user) {
    state.user = cloneDeep(user)
    state.isAuth = true
  },
  signOut(state) {
    state.user = null
    state.isAuth = false
  },
  setError(state, error) {
    state.error = error
  },
  setTodos(state, todos) {
    state.todos = cloneDeep(todos)
  },
}

export const actions = {
  async register({ commit }, { email, password }) {
    try {
      const { user } = await this.$fireAuth.createUserWithEmailAndPassword(
        email,
        password
      )
      commit('setUser', user)
      this.$router.push('/')
    } catch (e) {
      commit('setError', e)
    }
  },
  async signIn({ commit }, { email, password }) {
    try {
      const { user } = await this.$fireAuth.signInWithEmailAndPassword(
        email,
        password
      )
      commit('setUser', user)
      this.$router.push('/')
    } catch (e) {
      commit('setError', e)
    }
  },
  signOut({ commit }) {
    try {
      this.$fireAuth.signOut()
      commit('signOut')
      this.$router.push('/login')
    } catch (e) {
      commit('setError', e)
    }
  },
  async add({ commit }, task) {
    try {
      const snapshot = await this.$fireStore.collection('todos').add({
        task,
        done: false,
        uid: this.$fireAuth.currentUser.uid,
      })
      if (snapshot.id) {
        commit('add', {
          id: snapshot.id,
          task,
          done: false,
        })
      }
    } catch (e) {
      commit('setError', e)
    }
  },
  async remove({ commit }, todo) {
    try {
      commit('remove', todo)
      await this.$fireStore.collection('todos').doc(todo.id).delete()
    } catch (e) {
      commit('setError', e)
    }
  },
  async clear({ commit }) {
    try {
      const snapshots = await this.$fireStore
        .collection('todos')
        .where('uid', '==', this.$fireAuth.currentUser.uid)
        .where('done', '==', true)
        .get()
      if (snapshots) {
        const batch = this.$fireStore.batch()
        snapshots.forEach(function (doc) {
          batch.delete(doc.ref)
        })
        batch.commit()
        commit('clear')
      }
    } catch (e) {
      commit('setError', e)
    }
  },
  async edit({ commit }, { todo, taskTitle }) {
    try {
      await this.$fireStore.collection('todos').doc(todo.id).update({
        task: taskTitle,
      })
      commit('edit', { todo, taskTitle })
    } catch (e) {
      commit('setError', e)
    }
  },
  async toggle({ commit }, todo) {
    try {
      await this.$fireStore.collection('todos').doc(todo.id).update({
        done: !todo.done,
      })
      commit('toggle', todo)
    } catch (e) {
      commit('setError', e)
    }
  },
  async fetch({ commit }) {
    try {
      const todos = []
      const snapshots = await this.$fireStore
        .collection('todos')
        .where('uid', '==', this.$fireAuth.currentUser.uid)
        .get()
      snapshots.forEach((doc) => {
        const docData = doc.data()
        todos.push({
          id: doc.id,
          task: docData.task,
          done: docData.done,
        })
      })
      commit('setTodos', todos)
    } catch (e) {
      commit('setError', e)
    }
  },
}

export const getters = {
  todoList({ todos }) {
    return todos
  },
  todoItem({ todos }) {
    return todos.length
  },
  todoItemRemain({ todos }) {
    return todos.filter((todo) => !todo.done).length
  },
}
