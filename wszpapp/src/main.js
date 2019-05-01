// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './styles/reset.css'
import './styles/font_j4jyyrtdyda/iconfont.css'
// import '../node_modules/animate.css/animate.css'
import './styles/animate.css'
import Vue from 'vue'
import  store from './store/index.js'
import App from './App'
import router from './router'

// import './assets/css/indexicon.css'
// import './assets/css/font-awesome.css'
import 'mint-ui/lib/style.css'
// import './assets/css/globle.css'

Vue.config.productionTip = false

//引入自研ui框架
import Small from '../Small'
Vue.use(Small)//调用模块里的install方法 并且将vue实例进行传递

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
Axios.interceptors.response.use(function(response){
	return response.data;
},function(error){
	return Promise.reject(error);
});

//Axios.interceptors.response.use(function(ress){
//	return ress.pager;
//},function(error){
//	return Promise.reject(error);
//});
Vue.prototype.$axios=Axios //挂载axios 便于组件使用

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
