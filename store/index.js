import axios from 'axios'

const EXPIRATION_THRESHOLD = 60 * 10 // Refresh token before 10 mins to espiration

const refreshToken = async (address, headers, code) => {
  const uri = address + 'auth/refresh?code=' + code
  const resp = await axios.get(uri, { headers })
  return resp.data
}

const isStillValid = (exp) => {
  const now = Math.floor(Date.now() / 1000)
  return now < exp - EXPIRATION_THRESHOLD
}

const isExpired = (exp) => {
  const now = Math.floor(Date.now() / 1000)
  return now > exp
}

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
      auth: {},
      fetched: false,
    })
  },

  fetchDone(state) {
    state.fetched = true
  },

  refreshToken(state, token) {
    state.auth.token = token
    state.auth.expiration = Math.floor(Date.now() / 1000) + 60 * 60
  },
}

export const getters = {
  data: (state) => state.data,
  sections: (state) => state.sections,
}

export const actions = {
  async fetchData({ commit, state }) {
    this.$log.debug('Fetching data')

    const API_ADDRESS = this.$env.API_ADDRESS
    const MOVIES_PATH = this.$env.API_MOVIES_PATH
    const SECTIONS_PATH = this.$env.API_SECTIONS_PATH

    commit('setApi', API_ADDRESS)
    commit('setMoviesPath', MOVIES_PATH)

    const headers = {
      authorization: 'Bearer ' + state.auth.token,
    }

    if (!state.auth.token) {
      this.$log.warn('Auth token not found. Skipping fetch')
      return
    }

    if (!isStillValid(state.auth.expiration)) {
      if (isExpired(state.auth.expiration)) {
        this.$log.debug('Sesion expired. Logging out')
        commit('logout')
      }

      this.$log.debug('Requesting new token')
      const newToken = await refreshToken(
        API_ADDRESS,
        headers,
        state.auth.refresh_token
      )
      this.$log.debug('Got new token ' + newToken)
      commit('refreshToken', newToken)
    }

    if (state.fetched) {
      return
    }

    const movies = await axios.get(API_ADDRESS + MOVIES_PATH, { headers })
    const sections = await axios.get(API_ADDRESS + SECTIONS_PATH, { headers })
    commit('setData', movies.data)
    commit('setSections', sections.data)
    commit('fetchDone')
  },
}
