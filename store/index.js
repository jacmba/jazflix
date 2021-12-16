import axios
 from "axios"
export const state = () => ({
  data: {},
  categories: [],
  sections: [],
})

export const mutations = {
  setData(state, data) {
    state.data = data.content
    state.categories = Object.keys(data.content)
    state.sections = data.sections
  }
}

export const getters = {
  data: state => state.data,
  categories: state => state.categories,
  sections: state => state.sections
}

export const actions = {
  async fetchData({ commit }) {
    const data = await axios.get('/data.json')
    commit('setData', data.data)
  }
}
