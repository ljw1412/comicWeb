const namespaced = true

export const SET_BACKGROUND_COLOR = 'SET_BACKGROUND_COLOR'
export const SET_THEME = 'SET_THEME'

const state = {
  theme: {
    bgColor: ''
  }
}

const getters = {}

const actions = {}

const mutations = {
  [SET_BACKGROUND_COLOR](state, color) {
    state.theme.bgColor = color
  },
  [SET_THEME](state, theme) {
    Object.assign(state.theme, theme)
  }
}

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
