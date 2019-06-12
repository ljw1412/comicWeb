const namespaced = true

const state = {
  isDisplayLoginDialog: false
}

const getters = {}

const actions = {
  showLogin({ commit }) {
    commit('DISPLAY_LOGIN_DIALOG', true)
  },
  hideLogin({ commit }) {
    commit('DISPLAY_LOGIN_DIALOG', false)
  }
}

const mutations = {
  DISPLAY_LOGIN_DIALOG(state, isDisplayLoginDialog) {
    state.isDisplayLoginDialog = isDisplayLoginDialog
  }
}

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
