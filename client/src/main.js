import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCoffee)
 
var moment = require('moment');
moment().format('MMMM Do YYYY, h:mm:ss a');

Vue.component('font-awesome-icon', FontAwesomeIcon)

 
Vue.use(BootstrapVue)

import Notifications from 'vue-notification'
Vue.use(Notifications)
   


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
