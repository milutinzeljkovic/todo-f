<template>
    <div class = 'register div'>
        <form @submit.prevent='onRegisterFormSubmit()'> 
            <label for="femail">Email</label>
            <input type="text" id="femail" name="email" v-model="usersData.email" placeholder="Your email..">
            
            <label for="fname">Name</label>
            <input type="text" id="fname" name="name" v-model="usersData.name" placeholder="Your name..">

            <label for="lpass">Password</label>
            <input type="password" id="lpass" name="pass" v-model="usersData.password" placeholder="Password">

            <label for="lpassconf">Confirm password</label>
            <input type="password" id="lpassconf" name="passconf" v-model="usersData.password_confirmation" placeholder="Confirm password">

            <input type="submit" value="Register">
        </form>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Register',
    data() {
      return {
        usersData: {
          email: '',
          password: '',
          password_confirmation: '',
          name:''

        }
      }
    },
    methods: {
        ...mapActions(['registerUser']),
        async onRegisterFormSubmit() {
            const userObj = {
                email: this.usersData.email,
                password: this.usersData.password,
                password_confirmation: this.usersData.password_confirmation,
                name: this.usersData.name
            }
            await this.registerUser(userObj);                        
            this.$router.push('/todos');
        }
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

    #register.div {
        border-radius: 5px;
        background-color: #f2f2f2;
        padding: 20px;
    }
</style>