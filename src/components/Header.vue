<template>
    <div>
        <h1>Todo</h1>
        <div v-if="user.email !== undefined">
            <ul id="menu">
                <li><router-link to = '/todos'>Todos</router-link></li>
                <li><router-link to = '/todos/add'>Add todo</router-link></li>
                <li><router-link to = '/user'>{{user.email}}</router-link></li>
                <li><router-link to = '/logout'>Log out</router-link></li>
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
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
    name: 'Header',
    methods: {
        ...mapActions(['fetchCurrentUser', 'loginUser']),
    },
    computed: mapState({
        user: state => state.users.user
    }),

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