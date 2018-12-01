import Vue from 'vue'
import Router from 'vue-router'

/**
 * 页面
 */

import SystemHome from '../page/SystemHome'
import Login from '../page/login'
import oneMap from '../page/oneMap'
import business from '../page/business'
import essential from '../page/essential'
import system from '../page/system'
import error404 from '../page/404'


/**
 * 组件
 */
import Home from '../components/home'



Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      component: Home,
      children:[
        {
          path: '/SystemHome',
          component: SystemHome
        },
        {
          path: '/oneMap',
          component: oneMap
        },
        {
          path: '/business',
          component: business
        },
        {
          path: '/essential',
          component: essential
        },
        {
          path: '/system',
          component: system
        },
      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '*',
      component: error404
    }
  ]
})
