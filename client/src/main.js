// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import App from './App'
import router from './router'
import vuexStore from './store'
import moment from 'moment'
import callApi from './utils/api'
import { get, post } from './utils/api'
import Cookies from '../node_modules/js-cookie/src/js.cookie'
import Store from 'store'

import iView from 'iview'
import './my-theme/index.less'
/* https://the-allstars.com/vue2-animate/ */
import 'vue2-animate/dist/vue2-animate.min.css'
import pageTitle from './components/pageTitle'
import Chart from './components/chart'

// 设置全局语言
moment.locale('zh-cn')

Vue.use(VueLazyload)
Vue.use(iView)
Vue.component(pageTitle.name, pageTitle)
Vue.component(Chart.name, Chart)

Vue.config.productionTip = false
Vue.prototype.$callApi = callApi
Vue.prototype.$get = get
Vue.prototype.$post = post
window.Cookies = Cookies
window.Store = Store

Vue.prototype.$eventBus = Vue.prototype.$eventBus || new Vue()

/* eslint-disable no-new */
const vue = new Vue({
  el: '#app',
  router,
  store: vuexStore,
  render: h => h(App)
})
window.vue = vue

export default vue
