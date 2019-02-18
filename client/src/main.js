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
import jQuery from 'jquery'

import iView from 'iview'
import './theme/index.less'
/* https://the-allstars.com/vue2-animate/ */
import 'vue2-animate/dist/vue2-animate.min.css'

import pageTitle from './components/pageTitle'
import Chart from './components/chart'

// 设置全局语言
moment.locale('zh-cn')

Vue.config.productionTip = false

// Vue相关组件绑定
Vue.use(VueLazyload)
Vue.use(iView)
Vue.component(pageTitle.name, pageTitle)
Vue.component(Chart.name, Chart)

// Vue自定义原型
Vue.prototype.$callApi = callApi
Vue.prototype.$get = get
Vue.prototype.$post = post
Vue.prototype.$eventBus = Vue.prototype.$eventBus || new Vue()

/* eslint-disable no-new */
const vue = new Vue({
  el: '#app',
  router,
  store: vuexStore,
  render: h => h(App)
})

// window.vue = vue
window.Cookies = Cookies
// LocalStorage操作工具
window.Store = Store
window.$ = jQuery

export default vue
