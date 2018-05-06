import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'
import VisitorGuard from './visitor-guard'
import AddWebsite from '@/components/Websites/AddWebsite'
import Index from '@/components/Index'
import Websites from '@/components/Websites/Websites'
import Website from '@/components/Websites/Website'
import Login from '@/components/Auth/Login'
import Register from '@/components/Auth/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'Index',
      component: Index,
    },
    {
      path: '/websites',
      name: 'Websites',
      component: Websites,
      beforeEnter: AuthGuard
    },
    {
      path: '/websites/:id',
      name: 'Website',
      component: Website,
      beforeEnter: AuthGuard
    },
    {
      path: '/add-website',
      name: 'AddWebsite',
      component: AddWebsite,
      beforeEnter: AuthGuard
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: VisitorGuard
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      beforeEnter: VisitorGuard
    }
  ],
  mode: 'history'
})
