// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import vuexStore from './store'
import moment from 'moment'
import callApi from './utils/api'
import Cookies from '../node_modules/js-cookie/src/js.cookie'
import Store from 'store'

import iView from 'iview'
import './my-theme/index.less'
import pageTitle from './components/pageTitle'
import Chart from './components/chart'

Vue.use(iView)
Vue.component(pageTitle.name, pageTitle)
Vue.component(Chart.name, Chart)

Vue.config.productionTip = false
Vue.prototype.$callApi = callApi
window.Cookies = Cookies
window.Store = Store

window.router = router
window.vuex = vuexStore
/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  store: vuexStore,
  components: { App },
  template: '<App/>'
})

// 设置全局语言
moment.locale('zh-cn')
