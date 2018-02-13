import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import ZeroCouponBond from './components/ZeroCouponBond'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(VueRouter)

const routes = [
  {path: '/zero-coupon-bond', component: ZeroCouponBond},
  {path: '*', component: ZeroCouponBond}
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app')
