import Vue from 'vue';
import Router from 'vue-router';
import Register from './components/Register';
import Todos from './components/Todos';
import Login from './components/Login';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
      {
        path: '/todos',
        name: 'todos',
        component: Todos,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
          requiresAuth: false
        }
      },
      {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
          requiresAuth: false
        }
      }
    ]
  })

  router.beforeEach((to, from, next) => {
    if(to.meta.requiresAuth){
      if(!localStorage.getItem('token'))
        next('/login');
      else{
        next();
      }
    }
    else{
      next();
    }
  })

  export default router;