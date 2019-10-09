<template>
    <div class = 'addtodo div'>
        <form @submit.prevent='onAddTodoFormSubmit()' > 
            <label for="ftitle">Title</label>
            <input type="text" id="ftitle" name="title" v-model="todoData.title" placeholder="title">
            
            <label for="fdescription">Description</label>
            <input type="text" id="fdescription" name="description" v-model="todoData.description" placeholder="description">
            
            <label for="fprioriyt">Priority</label>
            <select id='fprioriyt' v-model="todoData.priority">
                <option value="0">Select priority:</option>
                <option value="1">high</option>
                <option value="2">medium</option>
                <option value="3">low</option>

            </select>

            <input type="submit" value="Submit">
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex'


export default {
    name: 'TodoAddForm',
    data() {
        return {
            todoData:{
                title:'',
                description:'',
                priority:''
            }
        }

    },
    methods:{
        ...mapActions(['addTodo']),
        async onAddTodoFormSubmit(){
            const priorities = [
                '',
                'high',
                'medium',
                'low'
            ];
            const todoObj = {
                title: this.todoData.title,
                description: this.todoData.description,
                priority: priorities[this.todoData.priority]
            };
            await this.addTodo(todoObj);
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

    #addtodo.div {
        border-radius: 5px;
        background-color: #f2f2f2;
        padding: 20px;
    }
    .custom-select {
    position: relative;
    font-family: Arial;
    }

    .custom-select select {
    display: none; /*hide original SELECT element: */
    }

    .select-selected {
    background-color: DodgerBlue;
    }

    /* Style the arrow inside the select element: */
    .select-selected:after {
    position: absolute;
    content: "";
    top: 14px;
    right: 10px;
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-color: #fff transparent transparent transparent;
    }

    /* Point the arrow upwards when the select box is open (active): */
    .select-selected.select-arrow-active:after {
    border-color: transparent transparent #fff transparent;
    top: 7px;
    }

    /* style the items (options), including the selected item: */
    .select-items div,.select-selected {
    color: #ffffff;
    padding: 8px 16px;
    border: 1px solid transparent;
    border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
    cursor: pointer;
    }

    /* Style items (options): */
    .select-items {
    position: absolute;
    background-color: DodgerBlue;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 99;
    }

    /* Hide the items when the select box is closed: */
    .select-hide {
    display: none;
    }

    .select-items div:hover, .same-as-selected {
    background-color: rgba(0, 0, 0, 0.1);
    }

</style>