
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// 导入网络请求的包
import {$http} from '@escook/request-miniprogram'
uni.$http=$http
$http.baseUrl='https://api-hmugo-web.itheima.net/api/public/v1'
// 请求拦截器
$http.beforeRequest=function(option){
	uni.showLoading({
		title:"加载中...."
	})
}
// 响应拦截器
$http.afterRequest=function(option){
	uni.hideLoading()
}
// 封装弹窗得方法
uni.$showMsg=function(title='数据请求失败',duration=1500){
	uni.showToast({
		title,
		duration,
		icon:''
	})
}
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif