<template>
    <div class = 'header'>
        <div v-if="user.email !== undefined">
            <ul id="menu">
                <li><router-link :to="{name: 'todos_route'}" class="white">Todos</router-link></li>
                <li><router-link :to="{name: 'todos_route_add' }" class="white" >Add todo</router-link></li>
                <li><router-link :to="{name: 'user_route'}" class="white" >{{user.email}}</router-link></li>
                <li><a @click = "logout()" class="white" >Log out</a></li>
            </ul>  
        </div>
        <div v-else>
            <ul id="menu">
                <li><router-link :to="{name: 'login_route'}" class="white" >Login</router-link></li>
                <li><router-link :to="{name: 'register_route'}" class="white" >Register</router-link></li>
            </ul>  
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import routeNames from './route_names'

export default {
    name: 'Header',
    methods: {
        ...mapActions([ 'loginUser', 'logoutUser', 'fetchCurrentUser']),
        logout(){
            this.logoutUser();
            this.$router.push('/login');

        }
    },
    data() {
        return {
            routeNames
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
    background-color: #41b883;
    }
    .white{
        color: white;
        font-weight: bold;
    }

    li {
    float: left;
    }

    .header{
        margin-top: 1%;
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