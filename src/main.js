import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters
import VueGridLayout from 'vue-grid-layout'
import 'vue-easytable/libs/themes-base/index.css'
import { VTable, VPagination } from 'vue-easytable'
import VueClipboard from 'vue-clipboard2'
import VueCompositionApi from '@vue/composition-api'

Vue.use(VueCompositionApi)
// import { Topology, Options, registerNode } from '@topology/core';
// import { register as registerFlow } from '@topology/flow-diagram';
// import { register as registerActivity } from '@topology/activity-diagram';
// import { register as registerClass } from '@topology/class-diagram';
// import { register as registerSequence } from '@topology/sequence-diagram';
// import { register as registerChart } from '@topology/chart-diagram';

// // 注册图形库
// function canvasRegister() {
//   registerFlow();
//   registerActivity();
//   registerClass();
//   registerSequence();
//   registerChart();
//   // ... 其他图形库
// }

// canvasRegister();
Vue.use(VueClipboard)
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)
import * as Echarts from 'echarts'
Vue.prototype.$echarts = Echarts

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
Vue.use(VueGridLayout)

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
