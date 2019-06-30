<template>
  <div>
    <header class="header">header</header>
    <ul class="keyName__list">
      <li>{{ this.$store.state.tags }}</li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import store from "../store";

export default {
  data() {
    return {};
  },
  created() {
    this.getCoffeeItems();
    this.getTagItems();
  },
  methods: {
    ...mapActions(["getCoffeeItems", "getTagItems"])
  },
  mounted() {
    console.log(JSON.parse(JSON.stringify(store.state)));
  }
};
</script>

<style>
</style>
