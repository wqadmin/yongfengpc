import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import './styles/index.less';
Vue.use(ViewUI);
Vue.config.productionTip = false
console.log(process.env.CSC_LINK);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
