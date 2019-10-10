import { RepositoryFactory } from '../../repositories/RepositoryFactory';
const todosRepo = RepositoryFactory.get('todos');

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
        const response = await todosRepo.get();
        commit('setTodos', response.data);
    },

    async deleteTodo({ commit },id) {
        const response = await todosRepo.deleteTodo(id);
        commit('deleteTodo', id);
    },

    async addTodo({ commit }, todo) {
        const response = await todosRepo.createTodo(todo);
    },

    async updateTodo({ commit },todo) {
        const response = await todosRepo.updateTodo(todo);
        commit('todoUpdated', response.data[0]);
    },

    async completeTodo({ commit },todo) {
        todo.completed = 1;
        const response = await todosRepo.updateTodo(todo);        
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
        state.todos.splice(index,1);
    },
    todoCompleted: (state,id) =>{
        const index = state.todos.findIndex(todo => todo.id === id);        
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