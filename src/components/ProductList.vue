<template>
  <div>
    <header class="header">header</header>
    <ul class="keyName__list">
      <li></li>
    </ul>
  </div>
</template>

<script>
import store from "../store";

export default {
  data() {
    return {};
  },
  mounted() {
    console.log(JSON.parse(JSON.stringify(store.state)));
  }
};
</script>

<style>
</style>
