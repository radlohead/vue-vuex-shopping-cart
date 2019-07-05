<template>
  <div>
    <header class="header">header</header>
    <ul class="label__list">
      <li class="label__list__item" v-for="tag in tags()" :key="tag.id">{{ tag.name }}</li>
    </ul>
    <ul class="coffee__list">
      <li class="coffee__list__item" v-for="coffee in coffees()" :key="coffee.id">
        <img :src="coffee.image" />
        <div>
          <h3>{{ coffee.name }}</h3>
          <span>{{ coffee.keys.name }}</span>
          <strong>{{ coffee.price }}</strong>
          <span>{{ coffee.stock }}</span>
        </div>
        <div>
          <button>빼기</button>
          <button>담기</button>
        </div>
      </li>
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
      },
      coffees() {
        return store.state.coffees;
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
