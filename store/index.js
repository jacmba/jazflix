import axios from 'axios'

export const state = () => ({
  data: [],
  categories: [],
  sections: [],
  api: '',
  moviesPath: '',
})

export const mutations = {
  setData(state, data) {
    state.data = data
  },

  setSections(state, data) {
    state.sections = data
  },

  setApi(state, api) {
    state.api = api
  },

  setMoviesPath(state, path) {
    state.moviesPath = path
  },
}

export const getters = {
  data: (state) => state.data,
  sections: (state) => state.sections,
}

export const actions = {
  async fetchData({ commit }) {
    const API_ADDRESS = this.$env.API_ADDRESS
    const MOVIES_PATH = this.$env.API_MOVIES_PATH
    const SECTIONS_PATH = this.$env.API_SECTIONS_PATH

    commit('setApi', API_ADDRESS)
    commit('setMoviesPath', MOVIES_PATH)

    const movies = await axios.get(API_ADDRESS + MOVIES_PATH)
    const sections = await axios.get(API_ADDRESS + SECTIONS_PATH)
    commit('setData', movies.data)
    commit('setSections', sections.data)
  },
}
