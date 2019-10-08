import Vue from 'vue';
import Router from 'vue-router';
import Register from './components/Register';
import Todos from './components/Todos';
import Login from './components/Login';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
      {
        path: '/todos',
        name: 'todos',
        component: Todos
      },
      {
        path: '/register',
        name: 'register',
        component: Register
      },
      {
        path: '/login',
        name: 'login',
        component: Login
      }
    ]
  })