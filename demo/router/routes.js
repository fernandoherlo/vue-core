import DashboardCore from '../views/DashboardCore'
import Comments from '../components/Comments/List'
import Comment from '../components/Comments/Edit'
import CommentNew from '../components/Comments/New'
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
    path: '/comments',
    name: 'comments',
    component: Comments,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/comments/:id',
    name: 'comment',
    component: Comment,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/comments/new',
    name: 'comment-new',
    component: CommentNew,
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