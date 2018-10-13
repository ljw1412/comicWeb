import Vue from 'vue'
import Vuex from 'vuex'
import admin from './admin'

Vue.use(Vuex)

const base = {
  state: {},
  getters: {},
  mutations: {},
  actions: {}
}

base.modules = {
  admin
}

export default new Vuex.Store(base)

export const modules = base.modules
