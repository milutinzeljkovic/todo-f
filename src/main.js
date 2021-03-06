import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import store from './store'
import router from './router'


Vue.config.productionTip = false

new Vue({
  store,
  router,
  Vuetify,
  render: h => h(App),
}).$mount('#app')
