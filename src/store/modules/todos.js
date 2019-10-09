import axios from 'axios';
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
        var config = {
            headers: {Authorization: `Bearer ${token}`}
        };

        const response = await axios.get(
            `${ROOT_URL}/todos`,
            config
        );

        commit('setTodos', response.data);
    },

    async deleteTodo({ commit },todo) {
        const response = await axios.delete(
            `${ROOT_URL}/todos/${todo}`
        );
        commit('deleteTodo', response.data);
    }
};

const mutations = {
    setTodos: (state, todos) => {
        state.todos = todos
    },
    deleteTodo: (state, id) => {
        let index;
        let cnt = 0;
        state.todos.forEach(todo => {
            if(todo.id === id){
                index = cnt;
            }
            cnt++;
        });
        state.todos.splice(index,1);
    },
};

export default{
    state,
    getters,
    actions,
    mutations
}