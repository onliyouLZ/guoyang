import Vue from 'vue'
import Router from 'vue-router'

/**
 * 页面
 */

import SystemHome from '../page/SystemHome'
import Login from '../page/login'
import oneMap from '../page/oneMap'
import waterMonitoring from '../page/waterMonitoring'
import business from '../page/business'
import essential from '../page/essential'
import system from '../page/system'
import error404 from '../page/404'

import realTimeRain from '../page/threeMenu/RealTimeRain'
import rainwater from '../page/threeMenu/Rainwater'
import rainwaterWarning from '../page/threeMenu/RainwaterWarning'


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
      redirect:'/SystemHome',
      children:[
        {
          path: '/SystemHome',
          component: SystemHome,
          name:"首页"
        },
        {
          path: '/oneMap',
          component: oneMap,
          name:"一张图"
        },
        {
          path: '/waterMonitoring',
          component: waterMonitoring,
          name:"水情监视预警",
          redirect:'/realTimeRain',
          children:[
            {
              path: '/realTimeRain',
              component: realTimeRain,
              name:"水雨情实时监控",
            },
            {
              path: '/rainwater',
              component: rainwater,
              name:"雨水情分析",
            },
            {
              path: '/rainwaterWarning',
              component: rainwaterWarning,
              name:"雨水情预警",
            }
          ]
        },
        {
          path: '/business',
          component: business,
          name:"业务管理"
        },
        {
          path: '/essential',
          component: essential,
          name:"基础数据管理"
        },
        {
          path: '/system',
          component: system,
          name:"系统管理"
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
  ],
})
