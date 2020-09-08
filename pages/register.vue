<template>
  <v-form
    ref="form"
    lazy-validation
    class="register-form pt-10"
    @submit.prevent="onSubmit"
  >
    <h1 class="text-h2 text-center mb-8">Register</h1>
    <v-alert
      v-if="!!$store.state.error"
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
      prepend-icon="mdi-email"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
      :rules="[passwordRules, length(6)]"
      label="Password"
      type="password"
      prepend-icon="mdi-lock"
      required
    ></v-text-field>
    <v-layout justify-center>
      <v-btn type="submit" class="mt-5 ml-a primary" min-width="200" large>
        Register
      </v-btn>
    </v-layout>
  </v-form>
</template>

<style scoped>
.register-form {
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
      (v) => !!v || 'Please enter your email.',
      (v) => /.+@.+/.test(v) || 'Your email is invalid.',
    ],
    passwordRules: [(v) => !!v || 'Please enter your password.'],
    length: (len) => (v) =>
      (v || '').length >= len || `Require at least ${len} characters.`,
  }),
  methods: {
    onSubmit() {
      const userInfo = {
        email: this.email,
        password: this.password,
      }
      this.$store.dispatch('register', userInfo)
    },
  },
}
</script>
