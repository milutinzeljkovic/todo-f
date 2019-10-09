<template>
    <div>
        <h1>Todo</h1>
        <div v-if="user.email !== undefined">
            <ul id="menu">
                <li><router-link to = '/todos'>Todos</router-link></li>
                <li><router-link to = '/todos/add'>Add todo</router-link></li>
                <li><router-link to = '/user'>{{user.email}}</router-link></li>
                <li><a @click = "logout()">Log out</a></li>
            </ul>  
        </div>
        <div v-else>
            <ul id="menu">
                <li><router-link to = '/login'>Login</router-link></li>
                <li><router-link to = '/register'>Register</router-link></li>
            </ul>  
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
const TODO_ROUTE = '/todos';

export default {
    name: 'Header',
    methods: {
        ...mapActions(['fetchCurrentUser', 'loginUser', 'logoutUser']),
        logout(){
            this.logoutUser();
            this.$router.push('/login');

        }
    },

    computed: mapGetters(['user']),

    created() {
        this.fetchCurrentUser({});
    }
}
</script>

<style>
    ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    border: 1px solid #e7e7e7;
    background-color: #f3f3f3;
    }

    li {
    float: left;
    }

    li a {
    display: block;
    color: #666;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    }

    li a:hover:not(.active) {
    background-color: #ddd;
    }

    li a.active {
    color: white;
    background-color: #4CAF50;
    }
</style>