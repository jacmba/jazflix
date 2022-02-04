import axios from 'axios'

export const state = () => ({
  data: [],
  categories: [],
  sections: [],
  api: '',
  moviesPath: '',
  auth: {},
  fetched: false,
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

  login(state, auth) {
    state.auth = auth
  },

  logout(state) {
    Object.assign(state, {
      data: [],
      categories: [],
      sections: [],
      api: '',
      moviesPath: '',
      auth: {},
      fetched: false,
    })
  },

  fetchDone(state) {
    state.fetched = true
  },
}

export const getters = {
  data: (state) => state.data,
  sections: (state) => state.sections,
}

export const actions = {
  async fetchData({ commit, state }) {
    if (state.fetched) {
      return
    }

    const API_ADDRESS = this.$env.API_ADDRESS
    const MOVIES_PATH = this.$env.API_MOVIES_PATH
    const SECTIONS_PATH = this.$env.API_SECTIONS_PATH

    commit('setApi', API_ADDRESS)
    commit('setMoviesPath', MOVIES_PATH)

    const headers = {
      authorization: 'Bearer ' + state.auth.token,
    }

    const movies = await axios.get(API_ADDRESS + MOVIES_PATH, { headers })
    const sections = await axios.get(API_ADDRESS + SECTIONS_PATH, { headers })
    commit('setData', movies.data)
    commit('setSections', sections.data)
    commit('fetchDone')
  },
}
