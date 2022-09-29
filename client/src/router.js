import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import LoginPage from './views/LoginPage.vue'
import ProfilePage from './views/ProfilePage.vue'
import ClientSignUp from './views/ClientSignUp.vue'
import ClientHomePage from './views/ClientHomePage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/account/*',
      name: 'profile',
      component: ProfilePage
    },
    {
      path: '/signup',
      name: 'signup',
      component: ClientSignUp
    },
    {
      path: '/clienthomepage',
      name: 'clienthomepage',
      component: ClientHomePage
    }
  ]
})
