import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    test: 'test!!',
    tags: [],
    coffees: []
  },
  actions: {
    async getTagItems({ commit }) {
      try {
        const responseData = await axios.get('http://localhost:4000/api/tags')
        const response = await responseData.data
        commit('getTagItems', response)
      } catch (err) {
        throw Error(err)
      }
    },
    async getCoffeeItems({ commit }) {
      try {
        const responseData = await axios.get(
          'http://localhost:4000/api/coffees'
        )
        const response = await responseData.data
        commit('getCoffeeItems', response)
      } catch (err) {
        throw Error(err)
      }
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
