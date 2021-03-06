import Vue from 'vue'
import Router from 'vue-router'
import vui from './vui'
import gui from './gui'
import admin from './admin'
import main from './main'
import LoginPage from '@/modules/login'

const index = {
  path: '/',
  name: 'index',
  redirect: { name: 'main' }
}

const login = {
  path: '/login',
  name: 'login',
  component: LoginPage
}

Vue.use(Router)

export default new Router({
  routes: [index, main, gui, admin, login, vui]
})
