import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './routes'

// Use
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: routes
})

/*
|--------------------------------------------------------------------------
| API Intercept Unauthorized
|--------------------------------------------------------------------------
|
*/
router.beforeEach((to, from, next) => {
  // Check auth
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!router.app.$auth.authenticated) {
      localStorage.setItem('return_url', to.path)
      router.app.$auth.logout()
    } else {
      // if (!auth.isAuthInRole(auth.getRouterRoles(to.name), true)) {
      //   next({
      //     path: '/home'
      //   })
      // } else {
        var urlReturn = localStorage.getItem('return_url')
        localStorage.removeItem('return_url')
        if (urlReturn) {
          next({
            path: urlReturn
          })
        } else {
          next()
        }
      // }
    }
  } else {
    next()
  }
})

router.afterEach((to/*, from*/) => {
  setTimeout(() => {
    // Class body
    document.body.removeAttribute('class')
    document.body.classList.add(to.name)
  }, 150)
})

// Router
export default router
