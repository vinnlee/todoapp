<template>
  <v-form
    ref="form"
    lazy-validation
    class="login-form pt-10"
    @submit.prevent="login"
  >
    <h1 class="text-h2 text-center mb-8">Login</h1>
    <v-alert
      v-if="!!$store.state.error"
      text
      prominent
      type="error"
      icon="mdi-alert"
    >
      {{ $store.state.error.message }}
    </v-alert>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      prepend-icon="mdi-account"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="Password"
      type="password"
      prepend-icon="mdi-lock"
      required
    ></v-text-field>

    <v-layout justify-center>
      <v-btn type="submit" class="mt-5 ml-a primary" min-width="200" large>
        Login
      </v-btn>
    </v-layout>
  </v-form>
</template>

<style scoped>
.login-form {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
</style>

<script>
export default {
  data: () => ({
    email: '',
    password: '',
    emailRules: [
      (v) => !!v || 'Please fill your email.',
      (v) => /.+@.+/.test(v) || 'Your email is invalid.',
    ],
    passwordRules: [(v) => !!v || 'Please fill your password.'],
  }),
  methods: {
    login() {
      const user = {
        email: this.email,
        password: this.password,
      }
      this.$store.dispatch('signIn', user)
    },
  },
}
</script>
