<template>
    <div>
      <div class='todosHeader'>
        <img src = '../assets/flame.svg' height="100%" id='flame_icon'/>
      </div>
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
                  <button @click="onCancelButtonClick" class='button3'><small class ='deletesmall'>cancel</small></button>
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
                  <div class = 'bottom-right' display:inline float:left>
                    <div class ='bottom' display:inline float:left> 
                      <button class='button3edit'  @click="onEditButtonClick(todo)" ><small class ='editsmall'>edit</small></button>
                       <button class='button3delte'  @click="onDeleteClickHandler(todo.id)" ><small class ='deletesmall'>delete</small></button>
                    </div>
                  </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import DeleteIcon from '../assets/icons8-trash-can.svg'
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
    components: {
      DeleteIcon
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
  margin-top: 1%;
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
.edit_div{
  display: inline;
  float: left;
  width: 20%;
  margin-left: 10%;
}
#edit_small{
  cursor: pointer;
}

.delete_div{
    display: inline;
    margin-left: 40%;
    cursor: pointer;
  float: left;
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
.todosHeader{
  height: 50px;
  background: #f15033;
  margin-top: 5%;
}
.white{
  color: white;
  
}

.low{
  color:green;
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
    width: 50%;
    margin-bottom: 0.5%;

      border-radius: 20px;

    margin-left: 0.5%;
    margin-right: 0.5%;
    right: 0;

}
#priority_filter{
  background: #f15033;
  height: 100%;;
}

#edit_icon{
  margin-left:1%;
  display: inline;
  float: left;
}
#delete_icon{
  margin-right: 5%;
    display: inline;
  float: left;
}

button {
  background-color: #4CAF50; /* Green */
  border-radius: 12px;
  cursor: pointer;
  border: none;
  color: black;
  padding: 7px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

.button2 {
  background-color: rgb(243, 243, 84)
  } /* Blue */
.button2:hover{
    background-color:rgb(197, 206, 195)

}

.button3 {
  background-color:#ffff;
  border-radius: 20px;
  border: 2px solid #f15033;
  width: 50%;

  } /* Red */
.button3edit {
  background-color:#ffff;
  border-radius: 20px;
  width: 50%;
  border: 2px solid #41b883;

  } 
.button3edit:hover {
  background-color:#41b883;
  border-radius: 20px;
  width: 50%;
  border: 2px solid #ffffff;

  } 
.editsmall{
  color: #41b883;
  width: 100%;
  height: 100%;
  font-weight: bold;
}
.editsmall:hover{
  color: #ffffff;
}

.deletesmall{
  color: #f15033;
    font-weight: bold;

}
.deletesmall:hover{
  color: white
}
.button3delte {
  background-color:#ffff;
  border-radius: 20px;
  border: 2px solid #f15033;
  width: 50%;
} 
.button3delte:hover {
  background-color:#f15033;
  border-radius: 20px;
  border: 2px solid #ffffff;
  width: 50%;
} 


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
  background-color: #41b883
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

#flame_icon{
  margin-left: -95%;
  cursor: pointer;
  height: 95%;
}


@media (max-width: 500px) {
  .todos {
    grid-template-columns: 1fr;
  }
  #flame_icon{
  margin-left: -80%;
  cursor: pointer;
  height: 95%;
}
}
</style>