<template>
    <div>
        <div class="todos">
            <div v-for="todo in allTodos" :key="todo.id" class="todo" v-bind:class="{'completed':todo.completed}">
              <div v-if="selectedTodo.id === todo.id">
                <form @submit.prevent='onEditTodoSubmit' > 
                  <input type="text" id="ftitle" name="title" v-model="todoData.title">
                  
                  <input type="text" id="fdescription" name="description" v-model="todoData.description" placeholder="description">
                  
                  <select id='fprioriyt' v-model="todoData.priority">
                      <option value="0">Select priority:</option>
                      <option value="high">high</option>
                      <option value="medium">medium</option>
                      <option value="low">low</option>
                  </select>

                  <input type="submit" value="Submit">
                  <button @click="onCancelButtonClick" class='button3'>cancel</button>
                </form>
              </div>
              <div v-else>
                <label class="container">
                  <h2 class = 'white'>{{todo.title}}</h2>
                  <input type="checkbox" v-if="todo.completed === 1" checked>
                  <input type = "checkbox" v-else v-on:click="onCheckBoxChecked(todo)"/>
                  <span class="checkmark"></span>
                </label>
                <p class = 'white'>{{todo.description}}</p>
                <label>
                  <p 
                    :class="[todo.priority]"
                    >
                    {{todo.priority}}
                  </p>
                </label>
                <div>
                  <div class = 'bottom-right'>
                    <button @click="onEditButtonClick(todo)" class="button2" >edit</button>
                    <button v-on:click="onDeleteClickHandler(todo.id)" class="button3" >delete</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { delay } from 'q';

export default {
    name: 'Todos',
    methods: {
        ...mapActions(['fetchTodos', 'deleteTodo', 'fetchCurrentUser', 'completeTodo', 'selectTodo','updateTodo']),
        onDeleteClickHandler(id){            
            this.deleteTodo(id);
        },
        onCheckBoxChecked(todo){
            this.completeTodo(todo)
        },
        onEditButtonClick(todo){
          this.todoData = {...todo};
          this.selectTodo(todo); 
        },
        onEditTodoSubmit(){
          this.updateTodo(this.todoData);
        },
        onCancelButtonClick(){
          this.selectTodo({});
        }
    },
    data(){
      return{
        todoData:{
                id: '-1',
                title: '',
                description:'',
                priority:'',
                completed:-1
        }
      }
    },
    computed: mapGetters(['allTodos', 'selectedTodo']),
    created() {
        this.fetchTodos();
        this.fetchCurrentUser();
    }
}
</script>

<style scoped>
.todos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  margin-top: 5%;
}
.todo {
  border: 1px solid #ccc;
  background: #41b883;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  height: 90%;
  position: relative;
  cursor: pointer;
}
.todo.completed {
  border: 1px solid #ccc;
  background: #898a8a;
  padding: 1rem;
  border-radius: 5px;
  height: 90%;
  text-align: center;
  position: relative;
  cursor: pointer;
}
.edit{
  color:rgb(0, 174, 255)
}
.delete{
  color:red;
}
.high{
  color: red;
  font-weight: bold;
}
.medium{
  color: yellow;
  font-weight: bold;

}

.white{
  color: white;
}

.low{
  color:yellowgreen;
  font-weight: bold;

}

i {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #fff;
  cursor: pointer;
}
.legend {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}
.complete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #35495e;
}
.incomplete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #41b883;
}
.is-complete {
  background: #35495e;
  color: #fff;
}
.bottom-right {
    position: absolute;
    bottom: 0;
    right: 0;
}

button {
  background-color: #4CAF50; /* Green */
  border-radius: 12px;
  cursor: pointer;
  border: none;
  color: white;
  padding: 7px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

.button2 {
  background-color:rgb(113, 192, 105)
  } /* Blue */
.button2:hover{
    background-color:rgb(197, 206, 195)

}

.button3 {background-color:#eb3b3b} /* Red */

.button3:hover{
  background-color:rgb(235, 173, 173);
}

.container {
  display: block;
  position: relative;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
}

.container:hover input ~ .checkmark {
  background-color: #ccc;
}


.container input:checked ~ .checkmark {
  background-color: #2196F3;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.container input:checked ~ .checkmark:after {
  display: block;
}

.container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}


@media (max-width: 500px) {
  .todos {
    grid-template-columns: 1fr;
  }
}
</style>