// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store/store'
import axios from 'axios'
import API from './network/API'
import {Auth} from "./Auth";

// axios.defaults.baseURL = 'http://localhost:8009'
axios.defaults.baseURL = 'https://mt-proc.herokuapp.com';
window.axios = axios;
window.API = API;
Vue.use(axios);
Vue.use(Auth);
Vue.config.productionTip = false;

// require('./assets/layout3/css/layout.min.css')

// router.beforeEach(

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  Auth,
  API,
  components: { App },
  template: '<App/>'
});
