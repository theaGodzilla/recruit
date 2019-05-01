// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Login from './Login'
import router from './router'
import ElementUI from 'element-ui'
import mavonEditor from 'mavon-editor'

import 'mavon-editor/dist/css/index.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.Cancel = [];
router.beforeEach((to, from, next) => {
  while (Vue.Cancel.length > 0) {
    Vue.Cancel.shift()('cancel');
  }
  next();
})

//引入axios
import Axios from 'axios'
//请求拦截
Axios.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

//Axios.interceptors.response.use(function(ress){
//	return ress.pager;
//},function(error){
//	return Promise.reject(error);
//});
Vue.prototype.$axios = Axios //挂载axios 便于组件使用

Vue.use(ElementUI);
Vue.use(mavonEditor);
Vue.config.productionTip = false

/* eslint-disable no-new */
let vm = new Vue({
  el: '#app',
  router,
  data: {
    currentComponent: 'Login',
  },
  created() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.username) {
      this.currentComponent = 'App';
    } else {
      this.currentComponent = 'Login';
    }
  },
  components: {
    App, Login
  },
  template: `
	  <component v-bind:is="currentComponent"></component>
  `
});
window.vm = vm;
