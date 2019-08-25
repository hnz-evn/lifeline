<template>
  <div>
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input class="input" type="email" placeholder="Email">
      </div>
    </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input class="input" type="password">
      </div>
    </div>
    <div class="button-container">
      <button class="button is-primary">Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
};
</script>

<style lang="scss" scoped>
.button-container {
  margin-top: 2em;
}
</style>
