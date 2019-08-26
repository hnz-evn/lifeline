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
  height: 5em;
  align-items: center;
  justify-content: center;

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
}
</style>
