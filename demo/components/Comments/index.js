/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
*/
import Comments from './views/List'
import Comment from './views/Edit'
import CommentNew from './views/New'

/*
|--------------------------------------------------------------------------
| Vuex
|--------------------------------------------------------------------------
|
*/
import CommentsVuex from './config/store'
import { modules } from '../../store/modules'

/*
|--------------------------------------------------------------------------
| Plugin
|--------------------------------------------------------------------------
|
*/

let alreadyExecuted = false
function plugin(Vue) {
  Vue.mixin({
    beforeCreate() {
      if (!alreadyExecuted && this.$router){
        initPlugin(this)
        alreadyExecuted = true
      }
    }
  })
}

function initPlugin(vm) {
  
  // Vuex
  vm.$store.registerModule('CommentsVuex', CommentsVuex)
  modules.push('getAllCOMMENTS')

  // ADD routes
  vm.$router.addRoutes(
  [
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
  ])
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin)
}

export default plugin
