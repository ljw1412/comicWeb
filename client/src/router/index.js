import Vue from 'vue'
import Router from 'vue-router'
import home from './home'
import admin from './admin'

Vue.use(Router)

export default new Router({
  routes: [home, admin]
})
