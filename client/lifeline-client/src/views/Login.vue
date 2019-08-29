<template>
  <div>
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input class="input" type="email" placeholder="Email" v-model="email">
      </div>
    </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input class="input" type="password" placeholder="Password" v-model="password">
      </div>
    </div>
    <div class="button-container">
      <button class="button is-primary" @click="submitLogin">Submit</button>
    </div>
  </div>
</template>

<script>
import log from '../plugins/logger';
import { login } from '../api/lifeline';

export default {
  name: 'Login',
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    submitLogin() {
      if (!this.email || !this.password) {
        log.error('Must provide email and password');
        return;
      }

      login({ email: this.email, password: this.password });
    },
  },
};
</script>

<style lang="scss" scoped>
.button-container {
  margin-top: 2em;
  text-align: center;
}
</style>
