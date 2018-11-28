import Vue from 'vue'
import Vuex from 'vuex'
import admin from './admin'
import gui from './gui'

Vue.use(Vuex)

const base = {
  state: {},
  getters: {},
  mutations: {},
  actions: {}
}

base.modules = {
  admin,
  gui
}

export default new Vuex.Store(base)

export const modules = base.modules
