<template>
    <div>
        <h3>Todos</h3>
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
                  <button @click="onCancelButtonClick">cancel</button>
                </form>
              </div>
              <div v-else>

                <h2>{{todo.title}}</h2>
                <p>{{todo.description}}</p>
                <p>priority: {{todo.priority}}</p>
                <input type = "checkbox" v-if="todo.completed === 1" checked/>
                <input type = "checkbox" v-else v-on:click="onCheckBoxChecked(todo)"/>
                <div>
                  <div class = 'bottom-right'>
                    <button @click="onEditButtonClick(todo)" >edit</button>
                    <button v-on:click="onDeleteClickHandler(todo.id)">delete</button>
                  </div>
                   
                </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Todos',
    methods: {
        ...mapActions(['fetchTodos', 'deleteTodo', 'fetchCurrentUser', 'completeTodo', 'selectTodo','updateTodo']),
        onDeleteClickHandler(id){            
            this.deleteTodo(id);
            
        },
        onCheckBoxChecked(todo){          
          this.completeTodo(todo);
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
}
.todo {
  border: 1px solid #ccc;
  background: #41b883;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
  cursor: pointer;
}
.todo.completed {
  border: 1px solid #ccc;
  background: #898a8a;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
  cursor: pointer;
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

@media (max-width: 500px) {
  .todos {
    grid-template-columns: 1fr;
  }
}
</style>