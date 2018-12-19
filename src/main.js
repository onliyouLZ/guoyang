// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import echarts from 'echarts';
import liquidfill from 'echarts-liquidfill' //水滴图
import 'swiper/dist/css/swiper.css'
import 'openlayers/dist/ol.css'
import './utils/echartsResizeHelper'
import './ztree/zTree_v3/js/jquery.ztree.core.min'
import './ztree/zTree_v3/js/jquery.ztree.excheck.min'


import Blob from '@/vendor/Blob.js'
import Export2Excel from '@/vendor/Export2Excel.js'
import Config from '@/api/config.js'
// import ol from 'openlayers'

import VueAwesomeSwiper from 'vue-awesome-swiper'

import router from './router'
import $ from 'jquery'


Vue.config.productionTip = false;
Vue.use(ElementUI, { size: 'small' });
Vue.use(VueAwesomeSwiper);






Vue.prototype.$http = axios;
Vue.prototype.$echarts = echarts;
Vue.prototype.$url = Config;
// Vue.prototype.$ol=ol;



//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  const role = localStorage.getItem('ms_username');
  if(!role && to.path !== '/login'){
    next('/login');
  }else{
    next();
  }
  // else if(to.meta.permission){
  //   // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
  //   role === 'admin' ? next() : next('/403');
  // }

});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
