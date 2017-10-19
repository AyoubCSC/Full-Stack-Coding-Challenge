/* eslint-disable eol-last */
import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Axios from 'axios'
import Login from '@/components/Login'
import Registration from '@/components/Registration'
import Success from '@/components/Success'

Vue.use(Router)
Vue.use(ElementUI)
Vue.prototype.$ajax = Axios

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/registration',
      name: 'Registration',
      component: Registration
    },
    {
      path: '/success',
      name: 'Success',
      component: Success,
      meta: {
        test: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('test')
  console.log(to)
  if (to.name === 'Login') {
    if (token) {
      console.log(to)
      next()
    } else {
      next({
        path: '/',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

export default router