import Ebook from './views/Ebook.vue'
import vuex from './store'
import axios from 'axios'

// 配置接口地址
axios.defaults.baseURL = '/'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
export default axios