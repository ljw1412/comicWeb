import Vue from 'vue'
import Vuex from 'vuex'
import admin from './admin'
import gui from './gui'
import main from './main'

Vue.use(Vuex)

const base = {
  state: {},
  getters: {},
  mutations: {},
  actions: {}
}

base.modules = {
  admin,
  gui,
  main
}

export default new Vuex.Store(base)

export const modules = base.modules
