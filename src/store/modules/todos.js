import { RepositoryFactory } from '../../repositories/RepositoryFactory';
import axios from 'axios';
const TodosRepository = RepositoryFactory.get('todos');
const ROOT_URL = 'http://localhost:8000/api';


const state = {
    todos: [],
    selectedTodo:{
        id:-1,
        title:'',
        description: '',
        priority:''
    }
};

const getters = {
    allTodos: state => state.todos,
    selectedTodo: state => state.selectedTodo
};

const actions = {
    async fetchTodos({ commit }) {

        const token = localStorage.getItem('token'); 
        let config = {
            headers: {Authorization: `Bearer ${token}`}
        };

        const response = await axios.get(
            `${ROOT_URL}/todos`,
            config
        );

        commit('setTodos', response.data);
    },

    async deleteTodo({ commit },id) {
        const token = localStorage.getItem('token'); 
        let config = {
            headers: {Authorization: `Bearer ${token}`}
        };
        const response = await axios.delete(
            `${ROOT_URL}/todos/${id}`,
            config
        );
        commit('deleteTodo', id);
    },

    async addTodo({ commit }, todo) {
        const token = localStorage.getItem('token'); 
        let config = {
            headers: {Authorization: `Bearer ${token}`}
        };
        const response = await axios.post(
            `${ROOT_URL}/todos/add`,
            todo,
            config
        );
    },

    async updateTodo({ commit },todo) {
        const token = localStorage.getItem('token'); 
        let config = {
            headers: {Authorization: `Bearer ${token}`}
        };
        
        const response = await axios.put(
            `${ROOT_URL}/todos/${todo.id}`,
            todo,
            config
        );
        commit('todoUpdated', response.data[0]);
    },

    async completeTodo({ commit },todo) {
        const token = localStorage.getItem('token'); 
        let config = {
            headers: {Authorization: `Bearer ${token}`}
        };
        todo.completed = 1;
        const response = await axios.put(
            `${ROOT_URL}/todos/${todo.id}`,
            todo,
            config
        );
        console.log(response.data);
        
        commit('todoCompleted', response.data[0].id);
    },
    selectTodo({ commit }, todo) {
        if(todo === {}){
            commit('todoSelected', {
                id:-1,
                title:'',
                description: '',
                priority:''
            });
        }else{
            commit('todoSelected', todo);
        }
    }
};

const mutations = {
    setTodos: (state, todos) => {
        state.todos = todos
    },
    deleteTodo: (state, id) => {
        const index = state.todos.findIndex(todo => todo.id === id);
        console.log('index to delte',index);
        
        state.todos.splice(index,1);
    },
    todoCompleted: (state,id) =>{
        const index = state.todos.findIndex(todo => todo.id === id);
        console.log('index',index);
        
        state.todos[index].comleted = 1;
    },
    todoSelected: (state,todo) => {
        state.selectedTodo = todo;
    },
    todoUpdated: (state,newTodo) =>{
        const index = state.todos.findIndex(todo => todo.id === newTodo.id);        
        state.todos.splice(index, 1, newTodo);
        state.selectedTodo = {
            id:-1,
            title:'',
            description: '',
            priority:''
        };


    }
};

export default{
    state,
    getters,
    actions,
    mutations
}