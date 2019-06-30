<template>
  <div>
    <header class="header">header</header>
    <ul class="label__list">
      <li class="label__list__item" v-for="tag in tags()" :key="tag.key">{{ tag.name }}</li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import store from "../store";

export default {
  data() {
    return {
      tags() {
        return store.state.tags;
      }
    };
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
