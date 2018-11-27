import Vue from 'vue'
import Router from 'vue-router'
import gui from './gui'
import admin from './admin'
import LoginPage from '@/modules/login'

const login = {
  path: '/login',
  name: 'login',
  component: LoginPage
}

Vue.use(Router)

export default new Router({
  routes: [gui, admin, login]
})
