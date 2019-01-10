import Vue from 'vue'
import Router from 'vue-router'
import gui from './gui'
import admin from './admin'
import LoginPage from '@/modules/login'
import UI from '@/modules/ui'

const login = {
  path: '/login',
  name: 'login',
  component: LoginPage
}

const ui = {
  path: '/ui',
  name: 'ui',
  component: UI
}

Vue.use(Router)

export default new Router({
  routes: [gui, admin, login, ui]
})
