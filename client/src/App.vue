<template>
  <div id="app" class="vbox">
    <header>
      <span><font-awesome-icon icon="heartbeat"/> lifeline</span>
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
  height: 3em;
  align-items: center;
  justify-content: center;
  background-color: #9be0d7;
  font-weight: bold;
  font-size: 1.5em;
  color: #2c3e50;
}

.main {
  flex: 1;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;
}
</style>
