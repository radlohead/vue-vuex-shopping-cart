import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    test: 'test!!',
    coffees: []
  },
  actions: {
    async getCoffeeItems({ commit }) {
      const responseData = await fetch('http://localhost:4000/api/coffees')
      const response = await responseData.json()
      commit('getCoffeeItems', response)
    }
  },
  mutations: {
    getCoffeeItems(state, coffees) {
      state.coffees = coffees
      console.log('getCoffeeItems', JSON.parse(JSON.stringify(state)))
    }
  }
})

export default store
