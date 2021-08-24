import axios
 from "axios"
export const state = () => ({
  data: {},
  categories: []
})

export const mutations = {
  setData(state, data) {
    state.data = data
    state.categories = Object.keys(data)
  }
}

export const getters = {
  data: state => state.data,
  categories: state => state.categories
}

export const actions = {
  async fetchData({ commit }) {
    const data = await axios.get('/data.json')
    commit('setData', data.data)
  }
}