import Vue from 'vue'
import Router from 'vue-router'
import HomeCore from '../components/HomeCore'
import DashboardCore from '../components/DashboardCore'
import Callback from '@/components/Callback'
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
