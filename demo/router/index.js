import Vue from 'vue'
import Router from 'vue-router'
import HomeCore from '../views/HomeCore'
import DashboardCore from '../views/DashboardCore'
import Callback from '@/views/Callback'
// Use
Vue.use(Router)
// Routes
const routes = [
    {
      path: '/',
      name: 'HomeCore',
      component: HomeCore
    },
    {
      path: '/dashboardcore',
      name: 'DashboardCore',
      component: DashboardCore
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback
    },
    {
      path: '*',
      redirect: '/'
    }
  ];

// Router
export default new Router({
  mode: 'history',
  routes: routes
})
