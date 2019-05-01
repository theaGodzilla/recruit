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
import Info from '../components/commons/Info'
import Resume from '../components/commons/Resume'
import Collection from '../components/commons/Collection'
import Apply from '../components/commons/Apply'
import Search from '../components/commons/Search'
import Msgd from '../components/commons/Msgd'
import Computer from '../components/commons/Computer'
import Detailsss from '../components/commons/Detailsss'
import Footpr from '../components/commons/Footpr'
import Detailstart from '../components/commons/Detailstart'

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
          component: Xlist,
        }
      ]
    },
    {
      path: '/my',
      name: 'My',
      component: My,
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
    },
    {
      path: '/info',
      name: 'Info',
      component: Info
    },
    {
      path: '/resume',
      name: 'Resume',
      component: Resume
    },
    {
      path: '/collection',
      name: 'Collection',
      component: Collection
    },
    {
      path: '/apply',
      name: 'Apply',
      component: Apply
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/msgd',
      name: 'Msgd',
      component: Msgd
    },
    {
      path: '/computer',
      name: 'Computer',
      component: Computer
    },
    {
      path: '/detailsss',
      name: 'Detailsss',
      component: Detailsss
    },
    {
      path: '/footpr',
      name: 'Footpr',
      component: Footpr
    },
    {
      path: '/detailstart',
      name: 'Detailstart',
      component: Detailstart
    },
  ]
})






