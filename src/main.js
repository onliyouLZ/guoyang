// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import router from './router'


Vue.config.productionTip = false;
// Vue.use(ElementUI);
Vue.use(ElementUI, { size: 'small' });


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
