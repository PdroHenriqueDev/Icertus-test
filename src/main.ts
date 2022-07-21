import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { createPinia, PiniaVuePlugin } from 'pinia'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(PiniaVuePlugin, BootstrapVue, IconsPlugin)
const pinia = createPinia()

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  pinia,
  render: h => h(App)
}).$mount('#app')
