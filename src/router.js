import Vue from 'vue';
import Router from 'vue-router';
import Register from './components/Register';
import Todos from './components/Todos';
import Login from './components/Login';
import TodoAddForm from './components/TodoAddForm';
import routes from './components/route_names'; 
Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
      {
        path: routes.TODO_ROUTE.path,
        name: routes.TODO_ROUTE.name,
        component: Todos,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: routes.REGISTER_ROUTE.path,
        name: routes.REGISTER_ROUTE.name,
        component: Register,
        meta: {
          requiresAuth: false
        }
      },
      {
        path: routes.LOGIN_ROUTE.path,
        name: routes.LOGIN_ROUTE.name,
        component: Login,
        meta: {
          requiresAuth: false
        }
      },
      {
        path: routes.TODO_ROUTE_ADD.path,
        name: routes.TODO_ROUTE_ADD.name,
        component: TodoAddForm,
        meta: {
          requiresAuth: true
        }
      }
    ]
  })

  router.beforeEach((to, from, next) => {

    if(!localStorage.getItem('token') && to.meta.requiresAuth)
      next('/login');
    else
      next();
    
  })

  export default router;