import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import LazyLoad from 'vue-lazyload'
Vue.use(LazyLoad,{loading:require('./assets/img/common/placeholder.png')})
Vue.prototype.$bus=new Vue()
Vue.config.productionTip = false
Vue.use(toast)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
