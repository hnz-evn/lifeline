<template>
  <div id="app" class="vbox">
    <header>
      <router-link to="/">Home</router-link>
      <span>|</span>
      <router-link to="/login">Login</router-link>
    </header>
    <div class="vbox main">
      <router-view/>
    </div>
  </div>
</template>

<script>
import log from './plugins/logger';

export default {
  name: 'App',
  mounted() {
    if (!this.$store.getters.isAuthenticated) {
      log.info('No authentication found, navigating to login page...');
      this.$router.push({ name: 'login' });
    }
  },
};
</script>

<style lang="scss">
html, body, #app {
  height: 100%;
  width: 100%;
  margin: 0;
}

.vbox {
  display: flex;
  flex-direction: column;
}

.space-between {
  justify-content: space-between;
}

header {
  display: flex;
  height: 4em;
  align-items: center;
  justify-content: center;
  background-color: #9be0d7;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.main {
  flex: 1;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;
}
</style>
