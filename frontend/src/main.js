import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import VueNativeSock from 'vue-native-websocket'

// Vue.use(VueNativeSock, 'ws://192.168.0.17:7577',{protocol:'onem2m.r2.0.json'}, {
//     format: "json",
//   connectManually: true,
//   reconnection: true,
//   reconnectionAttempts: 5,
//   reconnectionDelay: 5000
// });

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
