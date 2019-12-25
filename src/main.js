import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

//引入element-UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引入axios
import http_axios from "axios";
Vue.prototype.$http = http_axios;

//引入Vue-jsonp
import VueJsonp from "vue-jsonp"
Vue.use(VueJsonp);

//引入阿里矢量图标库
import './assets/icon/iconfont.css'

//这册全局组件
import columnTable from "@/components/columnTable.vue"
Vue.component("columnTable",columnTable)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
