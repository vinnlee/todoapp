export default function ({ app, store, redirect }) {
  app.$fireAuth.onAuthStateChanged((user) => {
    if (user) {
      store.commit('setUser', user)
      store.dispatch('fetch')
    } else {
      redirect('/login')
    }
  })
}
