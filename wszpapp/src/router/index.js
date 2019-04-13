import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/pages/Home/Home'
import FoodBook from '../components/pages/Classify/FoodBook'
import FoodCircle from '../components/pages/FoodCircle/FoodCircle'
import Tzlist from '../components/pages/FoodCircle/Tzlist'
import Xlist from '../components/pages/FoodCircle/Xlist'
import My from '../components/pages/My/My'
import Login from '../components/pages/My/Login'
import Reg from '../components/pages/My/Reg'
import Dl from '../components/pages/My/Dl'
import Details from '../components/commons/Details'
import List from '../components/commons/List'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/foodbook',
      name: 'FoodBook',
      component: FoodBook
    },
    {
      path: '/foodcircle',
      name: 'FoodCircle',
      component: FoodCircle,
      children: [
        {
          path: 'tzlist',
          name: 'Tzlist',
          component: Tzlist
        },
        {
          path: 'xlist',
          name: 'Xlist',
          component: Xlist
        }
      ]
    },
    {
      path: '/my',
      name: 'My',
      component: My
    },
    {
      path: '/dl',
      name: 'Dl',
      component: Dl,
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'reg',
          name: 'Reg',
          component: Reg
        }
      ]
    },
    {
      path: '/details',
      name: 'Details',
      component: Details
    },
    {
      path: '/list',
      name: 'List',
      component: List
    }
  ]
})






