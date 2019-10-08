<template>
    <div class = 'login div'>
        <form v-on:submit.prevent='onLoginFormSubmit($event)'> 
            <label for="femail">Email</label>
            <input type="text" id="femail" name="email" v-model="usersData.email" placeholder="Your email..">

            <label for="lpass">Password</label>
            <input type="password" id="lpass" name="pass" v-model="usersData.password" placeholder="Password">

            <input type="submit" value="Login">
        </form>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Login',
    data() {
      return {
        usersData: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
        ...mapActions(['loginUser']),
        async onLoginFormSubmit() {            
            const userObj = {
                email: this.usersData.email,
                password: this.usersData.password
            }
            await this.loginUser(userObj);
            console.log(this.$store.state.users.token);
                        
            this.$router.push('/todos');
        },
        computed: mapGetters(['token', 'user']),

    }
}
</script>

<style>
    input[type=text], select {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    }

    input[type=password], select {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    }

    input[type=submit] {
    width: 100%;
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    }
    form{
        width: 70%;
        margin-left: 15%;
    }

    input[type=submit]:hover {
    background-color: #45a049;
    }

    #login.div {
        border-radius: 5px;
        background-color: #f2f2f2;
        padding: 20px;
    }
</style>