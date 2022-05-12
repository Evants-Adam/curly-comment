import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('../views/LoginPage.vue')
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: () => import('../views/RegisterPage.vue')
  },
  {
    path: '/comments',
    name: 'CommentPage',
    component: () => import('../views/HomePage.vue')
  },
  {
    path: '/edit',
    name: 'EditPage',
    component: () => import('../views/EditPage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Router Guard
router.beforeEach((to, from, next) => {
  if ((to.name === 'CommentPage' || to.name === 'EditPage') && !localStorage.getItem('access_token')) {
    next({ name: 'LoginPage' })
  } else if ((to.name === 'LoginPage' || to.name === 'RegisterPage') && localStorage.getItem('access_token')) {
    next({ name: 'CommentPage' })
  } else if (to.path === '/') {
    next({ name: 'LoginPage' })
  } else {
    next()
  }
})

export default router
