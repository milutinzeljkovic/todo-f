import Repository from './Repository';

const resource = '/todos';

class TodosRepository extends Repository{
    get() {
        return this.getApiClient().get(`${resource}`);
    }
    getTodo(todoId) {
        return this.getApiClient().get(`${resource}/${todoId}`);
    }
    createTodo(todo) {
        return this.getApiClient().post(`${resource}/add`, todo);
    }
    updateTodo(todo) {
        return this.getApiClient().put(`${resource}/${todo.id}`,todo);
    }
    deleteTodo(id) {
        return this.getApiClient().delete(`${resource}/${id}`);
    }
}

export default TodosRepository;

