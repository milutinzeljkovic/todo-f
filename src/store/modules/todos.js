import axios from 'axios';
import { async } from 'q';
const ROOT_URL = 'http://localhost:8000/api';

const state = {
    todos: []
};

const getters = {
    allTodos: state => state.todos
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
        commit('deleteTodo', response.data);
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
        commit('addTodo', response.data);
    }

};

const mutations = {
    setTodos: (state, todos) => {
        state.todos = todos
    },
    deleteTodo: (state, id) => {
        const index = state.todos.findIndex(todo => todo.id === id);
        state.todos.splice(index,1);
    },
};

export default{
    state,
    getters,
    actions,
    mutations
}