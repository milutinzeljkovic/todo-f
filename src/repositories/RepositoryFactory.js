import TodosRepository from './TodosRepository';
import UsersRepository from './UsersRepository';

const usersRepo = new UsersRepository();
const todosRepo = new TodosRepository();

const repositories = {
    todos: todosRepo,
    users: usersRepo,
};

export const RepositoryFactory = {
    get: name => repositories[name]
};