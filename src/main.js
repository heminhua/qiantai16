// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入element-ui插件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//处理全局样式 插件
import 'normalize.css'
// 导入axios与接口域名
import axios from 'axios';
import api from './js/api.js';
//2、启用Vue插件 
//使用element-ui
Vue.use(ElementUI)

//3.引入全局样式
import './less/index.less'

// 4.1 导入配置后的axios与api, 并注入到Vue原型中 将来在实例通过this.$http调用
// 配置默认域名, 这样请求的时候就不用在url里加域名了
// axios.defaults.baseURL = domain;
// 我们是跨域请求的接口, 默认不会携带cookie等信息, 后端需要这些信息来判断登陆状态, 所以要设为true
axios.defaults.withCredentials=true;
Vue.prototype.$http = axios;
Vue.prototype.$api = api;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
