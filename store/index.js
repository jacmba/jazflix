import axios from 'axios'

const API_ADDRESS = process.env.apiAddress
const MOVIES_PATH = process.env.moviesPath
const SECTIONS_PATH = process.env.sectionsPath

export const state = () => ({
  data: [],
  categories: [],
  sections: [],
  api: API_ADDRESS,
  moviesPath: MOVIES_PATH,
})

export const mutations = {
  setData(state, data) {
    state.data = data
  },

  setSections(state, data) {
    state.sections = data
  },
}

export const getters = {
  data: (state) => state.data,
  sections: (state) => state.sections,
}

export const actions = {
  async fetchData({ commit }) {
    const movies = await axios.get(API_ADDRESS + MOVIES_PATH)
    const sections = await axios.get(API_ADDRESS + SECTIONS_PATH)
    commit('setData', movies.data)
    commit('setSections', sections.data)
  },
}
