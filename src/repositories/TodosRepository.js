import Repository from './Repository';

const resource = '/todos';

export default {
    get() {
        return Repository.get(`${resource}`);
    },
    getTodo(todoId) {
        return Repository.get(`${resource}/${todoId}`);
    },
    createTodo(todo) {
        return Repository.post(`${resource}/add`, todo);
    },
    updateTodo(todo) {
        return Repository.put(`${resource}/${todo.id}`,todo);
    },
    deleteTodo(id) {
        return Repository.delete(`${resource}/${id}`);
    }

}