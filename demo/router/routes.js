import DashboardCore from '../views/DashboardCore'
import Callback from '@/views/Callback'

// Modules
export const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardCore,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/callback',
    name: 'callback',
    component: Callback
  },
  {
    path: '*',
    redirect: '/dashboard'
  }
]
