import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    test: 'test!!',
    tags: [],
    coffees: []
  },
  actions: {
    async getTagItems({ commit }) {
      const responseData = await fetch('http://localhost:4000/api/tags')
      const response = await responseData.json()
      commit('getTagItems', response)
    },
    async getCoffeeItems({ commit }) {
      const responseData = await fetch('http://localhost:4000/api/coffees')
      const response = await responseData.json()
      commit('getCoffeeItems', response)
    }
  },
  mutations: {
    getTagItems(state, tags) {
      state.tags = tags
    },
    getCoffeeItems(state, coffees) {
      state.coffees = coffees
      console.log('getCoffeeItems', JSON.parse(JSON.stringify(state)))
    }
  }
})

export default store
