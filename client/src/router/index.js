import Vue from 'vue'
import Router from 'vue-router'
import home from './home'
import admin from './admin'
import LoginPage from '@/modules/login'

const login = {
  path: '/login',
  name: 'login',
  component: LoginPage
}

Vue.use(Router)

export default new Router({
  routes: [home, admin, login]
})
