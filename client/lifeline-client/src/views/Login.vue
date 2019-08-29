<template>
  <div class="login-container">
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
        this.$toasted.error('Must provide email and password');
        return;
      }

      login({ email: this.email, password: this.password })
        .then((result) => {
          log.info(result);
        })
        .catch((error) => {
          log.error(error);
          this.$toasted.error('Error submitting username and password');
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  background-color: #f0f0f0;
  padding: 1.25em;
  border-radius: 0.5em;
}

.button-container {
  margin-top: 2em;
  text-align: center;
}
</style>
