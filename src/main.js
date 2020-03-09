import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import ECharts from 'vue-echarts'
import Config from '../config/key'
import 'echarts'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/style.css'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(ElementUI)
Vue.component('v-chart', ECharts)

Vue.prototype.axiosBaseUrl = Config.axiosBaseUrl
Vue.prototype.$axios = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
