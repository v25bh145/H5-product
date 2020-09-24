import Vue from 'vue'
import App from './Product.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#product')
